import React from "react";
import SectionTitle from "../ui/SectionTitle";
import FeatureList from "../ui/FeatureList";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";

interface PhilosophyProps {
    block: any;
};

const PhilosophySection: React.FC<PhilosophyProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-32 bg-neutral-50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    {/* Image side */}
                    <div className="lg:col-span-7 relative">
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl" />
                        {block.image && (
                            <img
                                src={urlForImage(block.image).url()}
                                alt={block.image.alt || "Philosophy Image"}
                                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 ease-out shadow-2xl shadow-navy-900/10 relative z-10"
                            />
                        )}
                        <div className="hidden lg:block absolute -bottom-10 -right-10 bg-navy-900 p-8 z-20 max-w-xs text-white">
                            <p className="font-serif text-2xl italic leading-tight">
                                "Quality is the only business plan that survives."
                            </p>
                        </div>
                    </div>

                    {/* Content side */}
                    <div className="lg:col-span-5">
                        <SectionTitle
                            title={block.heading}
                            subtitle={block.subheading}
                        />

                        <p className="text-navy-900/80 mb-8 text-lg font-light leading-relaxed">
                            {block.description}
                        </p>

                        {/* Pass the array from Sanity to your FeatureList component */}
                        {block.features && <FeatureList items={block.features} />}

                        <Link
                            href={block.ctaLink || "/about"}
                            className="inline-block mt-12 border-b border-navy-900 pb-1 text-sm font-bold uppercase tracking-widest hover:text-accent-500 hover:border-accent-500 transition-colors"
                        >
                            {block.ctaText}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;