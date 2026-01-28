"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";

interface HeroProps {
    block: any;
}

const HeroSection: React.FC<HeroProps> = ({ block }) => {
    if (!block) return null;

    // Split heading logic
    const headingParts = block.heading?.split(" ") || [];
    const firstPart = headingParts.slice(0, Math.ceil(headingParts.length / 2)).join(" ");
    const lastPart = headingParts.slice(Math.ceil(headingParts.length / 2)).join(" ");

    return (
        <section className="relative min-h-[90vh] flex items-end pb-16 md:pb-24 lg:pb-32 bg-[#14253f] overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {block.backgroundImage && (
                    <img
                        src={urlForImage(block.backgroundImage).url()}
                        alt="Background"
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14253f] via-[#14253f]/40 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="max-w-6xl">

                    {/* Main Heading */}
                    <div className="mb-8">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold uppercase tracking-tighter leading-[0.9]">
                            <span className="block text-white">{firstPart}</span>
                            <span className="block text-[#cd7d51]">{lastPart}.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end mt-8">
                        {/* Description with Orange Line */}
                        <div className="max-w-xl">
                            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light border-l-4 border-[#cd7d51] pl-6 py-1">
                                {block.subheading}
                            </p>
                        </div>

                        {/* Button */}
                        <div className="mt-4 md:mt-0 md:ml-auto">
                            <Link
                                href={block.buttonLink || "/contact"}
                                className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#14253f] transition-all duration-300"
                            >
                                {block.buttonText || "Begin Partnership"}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;