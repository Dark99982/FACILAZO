"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";
import { useInteractionCapability } from "@/lib/motion/useInteractionCapability";

/**
 * Luz ambiental que sigue al cursor dentro de <main>, como si el sistema
 * "reaccionara" a la presencia del usuario. Solo en dispositivos con cursor
 * real y sin prefers-reduced-motion (ver useInteractionCapability). No usa
 * window.addEventListener('scroll') ni toca el árbol de React en cada frame:
 * las coordenadas viajan por motion values, no por useState.
 */
export function CursorGlow() {
  const { richInteraction } = useInteractionCapability();
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { damping: 30, stiffness: 90, mass: 0.6 });
  const springY = useSpring(y, { damping: 30, stiffness: 90, mass: 0.6 });
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!richInteraction) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [richInteraction, x, y]);

  if (!richInteraction) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[90px]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(217,96,59,0.9) 0%, rgba(242,180,65,0.5) 45%, transparent 75%)",
      }}
    />
  );
}
