"use client";

import React from "react";
import Link from "next/link";
import { Download, Globe, Linkedin, Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";
import { urlForImage } from "@/sanity/lib/utils";
// 👇 Import the SVG component we built
import AkaameLogo from "@/app/components/ui/AkaameLogo";

interface FooterProps {
  settings: any;
}

const getSocialIcon = (platform: string) => {
  const p = platform?.toLowerCase() || "";
  if (p.includes("linkedin")) return <Linkedin size={20} />;
  if (p.includes("instagram")) return <Instagram size={20} />;
  if (p.includes("facebook")) return <Facebook size={20} />;
  if (p.includes("twitter") || p.includes("x")) return <Twitter size={20} />;
  if (p.includes("youtube")) return <Youtube size={20} />;
  return <Globe size={20} />;
};

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();
  const safeSettings = settings || {};

  const resolveHref = (href: string | undefined): string => {
    if (!href) return "/";
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return href;
    }
    return href.startsWith("/") ? href : `/${href}`;
  };

  return (
    <footer className="bg-[#14253f] text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24">

          {/* COLUMN 1: Brand & Bio */}
          <div>
            <div className="mb-8">
              {/* We use the Hardcoded SVG here. 
                isTransparent={true} forces the text to WHITE.
              */}
              <AkaameLogo
                className="w-48 h-auto -ml-1"
                isTransparent={true}
              />
            </div>

            <p className="text-gray-400 font-light leading-relaxed mb-8">
              {safeSettings.footerDescription ||
                "Your strategic partner for premium footwear and leather goods manufacturing."}
            </p>

            <div className="flex gap-4">
              {safeSettings.socialLinks?.map((social: any, idx: number) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#cd7d51] transition-colors p-2 -ml-2 hover:bg-white/5 rounded-full"
                  title={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Company Links */}
          <div>
            <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-8">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              {(
                safeSettings.headerMenu || [
                  { title: "Home", link: "/" },
                  { title: "About", link: "/about" },
                  { title: "Contact", link: "/contact" },
                ]
              ).map((link: any, idx: number) => (
                <li key={idx}>
                  <Link href={resolveHref(link.link)} className="hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Resources */}
          <div>
            <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-8">
              Resources
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-white transition-colors">
                  Quality & Compliance
                </Link>
              </li>

              {safeSettings.profileUrl && (
                <li className="pt-4">
                  <a
                    href={safeSettings.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-[#cd7d51] transition-colors"
                  >
                    <Download size={16} />
                    Company Profile
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* COLUMN 4: Global Presence */}
          <div>
            <h4 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-8">
              Global Presence
            </h4>
            <ul className="space-y-8 text-sm text-gray-400 font-light">
              {safeSettings.locations?.map((loc: any, idx: number) => (
                <li key={idx}>
                  <strong className="block text-white uppercase text-xs tracking-wider mb-2">
                    {loc.city}
                  </strong>
                  <span className="whitespace-pre-line">{loc.address}</span>
                </li>
              ))}

              {safeSettings.contactEmail && (
                <li>
                  <a
                    href={`mailto:${safeSettings.contactEmail}`}
                    className="inline-flex items-center gap-2 text-[#cd7d51] hover:text-white transition-colors font-medium"
                  >
                    <Mail size={16} />
                    {safeSettings.contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} {safeSettings.copyrightText || "Akaame Exports Pvt. Ltd. All rights reserved."}</p>

          <div className="flex gap-8 mt-4 md:mt-0 items-center">
            {safeSettings.legalLinks?.map((link: any, idx: number) => (
              <Link key={idx} href={resolveHref(link.url)} className="hover:text-gray-300 transition-colors">
                {link.label}
              </Link>
            ))}

            {safeSettings.certificationsText && (
              <span className="opacity-80 border-l border-white/10 pl-8">
                {safeSettings.certificationsText}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;