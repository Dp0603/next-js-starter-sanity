import React from "react";

export default function Loading() {
    return (
        <div className="w-full min-h-screen bg-white pt-32 pb-12 px-6 lg:px-12 animate-pulse">
            <div className="max-w-[1400px] mx-auto">

                {/* 1. Hero Text Skeleton */}
                <div className="max-w-4xl mt-12 space-y-6">
                    <div className="h-4 w-32 bg-gray-200 rounded-sm"></div>
                    <div className="h-16 w-3/4 bg-gray-200 rounded-sm"></div>
                    <div className="h-16 w-1/2 bg-gray-200 rounded-sm"></div>
                </div>

                {/* 2. Hero Image Skeleton */}
                <div className="mt-12 w-full h-[400px] lg:h-[600px] bg-gray-200 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer" />
                </div>

                {/* 3. Content Strips Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-sm border border-gray-200 p-6 flex flex-col justify-end">
                            <div className="h-8 w-1/2 bg-gray-200 mb-4 rounded-sm"></div>
                            <div className="h-4 w-full bg-gray-200 rounded-sm"></div>
                            <div className="h-4 w-2/3 bg-gray-200 mt-2 rounded-sm"></div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}