'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';

// 🚀 OPTIMIZATION: Lazy load the heavy 3D Globe component
// We must do this in a Client Component to use { ssr: false }
const LogisticsGlobe = dynamic(() => import('./LogisticsGlobe'), {
    ssr: false,
    loading: () => <div className="h-[800px] bg-[#0f1b2d] border-y border-white/10 animate-pulse" />
});

export default function LogisticsGlobeWrapper(props: any) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 } // 🚀 LOAD STRATEGY: Only load when 50% of the globe section is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="min-h-[800px] bg-[#0f1b2d]">
            {shouldLoad ? (
                <LogisticsGlobe {...props} />
            ) : (
                <div className="h-[800px] bg-[#0f1b2d] border-y border-white/10" />
            )}
        </div>
    );
}
