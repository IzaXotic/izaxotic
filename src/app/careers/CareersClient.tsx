"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2, Palette, Briefcase, ArrowLeft, Upload, CheckCircle,
  X, MapPin, Clock, Wifi, ChevronDown, ChevronUp,
} from "lucide-react";
import IXMark from "@/components/ui/IXMark";

/* ── Schema ─────────────────────────────────────────────────────────── */
const MAX_FILE_MB = 5;
const ACCEPTED = ["application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(1, "Please select a role"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Tell us a bit more about yourself (min 20 chars)"),
  resume: z
    .custom<FileList>()
    .refine((fl) => fl && fl.length > 0, "Resume is required")
    .refine((fl) => fl && fl[0]?.size <= MAX_FILE_MB * 1024 * 1024, `Max file size is ${MAX_FILE_MB}MB`)
    .refine((fl) => fl && ACCEPTED.includes(fl[0]?.type), "Only PDF or Word documents accepted"),
});

type FormData = z.infer<typeof schema>;

/* ── Roles ───────────────────────────────────────────────────────────── */
const openRoles = [
  {
    id: "frontend-dev",
    icon: Code2,
    title: "Frontend Developer",
    type: "Remote · Freelance",
    color: "#7C3AED",
    code: "JOB_001",
    skills: ["Next.js", "TypeScript", "Three.js", "Framer Motion"],
    description:
      "We're looking for a frontend developer who loves building pixel-perfect, performant interfaces. You'll work closely with our design team to turn Figma concepts into production-ready code.",
    responsibilities: [
      "Build and maintain responsive UI components with Next.js & TypeScript",
      "Implement animations with Framer Motion and GSAP",
      "Collaborate on Three.js / WebGL interactive experiences",
      "Ensure Lighthouse scores stay above 90 across all projects",
      "Participate in code reviews and maintain coding standards",
    ],
    requirements: [
      "2+ years of experience with React / Next.js",
      "Strong TypeScript proficiency",
      "Eye for design and attention to detail",
      "Familiarity with Three.js or WebGL (bonus)",
      "Ability to work independently in a remote environment",
    ],
  },
  {
    id: "ui-ux-designer",
    icon: Palette,
    title: "UI/UX Designer",
    type: "Remote · Freelance",
    color: "#A78BFA",
    code: "JOB_002",
    skills: ["Figma", "Motion Design", "Design Systems", "Prototyping"],
    description:
      "We need a designer who thinks in systems and sweats the details. You'll own the design process end-to-end — from wireframes and user flows to final high-fidelity Figma handoffs.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity UI designs in Figma",
      "Build and maintain a scalable design system",
      "Design micro-animations and interaction specs",
      "Conduct design reviews and iterate based on feedback",
      "Work directly with developers to ensure pixel-perfect implementation",
    ],
    requirements: [
      "3+ years of UI/UX design experience",
      "Expert-level Figma skills",
      "Strong portfolio showcasing web product design",
      "Experience with motion design / Lottie animations (bonus)",
      "Understanding of frontend constraints and component-based design",
    ],
  },
  {
    id: "project-coordinator",
    icon: Briefcase,
    title: "Project Coordinator",
    type: "Remote · Part-time",
    color: "#6D28D9",
    code: "JOB_003",
    skills: ["Client Comms", "Agile", "Notion", "Scheduling"],
    description:
      "Keep our projects on track and our clients delighted. You'll be the bridge between clients and the IzaXotic team — managing timelines, communications, and deliverables.",
    responsibilities: [
      "Manage project timelines and ensure on-time delivery",
      "Handle day-to-day client communications",
      "Organise tasks, sprints, and documentation in Notion",
      "Identify project risks and flag blockers early",
      "Prepare status reports and meeting notes",
    ],
    requirements: [
      "Experience in project coordination or account management",
      "Excellent written and verbal communication skills",
      "Proficiency with Notion, Slack, and Google Workspace",
      "Ability to manage multiple projects simultaneously",
      "Prior experience in a digital/tech agency (preferred)",
    ],
  },
];

/* ── Component ───────────────────────────────────────────────────────── */
export default function CareersClient() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [applyingFor, setApplyingFor] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedRole = watch("role");

  function handleApply(roleTitle: string) {
    setApplyingFor(roleTitle);
    setValue("role", roleTitle);
    setValue("subject", `Application for ${roleTitle} — IzaXotic`);
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setResumeFileName(file ? file.name : "");
    setValue("resume", e.target.files as FileList, { shouldValidate: true });
  }

  async function onSubmit(data: FormData) {
    // Build mailto link as fallback (replace with your API/Netlify form later)
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nRole: ${data.role}\n\n${data.message}\n\n[Resume attached: ${data.resume[0]?.name}]`
    );
    window.location.href = `mailto:hello@izaxotic.com?subject=${encodeURIComponent(data.subject)}&body=${body}`;
    setSubmitted(true);
    reset();
    setResumeFileName("");
  }

  return (
    <main className="min-h-screen bg-[#050507] relative overflow-x-hidden">
      {/* Noise grain */}
      <div className="absolute inset-0 noise-grain pointer-events-none opacity-40" />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 relative z-10">

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/#about" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-purple-400 transition-colors font-mono mb-12">
            <ArrowLeft size={14} />
            Back to site
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-purple-300/80 text-[10px] uppercase tracking-[0.3em] font-mono mb-4"
            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
            <IXMark size={12} />
            SYS://CAREERS — OPEN
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Build the{" "}
            <span className="gradient-text">Future</span>
            <br />with IzaXotic
          </h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            We&apos;re a remote-first studio that builds extraordinary digital products. If you&apos;re obsessed with quality, love collaboration, and want your work to matter — we&apos;d love to hear from you.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: Wifi, label: "100% Remote" },
              { icon: Clock, label: "Flexible Hours" },
              { icon: MapPin, label: "India-based Studio" },
            ].map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.08)" }}>
                <p.icon size={11} className="text-purple-500/60" />
                {p.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Open Roles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Open Positions</h2>
            <span className="text-[9px] font-mono text-purple-600/40 tracking-widest">SYS://JOBS</span>
          </div>

          <div className="space-y-4">
            {openRoles.map((role, i) => {
              const isExpanded = expandedRole === role.id;
              return (
                <motion.div key={role.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl overflow-hidden hud-corners"
                  style={{ background: "rgba(5,5,7,0.85)", border: "1px solid rgba(124,58,237,0.08)" }}>

                  {/* Role header */}
                  <button className="w-full flex items-center gap-4 p-5 text-left hover:bg-purple-500/[0.03] transition-colors"
                    onClick={() => setExpandedRole(isExpanded ? null : role.id)}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${role.color}30, ${role.color}18)`, border: `1px solid ${role.color}30` }}>
                      <role.icon size={16} style={{ color: role.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white font-semibold">{role.title}</h3>
                        <span className="text-[9px] font-mono text-purple-700/50">{role.code}</span>
                      </div>
                      <p className="text-gray-600 text-xs font-mono mt-0.5">{role.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex flex-wrap gap-1.5">
                        {role.skills.slice(0, 3).map((s) => (
                          <span key={s} className="text-[9px] font-mono text-purple-400/50 px-2 py-0.5 rounded"
                            style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.08)" }}>{s}</span>
                        ))}
                      </div>
                      {isExpanded ? <ChevronUp size={15} className="text-purple-500/50 flex-shrink-0" /> : <ChevronDown size={15} className="text-gray-600 flex-shrink-0" />}
                    </div>
                  </button>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden">
                        <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: "rgba(124,58,237,0.06)" }}>
                          <p className="text-gray-400 text-sm leading-relaxed mb-5">{role.description}</p>

                          <div className="grid sm:grid-cols-2 gap-5 mb-5">
                            <div>
                              <p className="text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-2">Responsibilities</p>
                              <ul className="space-y-1.5">
                                {role.responsibilities.map((r) => (
                                  <li key={r} className="flex items-start gap-2 text-xs text-gray-500">
                                    <span className="w-1 h-1 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-2">Requirements</p>
                              <ul className="space-y-1.5">
                                {role.requirements.map((r) => (
                                  <li key={r} className="flex items-start gap-2 text-xs text-gray-500">
                                    <span className="w-1 h-1 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <button onClick={() => handleApply(role.title)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl font-mono transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.35)]"
                            style={{ background: `linear-gradient(135deg, ${role.color}, #4C1D95)`, boxShadow: "0 0 16px rgba(124,58,237,0.2)" }}>
                            Apply for this role
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div id="apply-form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl p-6 md:p-8 hud-corners relative overflow-hidden"
          style={{ background: "rgba(5,5,7,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(124,58,237,0.1)" }}>

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.15) 2px, rgba(124,58,237,0.15) 4px)",
          }} />

          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Apply Now</h2>
              {applyingFor && (
                <p className="text-purple-400/70 text-xs font-mono mt-0.5">
                  Applying for: <span className="text-purple-300">{applyingFor}</span>
                </p>
              )}
            </div>
            <span className="text-[9px] font-mono text-purple-700/40 tracking-widest">CMD://APPLY</span>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center py-14 relative z-10">
                <CheckCircle size={40} className="text-purple-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Application Sent!</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                  Your mail client should have opened. We&apos;ll review your application and get back to you within 48 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors">
                  Submit another application
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10" noValidate>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-1.5">Full Name *</label>
                    <input {...register("name")} placeholder="Your name"
                      className="w-full bg-transparent text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-700 font-mono focus:border-purple-500/40"
                      style={{ border: "1px solid rgba(124,58,237,0.12)", background: "rgba(124,58,237,0.03)" }} />
                    {errors.name && <p className="text-red-400/80 text-[10px] font-mono mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-1.5">Email *</label>
                    <input {...register("email")} type="email" placeholder="you@email.com"
                      className="w-full bg-transparent text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-700 font-mono focus:border-purple-500/40"
                      style={{ border: "1px solid rgba(124,58,237,0.12)", background: "rgba(124,58,237,0.03)" }} />
                    {errors.email && <p className="text-red-400/80 text-[10px] font-mono mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-1.5">Role Applying For *</label>
                  <select {...register("role")}
                    onChange={(e) => {
                      setValue("role", e.target.value, { shouldValidate: true });
                      setValue("subject", `Application for ${e.target.value} — IzaXotic`);
                      setApplyingFor(e.target.value);
                    }}
                    value={selectedRole || ""}
                    className="w-full text-sm rounded-xl px-4 py-3 outline-none transition-all font-mono focus:border-purple-500/40 appearance-none"
                    style={{ border: "1px solid rgba(124,58,237,0.12)", background: "rgba(5,5,7,0.9)", color: selectedRole ? "white" : "rgba(107,114,128,0.8)" }}>
                    <option value="" disabled>Select a role…</option>
                    {openRoles.map((r) => <option key={r.id} value={r.title}>{r.title}</option>)}
                    <option value="Other / General Enquiry">Other / General Enquiry</option>
                  </select>
                  {errors.role && <p className="text-red-400/80 text-[10px] font-mono mt-1">{errors.role.message}</p>}
                </div>

                {/* Subject (auto-filled, editable) */}
                <div>
                  <label className="block text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-1.5">Subject *</label>
                  <input {...register("subject")} placeholder="Application for Frontend Developer — IzaXotic"
                    className="w-full bg-transparent text-white text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-700 font-mono focus:border-purple-500/40"
                    style={{ border: "1px solid rgba(124,58,237,0.12)", background: "rgba(124,58,237,0.03)" }} />
                  {errors.subject && <p className="text-red-400/80 text-[10px] font-mono mt-1">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-1.5">About You *</label>
                  <textarea {...register("message")} rows={4}
                    placeholder="Tell us about yourself, your experience, and why you want to work with IzaXotic…"
                    className="w-full bg-transparent text-white text-sm rounded-xl px-4 py-3 outline-none transition-all resize-none placeholder:text-gray-700 font-mono focus:border-purple-500/40"
                    style={{ border: "1px solid rgba(124,58,237,0.12)", background: "rgba(124,58,237,0.03)" }} />
                  {errors.message && <p className="text-red-400/80 text-[10px] font-mono mt-1">{errors.message.message}</p>}
                </div>

                {/* Resume upload */}
                <div>
                  <label className="block text-[10px] font-mono text-purple-400/60 uppercase tracking-widest mb-1.5">Resume / CV * <span className="text-gray-700 normal-case">(PDF or Word, max 5MB)</span></label>
                  <label className="flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 transition-all hover:border-purple-500/30 group"
                    style={{ border: "1px dashed rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.02)" }}>
                    <Upload size={16} className="text-purple-500/50 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    <span className="text-sm font-mono text-gray-600 group-hover:text-gray-400 transition-colors truncate">
                      {resumeFileName || "Click to upload your resume…"}
                    </span>
                    {resumeFileName && (
                      <button type="button" onClick={(e) => { e.preventDefault(); setResumeFileName(""); setValue("resume", undefined as unknown as FileList); }}
                        className="ml-auto flex-shrink-0 text-gray-700 hover:text-red-400 transition-colors">
                        <X size={13} />
                      </button>
                    )}
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                  </label>
                  {errors.resume && <p className="text-red-400/80 text-[10px] font-mono mt-1">{errors.resume.message as string}</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white py-3.5 rounded-xl font-mono transition-all duration-200 disabled:opacity-50 hover:shadow-[0_0_32px_rgba(124,58,237,0.4)]"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)", boxShadow: "0 0 20px rgba(124,58,237,0.25)" }}>
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing…</span>
                  ) : (
                    <>Submit Application</>
                  )}
                </button>

                <p className="text-[10px] text-gray-700 font-mono text-center">
                  Your application will open in your mail client. Attach your resume before sending.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
