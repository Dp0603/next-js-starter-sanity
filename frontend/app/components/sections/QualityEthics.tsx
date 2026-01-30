"use client";
import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image"; // 👈 IMPORT THIS

interface EthicsProps {
    block: any;
}

const QualityEthics: React.FC<EthicsProps> = ({ block }) => {
    if (!block) return null;

    const isRight = block.layout === 'right';

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa] relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gray-200/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isRight ? 'lg:flex-row-reverse' : ''}`}>

                    {/* IMAGE SIDE */}
                    <div className="w-full lg:w-1/2 relative min-h-[400px] lg:h-[600px] rounded-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] group">
                        {block.image && (
                            <Image
                                src={urlForImage(block.image).url()}
                                alt={block.heading}
                                fill // 👈 Fills the container
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw" // 👈 Speed Fix
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14253f]/40 to-transparent" />
                    </div>

                    {/* CONTENT SIDE */}
                    <div className="w-full lg:w-1/2">

                        {/* Subtitle */}
                        <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                            {block.subtitle}
                        </h4>

                        <h2 className="text-5xl lg:text-7xl font-black text-[#14253f] mb-8 tracking-tighter uppercase leading-[0.9]">
                            {block.heading}
                        </h2>

                        <p className="text-lg lg:text-xl text-gray-500 font-light leading-relaxed border-l-2 border-[#cd7d51] pl-6 mb-12">
                            {block.description}
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            {block.checklist?.map((item: string, index: number) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="mt-1 shrink-0 p-2 rounded-full bg-[#14253f] border border-gray-100 text-[#cd7d51] group-hover:bg-[#cd7d51] group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <Check size={16} strokeWidth={3} />
                                    </div>
                                    <p className="text-[#14253f] font-medium text-lg group-hover:translate-x-1 transition-transform duration-300">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default QualityEthics;