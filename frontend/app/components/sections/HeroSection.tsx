import React from "react";
import { ArrowRight } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
import Button from "../ui/Button";

interface HeroProps {
    block: any;
}

const HeroSection: React.FC<HeroProps> = ({ block }) => {
    if (!block) return null;

    const headingParts = block.heading?.split(" ") || [];
    const firstPart = headingParts.slice(0, headingParts.length > 1 ? -1 : 1).join(" ");
    const lastPart = headingParts.length > 1 ? headingParts[headingParts.length - 1] : "";

    return (
        <section className="relative min-h-[90vh] flex items-end pb-16 md:pb-24 lg:pb-32 bg-[#14253f] overflow-hidden">
            <div className="absolute inset-0 z-0">
                {block.backgroundImage && (
                    <img
                        src={urlForImage(block.backgroundImage).url()}
                        alt={block.backgroundImage.alt || "Background"}
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14253f] via-[#14253f]/40 to-transparent" />
                <div className="absolute inset-0 bg-[#14253f]/30" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="max-w-5xl">
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold uppercase tracking-tighter leading-[0.85] md:leading-[0.75]">
                            <span className="block text-white">{firstPart}</span>
                            <span className="block text-[#cd7d51]">{lastPart}.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end mt-8 md:mt-16">
                        <div className="max-w-xl">
                            <p className="text-lg md:text-2xl text-neutral-300 leading-relaxed font-light border-l-2 border-[#cd7d51] pl-6 md:pl-8 py-2">
                                {block.subheading}
                            </p>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-auto">
                            <Button to={block.buttonLink || "/contact"} variant="outlineWhite">
                                {block.buttonText || "Begin Partnership"}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;