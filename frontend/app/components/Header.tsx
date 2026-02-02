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
    alt?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ menuItems, logo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Logic: Transparent only on Home Page at the top
  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMobileOpen;

  // Colors for text/icons based on transparency
  const textColor = isTransparent ? "text-white" : "text-[#14253f]";

  // LOGO RESOLUTION LOGIC
  const getLogoSrc = () => {
    if (!logo) return null;

    // 1. Check if the toggle is set to use External URL
    if (logo.useCustomUrl && logo.logoUrl) {
      return logo.logoUrl;
    }

    // 2. Check for Sanity Image Upload
    if (logo.logoImage?.asset) {
      try {
        return urlFor(logo.logoImage).url();
      } catch (e) {
        console.error("Sanity URL transformation error:", e);
        return null;
      }
    }

    return null;
  };

  const logoSrc = getLogoSrc();
  const logoAlt = logo?.alt || "Akaame Exports Logo";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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

          {/* DYNAMIC LOGO */}
          <Link href="/" className="z-[100]" onClick={() => setIsMobileOpen(false)}>
            {logoSrc ? (
              <div className="relative h-10 w-40 flex items-center">
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className={`h-full w-auto object-contain transition-all duration-500 ${isTransparent ? "brightness-0 invert" : ""
                    }`}
                />
              </div>
            ) : (
              /* Fallback to Text Logo if no logo source is found */
              <div className="flex flex-col leading-none">
                <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${isMobileOpen ? "text-[#14253f]" : textColor}`}>
                  AKAAME<span className="text-[#cd7d51]">.</span>
                </span>
                <span className={`text-[0.6rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isMobileOpen ? "text-neutral-500" : isTransparent ? "text-neutral-300" : "text-neutral-500"}`}>
                  Exports Pvt. Ltd.
                </span>
              </div>
            )}
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems?.map((link, idx) => {
              const safeLink = link.link || "/";
              const isActive = pathname === safeLink;

              return (
                <Link
                  key={link._key || idx}
                  href={safeLink}
                  className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 hover:text-[#cd7d51] ${isActive ? "text-[#cd7d51]" : textColor
                    }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTA BUTTON */}
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

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            className={`lg:hidden z-[100] transition-colors duration-500 ${isMobileOpen ? "text-[#14253f]" : textColor
              }`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-white z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
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

          <div className="w-12 h-[2px] bg-gray-100 my-4" />

          <Link
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="text-sm font-bold text-[#cd7d51] uppercase tracking-widest border-b-2 border-[#cd7d51] pb-1"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;