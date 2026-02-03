"use client";
import React from "react";
import Image from "next/image";

interface Props {
    block: {
        heading: string;
        logos: { name?: string; asset: { url: string } }[];
    };
}

const ClientLogoSection: React.FC<Props> = ({ block }) => {
    if (!block || !block.logos) return null;

    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                <h3 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-12">
                    {block.heading}
                </h3>

                {/* Logo Grid - Auto-responsive */}
                <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {block.logos.map((logo, idx) => (
                        <div key={idx} className="relative w-32 h-16 lg:w-40 lg:h-20 hover:scale-110 transition-transform">
                            <Image
                                src={logo.asset.url}
                                alt={logo.name || "Client Logo"}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 33vw, 15vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientLogoSection;