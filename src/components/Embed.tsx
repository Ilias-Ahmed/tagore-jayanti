export default function Embed() {
  return (
    <section id="explore" className="py-16 px-6 md:py-20 lg:py-24 bg-gradient-to-b from-cream to-ivory">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy text-center">
          Explore
        </h2>
        <hr className="gold-divider mb-4" />
        <p className="font-[family-name:var(--font-inter-var)] text-base text-navy-light text-center max-w-lg mx-auto mb-10 leading-relaxed">
          Watch and learn about Tagore&apos;s enduring influence on literature and culture.
        </p>

        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gold/10 bg-navy">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/M7UYCsoRM3o?si=eWXd2I4zUZsZT132&rel=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
