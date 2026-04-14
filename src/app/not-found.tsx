"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import IXMark from "@/components/ui/IXMark";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Noise grain */}
      <div className="absolute inset-0 noise-grain pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-700/8 blur-[150px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        {/* HUD badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-red-400/80 text-[10px] uppercase tracking-[0.3em] font-mono mb-6"
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          ERR://404 — NOT FOUND
        </motion.span>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="text-[120px] md:text-[160px] font-black leading-none gradient-text font-mono">
            404
          </span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Signal <span className="gradient-text">Lost</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            The page you&apos;re looking for has drifted into the void. It may have
            been moved, deleted, or never existed in this dimension.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm font-mono transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #4C1D95)",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            <Home size={15} />
            Back to Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-purple-300 font-semibold text-sm font-mono transition-all duration-200 hover:text-white"
            style={{
              background: "rgba(124,58,237,0.06)",
              border: "1px solid rgba(124,58,237,0.15)",
            }}
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 pt-8 border-t border-purple-900/15"
        >
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-mono mb-4">
            Quick Navigation
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "Services", href: "/#services" },
              { label: "Portfolio", href: "/#portfolio" },
              { label: "Pricing", href: "/#pricing" },
              { label: "About", href: "/#about" },
              { label: "Contact", href: "/#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-purple-300 transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* IX branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <IXMark size={12} animate={false} />
          <span className="text-[10px] font-mono text-gray-700 tracking-widest">
            IZAXOTIC SYSTEMS
          </span>
        </motion.div>
      </div>
    </section>
  );
}
