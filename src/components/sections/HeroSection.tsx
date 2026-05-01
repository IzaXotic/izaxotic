"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Zap, Globe, Code2, Layers } from "lucide-react";
import { Suspense } from "react";
import IXMark from "@/components/ui/IXMark";

const HeroSceneV2 = dynamic(
  () => import("@/components/three/HeroSceneV2"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
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
      aria-label="IzaXotic hero — custom web development studio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 40% 40%, #1a0a3e 0%, #0B0B0F 55%), radial-gradient(ellipse at 80% 70%, rgba(124,58,237,0.05) 0%, transparent 50%)",
      }}
    >
      {/* Three.js canvas — right side only */}
      <div className="absolute top-0 right-0 bottom-0 w-[60%] z-0" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)' }}>
        <Suspense fallback={null}>
          <HeroSceneV2 />
        </Suspense>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F] pointer-events-none" />
      {/* Top subtle fade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-transparent via-transparent to-[#0B0B0F]/30 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-700/8 blur-[150px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none z-10" />

      {/* Content — left-aligned, letting the 3D scene breathe on the right */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-purple-500/20 text-purple-300 text-sm font-medium">
              <IXMark size={16} />
              Custom-Engineered · Zero Templates
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            We{" "}
            <span className="gradient-text glow-text">Engineer</span>
            <br />
            Digital Experiences
            <br />
            <span className="relative inline-block mt-1">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #E9D5FF 0%, #A78BFA 50%, #7C3AED 100%)",
                }}
              >
                That Perform
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #7C3AED, #D946EF, transparent)",
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-400 mb-10 max-w-lg leading-relaxed"
          >
            IzaXotic builds every project from the ground up — custom web
            development with pixel-perfect UI/UX, immersive 3D visuals, and
            performance-first engineering. Based in India, building for the world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(124,58,237,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              aria-label="Launch your custom web project with IzaXotic"
              className="group flex items-center gap-2.5 px-8 py-4 min-h-[48px] rounded-full text-white font-semibold text-base transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #4C1D95 100%)",
                boxShadow: "0 0 25px rgba(124,58,237,0.35)",
              }}
            >
              Start Your Project
              <ArrowRight
                size={17}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToPortfolio}
              aria-label="See IzaXotic portfolio and case studies"
              className="flex items-center gap-2 px-8 py-4 min-h-[48px] rounded-full border border-purple-500/30 text-gray-200 hover:border-purple-400/60 hover:text-white font-semibold text-base transition-all duration-300 glass"
            >
              See Our Work
            </motion.button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap gap-3"
          >
            {[
              { icon: Code2, label: "100% Custom Code" },
              { icon: Layers, label: "UI/UX Design" },
              { icon: Zap, label: "Blazing Fast" },
              { icon: Globe, label: "SEO Optimised" },
            ].map((feature) => (
              <span
                key={feature.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-purple-300/80 border border-purple-800/30"
                style={{ background: "rgba(124,58,237,0.06)" }}
              >
                <feature.icon size={13} className="text-purple-400" />
                {feature.label}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap gap-8"
          >
            {[
              { value: "50+", label: "Builds Shipped" },
              { value: "100%", label: "Custom Code" },
              { value: "<24h", label: "Response Time" },
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-purple-400/60 hover:text-purple-300 transition-colors"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium">
          Explore
        </span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
