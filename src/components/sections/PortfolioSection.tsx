"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

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
  },
];

const filters = [
  { key: "all", label: "All Work" },
  { key: "web-dev", label: "Web Development" },
  { key: "ui-ux", label: "UI/UX Design" },
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A curated selection of our finest web development and design projects
            — each one a story of craft, collaboration, and measurable impact
            for our clients.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === f.key
                  ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                  : "glass border border-purple-500/30 text-gray-400 hover:text-white"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group glass rounded-2xl overflow-hidden cursor-pointer glow-border hover:border-purple-500/50 transition-all duration-300"
                data-cursor-hover
              >
                {/* Visual placeholder */}
                <div
                  className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${project.color} 0%, transparent 70%)`,
                    }}
                  />
                  {/* Abstract shape */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-24 h-24 rounded-2xl rotate-45 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ background: project.color }}
                    />
                    <div
                      className="absolute w-16 h-16 rounded-xl rotate-12 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                      style={{ background: project.color, filter: "blur(4px)" }}
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <ExternalLink
                      size={16}
                      className="text-white/40 group-hover:text-white/80 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs text-purple-300"
                        style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
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
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="glass glow-border rounded-2xl max-w-lg w-full pointer-events-auto overflow-hidden">
                {/* Modal header */}
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
                        style={{ background: `${selectedProject.color}15`, border: `1px solid ${selectedProject.color}30` }}
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
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setSelectedProject(null);
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 w-full py-3 rounded-xl text-white font-semibold text-sm bg-purple-600 hover:bg-purple-500 transition-all"
                    style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
                  >
                    Start a Similar Project →
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
