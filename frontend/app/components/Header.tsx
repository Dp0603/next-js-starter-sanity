"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import AkaameLogo from "@/app/components/ui/AkaameLogo";

interface HeaderProps {
  menuItems: {
    title?: string;
    link?: string;
    _key?: string;
  }[];
  logo?: {
    useCustomUrl?: boolean;
    logoUrl?: string;
    logoImage?: any;
    logoMobileUrl?: string;
    logoMobileImage?: any;
    alt?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ menuItems, logo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMobileOpen;
  const textColor = isTransparent ? "text-white" : "text-[#14253f]";

  // --- LOGO LOGIC ---
  const getMobileLogoUrl = () => {
    if (!logo) return null;
    if (logo.useCustomUrl) {
      return logo.logoMobileUrl || logo.logoUrl;
    } else {
      const imageSource = logo.logoMobileImage || logo.logoImage;
      return imageSource ? urlForImage(imageSource)?.url() : null;
    }
  };

  const mobileLogoSrc = getMobileLogoUrl();

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // --- FIX: SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isMobileOpen) {
      // Lock BOTH body and html to stop all mobile scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out border-b ${isScrolled || isMobileOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-neutral-200/50"
            : "bg-transparent py-6 border-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="relative z-[100]" onClick={() => setIsMobileOpen(false)}>
            <div className="hidden lg:block">
              <AkaameLogo className="w-40 h-auto" isTransparent={isTransparent} />
            </div>
            <div className="block lg:hidden relative h-10 w-32">
              {mobileLogoSrc ? (
                <Image
                  src={mobileLogoSrc}
                  alt={logo?.alt || "Akaame"}
                  fill
                  className="object-contain object-left"
                  priority
                />
              ) : (
                <span className={`text-2xl font-black ${isMobileOpen ? 'text-[#14253f]' : textColor}`}>
                  AKAAME.
                </span>
              )}
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems?.map((link, idx) => (
              <Link
                key={link._key || idx}
                href={link.link || "/"}
                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 hover:text-[#cd7d51] ${pathname === (link.link || "/") ? "text-[#cd7d51]" : textColor
                  }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${isTransparent
                  ? "border-white text-white hover:bg-white hover:text-[#14253f]"
                  : "border-[#14253f] text-[#14253f] hover:bg-[#14253f] hover:text-white"
                }`}
            >
              Partner With Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            className={`lg:hidden z-[100] transition-colors duration-500 ${isMobileOpen ? "text-[#14253f]" : textColor}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY (FIXED) --- */}
      <div
        className={`fixed inset-0 bg-white z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden 
        ${isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        overflow-hidden touch-none`}
      // 👆 'touch-none' disables scroll gestures entirely on this div
      >
        <nav className="flex flex-col items-center gap-8 text-center px-6 w-full">
          {menuItems?.map((link, idx) => (
            <Link
              key={idx}
              href={link.link || "/"}
              onClick={() => setIsMobileOpen(false)}
              className="text-3xl font-black text-[#14253f] uppercase tracking-tighter hover:text-[#cd7d51] transition-colors"
            >
              {link.title}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest border border-[#14253f] text-[#14253f] hover:bg-[#14253f] hover:text-white transition-all"
          >
            Partner With Us
            <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;