"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Diagrama de nodos conectados: un hub central (la IA) irradiando hacia N
 * nodos (las líneas de producto). Puramente decorativo/ambiental detrás del
 * encabezado de "Soluciones" — refuerza la idea de sistema/red en vez de
 * una lista plana, y retoma el mismo lenguaje visual de anillos que
 * HeroOrbit (continuidad de objeto, no un motivo nuevo suelto).
 * SVG estático + animación CSS/Motion liviana; funciona igual en móvil
 * (no depende de cursor real), se aquieta con prefers-reduced-motion.
 */
export function NetworkField({ nodes = 5 }: { nodes?: number }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const size = 620;
  const center = size / 2;
  const radius = size * 0.36;

  const points = Array.from({ length: nodes }, (_, i) => {
    const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      delay: i * 0.15,
    };
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center opacity-70"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-[560px] max-w-none sm:w-[680px] lg:w-[760px]"
      >
        <defs>
          <radialGradient id={`${uid}-hub`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2B441" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F2B441" stopOpacity="0" />
          </radialGradient>
        </defs>

        {points.map((p, i) => (
          <line
            key={`line-${i}`}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(251,243,234,0.12)"
            strokeWidth={1}
          />
        ))}

        <circle cx={center} cy={center} r={64} fill={`url(#${uid}-hub)`} />
        <circle cx={center} cy={center} r={5} fill="#F2B441" />

        {points.map((p, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill="#D9603B"
            initial={reduce ? false : { opacity: 0.35, scale: 0.8 }}
            animate={
              reduce
                ? undefined
                : { opacity: [0.35, 1, 0.35], scale: [0.8, 1.05, 0.8] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 3.6, delay: p.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </svg>
    </div>
  );
}
