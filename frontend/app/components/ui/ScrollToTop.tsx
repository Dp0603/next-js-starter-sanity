'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Reveal after 400px
            setIsVisible(window.scrollY > 400);

            // Calculate smooth progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

 return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[99] w-16 h-16 group active:scale-90 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
            {/* 1. Outer Glass Shell - Stays fixed circle */}
            {/* We keep mix-blend-difference here so the BORDER and ARROW stay visible */}
            <div className="absolute inset-0 rounded-full border border-white/30 bg-white/5 backdrop-blur-md shadow-2xl mix-blend-difference" />

            {/* 2. The Liquid Masked Area */}
            <div className="absolute inset-[2px] rounded-full overflow-hidden mask-image-circle">

                {/* Layer 1: The Main Wavy Copper Water (Now Blended) */}
                <div
                    className="absolute bottom-0 left-0 w-[400%] h-full bg-[#cd7d51] transition-transform duration-1000 ease-out mix-blend-overlay"
                    style={{
                        transform: `translateY(${100 - scrollProgress}%)`,
                    }}
                >
                    <svg className="absolute top-[-20px] left-0 w-full h-[20px] animate-[wave-move_4s_linear_infinite]" viewBox="0 0 1200 24" preserveAspectRatio="none">
                        <path d="M0 24V0C150 0 150 20 300 20C450 20 450 0 600 0C750 0 750 20 900 20C1050 20 1050 0 1200 0V24H0Z" fill="#cd7d51" />
                    </svg>
                </div>

                {/* Layer 2: Secondary Shimmer (Buttery Highlight) */}
                <div
                    className="absolute bottom-0 left-0 w-[400%] h-full bg-white/20 blur-[1px] transition-transform duration-1500 ease-out mix-blend-soft-light"
                    style={{
                        transform: `translateY(${102 - scrollProgress}%)`,
                    }}
                >
                    <svg className="absolute top-[-25px] left-0 w-full h-[25px] animate-[wave-move_7s_linear_infinite_reverse]" viewBox="0 0 1200 24" preserveAspectRatio="none" opacity="0.6">
                        <path d="M0 24V0C150 0 150 20 300 20C450 20 450 0 600 0C750 0 750 20 900 20C1050 20 1050 0 1200 0V24H0Z" fill="white" />
                    </svg>
                </div>
            </div>

            {/* 3. The Arrow Icon - Stays sharp and visible */}
            <div className="relative z-10 flex items-center justify-center h-full text-white mix-blend-difference transition-transform duration-500 group-hover:-translate-y-1">
                <ArrowUp size={26} strokeWidth={3} />
            </div>
        </button>
    );
}