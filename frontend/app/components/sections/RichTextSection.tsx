"use client";
import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import { Plus, Minus, Download } from "lucide-react";

interface RichTextSectionProps {
    block: {
        title?: string;
        lastUpdated?: string;
        introduction?: string;
        legalSections?: Array<{
            heading: string;
            content: any[];
            _key: string;
        }>;
        content?: any[]; // Legacy support
    };
}

const RichTextSection: React.FC<RichTextSectionProps> = ({ block }) => {
    // State to track which section is open (optional: allow multiple open)
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (key: string) => {
        setOpenSection(openSection === key ? null : key);
    };

    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa] relative">

            {/* Background Pattern for Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    {block.lastUpdated && (
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                            <p className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs">
                                Last Updated: {block.lastUpdated}
                            </p>
                            <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                        </div>
                    )}

                    {block.title && (
                        <h1 className="text-5xl md:text-7xl font-black text-[#14253f] uppercase tracking-tighter mb-8 leading-[0.9]">
                            {block.title}
                        </h1>
                    )}

                    {block.introduction && (
                        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            {block.introduction}
                        </p>
                    )}
                </div>

                {/* --- INTERACTIVE LEGAL GRID --- */}
                {block.legalSections ? (
                    <div className="space-y-4">
                        {block.legalSections.map((section, index) => {
                            const isOpen = openSection === section._key;

                            return (
                                <div
                                    key={section._key}
                                    className={`group bg-white rounded-sm border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#cd7d51] shadow-lg' : 'border-gray-200 hover:border-[#cd7d51]/50'}`}
                                >
                                    {/* The Clickable Header */}
                                    <button
                                        onClick={() => toggleSection(section._key)}
                                        className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="text-[#cd7d51]/30 text-3xl font-black font-sans w-12 text-right hidden sm:block">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h2 className={`text-xl md:text-2xl font-bold uppercase tracking-tight transition-colors ${isOpen ? 'text-[#14253f]' : 'text-[#14253f]/80 group-hover:text-[#14253f]'}`}>
                                                {section.heading}
                                            </h2>
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#cd7d51] text-white rotate-180' : 'bg-gray-50 text-[#14253f] group-hover:bg-[#14253f] group-hover:text-white'}`}>
                                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                        </div>
                                    </button>

                                    {/* The Content (Animated Height) */}
                                    <div
                                        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="p-6 lg:p-8 pt-0 lg:pt-0 pl-6 sm:pl-28 prose prose-lg max-w-none text-gray-500 font-light leading-relaxed">
                                            <PortableText value={section.content} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Fallback for Legacy Content (Single Block)
                    <div className="bg-white p-8 md:p-16 border border-gray-100 shadow-sm rounded-sm">
                        <div className="prose prose-lg max-w-none text-gray-500 font-light">
                            <PortableText value={block.content || []} />
                        </div>
                    </div>
                )}

                {/* --- DOWNLOAD BUTTON --- */}
                <div className="mt-16 text-center">
                    <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14253f] hover:text-[#cd7d51] transition-colors border-b border-[#14253f]/20 pb-1 hover:border-[#cd7d51]">
                        <Download size={16} />
                        Download PDF Version
                    </button>
                </div>

            </div>
        </section>
    );
};

export default RichTextSection;