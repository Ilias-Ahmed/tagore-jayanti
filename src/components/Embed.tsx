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

        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gold/10 bg-navy relative group cursor-pointer" onClick={(e) => {
          const iframe = document.createElement("iframe");
          iframe.setAttribute("src", "https://www.youtube.com/embed/M7UYCsoRM3o?si=eWXd2I4zUZsZT132&autoplay=1&rel=0");
          iframe.setAttribute("title", "YouTube video player");
          iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
          iframe.setAttribute("allowfullscreen", "true");
          iframe.className = "absolute inset-0 w-full h-full border-none";
          e.currentTarget.innerHTML = "";
          e.currentTarget.appendChild(iframe);
        }}>
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            {/* Custom Cover Image (YouTube High Quality Thumbnail) */}
            <img 
              src="https://img.youtube.com/vi/M7UYCsoRM3o/hqdefault.jpg" 
              alt="Video Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(201,168,76,0.4)] group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
