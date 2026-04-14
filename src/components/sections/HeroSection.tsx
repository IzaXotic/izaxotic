"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Suspense } from "react";
import IXMark from "@/components/ui/IXMark";
import { useParallax } from "@/hooks/useParallax";

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
  const { ref, bgY, midY, fgY, bgX } = useParallax({ bg: 0.2, mid: 0.5, fg: 0.9 });

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
      ref={ref as React.RefObject<HTMLElement>}
      id="home"
      aria-label="IzaXotic hero — custom web development studio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 60%, #1a0a3e 0%, #0B0B0F 60%), radial-gradient(ellipse at 80% 80%, rgba(124,58,237,0.08) 0%, transparent 50%)" }}
    >
      {/* Three.js canvas — slow parallax layer */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F] pointer-events-none" />

      {/* Glow blob — mid parallax + horizontal drift */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[120px] pointer-events-none z-10"
        style={{ y: midY, x: bgX }}
      />

      {/* Content — foreground parallax */}
      <motion.div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full" style={{ y: fgY }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium">
              <IXMark size={16} />
              100% Hand-Coded · Zero Templates
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            Your Vision,{" "}
            <span className="gradient-text glow-text">Engineered</span>
            <br />
            Into{" "}
            <span className="relative inline-block">
              <span className="text-purple-300">Reality</span>
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent" />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed"
          >
            We don&apos;t use Wix, Webflow, or WordPress. IzaXotic writes every
            line of code from scratch — custom web development with pixel-perfect
            design, blazing performance, SEO optimisation, and digital experiences
            your users will remember. Based in India, building for the world.
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
              aria-label="Launch your custom web project with IzaXotic"
              className="flex items-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-base transition-all duration-200"
              style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            >
              Launch Your Project
              <ArrowRight size={17} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToPortfolio}
              aria-label="See IzaXotic portfolio and case studies"
              className="flex items-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full border border-purple-500/40 text-gray-200 hover:border-purple-400 hover:text-white font-semibold text-base transition-all duration-200 glass"
            >
              See Our Work
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap gap-8"
          >
            {[
              { value: "50+", label: "Builds Shipped" },
              { value: "0", label: "Templates Used" },
              { value: "100%", label: "Custom Code" },
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
      </motion.div>

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
