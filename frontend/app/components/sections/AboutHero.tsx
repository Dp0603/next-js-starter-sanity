"use client";
import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
interface AboutHeroProps {
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

const AboutHero: React.FC<AboutHeroProps> = ({ block }) => {
    if (!block) return null;

    const isRight = block.layout === 'right';

    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                <div className={`flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center ${isRight ? 'lg:flex-row-reverse' : ''}`}>

                    {/* --- IMAGE SIDE --- */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className={`absolute inset-0 border-2 border-[#14253f]/10 z-0 hidden lg:block transition-transform duration-500 group-hover:scale-105 ${isRight ? "-right-6 top-6" : "-left-6 top-6"}`} />

                        <div className="relative z-10 aspect-[4/5] lg:aspect-square bg-gray-100 overflow-hidden shadow-2xl rounded-sm">
                            {block.image && (
                                <Image
                                    src={urlForImage(block.image).url()}
                                    alt={block.subtitle || "About Image"}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw" // 👈 Helps mobile load smaller versions
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#14253f]/30 to-transparent" />
                        </div>

                        {/* Stat Card */}
                        {block.statNumber && (
                            <div className={`absolute -bottom-6 ${isRight ? 'left-6' : 'right-6'} z-20 bg-white p-4 lg:p-6 shadow-xl border border-gray-100 max-w-[160px] lg:max-w-[200px]`}>
                                <p className="text-3xl lg:text-4xl font-black text-[#14253f] mb-1">{block.statNumber}</p>
                                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#cd7d51]">{block.statLabel}</p>
                            </div>
                        )}
                    </div>

                    {/* --- CONTENT SIDE --- */}
                    <div className="w-full lg:w-1/2">
                        <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-4 lg:mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                            {block.subtitle}
                        </h4>

                        <div className="mb-6 lg:mb-8">
                            <PortableText value={block.heading} components={components} />
                        </div>

                        <div className="text-lg lg:text-xl text-gray-500 font-light leading-relaxed mb-8 lg:mb-12 border-l-2 border-[#cd7d51] pl-6">
                            <p>{block.description}</p>
                        </div>

                        {block.quote && (
                            <div className="bg-[#fafafa] p-6 lg:p-10 border-l-4 border-[#14253f] relative">
                                <span className="absolute top-2 left-2 text-4xl text-[#cd7d51]/20 font-serif leading-none">“</span>
                                <h3 className="text-lg lg:text-2xl font-bold text-[#14253f] mb-4 italic relative z-10">
                                    {block.quote}
                                </h3>
                                {block.quoteAuthor && (
                                    <p className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs">
                                        — {block.quoteAuthor}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutHero;