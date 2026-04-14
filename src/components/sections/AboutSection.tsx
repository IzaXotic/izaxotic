"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import IXMark from "@/components/ui/IXMark";
import { useParallax } from "@/hooks/useParallax";

const GlowOrb = dynamic(() => import("@/components/three/GlowOrb"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });

const timeline = [
  { year: "2019", title: "Founded", text: "Started as a two-person studio focused on handcrafted web products.", code: "EVT_001" },
  { year: "2020", title: "First Scale", text: "Delivered enterprise dashboards and began building design systems.", code: "EVT_002" },
  { year: "2022", title: "Immersive Web", text: "Adopted WebGL & Three.js for immersive brand experiences.", code: "EVT_003" },
  { year: "2024", title: "IzaXotic Pro", text: "Expanded into full-service agency with hand-coded products and ongoing retainers.", code: "EVT_004" },
];

const team = [
  { name: "Prem IzaX", role: "Founder & Lead Engineer", initials: "PI" },
  { name: "Pauline Hannah", role: "Co-Founder & Principal Designer", initials: "PH" },
];

export default function AboutSection() {
  const { ref, bgY, midY, fgY, bgX, opacity } = useParallax();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="about" aria-label="About IzaXotic studio" className="section-padding relative overflow-hidden scanlines">
      {/* 3D backgrounds — slow parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 pointer-events-none">
        <ParticleField count={300} color="#7c3aed" speed={0.08} className="opacity-25 pointer-events-none" />
      </motion.div>
      <motion.div style={{ y: midY, x: bgX }} className="absolute right-0 top-0 w-80 h-80 pointer-events-none opacity-60">
        <GlowOrb size={1.2} color="#A78BFA" pulseSpeed={0.8} />
      </motion.div>

      {/* Noise grain */}
      <div className="absolute inset-0 noise-grain pointer-events-none" />

      {/* Circuit connector — mid parallax */}
      <motion.div style={{ y: midY }} className="absolute top-0 left-1/2 -translate-x-1/2">
        <div className="w-px h-20 bg-gradient-to-b from-purple-500/25 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-purple-500/40 -ml-[3px] -mt-px" style={{ boxShadow: "0 0 8px rgba(124,58,237,0.25)" }} />
      </motion.div>

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y: fgY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-purple-300/80 text-[10px] uppercase tracking-[0.3em] font-mono mb-3"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
            <IXMark size={12} />
            SYS://ABOUT — DECODED
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Built by Engineers, <span className="gradient-text glitch-text" data-text="Guided by Design">Guided by Design</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm">We craft digital products with a strict focus on clarity, performance, and timeless design — all written by hand, no templates.</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-8">
              {/* Vertical circuit line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />

              <div className="space-y-8">
                {timeline.map((t, i) => (
                  <motion.div key={t.year} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: i * 0.1 }} viewport={{ once: true }} className="relative">
                    {/* Node */}
                    <div className="absolute -left-[2.15rem] top-1 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)", boxShadow: "0 0 20px rgba(124,58,237,0.2)" }}>
                      <span className="text-[9px] font-mono text-white font-bold">{t.year.slice(2)}</span>
                    </div>
                    {/* Horizontal connector */}
                    <div className="absolute -left-2 top-[13px] w-4 h-px bg-purple-500/30" />

                    <div className="rounded-2xl p-5 hud-corners holo-shimmer relative overflow-hidden"
                      style={{ background: "rgba(5,5,7,0.8)", border: "1px solid rgba(124,58,237,0.06)" }}>
                      {/* Scanlines */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
                      }} />
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono text-purple-500/60 tracking-widest">{t.code}</span>
                        <span className="text-[9px] font-mono text-gray-700">{t.year}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-1">{t.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{t.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Team + stats */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
              className="rounded-2xl p-6 hud-corners relative overflow-hidden"
              style={{ background: "rgba(5,5,7,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(124,58,237,0.08)" }}>

              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
              }} />

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white text-xl font-bold">The Team</h3>
                <span className="text-[9px] font-mono text-purple-600/50 tracking-widest">CREW://003</span>
              </div>
              <div className="space-y-4 relative z-10">
                {team.map((m) => (
                  <div key={m.name} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-purple-500/[0.03]"
                    style={{ border: "1px solid rgba(124,58,237,0.04)" }}>
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(76,29,149,0.5))", border: "1px solid rgba(124,58,237,0.2)", boxShadow: "0 0 12px rgba(124,58,237,0.1)" }}>
                      <span className="text-xs font-bold text-white font-mono">{m.initials}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{m.name}</p>
                      <p className="text-gray-500 text-sm font-mono">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3 relative z-10">
                {[
                  { val: "50+", label: "Projects", code: "0x032" },
                  { val: "100%", label: "Hand-Coded", code: "0xFFF" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-xl text-center hud-corners relative overflow-hidden"
                    style={{ background: "rgba(5,5,7,0.6)", border: "1px solid rgba(124,58,237,0.06)" }}>
                    <span className="absolute top-1 right-1.5 text-[7px] font-mono text-purple-800/30">{s.code}</span>
                    <p className="text-2xl font-bold gradient-text font-mono">{s.val}</p>
                    <p className="text-[11px] text-gray-500 font-mono">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}