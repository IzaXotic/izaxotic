"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap, Star, Crown, ArrowRight } from "lucide-react";
import IXMark from "@/components/ui/IXMark";

type BillingCycle = "oneoff" | "retainer";

const plans = [
  {
    id: "essential", name: "Essential", icon: Zap, tagline: "Perfect launchpad for startups & small businesses",
    color: "#6D28D9", glowColor: "rgba(109,40,217,0.4)", badge: null,
    oneoff: { inr: 9999, usd: 120 }, retainer: { inr: 2999, usd: 36 }, retainerNote: "/mo maintenance",
    description: "A fully custom-built, pixel-perfect website crafted from scratch. Clean code, thoughtful design.",
    features: [
      { label: "100% custom developed", included: true },
      { label: "Up to 5 custom-designed pages", included: true },
      { label: "Mobile-first responsive layout", included: true },
      { label: "Custom UI design (Figma → Code)", included: true },
      { label: "Contact form integration", included: true },
      { label: "On-page SEO setup", included: true },
      { label: "3 rounds of revisions", included: true },
      { label: "1 month post-launch support", included: true },
      { label: "Custom micro-animations", included: false },
      { label: "3D / interactive elements", included: false },
      { label: "Backend / database integration", included: false },
      { label: "CMS / admin dashboard", included: false },
    ],
    cta: "Get Started", delivery: "1–2 weeks", code: "PLAN_ESS",
  },
  {
    id: "professional", name: "Professional", icon: Star, tagline: "Premium build for growing brands & startups",
    color: "#7C3AED", glowColor: "rgba(124,58,237,0.6)", badge: "Most Popular",
    oneoff: { inr: 29999, usd: 360 }, retainer: { inr: 5999, usd: 72 }, retainerNote: "/mo maintenance",
    description: "A full-scale custom web application — hand-crafted design, advanced animations, and production-grade code.",
    features: [
      { label: "100% custom developed", included: true },
      { label: "Up to 12 custom-designed pages", included: true },
      { label: "Mobile-first responsive layout", included: true },
      { label: "Advanced UI/UX design system", included: true },
      { label: "Custom micro-animations (GSAP/Framer)", included: true },
      { label: "On-page SEO + performance optimisation", included: true },
      { label: "Unlimited revisions", included: true },
      { label: "3 months post-launch support", included: true },
      { label: "3D hero / interactive element", included: true },
      { label: "CMS / admin dashboard", included: true },
      { label: "Backend / database integration", included: false },
      { label: "Dedicated project manager", included: false },
    ],
    cta: "Start Build", delivery: "3–5 weeks", code: "PLAN_PRO",
  },
  {
    id: "enterprise", name: "Enterprise", icon: Crown, tagline: "Full-scale custom application for serious businesses",
    color: "#A78BFA", glowColor: "rgba(167,139,250,0.5)", badge: "Best Value",
    oneoff: { inr: 74999, usd: 900 }, retainer: { inr: 11999, usd: 144 }, retainerNote: "/mo maintenance",
    description: "Complex, enterprise-grade digital products built entirely to spec. Custom architecture, full 3D world, backend systems.",
    features: [
      { label: "100% custom coded — built to your spec", included: true },
      { label: "Unlimited pages & screens", included: true },
      { label: "Mobile-first responsive layout", included: true },
      { label: "Full bespoke UI/UX design system", included: true },
      { label: "Advanced animations (GSAP + Framer)", included: true },
      { label: "SEO audit + Lighthouse 90+ guarantee", included: true },
      { label: "Unlimited revisions", included: true },
      { label: "6 months post-launch support", included: true },
      { label: "Full 3D / Three.js experience", included: true },
      { label: "Custom CMS + admin dashboard", included: true },
      { label: "Full backend / API / database integration", included: true },
      { label: "Dedicated project manager", included: true },
    ],
    cta: "Let's Talk", delivery: "6–10 weeks", code: "PLAN_ENT",
  },
];

const addons = [
  { label: "Extra Revision Round" },
  { label: "Logo & Brand Identity Design" },
  { label: "Monthly Maintenance & Hosting Mgmt" },
  { label: "Speed & SEO Optimisation Audit" },
  { label: "AI Chatbot Integration" },
  { label: "Blog / News CMS Setup" },
  { label: "E-commerce / Payment Gateway" },
  { label: "Multi-language (i18n) Support" },
];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("oneoff");

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" aria-label="Pricing plans and packages" className="section-padding relative overflow-hidden">
      {/* CSS ambient backgrounds instead of Three.js */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 20%, rgba(124,58,237,0.04) 0%, transparent 60%)",
      }} />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-700/4 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-fuchsia-600/3 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 noise-grain pointer-events-none" />

      {/* Section connector */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-purple-500/25 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500/40" style={{ boxShadow: "0 0 8px rgba(124,58,237,0.25)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-purple-300/80 text-[10px] uppercase tracking-[0.3em] font-mono mb-4"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
            <IXMark size={14} />
            SYS://PRICING — TRANSPARENT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Invest in <span className="gradient-text">Real Code</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm">
            Every plan is 100% custom-coded to your spec. No page-builder markup, no vendor lock-in — you own every line.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 rounded-full px-1.5 py-1.5"
            style={{ background: "rgba(5,5,7,0.7)", border: "1px solid rgba(124,58,237,0.1)" }}>
            <button onClick={() => setBilling("oneoff")}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-mono transition-all duration-200 ${billing === "oneoff" ? "text-white" : "text-gray-500 hover:text-white"}`}
              style={billing === "oneoff" ? { background: "rgba(124,58,237,0.2)", boxShadow: "0 0 15px rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" } : {}}>
              One-off
            </button>
            <button onClick={() => setBilling("retainer")}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-mono transition-all duration-200 flex items-center gap-2 ${billing === "retainer" ? "text-white" : "text-gray-500 hover:text-white"}`}
              style={billing === "retainer" ? { background: "rgba(124,58,237,0.2)", boxShadow: "0 0 15px rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" } : {}}>
              Retainer
              <span className="text-[9px] bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full font-mono">ONGOING</span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = plan[billing];
            const isPro = plan.id === "professional";

            return (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative rounded-2xl overflow-hidden flex flex-col hud-corners holo-shimmer"
                style={{
                  background: "rgba(5,5,7,0.85)",
                  backdropFilter: "blur(20px)",
                  border: isPro ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(124,58,237,0.08)",
                  boxShadow: isPro ? "0 0 50px rgba(124,58,237,0.12)" : "none",
                }}>

                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
                }} />

                {/* Badge */}
                {plan.badge && (
                  <div className="py-1.5 text-center text-[9px] font-bold tracking-[0.3em] uppercase text-white font-mono"
                    style={{ background: `linear-gradient(90deg, ${plan.color}, #4C1D95)` }}>
                    {plan.badge}
                  </div>
                )}

                <div className={`p-7 flex flex-col flex-1 relative z-10 ${plan.badge ? "" : ""}`}>
                  {/* HUD code */}
                  <span className="text-[8px] font-mono text-purple-700/40 mb-3 tracking-widest">{plan.code}</span>

                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${plan.color}12`, border: `1px solid ${plan.color}30`, boxShadow: `0 0 15px ${plan.color}08` }}>
                      <Icon size={20} style={{ color: plan.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl leading-none">{plan.name}</h3>
                      <p className="text-[10px] text-gray-600 mt-0.5 font-mono">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <AnimatePresence mode="wait">
                    <motion.div key={billing} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mb-2">
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-extrabold font-mono" style={{ color: plan.color }}>{formatINR(price.inr)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-sm font-mono">≈ ${price.usd} USD</span>
                        <span className="text-gray-600 text-xs font-mono">{billing === "retainer" ? "/ month" : "/ project"}</span>
                      </div>
                      {billing === "retainer" && (
                        <p className="text-green-400 text-xs mt-1 font-medium font-mono">🔄 Ongoing support</p>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Delivery */}
                  <div className="inline-flex items-center gap-1.5 text-[10px] px-3 py-1 rounded-full mb-5 w-fit font-mono"
                    style={{ background: `${plan.color}0a`, border: `1px solid ${plan.color}18`, color: plan.color }}>
                    <Zap size={10} />
                    ETA: {plan.delivery}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 border-b border-purple-900/20 pb-6">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5">
                        {f.included ? (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${plan.color}18` }}>
                            <Check size={10} style={{ color: plan.color }} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-800/50">
                            <X size={10} className="text-gray-700" strokeWidth={3} />
                          </div>
                        )}
                        <span className={`text-sm leading-snug ${f.included ? "text-gray-300" : "text-gray-600"}`}>{f.label}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={scrollToContact}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 font-mono"
                    style={isPro ? {
                      background: `linear-gradient(135deg, ${plan.color}, #4C1D95)`, color: "white", boxShadow: `0 0 25px ${plan.glowColor}`,
                    } : {
                      background: `${plan.color}0d`, color: plan.color, border: `1px solid ${plan.color}30`,
                    }}>
                    {plan.cta} <ArrowRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Optional <span className="gradient-text">Add-ons</span></h3>
            <p className="text-gray-500 text-sm mt-2 font-mono">Enhance any plan with these extras</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon, i) => (
              <motion.div key={addon.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl px-5 py-4 flex items-center justify-between hud-corners hover:border-purple-500/30 transition-colors"
                style={{ background: "rgba(5,5,7,0.7)", border: "1px solid rgba(124,58,237,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" style={{ boxShadow: "0 0 6px rgba(124,58,237,0.3)" }} />
                  <span className="text-sm text-gray-300 font-medium">{addon.label}</span>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-purple-400/80 text-xs font-mono uppercase tracking-wider">Contact for pricing</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="mt-14 rounded-2xl p-8 text-center hud-corners relative overflow-hidden"
          style={{ background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.1)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
          }} />
          <p className="text-gray-400 text-sm mb-2 relative z-10 font-mono">Not sure which plan is right for you?</p>
          <h4 className="text-2xl font-bold text-white mb-4 relative z-10">
            Let&apos;s build a <span className="gradient-text">custom quote</span> together
          </h4>
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124,58,237,0.5)" }} whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold font-mono transition-all duration-200 relative z-10"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", boxShadow: "0 0 25px rgba(124,58,237,0.3)" }}>
            Get a Free Quote <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}