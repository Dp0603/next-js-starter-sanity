"use client";
import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface BrandProps {
    block: any;
}

const BrandShowcase: React.FC<BrandProps> = ({ block }) => {
    if (!block || !block.brands) return null; // Safety check for the block itself

    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- HEADER --- */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-4 lg:mb-6 flex items-center justify-center gap-3">
                        <span className="w-4 lg:w-8 h-[1px] bg-[#cd7d51]"></span>
                        {block.subtitle}
                        <span className="w-4 lg:w-8 h-[1px] bg-[#cd7d51]"></span>
                    </h4>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#14253f] mb-6 lg:mb-8 tracking-tighter uppercase leading-[0.9]">
                        {block.heading}
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto px-2">
                        {block.description}
                    </p>
                </div>

                {/* --- BRAND LIST --- */}
                <div className="space-y-32">
                    {block.brands.map((brand: any, index: number) => {
                        // 👇 FIX: SAFETY CHECK
                        // If 'brand' is null (broken reference), skip it immediately.
                        if (!brand) return null;

                        const isEven = index % 2 === 0;

                        return (
                            <div key={brand._id || index} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                                {/* IMAGE SIDE */}
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className={`absolute inset-0 border-2 border-[#14253f]/10 z-0 hidden lg:block transition-transform duration-500 group-hover:scale-105 ${isEven ? "-left-6 top-6" : "-right-6 top-6"}`} />

                                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm relative z-10 shadow-lg">
                                        {brand.image && (
                                            <img
                                                src={urlForImage(brand.image).url()}
                                                alt={brand.name || "Brand Image"}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#14253f]/40 to-transparent" />
                                    </div>

                                    {/* Floating Logo Badge */}
                                    {brand.logo && (
                                        <div className={`absolute -bottom-8 ${isEven ? 'right-8' : 'left-8'} z-20 w-24 h-24 bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center rounded-sm border border-gray-100`}>
                                            <img
                                                src={urlForImage(brand.logo).url()}
                                                alt={`${brand.name} Logo`}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* CONTENT SIDE */}
                                <div className="w-full lg:w-1/2">
                                    <h3
                                        className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter uppercase"
                                        style={{ color: brand.color || '#14253f' }}
                                    >
                                        {brand.name}
                                    </h3>

                                    <div className="w-12 h-1 bg-[#cd7d51] mb-8" />

                                    <p className="text-lg text-gray-500 font-light leading-relaxed mb-10 whitespace-pre-line max-w-lg">
                                        {brand.description}
                                    </p>

                                    {brand.website && (
                                        <Link
                                            href={brand.website}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14253f] hover:text-[#cd7d51] transition-colors group border-b border-[#14253f]/20 pb-1 hover:border-[#cd7d51]"
                                        >
                                            Visit Official Site
                                            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BrandShowcase;