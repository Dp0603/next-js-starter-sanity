"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // 1. Logic: Transparent only on Home Page top
  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  // 2. Colors based on state
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

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CAPABILITIES", path: "/capabilities" },
    { name: "PRODUCTS", path: "/products" },
    { name: "QUALITY", path: "/quality" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? "bg-transparent py-8" : "bg-white/95 backdrop-blur-md shadow-sm py-4"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* LOGO SECTION */}
        <Link href="/" className="group">
          <div className="flex flex-col leading-none">
            <span className={`text-2xl font-black tracking-tighter ${logoColor} transition-colors`}>
              AKAAME
              <span className="text-[#cd7d51]"></span>
            </span>
            <span className={`text-[0.6rem] font-bold tracking-[0.2em] uppercase ${subLogoColor} transition-colors`}>
              Exports Pvt. Ltd.
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 hover:text-[#cd7d51] ${isActive ? "text-[#cd7d51]" : textColor
                  }`}
              >
                {link.name}
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
        {/* 👇 FIX: Added type="button" and aria-label for accessibility */}
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
            aria-hidden="true" // Hides the SVG itself from screen readers since the button has a label
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