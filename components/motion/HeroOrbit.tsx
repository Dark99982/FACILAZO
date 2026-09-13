"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Capas geométricas flotantes detrás del Hero: dan profundidad 3D con CSS
 * puro (perspective + rotate, animado por keyframes CSS, sin costo de JS)
 * y un parallax sutil ligado al scroll (transform/opacity únicamente).
 * Puramente decorativo -> aria-hidden, y se aquieta con prefers-reduced-motion.
 */
export function HeroOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yRing = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const yCore = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <motion.div style={{ y: yRing, opacity }} className="relative h-[420px] w-[420px] sm:h-[560px] sm:w-[560px]">
        <div className="absolute inset-0" style={{ transform: "rotateX(62deg)" }}>
          <div
            className={`absolute inset-0 rounded-full border border-ambar-500/25 ${
              reduce ? "" : "animate-orbit-spin"
            }`}
          />
        </div>
        <div className="absolute inset-8" style={{ transform: "rotateX(62deg)" }}>
          <div
            className={`absolute inset-0 rounded-full border border-terracota-500/20 ${
              reduce ? "" : "animate-orbit-spin-reverse"
            }`}
          />
        </div>
        <motion.div
          style={{ y: yCore }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-terracota-500/70 to-ambar-500/50 blur-2xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}
