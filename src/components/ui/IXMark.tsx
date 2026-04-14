"use client";
import { motion } from "framer-motion";

interface IXMarkProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

/**
 * Custom IX brand mark — futuristic glowing monogram.
 * Replaces generic Sparkles/icons across the site.
 */
export default function IXMark({ size = 14, className = "", animate = true }: IXMarkProps) {
  const Wrapper = animate ? motion.span : "span";
  const animateProps = animate
    ? {
        animate: {
          textShadow: [
            "0 0 4px rgba(168,85,247,0.6)",
            "0 0 12px rgba(124,58,237,0.8)",
            "0 0 4px rgba(168,85,247,0.6)",
          ],
        },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  return (
    <Wrapper
      className={`inline-flex items-center justify-center font-black tracking-tighter select-none ${className}`}
      style={{
        fontSize: size * 0.72,
        lineHeight: 1,
        background: "linear-gradient(135deg, #A78BFA, #7C3AED, #D946EF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter: "drop-shadow(0 0 3px rgba(124,58,237,0.5))",
      }}
      {...animateProps}
    >
      IX
    </Wrapper>
  );
}
