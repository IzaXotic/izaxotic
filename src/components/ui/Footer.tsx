"use client";
import { ArrowUpRight } from "lucide-react";
import IXMark from "@/components/ui/IXMark";

interface NavLink {
  label: string;
  href: string;
  ext?: boolean;
}

interface NavCol {
  heading: string;
  code: string;
  links: NavLink[];
}

const navCols: NavCol[] = [
  {
    heading: "Navigate",
    code: "NAV://INT",
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#portfolio" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Connect",
    code: "NAV://EXT",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/izaxotic", ext: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/izaxotic", ext: true },
      { label: "X (Twitter)", href: "https://x.com/izaxotic", ext: true },
      { label: "YouTube", href: "https://youtube.com/@izaxotic", ext: true },
      { label: "GitHub", href: "https://github.com/IzaXotic", ext: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const emailUser = "hello";
  const emailDomain = "izaxotic.com";

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050507]">
      {/* Circuit divider */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-purple-500/40" style={{ boxShadow: "0 0 8px rgba(124,58,237,0.3)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative">
        {/* Noise grain texture */}
        <div className="absolute inset-0 noise-grain pointer-events-none opacity-30" />

        {/* 4-col grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mb-16 relative z-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)", boxShadow: "0 0 16px rgba(124,58,237,0.3)" }}>
                {/* Scanline on logo */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)",
                }} />
                <IXMark size={13} animate={false} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Iza<span className="gradient-text">Xotic</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
              Code-first studio. Bold visions, hand-built. No templates, no&nbsp;shortcuts.
            </p>
            <span className="block text-[8px] font-mono text-purple-800/40 tracking-widest mt-3">SYS://IZAXOTIC v2.0</span>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.heading}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] text-purple-400/70 uppercase tracking-[0.3em] font-semibold font-mono">{col.heading}</p>
                <span className="text-[7px] font-mono text-purple-800/30 tracking-widest">{col.code}</span>
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.ext ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-300 transition-colors font-mono">
                        {link.label}
                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <button onClick={() => scrollTo(link.href)} className="text-sm text-gray-500 hover:text-purple-300 transition-colors font-mono">
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA block */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-purple-400/70 uppercase tracking-[0.3em] font-semibold font-mono">Start a project</p>
              <span className="text-[7px] font-mono text-purple-800/30 tracking-widest">CMD://NEW</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed mb-5">Have an idea? Let&apos;s build something that lasts.</p>
            <button onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl font-mono transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)", boxShadow: "0 0 20px rgba(124,58,237,0.25)" }}>
              Let&apos;s Talk
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-900/20 to-transparent mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[11px] text-gray-600 font-mono">
              <span>© {year} IzaXotic</span>
              <span className="hidden sm:inline text-purple-900/30">|</span>
              <button onClick={() => window.location.href = `mailto:${emailUser}@${emailDomain}`} className="hover:text-purple-400 transition-colors">{emailUser}@{emailDomain}</button>
            </div>
            <span className="text-[11px] text-gray-700 font-mono">
              Hand-coded with intent. <span className="hud-blink" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}