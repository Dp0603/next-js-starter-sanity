"use client";
import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { Quote } from "lucide-react";

interface Props {
    block: any;
}

const FounderNote: React.FC<Props> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 bg-[#fafafa]">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">

                {/* Image Side */}
                <div className="w-full md:w-1/3 relative aspect-[3/4] shadow-xl border-4 border-white">
                    {block.image && (
                        <Image
                            src={urlForImage(block.image).url()}
                            alt={block.author}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Text Side */}
                <div className="w-full md:w-2/3">
                    <Quote size={48} className="text-[#cd7d51]/20 mb-6" />
                    <h3 className="text-3xl md:text-4xl font-light italic text-[#14253f] mb-8 leading-relaxed">
                        "{block.quote}"
                    </h3>
                    <div>
                        <p className="font-black text-[#14253f] uppercase tracking-wide text-lg">
                            {block.author}
                        </p>
                        <p className="text-[#cd7d51] text-sm font-bold uppercase tracking-widest mt-1">
                            {block.role}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FounderNote;