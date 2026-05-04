import Image from "next/image";

export default function Footer() {
  // Using standard Tailwind colors (slate-950 for navy, amber for gold)
  // so it previews perfectly. You can swap these back to your custom
  // 'bg-navy' and 'text-gold' classes in your actual project.

  return (
    <footer className="relative overflow-hidden bg-slate-950 pt-5 border-t border-white/5 mt-auto flex flex-col">

      {/* 1. BACKGROUND WATERMARK LOGO */}
      {/* We use absolute positioning, low opacity, and mix-blend to embed the logo into the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.03] pointer-events-none select-none mix-blend-plus-lighter blur-[1px]">
        <img
          src="/school-logo.jpg" // Replace with: src="/school-logo.jpg"
          alt="Watermark Background"
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      {/* 2. VIGNETTE / RADIAL GRADIENT */}
      {/* This ensures the text remains perfectly readable over the background image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none"></div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Branding Section */}
        <div className="flex flex-col items-center gap-5 mb-8 group">
          {/* Subtle glowing border effect for the logo */}
          <div className="relative p-[2px] rounded-full bg-gradient-to-b from-amber-400/50 to-transparent transition-transform duration-500 hover:scale-105 cursor-pointer">
            <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full"></div>
            <img
              src="/school-logo.jpg" // Replace with Next.js <Image src="/school-logo.jpg" ... />
              alt="Modern Public Academy Logo"
              className="relative w-16 h-16 rounded-full border border-slate-900 object-cover shadow-xl"
            />
          </div>

          <h2 className="font-[family-name:var(--font-inter-var)] text-xl md:text-2xl font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            Modern Public Academy Senior Secondary
          </h2>
        </div>

        {/* Elegant Gradient Divider */}
        <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-8"></div>

        {/* Footer Details */}
        <div className="space-y-5 font-[family-name:var(--font-inter-var)]">
          <p className="text-slate-300/80 text-sm md:text-base tracking-wide font-light">
            Digital Initiative by{" "}
            <span className="font-medium text-amber-400 hover:text-amber-300 transition-colors cursor-pointer inline-flex items-center gap-1">
              IT Department
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-slate-500 font-medium tracking-widest uppercase">
            <span>© {new Date().getFullYear()}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></span>
            <span className="text-slate-400">Rabindranath Tagore Jayanti</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
