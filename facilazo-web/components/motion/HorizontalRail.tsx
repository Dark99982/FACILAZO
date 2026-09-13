"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface HorizontalRailProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Riel horizontal fijado: en desktop, la sección se "pinea" y el contenido
 * se desplaza en horizontal mientras el usuario hace scroll vertical normal
 * (patrón Horizontal-Pan de design-taste-frontend, Sección 5.B). En móvil o
 * con prefers-reduced-motion, se desactiva el pin/scroll-hijack por completo
 * (Sección 7, "Mobile override": nunca scroll-hijack en pantallas < 1024px)
 * y el contenido se ve como una fila con scroll táctil normal.
 */
export function HorizontalRail({ children, className = "" }: HorizontalRailProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    if (!desktopQuery.matches) return;
    if (!wrapRef.current || !trackRef.current) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !wrapRef.current || !trackRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const distance = trackRef.current!.scrollWidth - wrapRef.current!.clientWidth;
        if (distance <= 0) return;

        gsap.to(trackRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }, wrapRef);

      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className={`relative lg:overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex flex-col gap-4 lg:flex-row lg:flex-nowrap lg:gap-6"
      >
        {children}
      </div>
    </div>
  );
}
