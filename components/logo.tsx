"use client";

import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "sm", showText = true, className = "" }: LogoProps) {
  const config = {
    sm: { box: "w-9 h-9", img: 36, text: "text-lg", radius: "rounded-xl" },
    md: { box: "w-11 h-11", img: 44, text: "text-xl", radius: "rounded-2xl" },
    lg: { box: "w-16 h-16", img: 64, text: "text-2xl", radius: "rounded-2xl" },
    hero: { box: "w-24 h-24 sm:w-28 sm:h-28", img: 112, text: "text-4xl", radius: "rounded-3xl" },
  }[size];

  return (
    <div className={`brand-container inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* 3D Glossy Squircle Badge replicating the uploaded logo style */}
      <div
        className={`relative ${config.box} ${config.radius} p-0.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105`}
        style={{
          background: "linear-gradient(135deg, #c7ff47 0%, #a3ff12 40%, #52b800 100%)",
          boxShadow: "0 0 20px rgba(163, 255, 18, 0.45), 0 0 40px rgba(163, 255, 18, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.6)",
        }}
      >
        {/* Inner Glossy Glass Container */}
        <div className={`relative w-full h-full ${config.radius} overflow-hidden bg-black flex items-center justify-center`}>
          {/* Top Gloss Reflection Sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none z-10 rounded-t-xl" />

          {/* Actual Logo Image */}
          <Image
            src="/logo.png"
            alt="AIFindr Glossy Logo"
            width={config.img}
            height={config.img}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            priority
          />
        </div>

        {/* Ambient Neon Outer Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-[#a3ff12] opacity-30 blur-md pointer-events-none -z-10 animate-pulse" />
      </div>

      {/* Typography with Glossy Gradient */}
      {showText && (
        <span className={`brand-name ${config.text} font-black tracking-tight flex items-center`}>
          <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">AI</span>
          <span className="brand-findr bg-gradient-to-r from-[#a3ff12] via-[#d8ff70] to-[#78e600] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(163,255,18,0.5)]">
            Findr
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a3ff12] ml-1 shadow-[0_0_8px_#a3ff12] animate-ping" />
        </span>
      )}
    </div>
  );
}
