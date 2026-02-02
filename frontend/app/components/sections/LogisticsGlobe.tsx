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
const GLOBAL_SCALE = 2.6; // 👈 Optimized Big Globe
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

  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    if (isTransitioning) {
      setBgOpacity(0);
    }
  }, [isTransitioning]);

  const handleImageLoad = () => {
    // Only fade in if we have an active hub and aren't moving
    if (activeHub && !isTransitioning) {
      setBgOpacity(0.6); // 👈 Increased visibility from 0.4 to 0.6
    }
  };

  useEffect(() => {
    if (activeHub && !isTransitioning) {
      // If image is already cached/loaded, this might need a trigger, 
      // but Next.js Image onLoad handles it well. 
      // We initialize opacity to 0 on hub change via isTransitioning
    }
  }, [activeHub]);

  return (
    <section
      className="py-24 bg-transparent overflow-hidden relative min-h-[800px] flex items-center"
      style={{
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
      }}
    >

      {/* 🚀 RESET BUTTON (Moved to Root for Z-Index Dominance) */}
      {activeHub && (
        <button
          type="button"
          onClick={resetView}
          aria-label="Reset Map View"
          className="absolute top-24 right-6 lg:top-auto lg:bottom-10 lg:right-10 bg-white/10 hover:bg-[#cd7d51] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 z-40 pointer-events-auto group animate-in fade-in zoom-in w-12 h-12 flex items-center justify-center"
        >
          <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        </button>
      )}

      {/* IMAGE LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 👇 FIXED: Seamless Multi-stop Gradient (No Blur) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(90deg, #0f1b2d 0%, rgba(15, 27, 45, 0.98) 15%, rgba(15, 27, 45, 0.85) 35%, rgba(15, 27, 45, 0.4) 60%, transparent 95%)'
          }}
        />

        {/* Global Background Image */}
        {bgImage && (
          <Image
            src={bgImage}
            alt="Hub Background"
            fill
            className="object-cover transition-opacity duration-1000"
            style={{ opacity: isTransitioning ? 0 : bgOpacity }}
            sizes="100vw"
            priority={false}
            onLoad={handleImageLoad}
          />
        )}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full h-full pointer-events-none lg:pointer-events-auto flex flex-col justify-end pb-32 lg:pb-0 lg:block">

        {/* LEFT: Content */}
        <div className="relative z-10 lg:absolute lg:inset-0 lg:flex lg:items-center pointer-events-none">
          <div className="lg:w-1/2 pointer-events-auto">

            {/* Mobile: Seamless Fade - Reduced Opacity for Map Visibility */}
            <div className="bg-gradient-to-t from-black/30 via-transparent to-transparent p-6 lg:p-0 lg:bg-transparent animate-in slide-in-from-bottom-10 duration-700 -mx-6 lg:mx-0 pt-10 lg:pt-0">

              <div className="px-6 lg:px-0">
                {/* MOVED TITLE ABOVE IMAGE */}
                <h2 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2 text-shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#cd7d51] animate-pulse"></span>
                  Global Logistics Network
                </h2>

                {/* Active City Image "Postcard" (UPPER IMAGE) */}
                <div className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  {activeHub && (
                    <div className="relative w-full h-40 lg:hidden mb-6 rounded-xl overflow-hidden mx-auto w-[95%] shadow-lg">
                      <Image
                        src={getBackgroundImage(activeHub) || "/globe-fallback.png"}
                        alt={activeHub}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      {/* Seamless Gradient Wipe */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b2d] via-transparent to-transparent opacity-90" />

                      <div className="absolute bottom-3 left-4 text-white font-bold text-3xl drop-shadow-md z-10 tracking-tighter">
                        {activeHub}
                      </div>
                    </div>
                  )}
                </div>

                <div className={`transition-all duration-1000 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

                  <h3 className="text-3xl lg:text-6xl font-black text-white tracking-tighter mb-4 lg:mb-8 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] hidden lg:block">                    {activeHub ? activeHub.toUpperCase() : "CONNECTING CONTINENTS."}
                  </h3>

                  {/* Mobile: Condensed Title (Hidden if hub active to save space) */}
                  {!activeHub && (
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-4 lg:hidden drop-shadow-xl">
                      CONNECTING CONTINENTS.
                    </h3>
                  )}

                  <p className="text-gray-200 text-sm lg:text-lg mb-6 lg:mb-10 max-w-md leading-relaxed drop-shadow-md font-medium text-shadow-sm">
                    {activeHub
                      ? `Live operations tracking active.`
                      : "Select a global hub to visualize real-time supply chain data."
                    }
                  </p>
                </div>

                {/* Wrapped Buttons (Transparent for seamless look) */}
                <div className="flex flex-wrap gap-2 lg:gap-3 mb-4 lg:mb-8 justify-start lg:justify-start">
                  {locations.map((loc) => (
                    <button
                      key={loc.name}
                      type="button"
                      onClick={() => flyTo(loc)}
                      className={`flex-shrink-0 px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 rounded-md ${activeHub === loc.name
                        ? "bg-[#cd7d51] border-[#cd7d51] text-white shadow-[0_0_15px_rgba(205,125,81,0.6)]"
                        : "border-white/20 text-gray-300 hover:border-white hover:text-white bg-black/20 backdrop-blur-[2px]"
                        }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-3 lg:gap-4">
                  <div className="p-3 lg:px-4 lg:py-2 bg-black/20 border border-white/10 rounded-md shadow-none lg:w-auto">
                    <div className="text-xl lg:text-base font-bold text-white lg:inline-block lg:mr-2">{locations.length}+</div>
                    <div className="text-[9px] lg:text-[10px] uppercase tracking-widest text-gray-400 lg:inline-block">Active Hubs</div>
                  </div>

                  <div className="p-3 lg:px-4 lg:py-2 bg-black/20 border border-white/10 rounded-md shadow-none lg:w-auto">
                    <div className="text-xl lg:text-base font-bold text-white lg:inline-block lg:mr-2">24/7</div>
                    <div className="text-[9px] lg:text-[10px] uppercase tracking-widest text-gray-400 lg:inline-block">Global Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Globe */}
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-0 lg:static lg:w-1/2 lg:ml-auto h-full lg:h-[700px]">
          {/* Scanner Line Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#cd7d51]/10 to-transparent z-10 animate-scan pointer-events-none hidden lg:block" />

          <div className="absolute inset-0 bg-[#cd7d51]/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />

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
                <div style="background: rgba(15, 27, 45, 0.9); border: 1px solid #cd7d51; padding: 8px 12px; border-radius: 6px; font-family: sans-serif; text-align: center; box-shadow: 0 0 15px rgba(205,125,81,0.3);">
                    <div style="color: white; font-weight: bold; font-size: 14px;">${d.name}</div>
                    <div style="color: #cd7d51; font-size: 10px; letter-spacing: 1px;">${d.type === 'source' ? 'HQ' : 'HUB'}</div>
                </div>
            `}
          />
        </div>
      </div>

      {/* 🚀 BOTTOM MASK (Smooth Fade to Footer) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default LogisticsGlobe;