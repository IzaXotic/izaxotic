"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isMobileMenuOpen, setIsMobileMenuOpen, activeSection } =
    useAppStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? "glass rounded-2xl px-6 py-3 border border-purple-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "px-2 py-2"
            }`}
          >
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 select-none group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow duration-300">
                <span className="text-sm font-black text-white tracking-tight">IX</span>
              </div>
              <div className="hidden sm:flex flex-col -space-y-0.5">
                <span className="text-lg font-bold leading-none">
                  <span className="gradient-text">Iza</span>
                  <span className="text-white">Xotic</span>
                </span>
              </div>
            </motion.a>

            {/* Center nav pill */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 rounded-full bg-white/[0.03] border border-purple-500/10 px-1.5 py-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-200"
                      data-cursor-hover
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-purple-600/20 border border-purple-500/30"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          isActive ? "text-purple-300" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo("#contact")}
                className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              >
                Let&apos;s Build
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(11,11,15,0.97)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-3xl font-bold transition-colors py-3 ${
                    activeSection === link.href.replace("#", "")
                      ? "gradient-text"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollTo("#contact")}
                className="mt-6 px-8 py-3.5 rounded-full bg-purple-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              >
                Let&apos;s Build
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
