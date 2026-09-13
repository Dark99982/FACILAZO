"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useInteractionCapability } from "@/lib/motion/useInteractionCapability";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const STRENGTH = 0.35;

export function MagneticButton({ href, children, className = "", target, rel }: MagneticButtonProps) {
  const { richInteraction } = useInteractionCapability();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!richInteraction || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * STRENGTH);
    y.set((event.clientY - bounds.top - bounds.height / 2) * STRENGTH);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={richInteraction ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.a>
  );
}
