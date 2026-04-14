"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "NovaPay Dashboard",
    category: "web-dev",
    tags: ["React", "Next.js", "TypeScript"],
    description:
      "A high-performance fintech dashboard with real-time analytics, dark-mode UI, and blazing-fast data visualizations.",
    longDescription:
      "NovaPay needed a complete overhaul of their internal analytics dashboard. We architected a Next.js application with WebSocket live data, recharts visualizations, and a custom design system built on Tailwind CSS. The result: 60% faster load times and a 40% increase in team productivity.",
    color: "#7C3AED",
    gradient: "from-purple-900/60 to-indigo-900/60",
    featured: true,
  },
  {
    id: 2,
    title: "QuantumUI Design System",
    category: "ui-ux",
    tags: ["Figma", "Design System", "UI"],
    description:
      "A comprehensive design system for a SaaS platform — 200+ components, tokens, and documentation site.",
    longDescription:
      "We created QuantumUI from scratch: a complete design language with color tokens, typography scales, component library in Figma and React, Storybook docs, and a full contributing guide. Used by a team of 30+ designers and engineers.",
    color: "#A78BFA",
    gradient: "from-violet-900/60 to-purple-900/60",
    featured: false,
  },
  {
    id: 3,
    title: "EcoTrack Web App",
    category: "web-dev",
    tags: ["Next.js", "Maps API", "Node.js"],
    description:
      "Carbon footprint tracking platform with interactive maps, gamification, and social leaderboards.",
    longDescription:
      "EcoTrack helps individuals and companies measure and reduce their carbon footprint. We built the full-stack app: interactive map with Mapbox, gamified progress tracking, REST API with Node.js/MongoDB, and social features. 10k+ users in the first month.",
    color: "#6D28D9",
    gradient: "from-purple-900/60 to-fuchsia-900/60",
    featured: false,
  },
  {
    id: 4,
    title: "LuxeStay Booking UX",
    category: "ui-ux",
    tags: ["Figma", "Prototyping", "Research"],
    description:
      "End-to-end UX redesign for a luxury property booking platform — 35% conversion rate increase.",
    longDescription:
      "Through user research, A/B testing, and iterative prototyping, we completely redesigned LuxeStay's booking flow. The new design reduced drop-off by 50% and boosted conversions by 35%, directly adding $2M in annual revenue.",
    color: "#7C3AED",
    gradient: "from-indigo-900/60 to-purple-900/60",
    featured: false,
  },
  {
    id: 5,
    title: "PulseAI Platform",
    category: "web-dev",
    tags: ["React", "AI/ML", "Python"],
    description:
      "AI-powered content intelligence platform with real-time analysis and actionable insights.",
    longDescription:
      "PulseAI ingests thousands of articles per hour, runs NLP analysis, and surfaces key trends for editorial teams. We built the React frontend, integrated with Python FastAPI backend, and created custom D3.js visualizations for complex data.",
    color: "#8B5CF6",
    gradient: "from-purple-900/60 to-blue-900/60",
    featured: false,
  },
  {
    id: 6,
    title: "MindFlow Brand Experience",
    category: "ui-ux",
    tags: ["Branding", "Motion", "Web Design"],
    description:
      "Immersive brand experience website for a mental wellness startup with GSAP animations.",
    longDescription:
      "MindFlow needed a website that felt calming yet engaging. We designed and built a fully animated experience with GSAP ScrollTrigger, custom SVG illustrations, and smooth parallax — achieving a 4.9/5 user delight score in testing.",
    color: "#A78BFA",
    gradient: "from-violet-900/60 to-pink-900/60",
    featured: false,
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "web-dev", label: "Development" },
  { key: "ui-ux", label: "Design" },
];

function ProjectCard({
  project,
  onSelect,
  size = "default",
}: {
  project: (typeof projects)[0];
  onSelect: () => void;
  size?: "hero" | "default";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isHero = size === "hero";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onSelect}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isHero ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
      style={{
        background: "rgba(19,19,26,0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(124,58,237,0.15)",
      }}
      data-cursor-hover
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}10, transparent 60%)`,
        }}
      />

      {/* Visual header */}
      <div
        className={`bg-gradient-to-br ${project.gradient} relative overflow-hidden ${
          isHero ? "h-64" : "h-44"
        }`}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color} 0%, transparent 70%)`,
          }}
        />
        {/* Geometric shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-2xl rotate-45 opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
            style={{ background: project.color }}
          />
          <div
            className="absolute w-12 h-12 rounded-xl rotate-12 opacity-20 group-hover:opacity-40 group-hover:rotate-45 transition-all duration-500"
            style={{ background: project.color, filter: "blur(2px)" }}
          />
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
            <ExternalLink size={13} className="text-white" />
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-purple-600/80 border border-purple-400/30">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-5 ${isHero ? "p-7" : ""}`}>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-purple-300"
              style={{
                background: `${project.color}12`,
                border: `1px solid ${project.color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3
          className={`font-bold text-white mb-2 group-hover:text-purple-300 transition-colors ${
            isHero ? "text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {project.description}
        </p>
        {isHero && (
          <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:gap-3 transition-all">
            View Case Study <ArrowRight size={14} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Proof in Every <span className="gradient-text">Pixel</span>
            </h2>
            <p className="text-gray-400 max-w-lg">
              A curated selection of our finest web development and design
              projects — each one a story of craft, collaboration, and measurable
              impact.
            </p>
          </div>

          {/* Filters — right aligned */}
          <div className="flex gap-2 flex-shrink-0">
            {filters.map((f) => (
              <motion.button
                key={f.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.key
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                    : "glass border border-purple-500/20 text-gray-400 hover:text-white"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Asymmetric grid: featured hero + smaller cards */}
        <motion.div layout className="grid lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {/* Featured card takes 2 cols */}
            {featured && (
              <motion.div
                key={`featured-${featured.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-2 lg:row-span-2"
              >
                <ProjectCard
                  project={featured}
                  onSelect={() => setSelectedProject(featured)}
                  size="hero"
                />
              </motion.div>
            )}

            {/* Rest of cards */}
            {rest.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="rounded-2xl max-w-lg w-full pointer-events-auto overflow-hidden"
                style={{
                  background: "rgba(19,19,26,0.95)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  boxShadow: "0 0 60px rgba(124,58,237,0.15)",
                }}
              >
                <div
                  className={`h-40 bg-gradient-to-br ${selectedProject.gradient} relative`}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${selectedProject.color} 0%, transparent 70%)`,
                    }}
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center glass"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
                <div className="p-7">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs text-purple-300"
                        style={{
                          background: `${selectedProject.color}15`,
                          border: `1px solid ${selectedProject.color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {selectedProject.longDescription}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedProject(null);
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-sm bg-purple-600 hover:bg-purple-500 transition-all flex items-center justify-center gap-2"
                    style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
                  >
                    Start a Similar Project
                    <ArrowRight size={14} />
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
