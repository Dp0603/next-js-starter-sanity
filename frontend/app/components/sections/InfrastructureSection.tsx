import React from "react";
import { PenTool, Settings, ShieldCheck } from "lucide-react";

interface InfraProps {
    block: any;
}

const InfrastructureSection: React.FC<InfraProps> = ({ block }) => {
    if (!block) return null;

    // Icon Mapping Helper
    const getIcon = (type: string) => {
        switch (type) {
            case 'design': return <PenTool className="text-white" size={24} />;
            case 'precision': return <Settings className="text-white" size={24} />;
            case 'testing': return <ShieldCheck className="text-white" size={24} />;
            default: return <Settings className="text-white" size={24} />;
        }
    };

    return (
        <section className="py-24 bg-neutral-50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Split Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div>
                        <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4">
                            {block.subtitle}
                        </h4>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#14253f] tracking-tighter uppercase">
                            {block.heading}
                        </h2>
                    </div>
                    <div className="max-w-xl">
                        <p className="text-gray-500 leading-relaxed max-w-md ml-auto text-right">
                            {block.description}
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {block.cards?.map((card: any, index: number) => (
                        <div key={index} className="bg-white p-10 shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow duration-300">
                            {/* Icon Box */}
                            <div className="w-14 h-14 bg-[#14253f] flex items-center justify-center mb-8 rounded-sm">
                                {getIcon(card.icon)}
                            </div>

                            <h3 className="text-2xl font-bold text-[#14253f] mb-4">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-light">
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