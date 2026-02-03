"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image"; // 👈 IMPORT THIS

interface ProductLookbookProps {
    block: any;
}

const ProductLookbook: React.FC<ProductLookbookProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8 gap-6">
                    <div>
                        <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-4 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                            Our Expertise
                        </h4>
                        <h2 className="text-4xl lg:text-6xl font-black text-[#14253f] tracking-tighter uppercase leading-none">
                            {block.heading}
                        </h2>
                    </div>

                    <Link
                        href="/products"
                        className="group hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14253f] hover:text-[#cd7d51] transition-colors"
                    >
                        View Full Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-100">
                    {block.products?.map((product: any, idx: number) => (
                        <Link key={product._id} href="/products" className="group block relative h-[500px] border-r border-b border-gray-100 overflow-hidden">

                            {/* Optimized Image */}
                            {product.image && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={urlForImage(product.image).url()}
                                        alt={product.title || "Category Image"}
                                        fill // 👈 Fills the container (h-[500px])
                                        sizes="(max-width: 768px) 100vw, 25vw" // 👈 CRITICAL SPEED FIX: Downloads small image on mobile, 1/4 width on desktop
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-[#14253f]/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            )}

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <span className="text-white/50 text-4xl font-light">0{idx + 1}</span>

                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                                        {product.title}
                                    </h3>
                                    <div className="w-0 group-hover:w-12 h-[2px] bg-[#cd7d51] transition-all duration-500" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile Button */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14253f]"
                    >
                        View Full Catalog <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ProductLookbook;