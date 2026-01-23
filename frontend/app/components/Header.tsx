import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    // 'fixed' makes it stick to top. 'bg-transparent' lets the hero image show through.
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter uppercase text-white">
          Akaame<span className="text-[#cd7d51]">.</span>
          <span className="block text-[10px] tracking-widest font-normal text-white/80 opacity-0 lg:opacity-100 transition-opacity">Exports Pvt. Ltd.</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Capabilities', 'Products', 'Quality', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest text-white/90 hover:text-[#cd7d51] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-[#14253f] text-xs font-bold uppercase tracking-widest hover:bg-[#cd7d51] hover:text-white transition-colors rounded-sm"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;