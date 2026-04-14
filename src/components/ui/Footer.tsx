"use client";
import { Heart, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "IG", href: "https://www.instagram.com/izaxotic", name: "Instagram" },
  { label: "Li", href: "https://www.linkedin.com/company/izaxotic", name: "LinkedIn" },
  { label: "X", href: "https://x.com/izaxotic", name: "X (Twitter)" },
  { label: "YT", href: "https://youtube.com/@izaxotic", name: "YouTube" },
  { label: "GH", href: "https://github.com/IzaXotic", name: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-purple-900/30 bg-[#0A0A0E]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top — brand + CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-14">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold gradient-text">Iza</span>
              <span className="text-2xl font-bold text-white">Xotic</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A code-first studio that turns bold ideas into immersive web
              experiences. Every pixel placed, every function written — by hand.
            </p>
          </div>

          {/* Quick CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className="group flex items-center gap-3 px-6 py-3 rounded-full glass border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 transition-all duration-200 text-sm font-semibold"
          >
            Have a project in mind?
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Middle — nav + socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14 pb-10 border-b border-purple-900/20">
          {/* Inline nav */}
          <nav className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-gray-500 hover:text-purple-300 transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-600/10 border border-purple-500/20 text-gray-500 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200 text-[10px] font-bold tracking-wide"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom — contact + legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
            <a
              href="mailto:hello@izaxotic.com"
              className="hover:text-purple-300 transition-colors"
            >
              hello@izaxotic.com
            </a>
            <span className="hidden sm:inline">·</span>
            <span>Remote-First · India</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>© {year} IzaXotic</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={10} className="text-purple-500" fill="#7C3AED" /> in code
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
