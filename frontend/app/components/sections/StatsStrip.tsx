import React from "react";
import IconMapper from "../ui/IconMapper";

// Define the interface based on the schema we just made
interface StatsProps {
    block: {
        items?: Array<{
            value: string;
            label: string;
            icon: string;
            _key: string;
        }>;
    };
}

const StatsStrip: React.FC<StatsProps> = ({ block }) => {
    // Guard clause: if no items, don't render anything
    if (!block?.items) return null;

    return (
        // 👇 FIX: Use hex code [#14253f] instead of bg-navy-900
        <section className="bg-[#14253f] border-t border-white/10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                    {block.items.map((stat) => (
                        <div
                            key={stat._key}
                            className="py-12 px-6 flex flex-col justify-between h-40 group hover:bg-white/5 transition-colors"
                        >
                            {/* Use IconMapper instead of direct component */}
                            <IconMapper
                                name={stat.icon}
                                // 👇 FIX: Use hex code [#cd7d51] for the accent color
                                className="text-[#cd7d51] mb-auto opacity-50 group-hover:opacity-100 transition-opacity"
                                size={24}
                            />
                            <div>
                                <div className="text-4xl font-bold text-white tracking-tighter mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-400">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;