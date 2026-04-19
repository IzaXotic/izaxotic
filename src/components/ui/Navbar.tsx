"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isMobileMenuOpen, setIsMobileMenuOpen, activeSection } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home page with the hash — browser will scroll on load
      router.push(`/${href}`);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-3"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "rounded-2xl px-5 py-2.5" : "px-2 py-2"}`}
            style={scrolled ? {
              background: "rgba(5,5,7,0.85)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(124,58,237,0.1)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(124,58,237,0.05)",
            } : undefined}
          >
            {/* Logo — HUD */}
            <motion.a
              href={isHome ? "#home" : "/"}
              onClick={(e) => { e.preventDefault(); isHome ? scrollTo("#home") : router.push("/"); }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 select-none group"
            >
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(76,29,149,0.6))",
                  border: "1px solid rgba(124,58,237,0.4)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.2), inset 0 0 10px rgba(124,58,237,0.1)",
                }}
              >
                <span className="text-sm font-black text-white tracking-tight relative z-10">IX</span>
                <div className="absolute inset-0 opacity-30" style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.1) 2px, rgba(124,58,237,0.1) 4px)",
                }} />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-tight">
                  <span className="gradient-text">Iza</span>
                  <span className="text-white">Xotic</span>
                </span>
              </div>
            </motion.a>

            {/* Center nav pill */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 rounded-full px-1 py-1"
                style={{ background: "rgba(5,5,7,0.6)", border: "1px solid rgba(124,58,237,0.08)" }}
              >
                {navLinks.map((link) => {
                  const isPage = !link.href.startsWith("#");
                  const isActive = activeSection === link.href.replace("#", "");
                  return isPage ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-gray-200"
                      data-cursor-hover
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-200"
                      data-cursor-hover
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-hud"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "rgba(124,58,237,0.15)",
                            border: "1px solid rgba(124,58,237,0.3)",
                            boxShadow: "0 0 12px rgba(124,58,237,0.15), inset 0 0 8px rgba(124,58,237,0.05)",
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 ${isActive ? "text-purple-300" : "text-gray-500 hover:text-gray-200"}`}>
                        {link.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                Online
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo("#contact")}
                className="hidden md:flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-sm font-semibold transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(76,29,149,0.9))",
                  boxShadow: "0 0 20px rgba(124,58,237,0.25)",
                  border: "1px solid rgba(168,85,247,0.3)",
                }}
              >
                Let&apos;s Build
                <ArrowUpRight size={13} strokeWidth={2.5} />
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden scanlines"
            style={{ background: "rgba(5,5,7,0.97)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-8 relative z-10">
              {navLinks.map((link, i) => {
                const isPage = !link.href.startsWith("#");
                return isPage ? (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ delay: i * 0.06 }}>
                    <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-bold text-gray-500 hover:text-white transition-colors py-3 block">
                      <span className="text-purple-700/50 text-base font-mono mr-3">0{i + 1}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button key={link.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(link.href)}
                    className={`text-3xl font-bold transition-colors py-3 ${activeSection === link.href.replace("#", "") ? "gradient-text" : "text-gray-500 hover:text-white"}`}>
                    <span className="text-purple-700/50 text-base font-mono mr-3">0{i + 1}</span>
                    {link.label}
                  </motion.button>
                );
              })}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollTo("#contact")}
                className="mt-8 px-8 py-3.5 rounded-full text-white font-bold text-lg"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}
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
