"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Palette, Globe, Layers, Zap, Smartphone, Monitor, ArrowRight, Terminal,
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });

const services = [
  {
    id: "web-dev", icon: Code2, title: "Web Application Development",
    tagline: "SYS://FULL-STACK · SCALABLE · PERFORMANT", color: "#7C3AED",
    description: "We architect and build enterprise-grade web applications. From concept to deployment, every line is crafted for performance and scale.",
    features: [
      { icon: Globe, label: "Next.js & React Apps" },
      { icon: Zap, label: "High Performance APIs" },
      { icon: Layers, label: "Scalable Architecture" },
      { icon: Smartphone, label: "Mobile-First" },
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"],
    status: "ACTIVE",
  },
  {
    id: "ui-ux", icon: Palette, title: "UI/UX Design",
    tagline: "SYS://BEAUTIFUL · INTUITIVE · IMMERSIVE", color: "#A78BFA",
    description: "Digital experiences that captivate and convert. Deep user research, cutting-edge visuals, and pixel-perfect execution.",
    features: [
      { icon: Monitor, label: "Interface Design" },
      { icon: Layers, label: "Design Systems" },
      { icon: Smartphone, label: "Responsive Prototypes" },
      { icon: Zap, label: "Motion & Micro-interactions" },
    ],
    tech: ["Figma", "Framer", "Three.js", "GSAP", "Tailwind CSS", "Storybook"],
    status: "ACTIVE",
  },
];

function ServiceCard({ service, isActive, onActivate, index }: {
  service: (typeof services)[0]; isActive: boolean; onActivate: () => void; index: number;
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onActivate}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer hud-corners holo-shimmer"
      data-cursor-hover
      style={{
        background: "rgba(5,5,7,0.85)",
        backdropFilter: "blur(20px)",
        border: isActive ? `1px solid ${service.color}50` : "1px solid rgba(124,58,237,0.08)",
        boxShadow: isActive ? `0 0 50px ${service.color}12, inset 0 1px 0 rgba(255,255,255,0.03)` : "inset 0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      {/* Spotlight follow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${service.color}0d, transparent 60%)` }} />

      {/* Scanlines on card */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
      }} />

      {/* Top HUD bar */}
      <div className="flex items-center justify-between px-5 py-2.5"
        style={{ background: `linear-gradient(90deg, ${service.color}08, transparent)`, borderBottom: "1px solid rgba(124,58,237,0.06)" }}>
        <span className="text-[9px] font-mono tracking-[0.3em] text-gray-600 uppercase">
          MODULE_{String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <span className="text-[9px] font-mono tracking-widest text-green-500/80">{service.status}</span>
        </div>
      </div>

      <div className="relative z-10 p-7">
        {/* Icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `${service.color}0a`, border: `1px solid ${service.color}20`, boxShadow: `0 0 25px ${service.color}08` }}>
            <Icon size={24} style={{ color: service.color }} />
            <div className="absolute -top-0.5 -left-0.5 w-1 h-1 rounded-full" style={{ background: service.color, opacity: 0.4 }} />
            <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 rounded-full" style={{ background: service.color, opacity: 0.4 }} />
          </div>
          <motion.div animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowRight size={16} className="text-gray-700 group-hover:text-purple-400 transition-colors" />
          </motion.div>
        </div>

        {/* Label */}
        <p className="text-[9px] uppercase tracking-[0.3em] mb-2 font-mono" style={{ color: `${service.color}70` }}>
          {service.tagline}
        </p>
        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mt-6">
          {service.features.map((f) => {
            const FIcon = f.icon;
            return (
              <div key={f.label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl hud-corners"
                style={{ background: `${service.color}05`, border: `1px solid ${service.color}0a` }}>
                <FIcon size={12} style={{ color: service.color }} />
                <span className="text-xs text-gray-400 font-medium">{f.label}</span>
              </div>
            );
          })}
        </div>

        {/* Tech Stack — expanded */}
        <AnimatePresence>
          {isActive && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
              <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${service.color}10` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={10} style={{ color: service.color }} className="opacity-60" />
                  <p className="text-[9px] uppercase tracking-[0.3em] font-mono" style={{ color: `${service.color}70` }}>Tech Stack</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-medium font-mono"
                      style={{ background: `${service.color}08`, color: `${service.color}bb`, border: `1px solid ${service.color}18` }}>
                      {t}
                    </span>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.stopPropagation(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${service.color}, #4C1D95)`, boxShadow: `0 0 30px ${service.color}18` }}>
                  Get a Quote <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { ref, bgY, midY, fgY, bgX, opacity } = useParallax();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="services" aria-label="Web development and design services" className="section-padding relative scanlines">
      {/* 3D particle background — slow parallax */}
      <motion.div style={{ y: bgY, x: bgX }} className="absolute inset-0 z-0">
        <ParticleField count={500} color="#7c3aed" speed={0.12} className="opacity-35" />
      </motion.div>

      {/* Noise grain texture */}
      <div className="absolute inset-0 noise-grain pointer-events-none" />

      {/* Circuit connector from hero — mid parallax */}
      <motion.div style={{ y: midY }} className="absolute top-0 left-1/2 -translate-x-1/2">
        <div className="w-px h-24 bg-gradient-to-b from-purple-500/30 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-purple-500/50 -ml-[3px] -mt-px" style={{ boxShadow: "0 0 10px rgba(124,58,237,0.3)" }} />
      </motion.div>

      <motion.div className="max-w-6xl mx-auto relative z-10" style={{ y: fgY, opacity }}>
        {/* HUD header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-purple-300/80 text-[10px] uppercase tracking-[0.3em] font-mono mb-4"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            SYS://SERVICES — ONLINE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Two Disciplines, <span className="gradient-text glitch-text" data-text="One Studio">One Studio</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Custom web development and UI/UX design — two powerful disciplines that together create complete, extraordinary digital products.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}>
              <ServiceCard service={service} isActive={activeId === service.id} onActivate={() => setActiveId(activeId === service.id ? null : service.id)} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Stats — HUD data readout */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50+", label: "Builds Shipped", code: "0x032" },
            { value: "0", label: "Templates Used", code: "0x000" },
            { value: "100%", label: "Custom Code", code: "0xFFF" },
            { value: "<24h", label: "Response Time", code: "0x018" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl px-5 py-4 text-center hud-corners relative overflow-hidden"
              style={{ background: "rgba(5,5,7,0.7)", border: "1px solid rgba(124,58,237,0.06)" }}>
              <span className="absolute top-1.5 right-2 text-[8px] font-mono text-purple-700/40">{s.code}</span>
              <p className="text-2xl font-bold gradient-text font-mono">{s.value}</p>
              <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider font-mono">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}