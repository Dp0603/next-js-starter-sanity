"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
    MapPin, Phone, Mail, Send, ChevronDown, Clock,
    UploadCloud, Globe, CheckCircle2, AlertCircle,
    X, FileText, Trash2, Plus, Image as ImageIcon
} from "lucide-react";

// NOTE: Ensure you have installed: npm i world-countries
import countries from "world-countries";

interface ContactProps {
    block: any;
}

const ContactSection: React.FC<ContactProps> = ({ block }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Multiple Files State
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<{ name: string, url: string, type: 'image' | 'pdf' }[]>([]);
    const [fileError, setFileError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        quantity: "",
        timeline: "",
        priceRange: "",
        details: "",
        productCategory: ""
    });

    // Country Select State
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
    const [marketQuery, setMarketQuery] = useState("");
    const [showMarketDropdown, setShowMarketDropdown] = useState(false);

    // UI Refs
    const marketDropdownRef = useRef<HTMLDivElement>(null);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Product Category State
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // Validation State
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Formatting Country Data
    const formattedCountries = useMemo(() => {
        return countries.map(c => c.name.common).sort();
    }, []);

    // Cleanup previews on unmount
    useEffect(() => {
        return () => {
            previews.forEach(p => {
                if (p.type === 'image') URL.revokeObjectURL(p.url);
            });
        };
    }, [previews]);

    // Auto-scroll logic for chips
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [selectedMarkets]);

    // Click Outside Handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (marketDropdownRef.current && !marketDropdownRef.current.contains(event.target as Node)) {
                setShowMarketDropdown(false);
            }
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setShowCategoryDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCountries = useMemo(() => {
        return formattedCountries.filter(c =>
            c.toLowerCase().includes(marketQuery.toLowerCase()) &&
            !selectedMarkets.includes(c)
        );
    }, [marketQuery, selectedMarkets, formattedCountries]);

    if (!block) return null;

    // --- VALIDATION HELPERS ---
    const validateField = (name: string, value: string) => {
        let error = "";
        switch (name) {
            case "fullName":
                if (!/^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value)) error = "MIN 2 WORDS";
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "INVALID EMAIL";
                break;
            case "company":
                if (!/^[A-Za-z0-9&.\- ]{2,}$/.test(value)) error = "INVALID NAME";
                break;
            case "quantity":
                if (!value || parseInt(value) < 1) error = "REQUIRED";
                break;
            case "timeline":
                if (!/^\d+(\s?-\s?\d+)?\s?(days?|weeks?|months?)$/i.test(value)) error = "e.g. 8-10 WEEKS";
                break;
            case "priceRange":
                if (!/^([$€£])?\s?\d+(\.\d{1,2})?\s?(-|–)\s?([$€£])?\s?\d+(\.\d{1,2})?\s?(USD|EUR|GBP)?$/i.test(value)) error = "e.g. $15 - $25";
                break;
            case "targetMarket":
                if (selectedMarkets.length === 0) error = "REQUIRED";
                break;
            case "productCategory":
                if (!value) error = "REQUIRED";
                break;
        }
        return error;
    };

    const handleSafeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const forbiddenChars = /[<>{}|[\]\\^]/g;
        if (forbiddenChars.test(e.target.value)) {
            e.target.value = e.target.value.replace(forbiddenChars, "");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        handleSafeInput(e);
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    // --- CUSTOM UI HANDLERS ---
    const handleCategorySelect = (category: string) => {
        setFormData(prev => ({ ...prev, productCategory: category }));
        setErrors(prev => ({ ...prev, productCategory: "" }));
        setShowCategoryDropdown(false);
    };

    const handleCountryAdd = (country: string) => {
        if (!selectedMarkets.includes(country)) {
            setSelectedMarkets(prev => [...prev, country]);
            setErrors(prev => ({ ...prev, targetMarket: "" }));
        }
        setMarketQuery("");
        setShowMarketDropdown(false);
    };

    const handleCountryRemove = (country: string) => {
        setSelectedMarkets(prev => prev.filter(c => c !== country));
    };

    // --- FILE HANDLING ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        if (newFiles.length === 0) return;

        setFileError("");
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

        if (files.length + newFiles.length > 5) {
            setFileError("MAX 5 FILES ALLOWED");
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        const validFiles: File[] = [];
        const newPreviews: typeof previews = [];

        newFiles.forEach(file => {
            if (!validTypes.includes(file.type)) {
                setFileError("INVALID TYPE");
                return;
            }
            if (file.size / (1024 * 1024) > 5) {
                setFileError("MAX SIZE 5MB");
                return;
            }
            validFiles.push(file);
            newPreviews.push({
                name: file.name,
                url: file.type.includes('image') ? URL.createObjectURL(file) : '',
                type: file.type.includes('image') ? 'image' : 'pdf'
            });
        });

        if (validFiles.length > 0) {
            setFiles(prev => [...prev, ...validFiles]);
            setPreviews(prev => [...prev, ...newPreviews]);
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeFile = (index: number) => {
        const file = previews[index];
        if (file.type === 'image' && file.url) URL.revokeObjectURL(file.url);
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setFileError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach(key => {
            const err = validateField(key, formData[key as keyof typeof formData]);
            if (err) newErrors[key] = err;
        });
        if (selectedMarkets.length === 0) newErrors.targetMarket = "REQUIRED";
        if (!formData.productCategory) newErrors.productCategory = "REQUIRED";

        setErrors(newErrors);
        setTouched({
            fullName: true, email: true, company: true, quantity: true,
            timeline: true, priceRange: true, details: true, productCategory: true
        });

        if (Object.values(newErrors).some(err => err) || fileError) return;

        setIsSubmitting(true);
        setStatus('idle');

        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, val]) => submissionData.append(key, val));
        submissionData.append("targetMarket", selectedMarkets.join(", "));
        files.forEach((file) => submissionData.append("attachments", file));
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: submissionData,
            });

            // ✅ ALWAYS read JSON response
            const data = await res.json();

            // ✅ Validate response contract
            if (!res.ok || !data?.success) {
                setStatus('error');
                return;
            }

            // ✅ SUCCESS
            setStatus('success');
            e.currentTarget.reset();
            setFormData({
                fullName: "",
                email: "",
                company: "",
                quantity: "",
                timeline: "",
                priceRange: "",
                details: "",
                productCategory: ""
            });
            setSelectedMarkets([]);
            setFiles([]);
            setPreviews([]);

        } catch (err) {
            console.error('CONTACT FORM ERROR:', err);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <section className="pt-32 pb-16 md:py-24 lg:py-32 bg-[#fafafa] min-h-screen relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gray-200/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 item-stretch">

                    {/* LEFT COLUMN: Static Info */}
                    <div className="w-full lg:w-4/12 flex flex-col justify-between h-full order-2 lg:order-1">
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
                        <div className="space-y-8 lg:space-y-10 mb-10 lg:mb-16">
                            <div className="group">
                                <div className="flex gap-4 mb-4">
                                    <div className="text-[#cd7d51] mt-1 shrink-0"><MapPin size={22} strokeWidth={1.5} /></div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">{block.addressHeading}</h5>
                                        <p className="text-gray-500 font-light text-sm whitespace-pre-line leading-relaxed">{block.address}</p>
                                    </div>
                                </div>
                                <div className="ml-0 lg:ml-10 w-full h-52 bg-gray-200 rounded-sm overflow-hidden relative shadow-md border border-gray-200">
                                    {block.mapEmbedUrl ? (
                                        <iframe src={block.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full" title="Google Map Location" onError={(e) => { const target = e.currentTarget; target.style.display = 'none'; }} />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-center p-4">
                                            <MapPin size={24} className="mb-3 text-[#cd7d51]" />
                                            <p className="text-gray-500 text-xs mb-3 whitespace-pre-line">{block.address}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                                <div className="flex gap-4 group">
                                    <div className="text-[#cd7d51] mt-1 shrink-0"><Phone size={22} strokeWidth={1.5} /></div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">{block.phoneHeading}</h5>
                                        <div className="space-y-1">
                                            {block.phones?.map((phone: string, idx: number) => (
                                                <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="block text-gray-500 font-light hover:text-[#cd7d51] transition-colors duration-300 text-sm">{phone}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="text-[#cd7d51] mt-1 shrink-0"><Mail size={22} strokeWidth={1.5} /></div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">{block.emailHeading}</h5>
                                        <a href={`mailto:${block.email}`} className="text-gray-500 font-light hover:text-[#cd7d51] transition-colors duration-300 text-sm block">{block.email}</a>
                                    </div>
                                </div>
                                <div className="flex gap-4 group">
                                    <div className="text-[#cd7d51] mt-1 shrink-0"><Clock size={22} strokeWidth={1.5} /></div>
                                    <div>
                                        <h5 className="text-[#14253f] font-bold uppercase tracking-widest text-xs mb-2">{block.hoursHeading}</h5>
                                        <p className="text-gray-500 font-light text-sm truncate">{block.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Form */}
                    <div className="w-full lg:w-8/12 order-1 lg:order-2 ">
                        <div className="bg-white p-6 md:p-8 lg:p-12 rounded-sm border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.06)] relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#14253f] via-[#cd7d51] to-transparent"></div>

                            {status === 'success' ? (
                                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="flex justify-center"><CheckCircle2 size={80} className="text-green-500 stroke-[1px]" /></div>
                                    <h3 className="text-3xl font-black text-[#14253f] uppercase tracking-tighter">Inquiry Sent</h3>
                                    <p className="text-gray-500 max-w-sm mx-auto font-light">Thank you for reaching out. We will contact you shortly.</p>
                                    <button onClick={() => setStatus('idle')} className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs hover:underline pt-4">Send another inquiry</button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl lg:text-2xl font-bold text-[#14253f] mb-6 lg:mb-8">Request a Quote</h3>
                                    <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit} noValidate>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <div className="group relative">
                                                <label htmlFor="fullName" className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.fullName ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#cd7d51]'}`}>Full Name *</label>
                                                {/* FORCE TRANSPARENT BACKGROUND AND NO BORDERS */}
                                                <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. John Doe"
                                                    className={`!bg-transparent !border-0 !border-b !rounded-none !ring-0 !shadow-none w-full py-4 px-0 text-[#14253f] font-medium placeholder-gray-300 focus:outline-none transition-colors ${errors.fullName ? '!border-red-300' : '!border-gray-200 focus:!border-[#cd7d51]'}`} />
                                                {errors.fullName && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.fullName}</p>}
                                            </div>
                                            <div className="group relative">
                                                <label htmlFor="email" className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#cd7d51]'}`}>Business Email *</label>
                                                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="name@company.com"
                                                    className={`!bg-transparent !border-0 !border-b !rounded-none !ring-0 !shadow-none w-full py-4 px-0 text-[#14253f] font-medium placeholder-gray-300 focus:outline-none transition-colors ${errors.email ? '!border-red-300' : '!border-gray-200 focus:!border-[#cd7d51]'}`} />
                                                {errors.email && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <div className="group relative">
                                                <label htmlFor="company" className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.company ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#cd7d51]'}`}>Company / Brand *</label>
                                                <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} onBlur={handleBlur} placeholder="Company Name"
                                                    className={`!bg-transparent !border-0 !border-b !rounded-none !ring-0 !shadow-none w-full py-4 px-0 text-[#14253f] font-medium placeholder-gray-300 focus:outline-none transition-colors ${errors.company ? '!border-red-300' : '!border-gray-200 focus:!border-[#cd7d51]'}`} />
                                                {errors.company && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.company}</p>}
                                            </div>

                                            {/* TARGET MARKET - FIXED ALIGNMENT */}
                                            <div className="group relative" ref={marketDropdownRef}>
                                                <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.targetMarket ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#cd7d51]'}`}>Target Market</label>

                                                <div className={`relative h-14 !border-0 !border-b flex items-center justify-start transition-all duration-300 ${errors.targetMarket ? '!border-red-300' : '!border-gray-200 focus-within:!border-[#cd7d51]'}`}>
                                                    <div ref={scrollContainerRef} className="flex items-center gap-2 overflow-x-auto pr-8 no-scrollbar scroll-smooth flex-nowrap w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                                        {selectedMarkets.map(country => (
                                                            <span key={country} className="shrink-0 inline-flex items-center gap-1 bg-gray-100 text-[#14253f] px-2 py-1 rounded-sm text-xs font-semibold whitespace-nowrap animate-in fade-in zoom-in duration-200">
                                                                {country}
                                                                <button type="button" onClick={(e) => { e.stopPropagation(); handleCountryRemove(country); }} className="text-gray-400 hover:text-red-500"><X size={12} /></button>
                                                            </span>
                                                        ))}

                                                        {/* Input with bg-transparent to avoid "box" look */}
                                                        <input type="text" value={marketQuery} onChange={(e) => { setMarketQuery(e.target.value); setShowMarketDropdown(true); }} onFocus={() => setShowMarketDropdown(true)} placeholder={selectedMarkets.length === 0 ? "e.g. UAE, UK, USA" : ""}
                                                            className="shrink-0 min-w-[120px] !bg-transparent !border-0 !ring-0 !shadow-none outline-none text-[#14253f] font-medium text-sm placeholder-gray-300 h-full px-0" autoComplete="off" />
                                                    </div>
                                                    <Globe size={16} className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${errors.targetMarket ? 'text-red-500' : 'text-gray-300 group-focus-within:text-[#cd7d51]'}`} />
                                                </div>

                                                {showMarketDropdown && marketQuery.length > 0 && (
                                                    <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-xl max-h-48 overflow-y-auto z-50 rounded-b-sm animate-in fade-in slide-in-from-top-2 duration-200">
                                                        {filteredCountries.length > 0 ? filteredCountries.map(country => (
                                                            <button key={country} type="button" className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-[#fafafa] hover:text-[#cd7d51] transition-all" onClick={() => handleCountryAdd(country)}>{country}</button>
                                                        )) : <div className="px-4 py-3 text-xs text-gray-400 italic">No matches found</div>}
                                                    </div>
                                                )}
                                                {errors.targetMarket && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.targetMarket}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                            {/* PRODUCT CATEGORY */}
                                            <div className="group relative" ref={categoryDropdownRef}>
                                                <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.productCategory ? 'text-red-500' : 'text-[#cd7d51]'}`}>Product Category *</label>
                                                <button type="button" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                                    className={`w-full h-14 !bg-transparent !border-0 !border-b !rounded-none text-left flex items-center justify-between transition-colors ${errors.productCategory ? '!border-red-300' : '!border-gray-200 hover:!border-[#cd7d51]'}`}>
                                                    <span className={`text-base font-medium ${formData.productCategory ? 'text-[#14253f]' : 'text-gray-300'}`}>{formData.productCategory || "Select Category"}</span>
                                                    <ChevronDown size={16} className={`text-[#cd7d51] transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                                                </button>
                                                {showCategoryDropdown && (
                                                    <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-xl z-50 rounded-b-sm animate-in fade-in slide-in-from-top-2 duration-200 max-h-56 overflow-y-auto">
                                                        {block.productCategories?.map((cat: string, idx: number) => (
                                                            <button key={idx} type="button" onClick={() => handleCategorySelect(cat)} className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-[#fafafa] hover:text-[#cd7d51] border-l-2 border-transparent hover:border-[#cd7d51] transition-all">{cat}</button>
                                                        ))}
                                                    </div>
                                                )}
                                                {errors.productCategory && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.productCategory}</p>}
                                            </div>

                                            <div className="group relative">
                                                <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.quantity ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#cd7d51]'}`}>Approx Quantity</label>
                                                <input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 500"
                                                    className={`!bg-transparent !border-0 !border-b !rounded-none !ring-0 !shadow-none w-full py-4 px-0 text-[#14253f] font-medium placeholder-gray-300 focus:outline-none transition-colors ${errors.quantity ? '!border-red-300' : '!border-gray-200 focus:!border-[#cd7d51]'}`} />
                                                {errors.quantity && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.quantity}</p>}
                                            </div>

                                            <div className="group relative">
                                                <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.timeline ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#cd7d51]'}`}>Required Timeline</label>
                                                <input name="timeline" type="text" value={formData.timeline} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 8-10 weeks"
                                                    className={`!bg-transparent !border-0 !border-b !rounded-none !ring-0 !shadow-none w-full py-4 px-0 text-[#14253f] font-medium placeholder-gray-300 focus:outline-none transition-colors ${errors.timeline ? '!border-red-300' : '!border-gray-200 focus:!border-[#cd7d51]'}`} />
                                                {errors.timeline && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.timeline}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                            <div className="group relative">
                                                <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 block transition-colors ${errors.priceRange ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#cd7d51]'}`}>Target Price Range</label>
                                                <input name="priceRange" type="text" value={formData.priceRange} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. $15 - $25 USD"
                                                    className={`!bg-transparent !border-0 !border-b !rounded-none !ring-0 !shadow-none w-full py-4 px-0 text-[#14253f] font-medium placeholder-gray-300 focus:outline-none transition-colors ${errors.priceRange ? '!border-red-300' : '!border-gray-200 focus:!border-[#cd7d51]'}`} />
                                                {errors.priceRange && <p className="absolute right-0 -bottom-4 text-red-500 text-[9px] font-bold uppercase tracking-widest">{errors.priceRange}</p>}
                                            </div>

                                            {/* UPLOAD SECTION - CLEAN GALLERY */}
                                            <div className="group w-full">
                                                <div className="flex justify-between items-baseline mb-3">
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${fileError ? 'text-red-500' : 'text-gray-400 group-hover:text-[#cd7d51]'}`}>Upload Tech Pack</span>
                                                    <span className="text-[9px] text-gray-300 font-medium">{files.length}/5</span>
                                                </div>

                                                <div className="flex gap-4 overflow-x-auto pb-2 min-h-[100px] items-center">
                                                    {previews.map((file, idx) => (
                                                        <div key={idx} className="relative w-24 h-24 shrink-0 border border-gray-100 rounded-sm bg-white shadow-sm group/img overflow-hidden">
                                                            {file.type === 'image' ? (
                                                                <img src={file.url} alt="preview" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-2 bg-gray-50">
                                                                    <FileText size={24} className="mb-1" />
                                                                    <span className="text-[9px] font-bold truncate w-full text-center">{file.name}</span>
                                                                </div>
                                                            )}
                                                            <button type="button" onClick={() => removeFile(idx)}
                                                                className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow-md opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-red-500 hover:text-white">
                                                                <X size={12} strokeWidth={3} />
                                                            </button>
                                                        </div>
                                                    ))}

                                                    {files.length < 5 && (
                                                        <button type="button" onClick={() => fileInputRef.current?.click()}
                                                            className={`relative w-24 h-24 shrink-0 border border-dashed rounded-sm flex flex-col items-center justify-center transition-all bg-transparent ${fileError ? 'border-red-400 text-red-500' : 'border-gray-300 text-gray-400 hover:border-[#cd7d51] hover:text-[#cd7d51]'}`}>
                                                            <Plus size={20} />
                                                            <span className="text-[9px] font-bold uppercase tracking-wide mt-1">Add</span>
                                                        </button>
                                                    )}
                                                </div>

                                                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                                                {fileError && <p className="text-[9px] text-red-500 mt-2 font-bold uppercase tracking-widest">{fileError}</p>}
                                            </div>
                                        </div>

                                        <div className="group relative">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block group-focus-within:text-[#cd7d51] transition-colors">Additional Details</label>
                                            <textarea name="details" rows={3} value={formData.details} onChange={handleChange} placeholder="Tell us more about your requirements..."
                                                className="!bg-transparent !border-0 !border-b !rounded-none !ring-0 !shadow-none w-full py-4 px-0 text-[#14253f] font-medium placeholder-gray-300 focus:outline-none resize-none transition-colors focus:!border-[#cd7d51] !border-gray-200" />
                                        </div>

                                        {status === 'error' && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Something went wrong. Please try again later.</p>}

                                        <button type="submit" disabled={isSubmitting || !!fileError}
                                            className="group w-full bg-[#14253f] text-white font-bold uppercase tracking-widest text-xs py-4 lg:py-5 hover:bg-[#cd7d51] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                            {isSubmitting ? "Processing..." : "Submit Inquiry"}
                                            {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                        <p className="text-center text-gray-400 text-[10px] mt-6 uppercase tracking-wider px-4">We respect your privacy. All technical data is kept confidential.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
