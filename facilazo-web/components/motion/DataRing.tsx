"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { AnimatedCounter } from "./AnimatedCounter";

const SIZE = 84;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Reemplaza el número plano por un instrumento radial: el trazo se dibuja
 * completo (0 -> 360°) mientras el contador cuenta. No representa un
 * porcentaje ni un dato inventado (sería deshonesto, sección 4.9 del
 * anti-slop skill) — el barrido es puramente el "reveal" de un dato real,
 * como una aguja de instrumento llegando a su lectura.
 */
export function DataRing({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const gradientId = useId();

  return (
    <div ref={ref} className="flex flex-col items-center gap-2.5">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE}
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={reduce ? false : { strokeDashoffset: CIRCUMFERENCE }}
            animate={inView ? { strokeDashoffset: 0 } : undefined}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D9603B" />
              <stop offset="100%" stopColor="#F2B441" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-crema-100 sm:text-xl">
          <AnimatedCounter value={value} suffix={suffix} />
        </div>
      </div>
      <p className="max-w-[9rem] text-center text-[11px] leading-tight text-crema-300/55">{label}</p>
    </div>
  );
}
