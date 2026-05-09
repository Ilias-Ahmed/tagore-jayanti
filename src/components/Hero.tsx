import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-texture.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-ivory/60 to-cream/90" />
      </div>

      {/* Decorative floating circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-gold-light/25 animate-float pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full border border-gold-light/20 animate-float pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "8s" }} />

      {/* School branding - Elegant Top Left Placement */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20 flex items-center gap-3 md:gap-4 animate-fade-in-down">
        <div className="relative w-12 h-12 md:w-14 md:h-14">
          <img
            src="/school-logo.jpg"
            alt="Modern Public Academy Logo"
            className="w-full h-full object-cover rounded-full shadow-md border border-gold/30"
          />
        </div>
        <div className="flex flex-col text-left">
          <p className="font-[family-name:var(--font-inter-var)] text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.15em] uppercase text-navy leading-none mb-1">
            Modern Public Academy
          </p>
          <p className="font-[family-name:var(--font-inter-var)] text-[8px] sm:text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-dark leading-none">
            Senior Secondary
          </p>
        </div>
      </div>


      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">


        {/* Event badge — LIVE TODAY */}
        <span className="inline-flex items-center gap-2 font-[family-name:var(--font-inter-var)] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-burgundy bg-burgundy/10 border border-burgundy/25 px-5 py-2 rounded-full mb-6 animate-fade-in-down">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          Live Today · 9th May
        </span>

        {/* Tagore portrait */}
        <div className="mx-auto mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Image
            src="/tagore.png"
            alt="Rabindranath Tagore"
            width={200}
            height={200}
            className="mx-auto rounded-full shadow-xl border-4 border-gold-light/30 object-cover"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-playfair-display)] text-[clamp(2rem,6vw,3.75rem)] font-bold leading-tight text-navy mb-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Rabindranath Tagore{" "}
          <span className="text-burgundy">Jayanti</span>
        </h1>

        {/* Subtitle */}
        <p className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.1rem,3vw,1.6rem)] font-medium text-navy-light tracking-wide animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          Poetry · Art · Celebration
        </p>

        {/* Divider */}
        <hr className="gold-divider my-5" />

        {/* Tagline */}
        <p className="font-[family-name:var(--font-inter-var)] text-[clamp(0.9rem,2vw,1.05rem)] text-navy-light leading-relaxed max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          Honouring the Nobel Laureate&apos;s timeless contribution to
          literature, music, and the human spirit.
        </p>

        {/* Quote */}
        <blockquote className="font-[family-name:var(--font-playfair-display)] italic text-[clamp(0.95rem,2vw,1.1rem)] text-burgundy max-w-md mx-auto mt-6 pt-5 border-t border-gold/20 leading-relaxed animate-fade-in" style={{ animationDelay: "1s" }}>
          &ldquo;Where the mind is without fear and the head is held
          high&hellip;&rdquo;
          <span className="block font-[family-name:var(--font-inter-var)] not-italic text-[0.75rem] font-semibold text-gold-dark tracking-[0.1em] uppercase mt-2">
            — Rabindranath Tagore
          </span>
        </blockquote>
      </div>
    </section>
  );
}
