"use client";

import { useEffect, useState } from "react";

/**
 * Centraliza las dos condiciones que apagan toda la interacción "premium"
 * (glow que sigue el cursor, tilt 3D, botones magnéticos, scroll-hijack
 * horizontal): dispositivos táctiles (no hay cursor real que seguir) y
 * prefers-reduced-motion (accesibilidad, Sección 6.B de design-taste-frontend).
 */
export function useInteractionCapability() {
  const [fineCursor, setFineCursor] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setFineCursor(pointerQuery.matches);
      setReduceMotion(motionQuery.matches);
    };

    update();
    pointerQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      pointerQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return { fineCursor, reduceMotion, richInteraction: fineCursor && !reduceMotion };
}
