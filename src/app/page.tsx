"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AboutSection from "@/components/sections/AboutSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-10 h-10 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO: crawlable site summary for text-to-code ratio */}
      <article className="sr-only" aria-label="IzaXotic Studio Overview">
        <h1>IzaXotic — Custom Web Development &amp; UI/UX Design Studio</h1>
        <p>
          IzaXotic is a premium web development and UI/UX design studio that builds
          high-end, custom-coded websites and web applications from scratch. We do
          not use templates, page builders, or drag-and-drop tools. Every project is
          hand-coded with Next.js, React, TypeScript, Three.js, and modern web
          technologies. Our services include custom web application development,
          UI/UX design systems, interactive 3D experiences, performance optimisation,
          SEO audits, CMS dashboards, and ongoing maintenance. Based in India,
          serving clients worldwide. Contact us to start your project today.
        </p>
      </article>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
    </motion.div>
  );
}
