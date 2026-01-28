"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

interface WorkflowProps {
    block: any;
}

const WorkflowSection: React.FC<WorkflowProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">

            {/* 1. Rich Background Texture (Subtle Industrial Grid) */}
            {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" /> */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-6 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                        {block.subtitle}
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                    </h4>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#14253f] mb-8 tracking-tighter uppercase leading-[0.9]">
                        {block.heading}
                    </h1>
                    <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                        {block.description}
                    </p>
                </div>

                {/* --- PREMIUM TIMELINE --- */}
                <div className="relative">

                    {/* The Main Connecting Track (Desktop) */}
                    <div className="hidden lg:block absolute top-[80px] left-0 w-full h-[1px] bg-gray-200 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
                        {block.steps?.map((step: any, index: number) => (
                            <div key={index} className="group relative pt-12 lg:pt-0">

                                {/* THE CARD */}
                                <div className="h-full bg-white p-8 lg:p-10 border border-gray-100 relative overflow-hidden transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_rgba(20,37,63,0.1)] rounded-sm">

                                    {/* Hover Gradient Border (Top) */}
                                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#14253f] to-[#cd7d51] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                    {/* 2. "Watermark" Number (The Depth Element) */}
                                    <span className="absolute -right-4 -bottom-8 text-[8rem] font-black text-[#f3f4f6] group-hover:text-[#fff5f0] transition-colors duration-500 select-none z-0 leading-none">
                                        {step.number}
                                    </span>

                                    {/* 3. The "Node" on the Timeline (The Connector) */}
                                    {/* <div className="hidden lg:flex absolute -top-[20px] left-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center z-20 group-hover:border-[#cd7d51] group-hover:scale-110 transition-all duration-300 shadow-sm">
                                        <div className="w-3 h-3 bg-gray-300 rounded-full group-hover:bg-[#cd7d51] transition-colors duration-300" />
                                    </div> */}

                                    {/* Mobile Number Badge */}
                                    <div className="lg:hidden absolute top-6 right-6 w-10 h-10 bg-[#fafafa] rounded-full flex items-center justify-center border border-gray-100 text-[#14253f] font-bold text-sm">
                                        {step.number}
                                    </div>

                                    {/* Content Layer */}
                                    <div className="relative z-10 mt-4 lg:mt-12 text-center lg:text-left">
                                        <h3 className="text-lg font-bold text-[#14253f] mb-4 uppercase tracking-tight group-hover:text-[#cd7d51] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <div className="w-8 h-[2px] bg-gray-100 mb-4 mx-auto lg:mx-0 group-hover:bg-[#cd7d51]/30 transition-colors" />
                                        <p className="text-sm text-gray-500 leading-relaxed font-light">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* "Next" Indicator Arrow */}
                                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0 text-[#cd7d51]">
                                        <ArrowRight size={18} />
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WorkflowSection;