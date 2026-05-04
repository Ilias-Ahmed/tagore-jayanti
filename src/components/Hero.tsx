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

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* School branding */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-down">
          <Image
            src="/school-logo.jpg"
            alt="Modern Public Academy Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg border-2 border-gold/30 mb-3"
          />
          <p className="font-[family-name:var(--font-inter-var)] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-gold-dark">
            Modern Public Academy Senior Secondary
          </p>
        </div>

        {/* Event badge */}
        <span className="inline-block font-[family-name:var(--font-inter-var)] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-gold-dark bg-gold/10 border border-gold/25 px-5 py-2 rounded-full mb-6 animate-fade-in-down">
          9th May — Celebrating Tagore
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
