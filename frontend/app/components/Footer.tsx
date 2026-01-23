import Link from "next/link";
import React from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#14253f] text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-6">
              Akaame<span className="text-[#cd7d51]">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your strategic partner for premium footwear and leather goods manufacturing.
              Bridging artisanal craftsmanship with global industrial standards.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Facebook size={18} />} />
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#cd7d51]">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/capabilities">Capabilities</FooterLink>
              <FooterLink href="/quality">Quality Control</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#cd7d51]">Products</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <FooterLink href="/products">Leather Footwear</FooterLink>
              <FooterLink href="/products">Luxury Bags</FooterLink>
              <FooterLink href="/products">Small Leather Goods</FooterLink>
              <FooterLink href="/accessories">Lifestyle Accessories</FooterLink>
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#cd7d51]">Reach Us</h4>
            <ul className="space-y-6 text-sm text-gray-400">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-[#cd7d51] shrink-0 mt-0.5" />
                <span>Phase III, Industrial Area,<br />Jaipur, Rajasthan, India</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-[#cd7d51] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-[#cd7d51] shrink-0" />
                <span>exports@akaame.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Akaame Exports Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <span>ISO 9001:2015</span>
            <span>SA8000 Certified</span>
            <span>Sedex Member</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#cd7d51] hover:text-white transition-all">
      {icon}
    </a>
  );
}