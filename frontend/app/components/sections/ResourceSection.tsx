"use client";
import React, { useState } from "react";
import { FileText, Lock, Download, X, CheckCircle, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

// --- HELPER: CONVERT BYTES TO MB ---
const formatSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "0 MB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

interface Resource {
    title: string;
    description: string;
    type: string;
    size: number;
    fileUrl: string;
    isGated: boolean;
}

interface ResourceProps {
    block: any;
}

const ResourceSection: React.FC<ResourceProps> = ({ block }) => {
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!block) return null;

    // --- DYNAMIC TEXT DEFAULTS ---
    // If you forget to set them in Sanity, these fallbacks will show
    const texts = {
        eyebrow: block.eyebrow || "Knowledge Center",
        heading: block.heading || "Resources & Downloads",
        description: block.description || "Access our company profiles and catalogs.",
        formTitle: block.formTitle || "Unlock this Resource",
        formDesc: block.formDescription || "Enter your details to download",
        btnText: block.formButtonText || "Access Download",
        successTitle: block.successTitle || "Access Granted",
        successMsg: block.successMessage || "Your download is starting automatically."
    };

    const handleDownloadClick = (resource: any) => {
        if (!resource.isGated) {
            window.open(resource.fileUrl, "_blank");
            return;
        }
        setSelectedResource(resource);
        setIsFormOpen(true);
        setIsSuccess(false);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        // 👇 ADD YOUR WEB3FORMS ACCESS KEY HERE
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
        formData.append("subject", `New Lead Downloaded: ${selectedResource?.title}`);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    if (selectedResource?.fileUrl) {
                        const link = document.createElement('a');
                        link.href = selectedResource.fileUrl;
                        link.download = selectedResource.title;
                        link.target = "_blank";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }, 1500);
            } else {
                alert("Error submitting form. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Connection error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="resources">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

                {/* HEADER */}
                <div className="mb-16 max-w-2xl">
                    <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-[#cd7d51]"></span>
                        {texts.eyebrow}
                    </h4>
                    <h2 className="text-4xl lg:text-5xl font-black text-[#14253f] mb-6 tracking-tighter uppercase">
                        {texts.heading}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-lg">
                        {texts.description}
                    </p>
                </div>

                {/* RESOURCES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {block.resources?.map((resource: any, idx: number) => (
                        <div key={idx} className="group border border-gray-100 bg-gray-50 rounded-sm p-8 hover:shadow-xl hover:border-[#cd7d51]/30 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gray-200 group-hover:bg-[#cd7d51] transition-colors" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white shadow-sm border border-gray-100 rounded-sm text-[#14253f]">
                                    <FileText size={24} strokeWidth={1.5} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-[#14253f] mb-2 group-hover:text-[#cd7d51] transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-sm text-gray-400 mb-8 line-clamp-2">
                                {resource.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto border-t border-gray-200 pt-6">
                                <span className="text-xs font-mono text-gray-400">{resource.type} • {formatSize(resource.size)}</span>
                                <button
                                    type="button"
                                    onClick={() => handleDownloadClick(resource)}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14253f] hover:underline cursor-pointer"
                                >
                                    Download <Download size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- LEAD CAPTURE MODAL --- */}
            {isFormOpen && selectedResource && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#14253f]/80 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />

                    <div className="bg-white w-full max-w-md relative z-10 rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-[#cd7d51] transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        {isSuccess ? (
                            <div className="p-12 text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#14253f] mb-2">{texts.successTitle}</h3>
                                <p className="text-gray-500 mb-6 text-sm">
                                    {texts.successMsg} <strong>{selectedResource.title}</strong>
                                </p>
                                <button type="button" onClick={() => setIsFormOpen(false)} className="text-[#cd7d51] text-xs font-bold uppercase tracking-widest hover:underline cursor-pointer">
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-6 text-[#cd7d51]">
                                    <ShieldCheck size={24} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Secure Download</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#14253f] mb-2">{texts.formTitle}</h3>
                                <p className="text-gray-500 text-sm mb-8">
                                    {texts.formDesc} <strong>{selectedResource.title}</strong>.
                                </p>

                                <form className="space-y-5" onSubmit={handleFormSubmit}>
                                    <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" aria-label="Robot check" />

                                    <div className="space-y-1">
                                        <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                                        <input id="fullName" required name="name" type="text" className="w-full border-b border-gray-200 py-2 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Business Email</label>
                                        <input id="email" required name="email" type="email" className="w-full border-b border-gray-200 py-2 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors" placeholder="name@company.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Company Name</label>
                                        <input id="company" required name="company" type="text" className="w-full border-b border-gray-200 py-2 text-[#14253f] font-medium focus:outline-none focus:border-[#cd7d51] transition-colors" placeholder="Your Brand Ltd." />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#14253f] text-white py-4 mt-4 font-bold uppercase tracking-widest text-xs hover:bg-[#cd7d51] transition-colors disabled:opacity-70 flex justify-center gap-2 items-center cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>Verifying <Loader2 size={14} className="animate-spin" /></>
                                        ) : (
                                            <>{texts.btnText} <ArrowRight size={14} /></>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ResourceSection;