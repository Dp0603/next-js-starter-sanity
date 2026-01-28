"use client";
import React from "react";
import { ShieldCheck, RefreshCw, ClipboardCheck, Scale, Zap } from "lucide-react";

interface QualityProps {
    block: any;
}

const QualityStandards: React.FC<QualityProps> = ({ block }) => {
    if (!block) return null;

    // Icon Mapping
    const getIcon = (type: string) => {
        switch (type) {
            case 'shield': return <ShieldCheck size={40} strokeWidth={1.5} />;
            case 'refresh': return <RefreshCw size={40} strokeWidth={1.5} />;
            case 'clipboard': return <ClipboardCheck size={40} strokeWidth={1.5} />;
            case 'scale': return <Scale size={40} strokeWidth={1.5} />;
            case 'zap': return <Zap size={40} strokeWidth={1.5} />;
            default: return <ShieldCheck size={40} strokeWidth={1.5} />;
        }
    };

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Centered Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-6 flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                        {block.subtitle}
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                    </h4>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#14253f] mb-8 tracking-tighter uppercase leading-none">
                        {block.heading}
                    </h1>
                    <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                        {block.description}
                    </p>
                </div>

                {/* Dynamic Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {block.features?.map((item: any, index: number) => (
                        <div key={index} className="bg-white p-10 rounded-sm border border-gray-100 shadow-sm group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">

                            {/* Top Decor Line */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-[#cd7d51] group-hover:w-full transition-all duration-700"></div>

                            {/* Icon */}
                            <div className="mb-8 text-[#14253f] group-hover:text-[#cd7d51] transition-colors duration-300">
                                {getIcon(item.icon)}
                            </div>

                            <h3 className="text-xl font-bold text-[#14253f] mb-4 uppercase tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 font-light leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default QualityStandards;