import React from "react";
import { urlForImage } from "@/sanity/lib/utils";

interface AboutHeroProps {
    block: any;
}

const AboutHero: React.FC<AboutHeroProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* Left: Image with offset border */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative z-10">
                            {block.image && (
                                <img
                                    src={urlForImage(block.image).url()}
                                    alt="About Akaame"
                                    className="w-full h-auto shadow-2xl"
                                />
                            )}
                        </div>
                        {/* Decorative border box behind image */}
                        <div className="absolute top-8 left-8 w-full h-full border-2 border-neutral-200 -z-0 hidden lg:block" />
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2">
                        <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4">
                            {block.subtitle}
                        </h4>
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#14253f] mb-8 tracking-tighter uppercase leading-none">
                            {block.heading}
                        </h1>

                        <div className="prose prose-lg text-gray-500 mb-12 font-light leading-relaxed">
                            <p>{block.description}</p>
                        </div>

                        {/* Quote Box */}
                        <div className="bg-neutral-50 p-8 border-l-4 border-[#14253f]">
                            <h3 className="text-2xl font-bold text-[#14253f] mb-4">
                                "{block.quote}"
                            </h3>
                            <p className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs">
                                — {block.quoteAuthor}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;