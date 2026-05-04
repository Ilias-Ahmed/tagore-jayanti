export default function About() {
  return (
    <section id="about" className="bg-white py-16 px-6 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy text-center">
          About the Event
        </h2>
        <hr className="gold-divider mb-10" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Decorative element */}
          <div className="shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-ivory to-cream border-[3px] border-gold-light flex items-center justify-center text-5xl shadow-[0_4px_20px_rgba(201,168,76,0.15)]">
            ✦
          </div>

          {/* Text */}
          <div className="max-w-xl">
            <p className="font-[family-name:var(--font-inter-var)] text-base leading-[1.8] text-navy-light mb-4">
              <span className="text-burgundy font-semibold">Rabindranath Tagore</span>{" "}
              (1861–1941) was a polymath — poet, philosopher, musician, and
              painter — who reshaped Bengali literature and became the first
              non-European to win the{" "}
              <span className="text-burgundy font-semibold">Nobel Prize in Literature</span>{" "}
              in 1913 for his profoundly sensitive collection,{" "}
              <em>Gitanjali</em>.
            </p>
            <p className="font-[family-name:var(--font-inter-var)] text-base leading-[1.8] text-navy-light mb-5">
              Every year on <strong>9th May</strong>, we celebrate Tagore Jayanti
              to honour his enduring legacy. This year, <strong>Modern Public Academy</strong> invites
              students to engage with the beauty of verse, art, and the written word.
            </p>
            <blockquote className="mt-4 px-5 py-4 bg-gradient-to-r from-gold/[0.06] to-gold/[0.02] border-l-[3px] border-gold rounded-r-lg font-[family-name:var(--font-playfair-display)] italic text-[1.05rem] leading-[1.7] text-navy">
              &ldquo;The butterfly counts not months but moments, and has time
              enough.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
