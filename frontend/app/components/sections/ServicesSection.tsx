import React from "react";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import IconMapper from "../ui/IconMapper";

interface ServicesProps {
    block: any;
}

const ServicesSection: React.FC<ServicesProps> = ({ block }) => {
    if (!block) return null;

    return (
        // 👇 FIX: Use hex code [#14253f] for background
        <section className="py-32 bg-[#14253f] text-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left */}
                    <div className="lg:w-1/3">
                        <SectionTitle
                            title={block.heading}
                            subtitle={block.subheading}
                            light // Ensures title is white
                        />

                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            {block.description}
                        </p>

                        <Button to="/capabilities" variant="light">
                            View Capabilities
                        </Button>
                    </div>

                    {/* Right - Grid of Services */}
                    <div className="lg:w-2/3 grid sm:grid-cols-2 gap-12">
                        {block.serviceItems?.map((service: any) => (
                            <div
                                key={service._key}
                                // 👇 FIX: Use hex code [#cd7d51] for hover border
                                className="border-t border-white/20 pt-8 group hover:border-[#cd7d51] transition-colors duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <IconMapper
                                        name={service.icon}
                                        size={24}
                                        // 👇 FIX: Use hex code [#cd7d51] for icon color
                                        className="text-[#cd7d51] shrink-0"
                                    />
                                    <div>
                                        <h4 className="font-bold text-white mb-1 tracking-tight">
                                            {service.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {service.description}
                                        </p>
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

export default ServicesSection;