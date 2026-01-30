"use client";

import React, { useEffect, useRef, useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Download } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image"; // 👈 IMPORT THIS

interface RichTextSectionProps {
    block: {
        title?: string;
        lastUpdated?: string;
        introduction?: string;
        legalType: "privacy" | "terms";
        legalSections?: Array<{
            heading: string;
            content: any[];
            _key: string;
        }>;
        content?: any[];
    };
}

/* ------------------ PortableText Styles ------------------ */

const components: PortableTextComponents = {
    block: {
        h3: ({ children }: any) => (
            <h3 className="text-lg font-bold mt-8 mb-4 text-[#14253f] uppercase tracking-wide">
                {children}
            </h3>
        ),
        normal: ({ children }: any) => (
            <p className="mb-6 text-gray-500 leading-relaxed font-light">
                {children}
            </p>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-6 mb-6 text-gray-500 space-y-2 marker:text-[#cd7d51]">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal pl-6 mb-6 text-gray-500 space-y-2 marker:font-bold">
                {children}
            </ol>
        ),
    },
    // 👇 NEW: Handle images inside text blocks efficiently
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-64 md:h-96 my-8 rounded-sm overflow-hidden bg-gray-100">
                    <Image
                        src={urlForImage(value).url()}
                        alt={value.alt || "Illustration"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            );
        },
    },
};

/* ------------------ Component ------------------ */

const RichTextSection: React.FC<RichTextSectionProps> = ({ block }) => {
    if (!block) return null;

    const [activeSection, setActiveSection] = useState<string | null>(null);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    const getSectionId = (key: string) => `section-${key}`;

    /* ------------------ Scroll Spy ------------------ */

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const key = entry.target.id.replace("section-", "");
                        setActiveSection(key);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -55% 0px",
                threshold: 0,
            }
        );

        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    /* ------------------ Scroll on Click ------------------ */

    const scrollToSection = (e: React.MouseEvent, key: string) => {
        e.preventDefault();
        const element = document.getElementById(getSectionId(key));
        if (!element) return;

        setActiveSection(key);

        const y =
            element.getBoundingClientRect().top + window.scrollY - 120;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };

    /* ------------------ Render ------------------ */

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa] relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    {block.lastUpdated && (
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-[#cd7d51]" />
                            <p className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs">
                                Last Updated: {block.lastUpdated}
                            </p>
                            <span className="w-8 h-[1px] bg-[#cd7d51]" />
                        </div>
                    )}

                    {block.title && (
                        <h1 className="text-5xl md:text-7xl font-black text-[#14253f] uppercase tracking-tighter mb-8 leading-[0.9]">
                            {block.title}
                        </h1>
                    )}

                    {block.introduction && (
                        <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-none">
                            {block.introduction}
                        </p>
                    )}
                </div>

                {/* Layout */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-1/4 sticky top-32">
                        <nav className="border-l border-gray-200">
                            {block.legalSections?.map((section, index) => (
                                <a
                                    key={section._key}
                                    href={`#${getSectionId(section._key)}`}
                                    onClick={(e) =>
                                        scrollToSection(e, section._key)
                                    }
                                    className={`group block pl-6 py-3 text-sm transition-all border-l-2
                    ${activeSection === section._key
                                            ? "text-[#14253f] border-[#cd7d51] -ml-[2px] bg-[#cd7d51]/5"
                                            : "text-gray-400 border-transparent hover:text-[#14253f] hover:border-[#cd7d51] hover:-ml-[2px]"
                                        }
                  `}
                                >
                                    <span
                                        className={`block text-[10px] font-bold uppercase tracking-widest mb-1
                      ${activeSection === section._key
                                                ? "text-[#cd7d51]"
                                                : "text-[#cd7d51]/50 group-hover:text-[#cd7d51]"
                                            }
                    `}
                                    >
                                        Section {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="font-medium uppercase tracking-tight">
                                        {section.heading}
                                    </span>
                                </a>
                            ))}
                        </nav>

                        <div className="mt-12 pl-6">
                            <button
                                onClick={() => {
                                    window.location.href = `/api/legal-pdf?type=${block.legalType}`;
                                }}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14253f] hover:text-[#cd7d51] transition-colors opacity-50 hover:opacity-100"
                            >
                                <Download size={14} />
                                Download PDF
                            </button>

                        </div>
                    </aside>

                    {/* Content */}
                    <div className="lg:w-3/4 w-full">
                        {block.legalSections ? (
                            <div className="space-y-20">
                                {block.legalSections.map((section, index) => (
                                    <div
                                        key={section._key}
                                        id={getSectionId(section._key)}
                                        ref={(el) => {
                                            sectionRefs.current[section._key] = el;
                                        }}
                                        className="scroll-mt-32 border-b border-gray-100 pb-16 last:border-0"
                                    >
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-2xl font-black text-[#cd7d51]/30 font-mono">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#14253f]">
                                                {section.heading}
                                            </h2>
                                        </div>

                                        <div className="prose prose-lg max-w-none text-gray-500 font-light leading-relaxed pl-10 md:pl-12">
                                            <PortableText
                                                value={section.content}
                                                components={components}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="prose prose-lg max-w-none text-gray-500 font-light mx-auto">
                                <PortableText
                                    value={block.content || []}
                                    components={components}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RichTextSection;