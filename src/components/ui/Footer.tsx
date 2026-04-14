"use client";
import { Heart } from "lucide-react";

const links = {
  Services: ["Web Development", "UI/UX Design", "3D & Interactive", "Consultation"],
  Company: ["About", "Portfolio", "Pricing", "Contact"],
};

const socials = [
  { label: "IG", href: "https://www.instagram.com/izaxotic", name: "Instagram" },
  { label: "Li", href: "https://www.linkedin.com/company/izaxotic", name: "LinkedIn" },
  { label: "X", href: "https://x.com/izaxotic", name: "X (Twitter)" },
  { label: "YT", href: "https://youtube.com/@izaxotic", name: "YouTube" },
  { label: "GH", href: "https://github.com/IzaXotic", name: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-purple-900/30 bg-[#0A0A0E]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold gradient-text">Iza</span>
              <span className="text-2xl font-bold text-white">Xotic</span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-4">
              Premium custom web development &amp; UI/UX design studio. We craft
              digital experiences that feel alive — 100% hand-coded, zero
              templates.
            </p>
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

          {/* Links */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <span className="text-gray-500 text-sm hover:text-purple-300 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <a
                  href="mailto:hello@izaxotic.com"
                  className="hover:text-purple-300 transition-colors"
                >
                  hello@izaxotic.com
                </a>
              </li>
              <li>Remote-First Studio, India</li>
              <li>Response within 24 hrs</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-purple-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {year} IzaXotic. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <span>Crafted with</span>
            <Heart size={12} className="text-purple-500" fill="#7C3AED" />
            <span>by the IzaXotic team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
