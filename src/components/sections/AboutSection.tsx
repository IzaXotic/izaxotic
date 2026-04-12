"use client";
import { motion } from "framer-motion";
import { Crown, Cpu, Star, Award, Lightbulb, Heart } from "lucide-react";

const timeline = [
  {
    year: "2022",
    title: "The Spark",
    description:
      "IzaXotic was born from a shared vision — to build digital experiences that genuinely move people. Two creatives, one mission.",
    icon: Lightbulb,
  },
  {
    year: "2023",
    title: "First Major Launch",
    description:
      "Delivered our first enterprise project and immediately validated that the market needed what we were building. 5-star reviews from day one.",
    icon: Star,
  },
  {
    year: "2024",
    title: "Scaling Excellence",
    description:
      "Expanded our capability and portfolio. Served clients across Europe, Asia, and the Americas. Recognized as a top-tier boutique studio.",
    icon: Award,
  },
  {
    year: "2025",
    title: "Innovation Lab",
    description:
      "Launched our R&D arm — exploring AI-integrated design, generative 3D, and next-gen web interfaces. Pushing the frontier.",
    icon: Cpu,
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
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-purple-700/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The <span className="gradient-text">IzaXotic</span> Story
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We are a boutique studio driven by the belief that great design and
            great engineering are inseparable.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isRight ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isRight ? "md:pr-12 md:text-right" : "md:pl-12"
                    } pl-12 md:pl-0`}
                  >
                    <div
                      className={`glass rounded-xl p-6 glow-border hover:border-purple-500/40 transition-colors ${
                        isRight ? "md:ml-auto" : ""
                      } md:max-w-sm`}
                    >
                      <span className="text-purple-400 font-bold text-lg">
                        {item.year}
                      </span>
                      <h3 className="text-white font-bold text-xl mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 border-2 border-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.6)] z-10">
                    <Icon size={14} className="text-white" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white">
            Meet the <span className="gradient-text">Team</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((member, i) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-7 glow-border relative overflow-hidden"
                style={{
                  animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
                }}
                data-cursor-hover
              >
                {/* Glow bg */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20"
                  style={{ background: member.color }}
                />

                {/* Avatar */}
                <div className="relative mb-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                    style={{ background: `${member.color}20`, border: `2px solid ${member.color}50` }}
                  >
                    <Icon size={28} style={{ color: member.color }} />
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0B0B0F] flex items-center justify-center"
                    style={{ background: member.color }}
                  >
                    <Heart size={9} className="text-white" fill="white" />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white text-center">
                  {member.name}
                </h4>
                <p
                  className="text-sm font-medium text-center mb-4"
                  style={{ color: member.color }}
                >
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-5">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${member.color}15`, color: member.color, border: `1px solid ${member.color}30` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
