import React from "react";
import SectionTitle from "../ui/SectionTitle";

interface WorkflowProps {
    block: any;
}

const WorkflowSection: React.FC<WorkflowProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <SectionTitle title={block.heading} subtitle={block.subtitle} />
                    <p className="mt-8 text-xl text-gray-500 font-light leading-relaxed">
                        {block.description}
                    </p>
                </div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                    {/* Decorative Line (Hidden on mobile) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-neutral-200 -z-10" />

                    {block.steps?.map((step: any, index: number) => (
                        <div key={index} className="relative bg-white pt-4 md:pt-0">
                            {/* Big Number */}
                            <div className="text-6xl font-black text-neutral-7  00 mb-4 select-none">
                                {step.number}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#14253f] mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;