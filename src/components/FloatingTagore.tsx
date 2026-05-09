"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function FloatingTagore() {
  const [visible, setVisible] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Check if today is May 9th
  useEffect(() => {
    const now = new Date();
    setIsToday(now.getMonth() === 4 && now.getDate() === 9);
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 z-30 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        visible
          ? "opacity-100 -translate-x-1/2 translate-y-0 scale-100"
          : "opacity-0 -translate-x-1/2 -translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3 bg-white/85 backdrop-blur-md border border-gold/20 shadow-[0_4px_20px_rgba(201,168,76,0.12)] rounded-full pl-3 sm:pl-4 pr-1.5 sm:pr-2 py-1 group hover:shadow-[0_6px_28px_rgba(201,168,76,0.2)] hover:border-gold/30 transition-all duration-300">
        
        {/* LIVE indicator */}
        <div className="flex items-center gap-1.5 border-r border-gold/20 pr-2.5 sm:pr-3 py-0.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="font-[family-name:var(--font-inter-var)] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-success leading-none">
            {isToday ? "Live" : "Today"}
          </span>
        </div>

        {/* Text */}
        <span className="font-[family-name:var(--font-playfair-display)] text-xs sm:text-sm font-bold text-navy tracking-wide">
          Tagore Jayanti
        </span>
        
        {/* Image */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-300 shadow-inner">
          <Image
            src="/tagore.png"
            alt="Rabindranath Tagore"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
