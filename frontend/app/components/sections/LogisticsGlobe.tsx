"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

// 1. Define Logistics Hubs
const HUBS = [
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, type: "source" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, type: "target" },
  { name: "London", lat: 51.5074, lng: -0.1278, type: "target" },
  { name: "New York", lat: 40.7128, lng: -74.0060, type: "target" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, type: "target" },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, type: "target" },
];

// 2. Generate Shipping Routes
const ROUTES = HUBS.filter(h => h.type === "target").map(target => ({
  startLat: 23.0225,
  startLng: 72.5714,
  endLat: target.lat,
  endLng: target.lng,
  color: ["#cd7d51", "#ffffff"],
}));

const LogisticsGlobe = () => {
  // 👇 FIX: Initialize with null to solve TypeScript warning
  const globeEl = useRef<any>(null);
  const [width, setWidth] = useState(0);
  const [activeHub, setActiveHub] = useState("Ahmedabad");

  // 3. The "Fly To" Animation Logic
  const flyTo = (hub: any) => {
    setActiveHub(hub.name);
    
    // Use the built-in pointOfView method for smooth travel
    globeEl.current.pointOfView({
      lat: hub.lat,
      lng: hub.lng,
      altitude: 1.5 // Zoom Level (Lower = Closer)
    }, 1500); // 1.5 seconds travel time
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth > 1400 ? 700 : window.innerWidth - 50);
    window.addEventListener("resize", handleResize);
    handleResize();
    
    // Initial Spin
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.pointOfView({ lat: 20, lng: 70, altitude: 2 });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-24 bg-[#0f1b2d] overflow-hidden relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* TEXT CONTENT (Left Side) */}
        <div className="relative z-10 order-2 lg:order-1">
            <h2 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-6">
                Global Logistics Network
            </h2>
            <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
                CONNECTING <br /> CONTINENTS.
            </h3>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                Visualizing our real-time supply chain. Click on a location below to track our presence in that region.
            </p>

            {/* 👇 NEW: Clickable Hub Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {HUBS.map((hub) => (
                <button
                  key={hub.name}
                  onClick={() => flyTo(hub)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                    activeHub === hub.name
                      ? "bg-[#cd7d51] border-[#cd7d51] text-white"
                      : "border-white/10 text-gray-500 hover:border-white hover:text-white"
                  }`}
                >
                  {hub.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-white/10 bg-white/5">
                    <div className="text-2xl font-bold text-white mb-1">15+</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Countries Served</div>
                </div>
                <div className="p-4 border border-white/10 bg-white/5">
                    <div className="text-2xl font-bold text-white mb-1">T+3</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Dispatch Time</div>
                </div>
            </div>
        </div>

        {/* 3D GLOBE (Right Side) */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 h-[500px] lg:h-[700px] cursor-move">
            <div className="absolute inset-0 bg-[#cd7d51]/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />
            
            <Globe
                ref={globeEl}
                width={width}
                height={width} 
                backgroundColor="rgba(0,0,0,0)"
                
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                atmosphereColor="#cd7d51"
                atmosphereAltitude={0.15}
                
                arcsData={ROUTES}
                arcColor="color"
                arcDashLength={0.4}
                arcDashGap={4}
                arcDashAnimateTime={2000}
                arcStroke={1}
                
                ringsData={HUBS}
                ringColor={() => (t: any) => `rgba(205, 125, 81, ${1 - t})`}
                ringMaxRadius={5}
                ringPropagationSpeed={2}
                ringRepeatPeriod={1000}
                
                labelsData={HUBS}
                labelLat="lat"
                labelLng="lng"
                labelText="name"
                labelSize={1.5}
                labelDotRadius={0.5}
                labelColor={() => "#ffffff"}
                labelResolution={2}
                
                // 👇 NEW: Click on the 3D Label to Zoom
                onLabelClick={(hub: any) => flyTo(hub)}
            />
        </div>

      </div>
    </section>
  );
};

export default LogisticsGlobe;