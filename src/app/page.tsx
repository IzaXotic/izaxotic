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
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
    </motion.div>
  );
}
