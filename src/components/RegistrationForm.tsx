"use client";

export default function RegistrationForm({ onRegistered }: { onRegistered?: () => void }) {
  return (
    <>
      {/* Participate section — Registration Closed */}
      <section id="register" className="relative py-16 px-6 md:py-20 lg:py-24 bg-gradient-to-b from-cream to-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">Registration Closed</h2>
          <hr className="gold-divider mb-4" />
          <p className="font-[family-name:var(--font-inter-var)] text-base text-navy-light max-w-md mx-auto leading-relaxed mb-4">
            Thank you to all participants! Registration for Tagore Jayanti 2026 is now closed.
          </p>
          <p className="font-[family-name:var(--font-inter-var)] text-sm text-gold-dark max-w-sm mx-auto leading-relaxed">
            Stay tuned for the results and winner announcements.
          </p>
        </div>
      </section>
    </>
  );
}
