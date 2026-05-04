interface Winner {
  name: string;
  class: string;
  position: string;
}

// Set winners here when results are announced
const winners: Winner[] = [];

export default function Winners() {
  return (
    <section id="winners" className="py-16 px-6 md:py-20 lg:py-24 bg-gradient-to-b from-cream to-ivory">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy text-center">
          🏆 Winners
        </h2>
        <hr className="gold-divider mb-10" />

        {winners.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-10 px-8 bg-white rounded-2xl border-[1.5px] border-dashed border-gold/30">
            <div className="text-4xl mb-4">🎖️</div>
            <p className="font-[family-name:var(--font-inter-var)] text-base text-navy-light leading-relaxed">
              Winners will be updated soon. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {winners.map((w, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center border-[1.5px] border-gold/15 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="font-[family-name:var(--font-playfair-display)] text-2xl font-bold text-gold-dark mb-2">
                  {w.position}
                </div>
                <div className="font-[family-name:var(--font-inter-var)] text-lg font-semibold text-navy">
                  {w.name}
                </div>
                <div className="font-[family-name:var(--font-inter-var)] text-sm text-navy-light mt-1">
                  Class {w.class}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
