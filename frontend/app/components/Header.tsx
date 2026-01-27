"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

// 👇 FIX: Added '?' to make these optional to satisfy TypeScript
interface HeaderProps {
  menuItems: {
    title?: string;
    link?: string;
    _key?: string; // Sanity often sends a key
  }[];
}

const Header: React.FC<HeaderProps> = ({ menuItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  const textColor = isTransparent ? "text-white" : "text-[#14253f]";
  const logoColor = isTransparent ? "text-white" : "text-[#14253f]";
  const subLogoColor = isTransparent ? "text-neutral-400" : "text-neutral-500";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? "bg-transparent py-8" : "bg-white/95 backdrop-blur-md shadow-sm py-4"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="group">
          <div className="flex flex-col leading-none">
            <span className={`text-2xl font-black tracking-tighter ${logoColor} transition-colors`}>
              AKAAME
              <span className="text-[#cd7d51]">.</span>
            </span>
            <span className={`text-[0.6rem] font-bold tracking-[0.2em] uppercase ${subLogoColor} transition-colors`}>
              Exports Pvt. Ltd.
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems?.map((link, idx) => {
            // 👇 FIX: Safely handle potentially undefined links
            const safeLink = link.link || "/";
            const safeTitle = link.title || "Untitled";
            const isActive = pathname === safeLink;

            return (
              <Link
                key={link._key || idx}
                href={safeLink}
                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 hover:text-[#cd7d51] ${isActive ? "text-[#cd7d51]" : textColor
                  }`}
              >
                {safeTitle}
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden lg:block">
          <Button
            to="/contact"
            variant={isTransparent ? "light" : "dark"}
            className="!py-3 !px-6 !text-[10px]"
          >
            Partner With Us
          </Button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          aria-label="Toggle mobile menu"
          className={`lg:hidden ${textColor}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;