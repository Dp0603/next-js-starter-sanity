"use client";
import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import { MapPin } from "lucide-react";

interface LocationProps {
    block: any;
}

const LocationSection: React.FC<LocationProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa] border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- PREMIUM GRID --- */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {block.locations?.map((loc: any, index: number) => (
                        <div key={index} className="group bg-white rounded-sm border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col">

                            {/* Orange Top Line (Reveals on Hover) */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-[#cd7d51] group-hover:w-full transition-all duration-700 z-20"></div>

                            {/* Optional Image */}
                            {loc.image && (
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={urlForImage(loc.image).url()}
                                        alt={loc.city}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-[#14253f]/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            )}

                            {/* Content Container */}
                            <div className="p-10 lg:p-12 flex flex-col h-full">

                                {/* Label Badge */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[#fafafa] rounded-full text-[#cd7d51] border border-gray-100 group-hover:bg-[#cd7d51] group-hover:text-white transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs">
                                        {loc.label}
                                    </h4>
                                </div>

                                {/* City Name */}
                                <h2 className="text-3xl lg:text-4xl font-black text-[#14253f] mb-6 tracking-tighter uppercase leading-none">
                                    {loc.city}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-500 leading-relaxed font-light mb-8 text-sm lg:text-base border-l-2 border-[#cd7d51] pl-4">
                                    {loc.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-3 mt-auto pt-8 border-t border-gray-50">
                                    {loc.features?.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-center gap-3 text-[#14253f] text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                                            <span className="w-1.5 h-1.5 bg-[#cd7d51] rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LocationSection;