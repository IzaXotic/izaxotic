"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ArrowRight } from "lucide-react";

const FloatingGrid = dynamic(() => import("@/components/three/FloatingGrid"), { ssr: false });

const projects = [
  { id: 1, title: "NovaPay Dashboard", category: "web-dev", tags: ["React", "Next.js", "TypeScript"],
    description: "High-performance fintech dashboard with real-time analytics and blazing-fast data visualizations.",
    longDescription: "NovaPay needed a complete overhaul. We built a Next.js app with WebSocket live data, recharts visualizations, and a custom design system. Result: 60% faster loads, 40% productivity boost.",
    color: "#7C3AED", featured: true },
  { id: 2, title: "QuantumUI Design System", category: "ui-ux", tags: ["Figma", "Design System", "UI"],
    description: "200+ component design system for a SaaS platform — tokens, documentation, and Storybook site.",
    longDescription: "Built QuantumUI from scratch: color tokens, typography scales, Figma + React component library, Storybook docs. Used by 30+ designers and engineers.",
    color: "#A78BFA", featured: false },
  { id: 3, title: "EcoTrack Web App", category: "web-dev", tags: ["Next.js", "Maps API", "Node.js"],
    description: "Carbon footprint tracking platform with interactive maps and social leaderboards.",
    longDescription: "Full-stack app: interactive Mapbox maps, gamified tracking, REST API with Node/MongoDB, social features. 10k+ users in month one.",
    color: "#6D28D9", featured: false },
  { id: 4, title: "LuxeStay Booking UX", category: "ui-ux", tags: ["Figma", "Prototyping", "Research"],
    description: "End-to-end UX redesign — 35% conversion rate increase for luxury bookings.",
    longDescription: "Through user research and iterative prototyping, we reduced drop-off by 50% and boosted conversions by 35%, adding $2M annually.",
    color: "#7C3AED", featured: false },
  { id: 5, title: "PulseAI Platform", category: "web-dev", tags: ["React", "AI/ML", "Python"],
    description: "AI-powered content intelligence with real-time NLP analysis and D3.js visualizations.",
    longDescription: "Ingests thousands of articles per hour with NLP analysis. React frontend, Python FastAPI backend, custom D3.js data viz.",
    color: "#8B5CF6", featured: false },
  { id: 6, title: "MindFlow Brand Experience", category: "ui-ux", tags: ["Branding", "Motion", "Web Design"],
    description: "Immersive brand website for a wellness startup with GSAP scroll animations.",
    longDescription: "Fully animated experience with GSAP ScrollTrigger, custom SVG illustrations, parallax — 4.9/5 user delight score.",
    color: "#A78BFA", featured: false },
];

const filters = [
  { key: "all", label: "ALL" },
  { key: "web-dev", label: "DEV" },
  { key: "ui-ux", label: "DESIGN" },
];

function ProjectCard({ project, onSelect, size = "default" }: {
  project: (typeof projects)[0]; onSelect: () => void; size?: "hero" | "default";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isHero = size === "hero";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef} onMouseMove={handleMouseMove} onClick={onSelect} whileHover={{ y: -6 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer hud-corners holo-shimmer ${isHero ? "lg:col-span-2 lg:row-span-2" : ""}`}
      style={{ background: "rgba(5,5,7,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(124,58,237,0.08)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}
      data-cursor-hover
    >
      {/* Spotlight */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}0c, transparent 60%)` }} />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
      }} />

      {/* Visual header */}
      <div className={`relative overflow-hidden ${isHero ? "h-56" : "h-40"}`}
        style={{ background: `linear-gradient(135deg, ${project.color}12, rgba(5,5,7,0.9))` }}>
        <div className="absolute inset-0 opacity-15" style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}30 0%, transparent 70%)` }} />
        {/* Wireframe deco */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl rotate-45 border opacity-8 group-hover:opacity-20 group-hover:scale-125 transition-all duration-700" style={{ borderColor: project.color }} />
          <div className="absolute w-8 h-8 rounded-lg rotate-12 border opacity-10 group-hover:opacity-25 group-hover:rotate-45 transition-all duration-700" style={{ borderColor: project.color }} />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(${project.color}20 1px, transparent 1px), linear-gradient(90deg, ${project.color}20 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }} />
        {/* HUD corner data */}
        <span className="absolute bottom-2 left-3 text-[8px] font-mono text-gray-700 tracking-widest">
          PROJ://{String(project.id).padStart(3, "0")}
        </span>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(5,5,7,0.7)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <ExternalLink size={12} className="text-white" />
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-purple-300 font-mono"
              style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}>
              ★ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${isHero ? "p-7" : "p-5"}`}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium font-mono"
              style={{ background: `${project.color}08`, color: `${project.color}99`, border: `1px solid ${project.color}12` }}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={`font-bold text-white mb-2 group-hover:text-purple-300 transition-colors ${isHero ? "text-2xl" : "text-lg"}`}>
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{project.description}</p>
        {isHero && (
          <div className="mt-4 flex items-center gap-2 text-purple-400/80 text-sm font-medium font-mono group-hover:gap-3 transition-all">
            View Case Study <ArrowRight size={14} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);
  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <section id="portfolio" aria-label="Portfolio and case studies" className="section-padding relative scanlines">
      {/* 3D grid background */}
      <FloatingGrid className="opacity-25" />
      <div className="absolute inset-0 noise-grain pointer-events-none" />

      {/* Circuit connector */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-purple-500/25 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500/40" style={{ boxShadow: "0 0 8px rgba(124,58,237,0.25)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-purple-300/80 text-[10px] uppercase tracking-[0.3em] font-mono mb-4"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <span className="w-1 h-1 rounded-full bg-purple-500" />
              SYS://PORTFOLIO — LOADED
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Proof in Every <span className="gradient-text glitch-text" data-text="Pixel">Pixel</span>
            </h2>
            <p className="text-gray-500 max-w-lg text-sm">
              A curated selection of our finest projects — each one a story of craft, collaboration, and measurable impact.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 flex-shrink-0">
            {filters.map((f) => (
              <motion.button key={f.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-200 ${
                  activeFilter === f.key ? "text-white" : "text-gray-600 hover:text-white"
                }`}
                style={activeFilter === f.key ? {
                  background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", boxShadow: "0 0 12px rgba(124,58,237,0.12)",
                } : { background: "rgba(5,5,7,0.6)", border: "1px solid rgba(124,58,237,0.06)" }}>
                {f.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {featured && (
              <motion.div key={`featured-${featured.id}`} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }} className="lg:col-span-2 lg:row-span-2">
                <ProjectCard project={featured} onSelect={() => setSelectedProject(featured)} size="hero" />
              </motion.div>
            )}
            {rest.map((project) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.4 }}>
                <ProjectCard project={project} onSelect={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="rounded-2xl max-w-lg w-full pointer-events-auto overflow-hidden hud-corners scanlines"
                style={{ background: "rgba(5,5,7,0.95)", backdropFilter: "blur(24px)", border: "1px solid rgba(124,58,237,0.2)", boxShadow: "0 0 80px rgba(124,58,237,0.1)" }}>
                <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${selectedProject.color}15, rgba(5,5,7,0.9))` }}>
                  <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(circle at 50% 50%, ${selectedProject.color}25 0%, transparent 70%)` }} />
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `linear-gradient(${selectedProject.color}15 1px, transparent 1px), linear-gradient(90deg, ${selectedProject.color}15 1px, transparent 1px)`,
                    backgroundSize: "25px 25px",
                  }} />
                  <span className="absolute bottom-2 left-3 text-[8px] font-mono text-gray-700 tracking-widest">CASE_STUDY://{String(selectedProject.id).padStart(3, "0")}</span>
                  <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(5,5,7,0.7)", border: "1px solid rgba(124,58,237,0.2)" }}>
                    <X size={14} className="text-white" />
                  </button>
                </div>
                <div className="p-7">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-mono"
                        style={{ background: `${selectedProject.color}08`, color: `${selectedProject.color}bb`, border: `1px solid ${selectedProject.color}12` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{selectedProject.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{selectedProject.longDescription}</p>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setSelectedProject(null); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", boxShadow: "0 0 25px rgba(124,58,237,0.18)" }}>
                    Start a Similar Project <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}