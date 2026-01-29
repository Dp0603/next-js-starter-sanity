"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  menuItems: {
    title?: string;
    link?: string;
    _key?: string;
  }[];
}

const Header: React.FC<HeaderProps> = ({ menuItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Logic: Transparent only on Home Page at the top
  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !isMobileOpen;

  // Colors based on state
  const textColor = isTransparent ? "text-white" : "text-[#14253f]";
  const subLogoColor = isTransparent ? "text-neutral-300" : "text-neutral-500";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileOpen ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group z-50" onClick={() => setIsMobileOpen(false)}>
            <div className="flex flex-col leading-none">
              <span className={`text-2xl font-black tracking-tighter transition-colors ${isMobileOpen ? "text-[#14253f]" : textColor}`}>
                AKAAME
                <span className="text-[#cd7d51]">.</span>
              </span>
              <span className={`text-[0.6rem] font-bold tracking-[0.2em] uppercase transition-colors ${isMobileOpen ? "text-neutral-500" : subLogoColor}`}>
                Exports Pvt. Ltd.
              </span>
            </div>
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
            className={`lg:hidden z-50 transition-colors ${isMobileOpen ? "text-[#14253f]" : textColor}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (The Fix) */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center">
          {menuItems?.map((link, idx) => (
            <Link
              key={idx}
              href={link.link || "/"}
              onClick={() => setIsMobileOpen(false)}
              className="text-2xl font-black text-[#14253f] uppercase tracking-tighter hover:text-[#cd7d51] transition-colors"
            >
              {link.title}
            </Link>
          ))}

          <div className="w-12 h-[2px] bg-gray-100 my-4" />

          <Link
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="text-sm font-bold text-[#cd7d51] uppercase tracking-widest border-b border-[#cd7d51] pb-1"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;