import React from "react";
import { urlForImage } from "@/sanity/lib/utils";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

interface ProductShowcaseProps {
    block: any;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* TOP HEADER */}
                <div className="max-w-3xl mb-24">
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4">
                        {block.subtitle}
                    </h4>
                    <h1 className="text-5xl lg:text-7xl font-bold text-[#14253f] mb-8 tracking-tighter uppercase leading-none">
                        {block.heading}
                    </h1>
                    <p className="text-xl text-gray-500 font-light leading-relaxed max-w-xl">
                        {block.description}
                    </p>
                </div>

                {/* PRODUCTS LIST */}
                <div className="space-y-32 lg:space-y-48">
                    {block.products?.map((item: any, index: number) => {
                        // Logic: Even numbers (0, 2) = Image Left. Odd numbers (1, 3) = Image Right.
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col gap-16 lg:gap-24 items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                            >

                                {/* IMAGE SIDE */}
                                <div className="w-full lg:w-1/2 relative">
                                    {/* The Offset Border Box */}
                                    <div
                                        className={`absolute inset-0 border-2 border-neutral-300 z-0 hidden lg:block ${isEven ? "-left-6 top-6" : "-right-6 top-6"
                                            }`}
                                    />

                                    {/* The Image */}
                                    <div className="relative z-10 aspect-[4/3] bg-gray-100 overflow-hidden">
                                        {item.image && (
                                            <img
                                                src={urlForImage(item.image).url()}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* TEXT SIDE */}
                                <div className="w-full lg:w-1/2 relative">

                                    {/* Giant Faint Number Background */}
                                    <span className="absolute -top-20 -left-4 text-[12rem] font-bold text-gray-100 select-none -z-10 leading-none opacity-60">
                                        {item.number}
                                    </span>

                                    <div className="relative z-10 pt-8">
                                        <h2 className="text-4xl lg:text-5xl font-bold text-[#14253f] mb-6 tracking-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-500 leading-relaxed mb-8 text-lg font-light max-w-md">
                                            {item.description}
                                        </p>

                                        {/* Features List with Orange Lines */}
                                        <ul className="space-y-4 mb-10">
                                            {item.features?.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#14253f]">
                                                    <span className="w-8 h-[2px] bg-[#cd7d51]" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <Button
                                            to={item.buttonLink || "/contact"}
                                            variant="dark"
                                            className="!px-10 !py-4"
                                        >
                                            {item.buttonText || "Inquire Now"}
                                            <ArrowRight size={16} />
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;