const resources = [
  {
    icon: "📖",
    title: "The Life of Rabindranath Tagore",
    description:
      "Born in Calcutta in 1861, Tagore was a polymath who reshaped Bengali literature and music. His works span poetry, novels, drama, and essays.",
    link: "https://en.wikipedia.org/wiki/Rabindranath_Tagore",
    linkText: "Read on Wikipedia",
  },
  {
    icon: "✨",
    title: "Gitanjali — Nobel Prize Work",
    description:
      "Tagore's collection of 103 prose poems earned him the Nobel Prize in Literature in 1913, making him the first non-European laureate.",
    link: "https://en.wikipedia.org/wiki/Gitanjali",
    linkText: "Explore Gitanjali",
  },
  {
    icon: "🏫",
    title: "Tagore's Vision for Education",
    description:
      "Tagore founded Visva-Bharati University in Shantiniketan, pioneering an open-air, nature-integrated approach to learning.",
    link: "https://en.wikipedia.org/wiki/Visva-Bharati_University",
    linkText: "Learn about Shantiniketan",
  },
];

export default function Resources() {
  return (
    <section id="resources" className="bg-white py-16 px-6 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy text-center">
          Learn More
        </h2>
        <hr className="gold-divider mb-4" />
        <p className="font-[family-name:var(--font-inter-var)] text-base text-navy-light text-center max-w-lg mx-auto mb-10 leading-relaxed">
          Discover the life, works, and legacy of Rabindranath Tagore.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r, i) => (
            <div
              key={i}
              className="flex flex-col bg-cream rounded-xl p-6 border border-gold/10 hover:-translate-y-1 hover:shadow-md hover:border-gold/25 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{r.icon}</div>
              <h3 className="font-[family-name:var(--font-playfair-display)] text-lg font-bold text-navy mb-2">
                {r.title}
              </h3>
              <p className="font-[family-name:var(--font-inter-var)] text-sm text-navy-light leading-[1.7] flex-1 mb-4">
                {r.description}
              </p>
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter-var)] text-sm font-semibold text-burgundy hover:text-burgundy-light hover:gap-2.5 transition-all"
              >
                {r.linkText} <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
