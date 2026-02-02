"use client";
import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image"; // 👈 IMPORT THIS

interface HeroProps {
    block: any;
}

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#14253f] mb-6 lg:mb-8 tracking-wide uppercase leading-[0.95] whitespace-pre-wrap">
                {children}
            </h1>
        ),
    },
    marks: {
        textColor: ({ value, children }) => (
            <span style={{ color: value?.value || 'inherit' }}>
                {children}
            </span>
        ),
        textSize: ({ value, children }) => (
            <span className={`${value?.size || ''} align-baseline`}>
                {children}
            </span>
        ),
    },
};

const HeroSection: React.FC<HeroProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-16 md:pb-24 lg:pb-32 bg-[#14253f] overflow-hidden">

            {/* Background Image Optimized */}
            <div className="absolute inset-0 z-0">
                {block.backgroundImage && (
                    <Image
                        src={urlForImage(block.backgroundImage).url()}
                        alt={block.backgroundImage.alt || "Background"}
                        fill // 👈 Automatically fills parent container
                        priority // 👈 CRITICAL: Loads immediately for speed score
                        quality={90} // 👈 Better quality for hero but optimized
                        className="object-cover opacity-50 mix-blend-overlay"
                        sizes="100vw" // Tells browser it takes full width
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14253f] via-[#14253f]/40 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="max-w-6xl">
                    <div className="mb-8">
                        <PortableText value={block.heading} components={components} />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end mt-8">
                        <div className="max-w-xl">
                            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light border-l-4 border-[#cd7d51] pl-6 py-1">
                                {block.subheading}
                            </p>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-auto flex flex-col sm:flex-row gap-4">
                            <Link
                                href={block.buttonLink || "/contact"}
                                className="group inline-flex items-center justify-center gap-3 bg-white text-[#14253f] border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#cd7d51] hover:border-[#cd7d51] hover:text-white transition-all duration-300"
                            >
                                {block.buttonText || "Begin Partnership"}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {block.secondaryButtonText && (
                                <Link
                                    href={block.secondaryButtonLink || "/products"}
                                    className="group inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#14253f] transition-all duration-300"
                                >
                                    {block.secondaryButtonText}
                                    <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;