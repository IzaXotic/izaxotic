"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Palette, ChevronDown, Globe, Layers, Zap, Smartphone, Monitor } from "lucide-react";

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
    tech: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"],
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
    tech: ["Figma", "Framer", "Three.js", "GSAP", "Tailwind CSS", "Storybook"],
  },
];

function ServiceCard({ service, isExpanded, onToggle }: {
  service: typeof services[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s ease" }}
    >
      <motion.div
        layout
        className="glass rounded-2xl overflow-hidden glow-border cursor-pointer"
        style={{ borderColor: isExpanded ? `${service.color}60` : "rgba(124,58,237,0.2)" }}
        onClick={onToggle}
        data-cursor-hover
      >
        {/* Card Header */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${service.color}20`, border: `1px solid ${service.color}40` }}
            >
              <Icon size={26} style={{ color: service.color }} />
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className="text-gray-400" />
            </motion.div>
          </div>

          <p className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-medium">
            {service.tagline}
          </p>
          <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {service.features.map((f) => {
              const FIcon = f.icon;
              return (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ background: `${service.color}10` }}
                >
                  <FIcon size={14} style={{ color: service.color }} />
                  <span className="text-xs text-gray-300">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expandable Panel */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="px-8 pb-8 border-t"
                style={{ borderColor: `${service.color}20` }}
              >
                <p className="text-xs text-purple-400 uppercase tracking-widest mt-6 mb-3 font-medium">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-medium text-purple-200"
                      style={{ background: `${service.color}20`, border: `1px solid ${service.color}30` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-sm transition-all"
                  style={{ background: `linear-gradient(135deg, ${service.color}, #4C1D95)`, boxShadow: `0 0 20px ${service.color}40` }}
                >
                  Get a Quote →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We specialise in two powerful disciplines that together create
            complete, extraordinary digital products.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                service={service}
                isExpanded={expanded === service.id}
                onToggle={() =>
                  setExpanded(expanded === service.id ? null : service.id)
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
