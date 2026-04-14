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
  links: NavLink[];
}

const navCols: NavCol[] = [
  {
    heading: "Navigate",
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

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#08080C]">
      {/* Top divider line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* 4-col grid: brand | nav | social | CTA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #4C1D95)",
                  boxShadow: "0 0 16px rgba(124,58,237,0.3)",
                }}
              >
                <IXMark size={13} animate={false} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Iza<span className="gradient-text">Xotic</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
              Code-first studio. Bold visions, hand-built. No templates, no&nbsp;shortcuts.
            </p>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] text-purple-400/70 uppercase tracking-[0.2em] font-semibold mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.ext ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-300 transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={10}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-sm text-gray-500 hover:text-purple-300 transition-colors"
                      >
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
            <p className="text-[10px] text-purple-400/70 uppercase tracking-[0.2em] font-semibold mb-4">
              Start a project
            </p>
            <p className="text-gray-500 text-xs leading-relaxed mb-5">
              Have an idea? Let&apos;s build something that lasts.
            </p>
            <button
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #4C1D95)",
                boxShadow: "0 0 20px rgba(124,58,237,0.25)",
              }}
            >
              Let&apos;s Talk
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-purple-900/15">
          <div className="flex items-center gap-3 text-[11px] text-gray-600">
            <span>© {year} IzaXotic</span>
            <span className="hidden sm:inline text-gray-800">·</span>
            <a
              href="mailto:hello@izaxotic.com"
              className="hover:text-purple-400 transition-colors"
            >
              hello@izaxotic.com
            </a>
          </div>
          <span className="text-[11px] text-gray-700">
            Hand-coded with intent.
          </span>
        </div>
      </div>
    </footer>
  );
}
