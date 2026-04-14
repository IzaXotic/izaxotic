"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Crown, Cpu, Star, Award, Lightbulb, Heart, ArrowRight } from "lucide-react";

const timeline = [
  {
    year: "2022",
    title: "The Spark",
    description:
      "IzaXotic was born from a shared vision — to build digital experiences that genuinely move people.",
    icon: Lightbulb,
    color: "#6D28D9",
  },
  {
    year: "2023",
    title: "First Major Launch",
    description:
      "Delivered our first enterprise project. 5-star reviews from day one.",
    icon: Star,
    color: "#7C3AED",
  },
  {
    year: "2024",
    title: "Scaling Excellence",
    description:
      "Expanded our portfolio. Served clients across Europe, Asia, and the Americas.",
    icon: Award,
    color: "#8B5CF6",
  },
  {
    year: "2025",
    title: "Innovation Lab",
    description:
      "Launched our R&D arm — exploring AI-integrated design, generative 3D, and next-gen web interfaces.",
    icon: Cpu,
    color: "#A78BFA",
  },
];

const team = [
  {
    name: "Prem IzaX",
    role: "CEO & Founder",
    bio: "Visionary engineer and entrepreneur. Passionate about the intersection of technology, art, and human experience. Leads product strategy and technical direction.",
    color: "#7C3AED",
    icon: Crown,
    skills: ["Strategy", "Full-Stack Dev", "Product Vision", "Leadership"],
  },
  {
    name: "Pauline Hannah",
    role: "CTO",
    bio: "Creative technologist with a deep love for systems thinking and elegant code. Architects our technical foundations and drives engineering excellence.",
    color: "#A78BFA",
    icon: Cpu,
    skills: ["Architecture", "UI Engineering", "Design Systems", "Innovation"],
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-purple-700/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header — left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The <span className="gradient-text">IzaXotic</span> Story
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We are a boutique web development and UI/UX design studio driven by
            the belief that great design and great engineering are inseparable.
            Founded in 2022, we have delivered over 50 custom-coded digital
            products for clients worldwide.
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative mb-24">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-purple-900/30">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  className="relative pt-14"
                >
                  {/* Node dot */}
                  <div
                    className="absolute top-2 left-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: `${item.color}25`,
                      border: `2px solid ${item.color}`,
                      boxShadow: `0 0 20px ${item.color}40`,
                    }}
                  >
                    <Icon size={13} className="text-white" />
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-xl p-5 h-full transition-colors duration-300 hover:border-purple-500/40"
                    style={{
                      background: "rgba(19,19,26,0.6)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(124,58,237,0.15)",
                    }}
                  >
                    <span
                      className="text-2xl font-black"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team — side by side overlapping */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-3xl font-bold text-white mb-2">
            Meet the <span className="gradient-text">Team</span>
          </h3>
          <p className="text-gray-500 text-sm mb-10 max-w-md">
            A small, mighty crew obsessed with craft.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {team.map((member, i) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 0 50px ${member.color}20`,
                }}
                className="relative rounded-2xl p-7 overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(19,19,26,0.7)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${member.color}20`,
                }}
                data-cursor-hover
              >
                {/* Glow bg */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-15"
                  style={{ background: member.color }}
                />

                <div className="relative z-10">
                  {/* Avatar + info row */}
                  <div className="flex items-start gap-5 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${member.color}15`,
                        border: `2px solid ${member.color}40`,
                      }}
                    >
                      <Icon size={24} style={{ color: member.color }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {member.name}
                      </h4>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: member.color }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `${member.color}12`,
                          color: member.color,
                          border: `1px solid ${member.color}25`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
