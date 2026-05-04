"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function FloatingTagore() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number } | null>(null);

  const handleScroll = useCallback(() => {
    // Show after scrolling past 200px
    setVisible(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Timer logic for May 9th
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let eventDate = new Date(now.getFullYear(), 4, 9); // Month is 0-indexed (4 = May)
      
      // If May 9th has passed this year, look to next year
      if (now.getTime() > eventDate.getTime() + 24 * 60 * 60 * 1000) {
        eventDate = new Date(now.getFullYear() + 1, 4, 9);
      }

      const difference = eventDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        setTimeLeft({ days, hours });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    // Update every hour
    const timer = setInterval(calculateTimeLeft, 1000 * 60 * 60); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`fixed top-6 left-1/2 z-30 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        visible
          ? "opacity-100 -translate-x-1/2 translate-y-0 scale-100"
          : "opacity-0 -translate-x-1/2 -translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-md border border-gold/20 shadow-[0_4px_24px_rgba(201,168,76,0.15)] rounded-full pl-5 pr-2 py-1.5 group hover:shadow-[0_8px_32px_rgba(201,168,76,0.25)] hover:border-gold/40 transition-all duration-300">
        
        {/* Timer display */}
        {timeLeft && (
          <div className="flex flex-col items-center justify-center border-r border-gold/20 pr-3 sm:pr-4 py-0.5 animate-fade-in">
            <span className="font-[family-name:var(--font-inter-var)] text-[9px] sm:text-[10px] font-bold text-navy-light uppercase tracking-[0.15em] leading-tight mb-0.5 opacity-80">
              Starts In
            </span>
            <span className="font-[family-name:var(--font-inter-var)] text-xs sm:text-sm font-bold text-burgundy tracking-wide leading-none">
              {timeLeft.days}d {timeLeft.hours}h
            </span>
          </div>
        )}

        {/* Text */}
        <span className="font-[family-name:var(--font-playfair-display)] text-sm sm:text-base font-bold text-navy tracking-wide">
          Tagore Jayanti
        </span>
        
        {/* Image */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-gold/40 group-hover:border-gold transition-colors duration-300 shadow-inner">
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
