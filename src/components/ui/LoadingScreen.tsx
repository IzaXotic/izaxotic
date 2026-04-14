"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Initialising...");

  const steps = [
    { p: 20, t: "Loading assets..." },
    { p: 45, t: "Building 3D scene..." },
    { p: 70, t: "Crafting experience..." },
    { p: 90, t: "Almost there..." },
    { p: 100, t: "Welcome to IzaXotic" },
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i].p);
        setText(steps[i].t);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 600);
      }
    }, 400);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0B0B0F" }}
        >
          {/* Animated orb */}
          <div className="relative mb-10">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-24 h-24 rounded-full border-2 border-purple-400/30 absolute inset-0"
              style={{ boxShadow: "0 0 50px rgba(168,85,247,0.3), 0 0 30px rgba(124,58,237,0.4)" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-24 h-24 rounded-full border-t-2 border-purple-500 border-r-2 border-r-purple-400"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text">IX</span>
            </div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
            aria-hidden="true"
          >
            Iza<span className="gradient-text">Xotic</span>
          </motion.div>

          {/* Status text */}
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-gray-500 mb-8 h-5"
          >
            {text}
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 h-1 rounded-full bg-purple-900/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-300"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="text-xs text-purple-500 mt-2">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
