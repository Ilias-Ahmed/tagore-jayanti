"use client";

import { useEffect, useState, useCallback } from "react";

export default function ParticipantCount({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/register");
      const data = await res.json();
      setCount(data.count);
    } catch {
      setCount(0);
    }
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount, refreshKey]);

  useEffect(() => {
    if (count === null) return;
    if (count === 0) { setDisplayCount(0); return; }
    const duration = 800;
    const steps = 20;
    const increment = count / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <section id="participants" className="bg-white py-16 px-6 md:py-20 text-center">
      <h2 className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
        Participation
      </h2>
      <hr className="gold-divider mb-10" />

      <div className="inline-flex flex-col items-center gap-2 px-10 py-6 bg-gradient-to-br from-cream to-ivory border-[1.5px] border-gold/20 rounded-2xl shadow-[0_4px_20px_rgba(201,168,76,0.15)]">
        <span className="font-[family-name:var(--font-inter-var)] text-xs font-semibold tracking-[0.1em] uppercase text-navy-light">
          Total Participants Registered
        </span>
        {count === null ? (
          <span className="text-2xl text-gold animate-fade-in">…</span>
        ) : (
          <span className="font-[family-name:var(--font-playfair-display)] text-5xl font-bold text-gold-dark animate-fade-in-up">
            {displayCount}
          </span>
        )}
      </div>
    </section>
  );
}
