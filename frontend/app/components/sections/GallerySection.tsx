import React from "react";
import SectionTitle from "../ui/SectionTitle";
import { urlForImage } from "@/sanity/lib/utils";
import Link from "next/link";

interface GalleryProps {
    block: any;
}

const GallerySection: React.FC<GalleryProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <SectionTitle
                        title={block.heading}
                        subtitle={block.subtitle}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {block.items?.map((item: any, index: number) => (
                        <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer bg-[#0f1b2d]">

                            {/* 1. Image: Zooms out slightly and fades on hover */}
                            {item.image && (
                                <img
                                    src={urlForImage(item.image).url()}
                                    alt={item.title || "Gallery Image"}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-100 group-hover:opacity-50"
                                />
                            )}

                            {/* 2. The Dark Blue Gradient Overlay */}
                            <div className="absolute inset-0 bg-[#0f1b2d]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* 3. The Content: Left Aligned, Bottom positioned */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-end items-start">

                                {/* Title: Slides up first */}
                                <h3 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4 translate-y-8 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                                    {item.title}
                                </h3>

                                {/* Description: Slides up second */}
                                {item.description && (
                                    <p className="text-lg text-gray-300 font-light mb-8 max-w-md translate-y-8 opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100">
                                        {item.description}
                                    </p>
                                )}

                                {/* Link: Slides up last with Underline */}
                                {item.link && (
                                    <div className="translate-y-8 opacity-0 transition-all duration-500 delay-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <span className="text-[#cd7d51] text-sm font-bold uppercase tracking-widest border-b-2 border-[#cd7d51] pb-1">
                                            View Details
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Clickable Area */}
                            {item.link && (
                                <Link href={item.link} className="absolute inset-0 z-20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;