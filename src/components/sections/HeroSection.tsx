"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { Suspense } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function HeroSection() {
  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToPortfolio = () => {
    document
      .querySelector("#portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 60%, #1a0a3e 0%, #0B0B0F 70%)" }}
    >
      {/* Three.js canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F] pointer-events-none" />

      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[120px] pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium">
              <Sparkles size={14} className="text-purple-400" />
              Premium Web Development & UI/UX Design
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            We Craft{" "}
            <span className="gradient-text glow-text">Digital Experiences</span>
            <br />
            That Feel{" "}
            <span className="relative inline-block">
              <span className="text-purple-300">Alive</span>
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-purple-500 to-transparent" />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed"
          >
            IzaXotic builds immersive, high-performance digital products that
            push the boundaries of what&apos;s possible — combining cutting-edge
            technology with stunning design. Every line of code is hand-written,
            every pixel is intentional. No templates, no page-builders, no shortcuts.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(124,58,237,0.7)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-base transition-all duration-200"
              style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            >
              Start a Project
              <ArrowRight size={17} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToPortfolio}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-purple-500/40 text-gray-200 hover:border-purple-400 hover:text-white font-semibold text-base transition-all duration-200 glass"
            >
              View Portfolio
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap gap-8"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "2+", label: "Years of Excellence" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-bold gradient-text">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500 mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToServices}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-purple-400/70 hover:text-purple-300 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  );
}
