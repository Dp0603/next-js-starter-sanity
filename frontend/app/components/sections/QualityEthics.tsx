import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import { Check } from "lucide-react";

interface EthicsProps {
    block: any;
}

const QualityEthics: React.FC<EthicsProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="flex flex-col lg:flex-row bg-[#14253f]">

            {/* Left: Image */}
            <div className="w-full lg:w-1/2 relative min-h-[500px]">
                {block.image && (
                    <img
                        src={urlForImage(block.image).url()}
                        alt="Quality Ethics"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                )}
                {/* Dark overlay to blend with the blue section */}
                <div className="absolute inset-0 bg-[#14253f]/20" />
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
                <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4">
                    {block.subtitle}
                </h4>
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tighter uppercase leading-none">
                    {block.heading}
                </h2>
                <p className="text-gray-300 font-light leading-relaxed mb-12 text-lg max-w-md">
                    {block.description}
                </p>

                <ul className="space-y-4">
                    {block.checklist?.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-4 text-white/90 font-light">
                            <span className="mt-1 text-[#cd7d51]">
                                <Check size={18} strokeWidth={3} />
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default QualityEthics;