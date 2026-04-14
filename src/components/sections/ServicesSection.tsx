"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Palette,
  Globe,
  Layers,
  Zap,
  Smartphone,
  Monitor,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "web-dev",
    icon: Code2,
    title: "Web Application Development",
    tagline: "Full-stack, scalable, performant",
    color: "#7C3AED",
    description:
      "We architect and build enterprise-grade web applications using the latest technologies. From concept to deployment, every line of code is crafted for performance, scalability, and maintainability.",
    features: [
      { icon: Globe, label: "Next.js & React Apps" },
      { icon: Zap, label: "High Performance APIs" },
      { icon: Layers, label: "Scalable Architecture" },
      { icon: Smartphone, label: "Mobile-First" },
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX Design",
    tagline: "Beautiful, intuitive, immersive",
    color: "#A78BFA",
    description:
      "We design digital experiences that captivate and convert. Our design process blends deep user research, cutting-edge visual trends, and pixel-perfect execution to create interfaces people love.",
    features: [
      { icon: Monitor, label: "Interface Design" },
      { icon: Layers, label: "Design Systems" },
      { icon: Smartphone, label: "Responsive Prototypes" },
      { icon: Zap, label: "Motion & Micro-interactions" },
    ],
    tech: [
      "Figma",
      "Framer",
      "Three.js",
      "GSAP",
      "Tailwind CSS",
      "Storybook",
    ],
  },
];

function ServiceCard({
  service,
  isActive,
  onActivate,
}: {
  service: (typeof services)[0];
  isActive: boolean;
  onActivate: () => void;
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onActivate}
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isActive
          ? "col-span-1 lg:col-span-2 row-span-2"
          : "col-span-1 row-span-1"
      }`}
      data-cursor-hover
      style={{
        background: "rgba(19, 19, 26, 0.6)",
        backdropFilter: "blur(20px)",
        border: isActive
          ? `1px solid ${service.color}50`
          : "1px solid rgba(124,58,237,0.15)",
      }}
    >
      {/* Spotlight follow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${service.color}12, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-7">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: `${service.color}15`,
              border: `1px solid ${service.color}30`,
            }}
          >
            <Icon size={22} style={{ color: service.color }} />
          </div>
          <motion.div
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={18} className="text-gray-500" />
          </motion.div>
        </div>

        {/* Title */}
        <p
          className="text-[10px] uppercase tracking-[0.2em] mb-2 font-semibold"
          style={{ color: service.color }}
        >
          {service.tagline}
        </p>
        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div
          className={`grid gap-2 mt-5 ${
            isActive ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"
          }`}
        >
          {service.features.map((f) => {
            const FIcon = f.icon;
            return (
              <div
                key={f.label}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: `${service.color}08` }}
              >
                <FIcon size={13} style={{ color: service.color }} />
                <span className="text-xs text-gray-300 font-medium">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div
                className="mt-6 pt-6"
                style={{ borderTop: `1px solid ${service.color}15` }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold"
                  style={{ color: service.color }}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-medium text-purple-200"
                      style={{
                        background: `${service.color}12`,
                        border: `1px solid ${service.color}25`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, #4C1D95)`,
                    boxShadow: `0 0 25px ${service.color}30`,
                  }}
                >
                  Get a Quote
                  <ArrowRight size={14} />
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

  return (
    <section id="services" className="section-padding relative">
      {/* Connector line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
            What We Build
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Two Disciplines,{" "}
            <span className="gradient-text">One Studio</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We specialise in custom web development and UI/UX design — two
            powerful disciplines that together create complete, extraordinary
            digital products. Every project is 100% hand-coded, tailored to your
            brand, and built for performance.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                service={service}
                isActive={activeId === service.id}
                onActivate={() =>
                  setActiveId(activeId === service.id ? null : service.id)
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "0", label: "Templates Used" },
            { value: "100%", label: "Custom Code" },
            { value: "<24h", label: "Response Time" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass rounded-xl px-5 py-4 text-center border border-purple-500/10"
            >
              <p className="text-2xl font-bold gradient-text">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
