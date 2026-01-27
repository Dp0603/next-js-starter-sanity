"use client";
import React from "react";
import { MapPin, Phone, Mail, Send, ChevronDown } from "lucide-react";

interface ContactProps {
    block: any;
}

const ContactSection: React.FC<ContactProps> = ({ block }) => {
    if (!block) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#fafafa] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* LEFT COLUMN: Contact Information */}
                    <div className="w-full lg:w-5/12">
                        <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4">
                            {block.subtitle}
                        </h4>
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#14253f] mb-8 tracking-tighter uppercase leading-none">
                            {block.heading}
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed mb-16">
                            {block.description}
                        </p>

                        <div className="space-y-12">
                            {/* Address - Linked to Google Maps */}
                            <div className="flex gap-6 group">
                                <div className="text-[#cd7d51] mt-1 shrink-0">
                                    <MapPin size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-3">
                                        {block.addressHeading}
                                    </h5>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(block.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 font-light whitespace-pre-line leading-relaxed hover:text-[#cd7d51] transition-colors duration-300"
                                    >
                                        {block.address}
                                    </a>
                                </div>
                            </div>

                            {/* Phone - Clickable */}
                            <div className="flex gap-6">
                                <div className="text-[#cd7d51] mt-1 shrink-0">
                                    <Phone size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-3">
                                        {block.phoneHeading}
                                    </h5>
                                    <div className="space-y-1">
                                        {block.phones?.map((phone: string, idx: number) => (
                                            <a
                                                key={idx}
                                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                                className="block text-gray-500 font-light hover:text-[#cd7d51] transition-colors duration-300"
                                            >
                                                {phone}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Email - Clickable */}
                            <div className="flex gap-6">
                                <div className="text-[#cd7d51] mt-1 shrink-0">
                                    <Mail size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-3">
                                        {block.emailHeading}
                                    </h5>
                                    <a
                                        href={`mailto:${block.email}`}
                                        className="text-gray-500 font-light hover:text-[#cd7d51] transition-colors duration-300"
                                    >
                                        {block.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Form Card */}
                    <div className="w-full lg:w-7/12">
                        <div className="bg-white p-10 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-sm border border-gray-100">
                            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>

                                {/* Row 1: Name & Email */}
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="group">
                                        <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Full Name
                                        </label>
                                        <input
                                            required
                                            id="fullName"
                                            type="text"
                                            placeholder="e.g. John Doe"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors bg-transparent placeholder-gray-300"
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Business Email
                                        </label>
                                        <input
                                            required
                                            id="email"
                                            type="email"
                                            placeholder="name@company.com"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors bg-transparent placeholder-gray-300"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Company */}
                                <div className="group">
                                    <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                        Company / Brand
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors bg-transparent"
                                    />
                                </div>

                                {/* Row 3: Interest (Custom Select Style) */}
                                <div className="group relative">
                                    <label htmlFor="interest" className="text-[10px] font-bold uppercase tracking-widest text-[#cd7d51] mb-2 block">
                                        Interest
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="interest"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors bg-transparent appearance-none cursor-pointer rounded-none"
                                        >
                                            <option value="">Select an option</option>
                                            <option>Leather Footwear Manufacturing</option>
                                            <option>Luxury Goods Production</option>
                                            <option>Small Leather Accessories</option>
                                            <option>Private Label Sourcing</option>
                                        </select>
                                        {/* Custom Arrow Icon */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#cd7d51] transition-colors">
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 4: Project Brief */}
                                <div className="group">
                                    <label htmlFor="brief" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                        Project Brief
                                    </label>
                                    <textarea
                                        required
                                        id="brief"
                                        rows={4}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors bg-transparent resize-none placeholder-gray-300"
                                    />
                                </div>

                                {/* Submit Button with Hover Animation */}
                                <button
                                    type="submit"
                                    className="group w-full bg-[#14253f] text-white font-bold uppercase tracking-widest text-xs py-5 hover:bg-[#cd7d51] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                                >
                                    Submit Inquiry
                                    <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;