import React from "react";

interface LocationProps {
    block: any;
}

const LocationSection: React.FC<LocationProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="relative bg-[#0f1b2d] border-t border-white/5 overflow-hidden">

            {/* 👇 NEW: CSS Grid Pattern to match the 'Blueprint' look */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="max-w-[1400px] mx-auto">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {block.locations?.map((loc: any, index: number) => (
                        <div
                            key={index}
                            // 👇 FIXED: Massive padding increase (py-24 px-12) to create that "Airy" premium feel
                            className="relative p-12 lg:py-32 lg:px-20 group"
                        >
                            {/* Hover Effect: Subtle blue glow */}
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

                            <div className="relative z-10 flex flex-col h-full justify-center">
                                <h4 className="text-[#cd7d51] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
                                    {loc.label}
                                </h4>

                                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tighter uppercase leading-none">
                                    {loc.city}
                                </h2>

                                <p className="text-gray-400 leading-relaxed mb-12 font-light text-lg max-w-md">
                                    {loc.description}
                                </p>

                                <ul className="space-y-4 mt-auto">
                                    {loc.features?.map((feature: string, idx: number) => (
                                        <li key={idx} className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                            {/* Square dot for a more technical look */}
                                            <span className="w-1.5 h-1.5 bg-[#cd7d51]" />
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