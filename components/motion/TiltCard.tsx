"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "motion/react";
import { useInteractionCapability } from "@/lib/motion/useInteractionCapability";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Grados máximos de inclinación. 6-10 se siente premium sin marear. */
  maxTilt?: number;
}

/**
 * Tarjeta que se inclina en 3D hacia el cursor (perspective + rotateX/rotateY)
 * y muestra un brillo que sigue el puntero. Se apaga en táctil y con
 * prefers-reduced-motion (useInteractionCapability), donde queda como una
 * tarjeta estática normal.
 */
export function TiltCard({ children, className = "", maxTilt = 8 }: TiltCardProps) {
  const { richInteraction } = useInteractionCapability();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const springPx = useSpring(px, springConfig);
  const springPy = useSpring(py, springConfig);

  const rotateX = useTransform(springPy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springPx, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(springPx, (value) => `${value * 100}%`);
  const glareY = useTransform(springPy, (value) => `${value * 100}%`);
  const glareBackground = useMotionTemplate`radial-gradient(240px circle at ${glareX} ${glareY}, rgba(242,180,65,0.14), transparent 70%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!richInteraction || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    px.set((event.clientX - bounds.left) / bounds.width);
    py.set((event.clientY - bounds.top) / bounds.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={
        richInteraction
          ? { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
          : undefined
      }
      className={`group relative ${className}`}
    >
      {children}
      {richInteraction && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
