"use client";
import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { Clock, Layers } from "lucide-react";

interface Product {
    _id: string;
    title: string;
    description: string;
    image: any;
    moq?: string;
    leadTime?: string;
    features?: string[];
}

interface Props {
    block: {
        heading: string;
        description?: string;
        products: Product[];
    };
}

const ProductGrid: React.FC<Props> = ({ block }) => {
    if (!block || !block.products) return null;

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-4xl font-black text-[#14253f] mb-4 uppercase tracking-tighter">
                        {block.heading}
                    </h2>
                    {block.description && (
                        <p className="text-gray-500 text-lg font-light">
                            {block.description}
                        </p>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {block.products.map((product) => (
                        <div key={product._id} className="group cursor-default">

                            {/* Image */}
                            <div className="relative aspect-[4/5] bg-gray-50 mb-6 overflow-hidden rounded-sm">
                                {product.image && (
                                    <Image
                                        src={urlForImage(product.image).url()}
                                        alt={product.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}

                                {/* B2B Pills (Visible on Hover) */}
                                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-white/95 backdrop-blur-sm p-3 shadow-lg border border-gray-100 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#14253f]">
                                        <span className="flex items-center gap-2">
                                            <Layers size={14} className="text-[#cd7d51]" /> MOQ
                                        </span>
                                        <span>{product.moq || 'N/A'}</span>
                                    </div>
                                    <div className="bg-white/95 backdrop-blur-sm p-3 shadow-lg border border-gray-100 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#14253f]">
                                        <span className="flex items-center gap-2">
                                            <Clock size={14} className="text-[#cd7d51]" /> Lead Time
                                        </span>
                                        <span>{product.leadTime || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Text */}
                            <h3 className="text-xl font-bold text-[#14253f] mb-2 uppercase tracking-tight group-hover:text-[#cd7d51] transition-colors">
                                {product.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                                {product.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {product.features?.slice(0, 3).map((feature, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;