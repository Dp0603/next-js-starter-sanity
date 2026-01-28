"use client";
import React from "react";
import { MapPin, Phone, Mail, Send, ChevronDown, Clock, UploadCloud, Globe, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface ContactProps {
    block: any;
}

const ContactSection: React.FC<ContactProps> = ({ block }) => {
    if (!block) return null;

    return (
        // 1. FIXED: Changed 'py-16' to 'pt-32 pb-16' on mobile to prevent Navbar overlap
        <section className="pt-32 pb-16 md:py-24 lg:py-32 bg-[#fafafa] min-h-screen relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gray-200/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

                {/* Layout: Stack on Mobile, Side-by-Side on Desktop */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Context & Info */}
                    <div className="w-full lg:w-4/12 flex flex-col justify-between h-full order-2 lg:order-1">

                        {/* Header Group */}
                        <div className="mb-10 lg:mb-16">
                            <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4 lg:mb-6 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                                {block.subtitle}
                            </h4>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#14253f] mb-6 lg:mb-8 tracking-tighter uppercase leading-[0.9]">
                                {block.heading}
                            </h1>
                            <p className="text-base lg:text-lg text-gray-500 font-light leading-relaxed border-l-2 border-[#cd7d51] pl-6">
                                {block.description}
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-8 lg:space-y-10 mb-10 lg:mb-16">

                            {/* Address with Map */}
                            <div className="group">
                                <div className="flex gap-4 mb-4">
                                    <div className="text-[#cd7d51] mt-1 shrink-0">
                                        <MapPin size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">
                                            {block.addressHeading}
                                        </h5>
                                        <p className="text-gray-500 font-light text-sm whitespace-pre-line leading-relaxed">
                                            {block.address}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={block.googleMapsLink || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block ml-0 lg:ml-10 w-full h-32 bg-gray-200 rounded-sm overflow-hidden relative group-hover:shadow-lg transition-all duration-300"
                                >
                                    <img
                                        src={block.mapImage ? urlFor(block.mapImage).width(600).height(300).url() : "https://placehold.co/600x300/e5e7eb/a3a3a3?text=View+Location+Map"}
                                        alt="Location Map"
                                        className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#14253f]/0 group-hover:bg-[#14253f]/10 transition-colors">
                                        <span className="bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#14253f] shadow-sm flex items-center gap-2">
                                            Open Map <ArrowUpRight size={10} />
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {/* Communication Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
                                {/* Phone */}
                                <div className="flex gap-4 group">
                                    <div className="text-[#cd7d51] mt-1 shrink-0">
                                        <Phone size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">
                                            {block.phoneHeading}
                                        </h5>
                                        <div className="space-y-1">
                                            {block.phones?.map((phone: string, idx: number) => (
                                                <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="block text-gray-500 font-light hover:text-[#cd7d51] transition-colors duration-300 text-sm">
                                                    {phone}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4 group">
                                    <div className="text-[#cd7d51] mt-1 shrink-0">
                                        <Mail size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">
                                            {block.emailHeading}
                                        </h5>
                                        <a href={`mailto:${block.email}`} className="text-gray-500 font-light hover:text-[#cd7d51] transition-colors duration-300 text-sm block">
                                            {block.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex gap-4 group">
                                    <div className="text-[#cd7d51] mt-1 shrink-0">
                                        <Clock size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">
                                            {block.hoursHeading}
                                        </h5>
                                        <p className="text-gray-500 font-light text-sm whitespace-pre-line">
                                            {block.hours}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Form */}
                    <div className="w-full lg:w-8/12 order-1 lg:order-2">
                        <div className="bg-white p-6 md:p-8 lg:p-12 rounded-sm border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.06)] relative overflow-hidden">

                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#14253f] via-[#cd7d51] to-transparent"></div>

                            <h3 className="text-xl lg:text-2xl font-bold text-[#14253f] mb-6 lg:mb-8">Request a Quote</h3>

                            <form className="space-y-6 lg:space-y-8" onSubmit={(e) => e.preventDefault()}>

                                {/* Identity */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Full Name *
                                        </label>
                                        <input required type="text" placeholder="e.g. John Doe"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent placeholder-gray-300 relative z-10"
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                    </div>

                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Business Email *
                                        </label>
                                        <input required type="email" placeholder="name@company.com"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent placeholder-gray-300 relative z-10"
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                    </div>
                                </div>

                                {/* Company & Market */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Company / Brand *
                                        </label>
                                        <input required type="text"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent relative z-10"
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                    </div>
                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Target Market
                                        </label>
                                        <div className="relative">
                                            <input required type="text" placeholder="e.g. UAE, UK, USA"
                                                className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent placeholder-gray-300 relative z-10"
                                            />
                                            <Globe size={16} className="absolute right-0 top-3 text-gray-300 group-focus-within:text-[#cd7d51] transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Specifics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                    {/* DYNAMIC Category Dropdown */}
                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#cd7d51] mb-2 block">
                                            Product Category *
                                        </label>
                                        <div className="relative">
                                            {/* 2. FIXED: Added 'pr-10 truncate' to prevent text cutting/overlap */}
                                            <select className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium bg-transparent appearance-none rounded-none outline-none cursor-pointer pr-10 truncate">
                                                <option value="">Select Category</option>
                                                {block.productCategories?.map((cat: string, idx: number) => (
                                                    <option key={idx} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={16} className="absolute right-0 top-3 text-[#cd7d51] pointer-events-none" />
                                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#cd7d51] opacity-30"></div>
                                        </div>
                                    </div>

                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Approx Quantity
                                        </label>
                                        <input type="text" placeholder="e.g. 500 units"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent placeholder-gray-300 relative z-10"
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                    </div>

                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Required Timeline
                                        </label>
                                        <input type="text" placeholder="e.g. 8-10 weeks"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent placeholder-gray-300 relative z-10"
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                    </div>
                                </div>

                                {/* Advanced Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    <div className="group relative">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                            Target Price Range
                                        </label>
                                        <input type="text" placeholder="e.g. $15 - $25 USD FOB"
                                            className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent placeholder-gray-300 relative z-10"
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                    </div>

                                    <div className="group">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-hover:text-[#cd7d51] transition-colors">
                                            Upload Tech Pack / Images
                                        </label>
                                        <div className="border border-dashed border-gray-300 rounded-sm p-4 flex items-center justify-center gap-3 text-gray-400 hover:border-[#cd7d51] hover:text-[#cd7d51] hover:bg-[#cd7d51]/5 transition-all cursor-pointer bg-gray-50/50">
                                            <UploadCloud size={20} />
                                            <span className="text-xs uppercase tracking-wide font-bold">Click to upload</span>
                                            <span className="text-[10px] opacity-60">(PDF/JPG)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="group relative">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">
                                        Additional Details
                                    </label>
                                    <textarea rows={3} placeholder="Tell us more about your materials, quality standards, or specific requirements..."
                                        className="w-full border-b border-gray-200 py-3 text-[#14253f] font-medium focus:outline-none bg-transparent resize-none placeholder-gray-300 relative z-10"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cd7d51] group-focus-within:w-full transition-all duration-500"></div>
                                </div>

                                {/* Submit Button */}
                                <button type="submit"
                                    className="group w-full bg-[#14253f] text-white font-bold uppercase tracking-widest text-xs py-4 lg:py-5 hover:bg-[#cd7d51] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl rounded-sm"
                                >
                                    Submit Inquiry
                                    <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                            </form>
                        </div>

                        <p className="text-center text-gray-400 text-[10px] mt-6 uppercase tracking-wider px-4">
                            We respect your privacy. All technical data is kept confidential.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;