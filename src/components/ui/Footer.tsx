"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const links = {
  Services: ["Web Development", "UI/UX Design", "Consultation"],
  Company: ["About", "Portfolio", "Contact"],
  Connect: ["hello@izaxotic.com", "LinkedIn", "Twitter / X"],
};

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
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              We craft digital experiences that feel alive. Premium web
              development & UI/UX design studio.
            </p>
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
