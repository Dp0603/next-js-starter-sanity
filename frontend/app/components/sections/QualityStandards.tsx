import React from "react";
import SectionTitle from "../ui/SectionTitle";
import { ShieldCheck, RefreshCw, ClipboardCheck } from "lucide-react";

interface QualityProps {
    block: any;
}

const QualityStandards: React.FC<QualityProps> = ({ block }) => {
    if (!block) return null;

    // Helper to pick icons
    const getIcon = (type: string) => {
        switch (type) {
            case 'shield': return <ShieldCheck size={48} strokeWidth={1} />;
            case 'refresh': return <RefreshCw size={48} strokeWidth={1} />;
            case 'clipboard': return <ClipboardCheck size={48} strokeWidth={1} />;
            default: return <ShieldCheck size={48} strokeWidth={1} />;
        }
    };

    return (
        <section className="py-24 lg:py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Centered Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4">
                        {block.subtitle}
                    </h4>
                    <h1 className="text-5xl lg:text-7xl font-bold text-[#14253f] mb-8 tracking-tighter uppercase">
                        {block.heading}
                    </h1>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                        {block.description}
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 border-t border-gray-100 pt-16">
                    {block.features?.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 group hover:-translate-y-2 transition-transform duration-500">

                            {/* Icon Circle */}
                            <div className="mb-8 p-6 rounded-full bg-white border border-gray-100 text-[#14253f] group-hover:border-[#cd7d51] group-hover:text-[#cd7d51] transition-colors duration-300">
                                {getIcon(item.icon)}
                            </div>

                            <h3 className="text-xl font-bold text-[#14253f] mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 font-light leading-relaxed text-sm lg:text-base">
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