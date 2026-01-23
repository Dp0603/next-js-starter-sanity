import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ImageCard from "../ui/ImageCard";
import { urlForImage } from "@/sanity/lib/utils";

interface ProductLookbookProps {
    block: any; // Quick fix for types
}

const ProductLookbook: React.FC<ProductLookbookProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-32 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-neutral-200 pb-8">
                    <div className="max-w-2xl">
                        <span className="text-accent-500 font-bold uppercase tracking-widest text-xs mb-2 block">
                            Our Expertise
                        </span>
                        <h2 className="text-5xl font-extrabold text-navy-900 tracking-tighter">
                            {block.heading}
                        </h2>
                    </div>

                    <Link
                        href="/products"
                        className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-navy-900 hover:text-accent-500 transition-colors"
                    >
                        View Full Catalog <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border border-neutral-200">
                    {/* Loop through the expanded products from Sanity */}
                    {block.products?.map((product: any, idx: number) => (
                        <Link href="/products" key={product._id} className="block h-[500px]">
                            <ImageCard
                                // Check if image exists before trying to get URL
                                image={product.image ? urlForImage(product.image).url() : ""}
                                title={product.title}
                                description={product.description}
                                indexLabel={`0${idx + 1}`}
                                footerTitle={product.title}
                                className="h-full"
                            />
                        </Link>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-navy-900 hover:text-accent-500 transition-colors"
                    >
                        View Full Catalog <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductLookbook;