"use client";
import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";
import { ArrowRight, Clock, Package } from "lucide-react";
import Image from "next/image"; // 👈 IMPORT THIS

interface ProductShowcaseProps {
    block: any;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- TOP HEADER (CENTERED) --- */}
                <div className="text-center max-w-4xl mx-auto mb-24">

                    {/* Symmetrical Subtitle */}
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-6 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                        {block.subtitle}
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                    </h4>

                    {/* Centered Heading */}
                    <h1 className="text-4xl lg:text-7xl font-black text-[#14253f] mb-8 tracking-tighter uppercase leading-[0.9]">
                        {block.heading}
                    </h1>

                    {/* Centered Description */}
                    <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                        {block.description}
                    </p>
                </div>

                {/* PRODUCTS LIST */}
                <div className="space-y-32 lg:space-y-48">
                    {block.products?.map((item: any, index: number) => {
                        // Logic: Even numbers = Image Left. Odd = Image Right.
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={`flex flex-col gap-16 lg:gap-24 items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

                                {/* IMAGE SIDE */}
                                <div className="w-full lg:w-1/2 relative group">
                                    {/* Decorative Border Box */}
                                    <div className={`absolute inset-0 border-2 border-[#14253f]/10 z-0 hidden lg:block transition-transform duration-500 group-hover:scale-105 ${isEven ? "-left-6 top-6" : "-right-6 top-6"}`} />

                                    {/* The Image */}
                                    <div className="relative z-10 aspect-[4/3] bg-gray-200 overflow-hidden shadow-lg">
                                        {item.image && (
                                            <Image
                                                src={urlForImage(item.image).url()}
                                                alt={item.title}
                                                fill // 👈 Fills container
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 50vw" // 👈 Critical for mobile speed
                                            />
                                        )}
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#14253f]/20 to-transparent" />
                                    </div>
                                </div>

                                {/* TEXT SIDE */}
                                <div className="w-full lg:w-1/2 relative">

                                    {/* Giant Watermark Number */}
                                    <span className="absolute -top-24 -left-10 text-[10rem] lg:text-[14rem] font-black text-gray-200/50 select-none -z-10 leading-none pointer-events-none">
                                        {item.number}
                                    </span>

                                    <div className="relative z-10">
                                        <h2 className="text-4xl lg:text-6xl font-bold text-[#14253f] mb-6 tracking-tighter uppercase">
                                            {item.title}
                                        </h2>
                                        <p className="text-lg text-gray-500 leading-relaxed mb-8 font-light max-w-lg">
                                            {item.description}
                                        </p>

                                        {/* Data Grid (MOQ & Lead Time) */}
                                        {(item.moq || item.leadTime) && (
                                            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                                                {item.moq && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white rounded-full shadow-sm text-[#cd7d51] border border-gray-100">
                                                            <Package size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">MOQ</p>
                                                            <p className="text-[#14253f] font-medium text-sm">{item.moq}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {item.leadTime && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white rounded-full shadow-sm text-[#cd7d51] border border-gray-100">
                                                            <Clock size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Timeline</p>
                                                            <p className="text-[#14253f] font-medium text-sm">{item.leadTime}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Features List */}
                                        <ul className="space-y-3 mb-10">
                                            {item.features?.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#14253f]">
                                                    <span className="w-6 h-[2px] bg-[#cd7d51]" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={item.buttonLink || "/contact"}
                                            className="group inline-flex items-center gap-3 bg-[#14253f] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#cd7d51] transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            {item.buttonText || "Inquire Now"}
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;