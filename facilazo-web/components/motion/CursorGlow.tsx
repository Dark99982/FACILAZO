"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, motion, AnimatePresence } from "motion/react";
import { useInteractionCapability } from "@/lib/motion/useInteractionCapability";

/**
 * Sistema de cursor de la "consola": combina dos piezas ya presentes en el
 * lenguaje visual del sitio.
 *
 * 1. Luz ambiental que sigue al cursor (igual que antes).
 * 2. Etiqueta contextual: cuando el cursor pasa sobre un elemento con
 *    data-cursor="texto", aparece una pastilla HUD con ese texto pegada al
 *    cursor (ej. "Ver" sobre una tarjeta de producto). Es un "hidden
 *    interaction": no hay pista visual previa, se descubre al pasar el
 *    mouse — la interfaz "responde" en vez de solo brillar.
 *
 * Solo en dispositivos con cursor real y sin prefers-reduced-motion (ver
 * useInteractionCapability). Un único listener de pointermove/pointerover
 * por delegación; las coordenadas viajan por motion values, nunca por
 * useState en cada frame.
 */
export function CursorGlow() {
  const { richInteraction } = useInteractionCapability();
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { damping: 30, stiffness: 90, mass: 0.6 });
  const springY = useSpring(y, { damping: 30, stiffness: 90, mass: 0.6 });
  const labelX = useSpring(x, { damping: 24, stiffness: 240, mass: 0.35 });
  const labelY = useSpring(y, { damping: 24, stiffness: 240, mass: 0.35 });
  const frame = useRef<number | undefined>(undefined);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!richInteraction) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [richInteraction, x, y]);

  if (!richInteraction) return null;

  return (
    <>
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
      <AnimatePresence>
        {label && (
          <motion.div
            key="cursor-label"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-ambar-500/40 bg-navy-900/90 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ambar-300 shadow-lg shadow-black/30"
            style={{
              x: labelX,
              y: labelY,
              translateX: "-50%",
              translateY: "-160%",
            }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
