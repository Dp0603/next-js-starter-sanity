"use client";
import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

interface PhilosophyProps {
    block: any;
}

const PhilosophySection: React.FC<PhilosophyProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa] border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* --- CONTENT SIDE (Left) --- */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                            {block.subheading}
                        </h4>

                        <h2 className="text-4xl lg:text-6xl font-black text-[#14253f] mb-8 tracking-tighter uppercase leading-[0.9]">
                            {block.heading}
                        </h2>

                        <p className="text-lg text-gray-500 font-light leading-relaxed mb-10 border-l-2 border-[#cd7d51] pl-6">
                            {block.description}
                        </p>

                        {/* Feature List (Matches the style of Quality/Capabilities) */}
                        <ul className="space-y-4 mb-10">
                            {block.features?.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-3 text-[#14253f] font-bold uppercase tracking-widest text-xs">
                                    <div className="w-6 h-6 rounded-full bg-[#14253f] flex items-center justify-center text-white shrink-0 shadow-md">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {block.ctaLink && (
                            <Link
                                href={block.ctaLink}
                                className="group inline-flex items-center gap-2 border-b-2 border-[#cd7d51] pb-1 text-[#cd7d51] font-bold uppercase tracking-widest text-xs hover:text-[#14253f] hover:border-[#14253f] transition-all"
                            >
                                {block.ctaText || "Learn More"}
                            </Link>
                        )}
                    </div>

                    {/* --- IMAGE SIDE (Right) --- */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 relative group">

                        {/* Decorative Border Box (The Premium Touch) */}
                        <div className="absolute inset-0 border-2 border-[#14253f]/10 z-0 hidden lg:block transition-transform duration-500 group-hover:scale-105 -right-6 top-6" />

                        <div className="relative z-10 aspect-[4/3] bg-gray-200 overflow-hidden shadow-2xl rounded-sm">
                            {block.image && (
                                <img
                                    src={urlForImage(block.image).url()}
                                    alt={block.heading}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            )}
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#14253f]/20 to-transparent" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;