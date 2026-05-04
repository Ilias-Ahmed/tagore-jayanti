import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy text-white/70 text-center py-8 px-6 mt-auto">
      {/* School branding */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <Image
          src="/school-logo.jpg"
          alt="Modern Public Academy Logo"
          width={36}
          height={36}
          className="rounded-full border border-gold/30"
        />
        <span className="font-[family-name:var(--font-inter-var)] text-sm font-semibold text-gold-light tracking-wide">
          Modern Public Academy Senior Secondary
        </span>
      </div>

      <hr className="w-10 h-0.5 bg-gold border-none rounded mx-auto mb-4 opacity-50" />

      <p className="font-[family-name:var(--font-inter-var)] text-sm leading-relaxed">
        Digital Initiative by{" "}
        <span className="text-gold-light font-semibold">IT Department</span>
        <span className="block text-xs mt-1.5 opacity-50">
          © {new Date().getFullYear()} — Rabindranath Tagore Jayanti
        </span>
      </p>
    </footer>
  );
}
