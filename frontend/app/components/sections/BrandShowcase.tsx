"use client";

import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionTitle from "../ui/SectionTitle";

interface BrandProps {
    block: any;
}

const BrandShowcase: React.FC<BrandProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <SectionTitle
                        title={block.heading}
                        subtitle={block.subtitle}
                    />
                    <p className="text-xl text-gray-500 font-light leading-relaxed mt-8">
                        {block.description}
                    </p>
                </div>

                {/* Brand List */}
                <div className="space-y-32">
                    {block.brands?.map((brand: any, index: number) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                                {/* Image Side */}
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm relative">
                                        {brand.image && (
                                            <img
                                                src={urlForImage(brand.image).url()}
                                                alt={brand.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                        {/* Brand Overlay */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                    </div>

                                    {/* Floating Logo Badge */}
                                    {brand.logo && (
                                        <div className="absolute -bottom-8 right-8 w-24 h-24 bg-white p-4 shadow-xl flex items-center justify-center rounded-sm border border-gray-100">
                                            <img
                                                src={urlForImage(brand.logo).url()}
                                                alt={`${brand.name} Logo`}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2">
                                    <h3
                                        className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter uppercase"
                                        style={{ color: brand.color || '#14253f' }} // Dynamic brand color
                                    >
                                        {brand.name}
                                    </h3>

                                    <div className="w-12 h-1 bg-[#cd7d51] mb-8" />

                                    <p className="text-lg text-gray-500 font-light leading-relaxed mb-10 whitespace-pre-line">
                                        {brand.description}
                                    </p>

                                    {brand.website && (
                                        <Link
                                            href={brand.website}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14253f] hover:text-[#cd7d51] transition-colors group"
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