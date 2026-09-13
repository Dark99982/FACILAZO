"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Línea que se va "llenando" a medida que el usuario recorre la sección que
 * la contiene (para el proceso de trabajo en Condiciones). Usa Motion's
 * useScroll ligado al contenedor padre, no un listener de scroll manual.
 */
export function ScrollFillLine({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });

  return (
    <div className="relative mx-auto mt-10 hidden h-1 max-w-4xl overflow-hidden rounded-full bg-white/10 lg:block">
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-gradient-to-r from-terracota-500 via-ambar-500 to-terracota-500"
      />
    </div>
  );
}
