"use client";
import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface GalleryProps {
    block: any;
}

const GallerySection: React.FC<GalleryProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 bg-[#fafafa]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                        {block.subtitle}
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                    </h4>
                    <h2 className="text-4xl lg:text-6xl font-black text-[#14253f] tracking-tighter uppercase">
                        {block.heading}
                    </h2>
                </div>

                {/* --- GALLERY GRID --- */}
                <div className="grid md:grid-cols-2 gap-8">
                    {block.items?.map((item: any, index: number) => (
                        <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer bg-[#0f1b2d] shadow-md hover:shadow-2xl transition-shadow duration-500">

                            {/* 1. Image: Zoom Effect (Optimized) */}
                            {item.image && (
                                <Image
                                    src={urlForImage(item.image).url()}
                                    alt={item.title || "Gallery Image"}
                                    fill // 👈 Fills the aspect-ratio container
                                    sizes="(max-width: 768px) 100vw, 50vw" // 👈 Critical for mobile speed
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-100 group-hover:opacity-40"
                                />
                            )}

                            {/* 2. Gradient Overlay (Navy) */}
                            <div className="absolute inset-0 bg-[#14253f]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* 3. Content on Hover */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end items-start z-10">

                                {/* Title */}
                                <h3 className="text-2xl lg:text-4xl font-bold uppercase tracking-tight text-white mb-4 translate-y-8 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                {item.description && (
                                    <p className="text-base text-gray-300 font-light mb-6 max-w-sm translate-y-8 opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100 leading-relaxed">
                                        {item.description}
                                    </p>
                                )}

                                {/* Link Indicator */}
                                {item.link && (
                                    <div className="translate-y-8 opacity-0 transition-all duration-500 delay-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <span className="text-[#cd7d51] text-xs font-bold uppercase tracking-widest border-b-2 border-[#cd7d51] pb-1">
                                            View Details
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Full Card Link */}
                            {item.link && (
                                <Link href={item.link} className="absolute inset-0 z-20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;