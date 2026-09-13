"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useInteractionCapability } from "@/lib/motion/useInteractionCapability";

/**
 * "Lenguaje de cámara": en vez de un simple fade-in, la sección se acerca
 * como si una cámara la enfocara (escala + profundidad + leve barrido de
 * foco) a medida que entra en el viewport. Ligado a scroll real (useScroll),
 * nunca a window.addEventListener('scroll') ni a useState por frame.
 *
 * - Blur solo con richInteraction (evita costo de filter en móvil/gama baja).
 * - Bajo prefers-reduced-motion: colapsa a un fade simple sin escala/blur.
 * - No se usa en HorizontalRail (GSAP ya pinea/anima esa sección; envolverla
 *   acá pelearía por el mismo transform).
 */
export function SceneReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { richInteraction } = useInteractionCapability();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.42"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.4 });

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [reduce ? 0 : 42, 0]);
  const scale = useTransform(progress, [0, 1], [reduce ? 1 : 0.965, 1]);
  const blurPx = useTransform(progress, [0, 1], [!reduce && richInteraction ? 8 : 0, 0]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, filter }} className={className}>
      {children}
    </motion.div>
  );
}
