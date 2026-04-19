"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, MapPin, Mail, Clock } from "lucide-react";
import IXMark from "@/components/ui/IXMark";

const GlowOrb = dynamic(() => import("@/components/three/GlowOrb"), { ssr: false });

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail, label: "Email", value: "", href: "", code: "0xMAIL", isEmail: true },
  { icon: MapPin, label: "Location", value: "Remote-First, India", href: "", code: "0xGEO" },
  { icon: Clock, label: "Response", value: "< 24 hours", href: "", code: "0xTIME" },
];

const emailUser = "hello";
const emailDomain = "izaxotic.com";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id="contact" aria-label="Contact IzaXotic" className="section-padding relative overflow-hidden scanlines">
      {/* 3D glow orb background */}
      <GlowOrb size={1.5} color="#7C3AED" pulseSpeed={0.6} className="opacity-25" />
      <div className="absolute inset-0 noise-grain pointer-events-none" />

      {/* Circuit connector */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-purple-500/25 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500/40" style={{ boxShadow: "0 0 8px rgba(124,58,237,0.25)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-purple-300/80 text-[10px] uppercase tracking-[0.3em] font-mono mb-4"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <IXMark size={14} />
              SYS://CONTACT — OPEN
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="gradient-text glitch-text" data-text="Build">Build</span>?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Tell us what you&apos;re imagining. We&apos;ll handle the rest — from design to deployment, every line hand-written for you.
            </p>
          </motion.div>

          {/* Inline contact info strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="flex flex-wrap gap-3">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl relative overflow-hidden hud-corners"
                  style={{ background: "rgba(5,5,7,0.8)", backdropFilter: "blur(16px)", border: "1px solid rgba(124,58,237,0.1)" }}>
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
                  }} />
                  <Icon size={14} className="text-purple-400 flex-shrink-0 relative z-10" />
                  <div className="flex flex-col relative z-10">
                    <span className="text-[8px] text-purple-700/50 font-mono tracking-widest">{info.code}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider leading-none">{info.label}</span>
                    {"isEmail" in info && info.isEmail ? (
                      <button onClick={() => window.location.href = `mailto:${emailUser}@${emailDomain}`} className="text-sm text-gray-200 font-medium hover:text-purple-300 transition-colors font-mono text-left">{emailUser}@{emailDomain}</button>
                    ) : info.href ? (
                      <a href={info.href} className="text-sm text-gray-200 font-medium hover:text-purple-300 transition-colors font-mono">{info.value}</a>
                    ) : (
                      <span className="text-sm text-gray-200 font-medium font-mono">{info.value}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — quote + process */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="lg:col-span-2 flex flex-col gap-6">
            {/* Quote card */}
            <div className="rounded-2xl p-6 relative overflow-hidden flex-1 hud-corners holo-shimmer"
              style={{ background: "rgba(5,5,7,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(124,58,237,0.1)" }}>
              {/* Scanline */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
              }} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/15 border border-purple-500/25 flex items-center justify-center">
                    <IXMark size={14} animate={false} />
                  </div>
                  <span className="text-[8px] font-mono text-purple-700/40 tracking-widest">LOG://QUOTE</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed italic mb-5">
                  &quot;Every great digital product starts with a great conversation. Tell us your idea — we&apos;re genuinely excited to hear it.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-white text-xs font-black font-mono">PI</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Prem IzaX</p>
                    <p className="text-gray-500 text-xs font-mono">Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="rounded-2xl p-6 relative overflow-hidden hud-corners"
              style={{ background: "rgba(5,5,7,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(124,58,237,0.08)" }}>
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
              }} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[10px] text-purple-400 uppercase tracking-[0.3em] font-semibold font-mono">Process Pipeline</p>
                  <span className="text-[8px] font-mono text-purple-700/40 tracking-widest">PROC://004</span>
                </div>
                <div className="space-y-4 relative">
                  {/* Vertical line */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/30 via-purple-500/15 to-transparent" />
                  {[
                    { step: "01", label: "You tell us your vision", code: "CMD_INIT" },
                    { step: "02", label: "We design & architect", code: "CMD_PLAN" },
                    { step: "03", label: "We build — every line by hand", code: "CMD_EXEC" },
                    { step: "04", label: "Launch & ongoing support", code: "CMD_LIVE" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3 relative">
                      <div className="w-[30px] h-[30px] rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ boxShadow: "0 0 8px rgba(124,58,237,0.1)" }}>
                        <span className="text-[10px] font-bold text-purple-400 font-mono">{s.step}</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-300">{s.label}</span>
                        <span className="block text-[8px] font-mono text-purple-800/40 tracking-widest">{s.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form — spotlight card */}
          <motion.div ref={formRef} onMouseMove={handleMouseMove} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="lg:col-span-3 relative">
            <div className="rounded-2xl p-8 relative overflow-hidden hud-corners"
              style={{ background: "rgba(5,5,7,0.85)", backdropFilter: "blur(24px)", border: "1px solid rgba(124,58,237,0.12)" }}>
              {/* HUD top bar */}
              <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4"
                style={{ background: "rgba(124,58,237,0.04)", borderBottom: "1px solid rgba(124,58,237,0.08)" }}>
                <span className="text-[8px] font-mono text-purple-500/50 tracking-widest">FORM://CONTACT_001</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                  <span className="text-[8px] font-mono text-green-400/50">ACTIVE</span>
                </div>
              </div>

              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
              }} />

              {/* Spotlight follow */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.06), transparent 60%)` }} />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-80 text-center pt-8">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <CheckCircle size={56} className="text-purple-400 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-mono">Transmission Sent</h3>
                    <p className="text-gray-400 text-sm max-w-xs font-mono">Response ETA: &lt; 24 hours 🚀</p>
                    <div className="mt-6 w-full max-w-xs h-1 rounded-full overflow-hidden" style={{ background: "rgba(124,58,237,0.2)" }}>
                      <motion.div initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-300 rounded-full" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)}
                    className="relative z-10 space-y-5 pt-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs text-gray-500 uppercase tracking-[0.2em] mb-2 font-mono">↳ Name</label>
                        <input id="name" {...register("name")} placeholder="Your name"
                          className="w-full bg-white/[0.02] border border-purple-800/20 rounded-xl px-4 py-3 min-h-[48px] text-white text-base font-mono placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/15 transition-all" />
                        {errors.name && <p className="mt-1 text-xs text-red-400 font-mono">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs text-gray-500 uppercase tracking-[0.2em] mb-2 font-mono">↳ Email</label>
                        <input id="email" {...register("email")} type="email" placeholder="you@company.com"
                          className="w-full bg-white/[0.02] border border-purple-800/20 rounded-xl px-4 py-3 min-h-[48px] text-white text-base font-mono placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/15 transition-all" />
                        {errors.email && <p className="mt-1 text-xs text-red-400 font-mono">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs text-gray-500 uppercase tracking-[0.2em] mb-2 font-mono">↳ Subject</label>
                      <input id="subject" {...register("subject")} placeholder="Web Application Development"
                        className="w-full bg-white/[0.02] border border-purple-800/20 rounded-xl px-4 py-3 min-h-[48px] text-white text-base font-mono placeholder-gray-700 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/15 transition-all" />
                      {errors.subject && <p className="mt-1 text-xs text-red-400 font-mono">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs text-gray-500 uppercase tracking-[0.2em] mb-2 font-mono">↳ Message</label>
                      <textarea id="message" {...register("message")} rows={5} placeholder="Tell us about your project, timeline, and goals..."
                        className="w-full bg-white/[0.02] border border-purple-800/20 rounded-xl px-4 py-3 min-h-[48px] text-white text-base font-mono placeholder-gray-700 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/15 transition-all resize-none" />
                      {errors.message && <p className="mt-1 text-xs text-red-400 font-mono">{errors.message.message}</p>}
                    </div>

                    <motion.button type="submit" disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-white font-mono transition-all duration-200 disabled:opacity-70"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)", boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}>
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          Send Transmission
                          <Send size={15} />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}