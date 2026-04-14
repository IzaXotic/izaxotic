"use client";
import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * useParallax — scroll-driven parallax hook.
 *
 * Returns a ref to attach to the section container and a set of
 * MotionValues that shift at different rates as the section scrolls
 * through the viewport.
 *
 * `speed` multiplier:
 *   0   = pinned (no movement)
 *   0.5 = moves at half scroll speed (slow / far away)
 *   1   = moves at scroll speed (normal)
 *   1.5 = moves faster than scroll (foreground)
 *
 * offset — viewport intersection range that maps to [start, end]
 * Default: element enters at bottom, leaves at top → full travel.
 */
interface ParallaxValues {
  /** Ref to attach to the scrolling section wrapper */
  ref: React.RefObject<HTMLElement | null>;
  /** Slow layer — background elements (speed ≈ 0.3) */
  bgY: MotionValue<number>;
  /** Medium layer — mid-ground (speed ≈ 0.6) */
  midY: MotionValue<number>;
  /** Fast layer — foreground accents (speed ≈ 1.2) */
  fgY: MotionValue<number>;
  /** Raw 0 → 1 progress through viewport */
  progress: MotionValue<number>;
  /** Horizontal slow drift for decorative elements */
  bgX: MotionValue<number>;
  /** Scale that subtly grows as element enters viewport */
  scale: MotionValue<number>;
  /** Opacity that fades in as element enters */
  opacity: MotionValue<number>;
}

export function useParallax(
  speeds?: { bg?: number; mid?: number; fg?: number },
): ParallaxValues {
  const ref = useRef<HTMLElement>(null);

  const bg = speeds?.bg ?? 0.3;
  const mid = speeds?.mid ?? 0.6;
  const fg = speeds?.fg ?? 1.2;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // element enters bottom → leaves top
  });

  // Vertical offsets — pixels to shift. Negative = moves up as you scroll down.
  const range = 120; // max pixel travel per unit speed
  const bgY = useTransform(scrollYProgress, [0, 1], [range * bg, -range * bg]);
  const midY = useTransform(scrollYProgress, [0, 1], [range * mid, -range * mid]);
  const fgY = useTransform(scrollYProgress, [0, 1], [range * fg, -range * fg]);

  // Horizontal drift for decorative blobs
  const bgX = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Subtle scale on enter
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);

  // Fade edges
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  return {
    ref,
    bgY,
    midY,
    fgY,
    progress: scrollYProgress,
    bgX,
    scale,
    opacity,
  };
}

export default useParallax;
