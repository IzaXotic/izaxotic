"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, MapPin, Mail, Clock } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@izaxotic.com", href: "mailto:hello@izaxotic.com" },
  { icon: MapPin, label: "Location", value: "Remote-First Studio, India", href: "" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: "" },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate EmailJS / API call
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-purple-500/50 to-transparent" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-700/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs uppercase tracking-widest font-medium mb-4">
            Let&apos;s Talk
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to <span className="gradient-text">Build</span>?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Tell us what you&apos;re imagining. We&apos;ll handle the rest — from
            design to deployment, every line hand-written for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className="flex items-start gap-4 glass rounded-xl p-5 glow-border">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-600/20 border border-purple-500/30">
                    <Icon size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {info.label}
                    </p>
                    <p className="text-gray-200 font-medium text-sm">
                      {info.href ? (
                        <a href={info.href} className="hover:text-purple-300 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        info.value
                      )}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Quote */}
            <div className="glass rounded-xl p-6 border border-purple-500/20 mt-4">
              <p className="text-gray-400 text-sm leading-relaxed italic">
                &quot;Every great digital product starts with a great conversation.
                Tell us your idea — we&apos;re genuinely excited to hear it.&quot;
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <span className="text-purple-400 text-xs font-bold">PI</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Prem IzaX</p>
                  <p className="text-gray-500 text-xs">CEO & Founder</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 glow-border relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-72 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <CheckCircle size={60} className="text-purple-400 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      We&apos;ve received your message and will get back to you
                      within 24 hours. 🚀
                    </p>
                    <div
                      className="mt-6 w-full h-1 rounded-full overflow-hidden"
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
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                          Your Name
                        </label>
                        <input
                          {...register("name")}
                          placeholder="John Doe"
                          className="w-full bg-[#13131A] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="john@company.com"
                          className="w-full bg-[#13131A] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                        Subject
                      </label>
                      <input
                        {...register("subject")}
                        placeholder="Web Application Development"
                        className="w-full bg-[#13131A] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                        Your Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell us about your project, timeline, and goals..."
                        className="w-full bg-[#13131A] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
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
                        boxShadow: "0 0 30px rgba(124,58,237,0.4)",
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
                          <Send size={16} />
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
