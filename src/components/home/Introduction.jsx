export default function Introduction() {
  return (
    <section className="bg-[#0B0F19] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-manrope text-white leading-[1.15] tracking-tight text-balance mx-auto">
          Diverse Loopers empowers students, businesses, and institutions through real-world execution, practical learning, and purpose-built tools.
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-medium text-balance">
            A connected ecosystem where skills are built through real work, solutions are delivered
            with clarity, and professional identity becomes verifiable.
          </p>
          <p className="text-lg sm:text-xl text-slate-400 italic font-medium text-balance">
            Designed for those who want to move beyond learning — and start building.
          </p>
        </div>
        <div className="pt-8">
          <a
            href="https://www.diverseloopers.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group text-white font-bold transition-all text-lg bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full border border-white/10 hover:border-white/20 active:scale-95 shadow-lg"
          >
            Explore how it works
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
