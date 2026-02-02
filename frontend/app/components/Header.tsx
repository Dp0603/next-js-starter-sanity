"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

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

  const getLogoSources = () => {
    if (!logo) return { desktop: null, mobile: null };

    let desktop = null;
    let mobile = null;

    if (logo.useCustomUrl) {
      desktop = logo.logoUrl || null;
      mobile = logo.logoMobileUrl || desktop;
    } else {
      desktop = logo.logoImage?.asset ? urlFor(logo.logoImage).url() : null;
      mobile = logo.logoMobileImage?.asset ? urlFor(logo.logoMobileImage).url() : desktop;
    }
    return { desktop, mobile };
  };

  const { desktop: desktopSrc, mobile: mobileSrc } = getLogoSources();
  const logoAlt = logo?.alt || "Akaame Exports Logo";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
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

          <Link href="/" className="z-[100]" onClick={() => setIsMobileOpen(false)}>
            {desktopSrc || mobileSrc ? (
              <div className="relative h-10 flex items-center">
                {/* DESKTOP LOGO - Filter Removed */}
                {desktopSrc && (
                  <img
                    src={desktopSrc}
                    alt={logoAlt}
                    className="h-full w-auto object-contain hidden lg:block transition-all duration-500"
                  />
                )}
                {/* MOBILE LOGO - Filter Removed */}
                {mobileSrc && (
                  <img
                    src={mobileSrc}
                    alt={logoAlt}
                    className="h-full w-auto object-contain lg:hidden transition-all duration-500"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col leading-none">
                <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${isMobileOpen ? "text-[#14253f]" : textColor}`}>
                  AKAAME<span className="text-[#cd7d51]">.</span>
                </span>
              </div>
            )}
          </Link>

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

          <button
            type="button"
            className={`lg:hidden z-[100] transition-colors duration-500 ${isMobileOpen ? "text-[#14253f]" : textColor}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 bg-white z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <nav className="flex flex-col items-center gap-8 text-center">
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
        </nav>
      </div>
    </>
  );
};

export default Header;