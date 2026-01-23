import React from "react";
import Button from "../ui/Button";

interface CTAProps {
    block: any;
}

const CTASection: React.FC<CTAProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-32 bg-neutral-50 text-center">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-extrabold text-[#14253f] mb-8 tracking-tighter">
                    {block.heading}
                </h2>

                <p className="text-[#14253f] text-xl mb-12 max-w-2xl mx-auto font-light">
                    {block.description}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button to="/contact">{block.primaryButtonText}</Button>
                    <Button variant="outline">{block.secondaryButtonText}</Button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;