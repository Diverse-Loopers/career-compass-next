import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-white rounded-t-[48px] pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link
              href="https://www.diverseloopers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Image
                src="/logo.png"
                alt="Diverse Loopers Logo"
                width={180}
                height={60}
                className="object-contain h-12 w-auto lg:h-[4.25rem]"
                priority
              />
            </Link>

            <p className="text-slate-400 font-medium leading-relaxed font-inter">
              Pioneering the next generation of professional verification and industry-ready talent through structural innovation.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://www.linkedin.com/company/diverse-loopers/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.instagram.com/diverseloopers" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://twitter.com/diverseloopers" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.072H5.059z" /></svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-6">
            <h4 className="text-success font-manrope text-xs font-extrabold uppercase tracking-[0.2em]">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Global Partners", "Contact Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors font-medium font-inter">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-6">
            <h4 className="text-success font-manrope text-xs font-extrabold uppercase tracking-[0.2em]">
              Resources
            </h4>

            <ul className="space-y-4">
              {[
                {
                  name: "Path Analyzer",
                  link: "https://www.diverseloopers.com/analyzer",
                },
                {
                  name: "Career Analyzer",
                  link: "https://www.diverseloopers.com/career-analyzer",
                },
                {
                  name: "About",
                  link: "https://www.diverseloopers.com/",
                },
                {
                  name: "Privacy Policy",
                  link: "#",
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors font-medium font-inter"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-success font-manrope text-xs font-extrabold uppercase tracking-[0.2em]">Newsletter</h4>
            <p className="text-slate-400 font-medium text-sm leading-relaxed font-inter">
              Stay updated with the latest industry insights and opportunities.
            </p>
            <form className="flex gap-2 group relative">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 w-full font-inter transition-all placeholder:text-slate-500"
              />
              <button className="bg-white text-slate-900 p-4 rounded-2xl flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all shadow-lg hover:shadow-xl">
                <span className="material-symbols-outlined text-xl font-bold">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 font-manrope text-[10px] font-bold uppercase tracking-widest text-center">
            © 2026 Diverse Loopers. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
              <a key={link} href="#" className="text-slate-500 hover:text-white transition-colors text-[10px] font-extrabold uppercase tracking-widest">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
