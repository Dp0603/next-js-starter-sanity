"use client";
import React from "react";
import { PenTool, Settings, ShieldCheck, Factory, Truck, Package } from "lucide-react";

interface InfraProps {
  block: any;
}

const InfrastructureSection: React.FC<InfraProps> = ({ block }) => {
  if (!block) return null;

  // Icon Helper
  const getIcon = (type: string) => {
    switch (type) {
        case 'design': return <PenTool className="text-white" size={24} />;
        case 'precision': return <Settings className="text-white" size={24} />;
        case 'testing': return <ShieldCheck className="text-white" size={24} />;
        case 'factory': return <Factory className="text-white" size={24} />;
        case 'logistics': return <Truck className="text-white" size={24} />;
        case 'package': return <Package className="text-white" size={24} />;
        default: return <Settings className="text-white" size={24} />;
    }
  };

  return (
    // FIX 1: Match background color (#fafafa) with Contact/Product pages
    <section className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* --- HEADER (Matches Contact Page Style) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-8">
            <div className="max-w-2xl">
                <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                    {block.subtitle}
                </h4>
                <h2 className="text-4xl lg:text-6xl font-black text-[#14253f] tracking-tighter uppercase leading-[0.9]">
                    {block.heading}
                </h2>
            </div>
            <div className="max-w-md">
                <p className="text-lg text-gray-500 leading-relaxed font-light text-left lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-[#cd7d51] pl-6 lg:pl-0 lg:pr-6">
                    {block.description}
                </p>
            </div>
        </div>

        {/* --- CARDS GRID (Matches Capabilities Style) --- */}
        <div className="grid md:grid-cols-3 gap-8">
            {block.cards?.map((card: any, index: number) => (
                <div key={index} className="group bg-white p-10 rounded-sm border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
                    
                    {/* FIX 2: Orange Top Line (Reveals on Hover) */}
                    <div className="absolute top-0 left-0 w-0 h-1 bg-[#cd7d51] group-hover:w-full transition-all duration-700"></div>

                    {/* Icon Box */}
                    <div className="w-16 h-16 bg-[#14253f] flex items-center justify-center mb-8 rounded-sm group-hover:bg-[#cd7d51] transition-colors duration-300 shadow-lg relative z-10">
                        {getIcon(card.icon)}
                    </div>

                    <h3 className="text-2xl font-bold text-[#14253f] mb-4 uppercase tracking-tight relative z-10">
                        {card.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed font-light text-sm relative z-10">
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;