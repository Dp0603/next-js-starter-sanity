"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image"; // 👈 IMPORT THIS
import { RefreshCw } from "lucide-react";

const Globe = dynamic(
  () => Promise.resolve(require("react-globe.gl")),
  { ssr: false }
) as any;

// --- CONFIGURABLE CONSTANTS ---
const GLOBAL_SCALE = 2.0;
const LAPTOP_REDUCTION = 0.55;
const GLOBE_LIMITS = { min: 350, max: 900 };
const ZOOM_ALTITUDE = 1.8;
const RESET_ALTITUDE = 2.5;
// ------------------------------

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: string;
  image?: string;
}

interface LogisticsGlobeProps {
  locations?: Location[];
}

const CITY_IMAGES: Record<string, string> = {
  "Ahmedabad": "https://images.unsplash.com/photo-1571626786659-1974780df997?q=80&w=1600&auto=format&fit=crop",
  "Mumbai": "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1600&auto=format&fit=crop",
  "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=1600&auto=format&fit=crop",
  "London": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop",
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop",
  "Singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop",
  "Sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop",
  "Australia": "https://images.unsplash.com/photo-1523482580672-01e6f2eb60b3?q=80&w=1600&auto=format&fit=crop",
  "Portugal": "https://images.unsplash.com/photo-1555881400-74d7acaacd81?q=80&w=1600&auto=format&fit=crop",
};

const LogisticsGlobe: React.FC<LogisticsGlobeProps> = ({ locations = [] }) => {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: containerWidth } = entry.contentRect;
        const windowWidth = window.innerWidth;

        const isLaptop = windowWidth >= 1024 && windowWidth <= 1440;
        const multiplier = isLaptop ? (GLOBAL_SCALE * LAPTOP_REDUCTION) : GLOBAL_SCALE;

        let calculatedSize = containerWidth * multiplier;
        calculatedSize = Math.max(GLOBE_LIMITS.min, Math.min(calculatedSize, GLOBE_LIMITS.max));

        setDimensions({
          width: calculatedSize,
          height: calculatedSize * 0.9
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getBackgroundImage = (hubName: string | null) => {
    if (!hubName) return null;
    const location = locations.find(l => l.name === hubName);
    if (location && location.image) return location.image;
    if (CITY_IMAGES[hubName]) return CITY_IMAGES[hubName];
    return "/globe-fallback.png";
  };

  const routes = useMemo(() => {
    const sourceHub = locations.find(loc => loc.type === 'source') || locations[0];
    if (!sourceHub) return [];

    return locations
      .filter(loc => loc.name !== sourceHub.name)
      .map(target => ({
        startLat: sourceHub.lat,
        startLng: sourceHub.lng,
        endLat: target.lat,
        endLng: target.lng,
        color: ["rgba(205, 125, 81, 0.8)", "rgba(255, 255, 255, 0.2)"]
      }));
  }, [locations]);

  const flyTo = (loc: Location) => {
    setIsTransitioning(true);

    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false;
      globeEl.current.pointOfView({
        lat: loc.lat,
        lng: loc.lng,
        altitude: ZOOM_ALTITUDE
      }, 2000);
    }

    setTimeout(() => {
      setActiveHub(loc.name);
      setIsTransitioning(false);
    }, 1200);
  };

  const resetView = () => {
    setIsTransitioning(true);
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: RESET_ALTITUDE }, 2000);
      setTimeout(() => {
        setActiveHub(null);
        setIsTransitioning(false);
        if (globeEl.current) {
          globeEl.current.controls().autoRotate = true;
        }
      }, 2000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (globeEl.current) {
        // 🚀 INTERACTION: Disable manual zoom and rotate to prevent scroll-jacking
        globeEl.current.controls().enableZoom = false;
        globeEl.current.controls().enableRotate = false;

        if (!activeHub) {
          globeEl.current.controls().autoRotate = true;
          globeEl.current.controls().autoRotateSpeed = 0.6;
        }
      }
    }, 1000);
  }, [activeHub]);

  if (!locations || locations.length === 0) return null;
  const bgImage = getBackgroundImage(activeHub);

  return (
    <section className="py-24 bg-[#0f1b2d] overflow-hidden relative border-y border-white/10 min-h-[800px] flex items-center">

      {/* IMAGE LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b2d]/95 via-[#0f1b2d]/85 to-transparent z-10 backdrop-blur-[2px]" />

        {/* 👇 OPTIMIZED BACKGROUND IMAGE */}
        {bgImage && (
          <Image
            src={bgImage}
            alt="Hub Background"
            fill
            className={`object-cover transition-opacity duration-1000 ${!isTransitioning && activeHub ? 'opacity-40' : 'opacity-0'}`}
            sizes="100vw"
            priority={false} // Lazy load since it's background
          />
        )}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* LEFT: Content */}
        <div className="order-2 lg:order-1">
          <h2 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-6">
            Global Network
          </h2>

          <div className={`transition-all duration-1000 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-none drop-shadow-xl">
              {activeHub ? activeHub : "CONNECTING CONTINENTS."}
            </h3>
            <p className="text-gray-300 text-lg mb-10 max-w-md leading-relaxed drop-shadow-md font-medium">
              {activeHub
                ? `Tracking active logistics and real-time operations in ${activeHub}.`
                : "Visualizing our real-time supply chain. Hover over a hub for details or click to track."
              }
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {locations.map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => flyTo(loc)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${activeHub === loc.name
                  ? "bg-[#cd7d51] border-[#cd7d51] text-white shadow-[0_0_20px_rgba(205,125,81,0.4)]"
                  : "border-white/10 text-gray-400 hover:border-white hover:text-white backdrop-blur-sm bg-black/20"
                  }`}
              >
                {loc.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-white/10 bg-black/20 backdrop-blur-md rounded-sm">
              <div className="text-2xl font-bold text-white mb-1">{locations.length}+</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400">Active Hubs</div>
            </div>
            <div className="p-4 border border-white/10 bg-black/20 backdrop-blur-md rounded-sm">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400">Global Support</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Globe */}
        <div ref={containerRef} className="relative flex items-center justify-center order-1 lg:order-2 h-[500px] lg:h-[700px] cursor-move">
          <div className="absolute inset-0 bg-[#cd7d51]/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />

          <Globe
            ref={globeEl}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            atmosphereColor="#cd7d51"
            atmosphereAltitude={0.15}
            arcsData={routes}
            arcColor="color"
            arcDashLength={0.5}
            arcDashGap={2}
            arcDashAnimateTime={1500}
            arcStroke={1}
            ringsData={locations}
            ringColor={() => (t: any) => `rgba(205, 125, 81, ${1 - t})`}
            ringMaxRadius={6}
            ringPropagationSpeed={3}
            ringRepeatPeriod={800}
            labelsData={locations}
            labelLat="lat"
            labelLng="lng"
            labelText="name"
            labelSize={1.5}
            labelDotRadius={0.5}
            labelColor={() => "#ffffff"}
            labelResolution={2}
            onLabelClick={(loc: any) => flyTo(loc)}
            labelLabel={(d: any) => `
                <div style="background: rgba(15, 27, 45, 0.9); border: 1px solid #cd7d51; padding: 8px 12px; border-radius: 6px; font-family: sans-serif; text-align: center;">
                    <div style="color: white; font-weight: bold; font-size: 14px;">${d.name}</div>
                    <div style="color: #cd7d51; font-size: 10px;">${d.type === 'source' ? '[MAIN HUB]' : '[NODE]'}</div>
                </div>
            `}
          />

          {activeHub && (
            <button
              type="button"
              onClick={resetView}
              aria-label="Reset Map View"
              className="absolute bottom-10 right-10 bg-white/10 hover:bg-[#cd7d51] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 z-50 group"
            >
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default LogisticsGlobe;