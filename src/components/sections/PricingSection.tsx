"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Star,
  Crown,
  ArrowRight,
  Sparkles,
  Code2,
  ShieldCheck,
} from "lucide-react";

type BillingCycle = "oneoff" | "retainer";

const plans = [
  {
    id: "essential",
    name: "Essential",
    icon: Zap,
    tagline: "Custom-coded presence for small businesses",
    color: "#6D28D9",
    glowColor: "rgba(109,40,217,0.4)",
    badge: null,
    oneoff: { inr: 15000, usd: 180 },
    retainer: { inr: 5000, usd: 60 },
    retainerNote: "/mo maintenance",
    description:
      "A fully hand-coded, pixel-perfect website built from scratch to your requirements. Zero templates. Zero drag-and-drop builders. Pure code.",
    features: [
      { label: "100% custom coded (no Wix/Webflow)", included: true },
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
    cta: "Get Started",
    delivery: "1–2 weeks",
  },
  {
    id: "professional",
    name: "Professional",
    icon: Star,
    tagline: "Premium custom build for growing brands",
    color: "#7C3AED",
    glowColor: "rgba(124,58,237,0.6)",
    badge: "Most Popular",
    oneoff: { inr: 45000, usd: 540 },
    retainer: { inr: 8000, usd: 96 },
    retainerNote: "/mo maintenance",
    description:
      "A full-scale custom web application — hand-crafted design, advanced animations, and clean production-grade code written specifically for your brand.",
    features: [
      { label: "100% custom coded (no templates)", included: true },
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
    cta: "Start Build",
    delivery: "3–5 weeks",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Crown,
    tagline: "Full-scale custom web application",
    color: "#A78BFA",
    glowColor: "rgba(167,139,250,0.5)",
    badge: "Best Value",
    oneoff: { inr: 100000, usd: 1200 },
    retainer: { inr: 15000, usd: 180 },
    retainerNote: "/mo maintenance",
    description:
      "Complex, enterprise-grade digital products built entirely to spec. Custom architecture, full 3D world, backend systems, and white-glove delivery.",
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
    cta: "Let's Talk",
    delivery: "6–10 weeks",
  },
];

const addons = [
  { label: "Extra Revision Round", inr: 2000, usd: 24 },
  { label: "Logo & Brand Identity Design", inr: 12000, usd: 144 },
  { label: "Monthly Maintenance & Hosting Mgmt", inr: 4000, usd: 48 },
  { label: "Speed & SEO Optimisation Audit", inr: 8000, usd: 96 },
  { label: "AI Chatbot Integration", inr: 18000, usd: 216 },
  { label: "Blog / News CMS Setup", inr: 10000, usd: 120 },
  { label: "E-commerce / Payment Gateway", inr: 25000, usd: 300 },
  { label: "Multi-language (i18n) Support", inr: 9000, usd: 108 },
];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("oneoff");

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-700/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
            <Sparkles size={12} />
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">Honest</span> Pricing
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            No hidden fees. No surprises. Pick the plan that fits your ambition
            — all prices in INR &amp; USD.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-full px-2 py-2 border border-purple-500/20">
            <button
              onClick={() => setBilling("oneoff")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                billing === "oneoff"
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              One-off Project
            </button>
            <button
              onClick={() => setBilling("retainer")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                billing === "retainer"
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly Retainer
              <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                Ongoing
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = plan[billing];
            const isPro = plan.id === "professional";

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`relative glass rounded-2xl overflow-hidden flex flex-col ${
                  isPro
                    ? "border-purple-500/60 shadow-[0_0_40px_rgba(124,58,237,0.3)]"
                    : "border-purple-900/40"
                }`}
                style={{
                  border: isPro
                    ? "1px solid rgba(124,58,237,0.5)"
                    : "1px solid rgba(124,58,237,0.15)",
                }}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div
                    className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-bold tracking-widest uppercase text-white"
                    style={{
                      background: `linear-gradient(90deg, ${plan.color}, #4C1D95)`,
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className={`p-7 flex flex-col flex-1 ${plan.badge ? "pt-10" : ""}`}>
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${plan.color}20`,
                        border: `1px solid ${plan.color}40`,
                      }}
                    >
                      <Icon size={20} style={{ color: plan.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl leading-none">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billing}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-end gap-2">
                          <span
                            className="text-4xl font-extrabold"
                            style={{ color: plan.color }}
                          >
                            {formatINR(price.inr)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 text-sm">
                            ≈ ${price.usd} USD
                          </span>
                          <span className="text-gray-600 text-xs">
                            {billing === "retainer" ? "/ month" : "/ project"}
                          </span>
                        </div>
                        {billing === "retainer" && (
                          <p className="text-green-400 text-xs mt-1 font-medium">
                            🔄 Ongoing support &amp; maintenance
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Delivery time */}
                  <div
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full mb-5 w-fit"
                    style={{
                      background: `${plan.color}12`,
                      border: `1px solid ${plan.color}25`,
                      color: plan.color,
                    }}
                  >
                    <Zap size={10} />
                    Delivery: {plan.delivery}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 border-b border-purple-900/30 pb-6">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5">
                        {f.included ? (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${plan.color}25` }}
                          >
                            <Check
                              size={10}
                              style={{ color: plan.color }}
                              strokeWidth={3}
                            />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-800">
                            <X
                              size={10}
                              className="text-gray-600"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        <span
                          className={`text-sm leading-snug ${
                            f.included ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToContact}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                    style={
                      isPro
                        ? {
                            background: `linear-gradient(135deg, ${plan.color}, #4C1D95)`,
                            color: "white",
                            boxShadow: `0 0 25px ${plan.glowColor}`,
                          }
                        : {
                            background: `${plan.color}15`,
                            color: plan.color,
                            border: `1px solid ${plan.color}40`,
                          }
                    }
                  >
                    {plan.cta}
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">
              Optional <span className="gradient-text">Add-ons</span>
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Enhance any plan with these extras
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon, i) => (
              <motion.div
                key={addon.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl px-5 py-4 flex items-center justify-between glow-border hover:border-purple-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-sm text-gray-300 font-medium">
                    {addon.label}
                  </span>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-purple-300 font-bold text-sm">
                    {formatINR(addon.inr)}
                  </p>
                  <p className="text-gray-600 text-xs">≈ ${addon.usd}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 glass rounded-2xl p-8 text-center glow-border"
          style={{ background: "rgba(124,58,237,0.06)" }}
        >
          <p className="text-gray-400 text-sm mb-2">
            Not sure which plan is right for you?
          </p>
          <h4 className="text-2xl font-bold text-white mb-4">
            Let&apos;s build a{" "}
            <span className="gradient-text">custom quote</span> together
          </h4>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(124,58,237,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all duration-200"
            style={{ boxShadow: "0 0 25px rgba(124,58,237,0.4)" }}
          >
            Get a Free Quote
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
