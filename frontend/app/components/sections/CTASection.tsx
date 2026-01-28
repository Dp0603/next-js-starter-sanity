"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

interface CTAProps {
    block: any;
}

const CTASection: React.FC<CTAProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-32 relative overflow-hidden bg-white border-t border-gray-100">

            {/* 1. Subtle Background Texture (Industrial Grid) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* 2. Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

                {/* --- HEADER --- */}
                <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-6 flex items-center justify-center gap-3">
                    <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                    {block.subtitle}
                    <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                </h4>

                <h2 className="text-5xl md:text-7xl font-black text-[#14253f] mb-8 tracking-tighter uppercase leading-[0.9]">
                    {block.heading}
                </h2>

                <p className="text-[#14253f] text-lg lg:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                    {block.description}
                </p>

                {/* --- BUTTONS --- */}
                <div className="flex flex-col sm:flex-row justify-center gap-6">

                    {/* Primary Button (Navy Fill) */}
                    <Link
                        href={block.primaryButtonLink || '/contact'}
                        className="group inline-flex items-center justify-center gap-3 bg-[#14253f] text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-[#cd7d51] transition-all duration-300 shadow-xl hover:shadow-2xl rounded-sm"
                    >
                        {block.primaryButtonText}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Secondary Button (Outline) */}
                    <Link
                        href={block.secondaryButtonLink || 'mailto:exports@akaame.com'}
                        className="group inline-flex items-center justify-center gap-3 bg-transparent border border-[#14253f]/20 text-[#14253f] px-10 py-5 text-xs font-bold uppercase tracking-widest hover:border-[#cd7d51] hover:text-[#cd7d51] transition-all duration-300 rounded-sm"
                    >
                        <Mail size={16} />
                        {block.secondaryButtonText}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;