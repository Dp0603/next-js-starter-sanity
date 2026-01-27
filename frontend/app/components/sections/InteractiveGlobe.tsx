// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import createGlobe from "cobe";
// import { useSpring, animated } from "react-spring";

// // 1. Define your locations (Lat/Long)
// const LOCATIONS = [
//     { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
//     { name: "Dubai", lat: 25.2048, lng: 55.2708 },
//     { name: "Singapore", lat: 1.3521, lng: 103.8198 },
//     { name: "London", lat: 51.5074, lng: -0.1278 },
//     { name: "New York", lat: 40.7128, lng: -74.0060 },
// ];

// const InteractiveGlobe = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const pointerInteracting = useRef(null);
//     const pointerInteractionMovement = useRef(0);

//     // State to track focus
//     const [focusLocation, setFocusLocation] = useState(LOCATIONS[0]); // Default: Ahmedabad

//     // 2. Spring Animation for smooth rotation/zoom
//     const [{ r, phi, theta, scale }, api] = useSpring(() => ({
//         r: 1, // Drag rotation
//         phi: 0, // Vertical rotation
//         theta: 0.3, // Horizontal rotation
//         scale: 1, // Zoom level
//         config: {
//             mass: 1,
//             tension: 280,
//             friction: 40,
//             precision: 0.001,
//         },
//     }));

//     // 3. Handle "Fly To" Logic
//     const flyTo = (location: any) => {
//         setFocusLocation(location);
//         // Calculate simple rotation target
//         const targetPhi = (location.lat * Math.PI) / 180;
//         const targetTheta = (location.lng * Math.PI) / 180;

//         api.start({
//             phi: targetPhi,
//             theta: targetTheta,
//             scale: 1.5, // Zoom in effect
//         });
//     };

//     useEffect(() => {
//         let width = 0;

//         const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
//         window.addEventListener("resize", onResize);
//         onResize();

//         if (!canvasRef.current) return;

//         const globe = createGlobe(canvasRef.current, {
//             devicePixelRatio: 2,
//             width: width * 2,
//             height: width * 2,
//             phi: 0,
//             theta: 0.3,
//             dark: 1, // 1 = Dark Mode
//             diffuse: 1.2,
//             mapSamples: 16000, // Number of dots (Higher = denser map)
//             mapBrightness: 6,
//             baseColor: [0.08, 0.11, 0.17], // Dark Navy Background #14253f converted to RGB
//             markerColor: [0.8, 0.49, 0.31], // Orange Accent #cd7d51
//             glowColor: [0.1, 0.15, 0.25],
//             markers: LOCATIONS.map(loc => ({ location: [loc.lat, loc.lng], size: 0.05 })),
//             onRender: (state) => {
//                 // This runs on every animation frame

//                 // Connect spring values to globe state
//                 state.phi = phi.get();
//                 state.theta = theta.get();

//                 const width = canvasRef.current?.offsetWidth || 0;
//                 state.width = width * 2;
//                 state.height = width * 2;
//                 state.scale = scale.get(); // Dynamic Zoom
//             },
//         });

//         return () => {
//             globe.destroy();
//             window.removeEventListener("resize", onResize);
//         };
//     }, []);

//     return (
//         <section className="py-24 bg-[#0f1b2d] overflow-hidden relative">
//             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//                 {/* LEFT: Text Content */}
//                 <div className="relative z-10">
//                     <h2 className="text-[#cd7d51] font-bold uppercase tracking-widest text-xs mb-6">
//                         Global Network
//                     </h2>
//                     <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
//                         BORDERLESS <br /> LOGISTICS.
//                     </h3>
//                     <p className="text-gray-400 text-lg mb-10 max-w-md">
//                         Seamlessly connecting manufacturing hubs in India with premium markets across the globe. Click a location to explore our network.
//                     </p>

//                     {/* City Buttons */}
//                     <div className="flex flex-wrap gap-4">
//                         {LOCATIONS.map((loc) => (
//                             <button
//                                 key={loc.name}
//                                 onClick={() => flyTo(loc)}
//                                 className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border transition-all ${focusLocation.name === loc.name
//                                         ? "bg-[#cd7d51] border-[#cd7d51] text-white"
//                                         : "border-white/10 text-gray-400 hover:border-white hover:text-white"
//                                     }`}
//                             >
//                                 {loc.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* RIGHT: The 3D Globe */}
//                 <div className="relative h-[500px] w-full flex items-center justify-center">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b2d] via-transparent to-transparent z-10" />

//                     <canvas
//                         ref={canvasRef}
//                         style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
//                         className="opacity-90 hover:opacity-100 transition-opacity cursor-move"
//                     />
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default InteractiveGlobe;