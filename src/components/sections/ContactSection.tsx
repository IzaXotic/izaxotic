"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, MapPin, Mail, Clock } from "lucide-react";
import IXMark from "@/components/ui/IXMark";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@izaxotic.com", href: "mailto:hello@izaxotic.com" },
  { icon: MapPin, label: "Location", value: "Remote-First, India", href: "" },
  { icon: Clock, label: "Response", value: "< 24 hours", href: "" },
];

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
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header — left-aligned with right info strip */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
              <IXMark size={14} />
              Let&apos;s Talk
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="gradient-text">Build</span>?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Tell us what you&apos;re imagining. We&apos;ll handle the rest — from
              design to deployment, every line hand-written for you.
            </p>
          </motion.div>

          {/* Inline contact info strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(19,19,26,0.6)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(124,58,237,0.15)",
                  }}
                >
                  <Icon size={14} className="text-purple-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider leading-none">
                      {info.label}
                    </span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm text-gray-200 font-medium hover:text-purple-300 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-200 font-medium">{info.value}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — quote + quick CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Quote card */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden flex-1"
              style={{
                background: "rgba(19,19,26,0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-purple-600/10 blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg bg-purple-600/15 border border-purple-500/25 flex items-center justify-center mb-4">
                  <IXMark size={14} animate={false} />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed italic mb-5">
                  &quot;Every great digital product starts with a great conversation.
                  Tell us your idea — we&apos;re genuinely excited to hear it.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-white text-xs font-black">PI</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Prem IzaX</p>
                    <p className="text-gray-500 text-xs">CEO & Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(19,19,26,0.5)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(124,58,237,0.1)",
              }}
            >
              <p className="text-[10px] text-purple-400 uppercase tracking-[0.2em] font-semibold mb-4">
                How it works
              </p>
              <div className="space-y-4">
                {[
                  { step: "01", label: "You tell us your vision" },
                  { step: "02", label: "We design & architect" },
                  { step: "03", label: "We build — every line by hand" },
                  { step: "04", label: "Launch & ongoing support" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-purple-500 bg-purple-500/10 rounded-md px-2 py-1">
                      {s.step}
                    </span>
                    <span className="text-sm text-gray-300">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form — spotlight card */}
          <motion.div
            ref={formRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative"
          >
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "rgba(19,19,26,0.7)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              {/* Spotlight follow */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.08), transparent 60%)`,
                }}
              />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-purple-600/8 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-80 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <CheckCircle size={56} className="text-purple-400 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      We&apos;ll get back to you within 24 hours. 🚀
                    </p>
                    <div
                      className="mt-6 w-full max-w-xs h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(124,58,237,0.2)" }}
                    >
                      <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-300 rounded-full"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative z-10 space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase tracking-[0.15em] mb-2 font-medium">
                          Your Name
                        </label>
                        <input
                          {...register("name")}
                          placeholder="John Doe"
                          className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase tracking-[0.15em] mb-2 font-medium">
                          Email Address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="john@company.com"
                          className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-[0.15em] mb-2 font-medium">
                        Subject
                      </label>
                      <input
                        {...register("subject")}
                        placeholder="Web Application Development"
                        className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-[0.15em] mb-2 font-medium">
                        Your Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell us about your project, timeline, and goals..."
                        className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #4C1D95)",
                        boxShadow: "0 0 30px rgba(124,58,237,0.3)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
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
