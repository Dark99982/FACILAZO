"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { LanguageToggle } from "./LanguageToggle";
import { BoltMark } from "./BoltMark";
import { MagneticButton } from "./motion/MagneticButton";

const SECTION_IDS = ["top", "soluciones", "portafolio", "precios", "condiciones", "contacto"] as const;

export function Header() {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);
  const ratios = useRef<Record<string, number>>({});

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        const [topId] = Object.entries(ratios.current).sort((a, b) => b[1] - a[1]);
        if (topId && topId[1] > 0) setActiveId(topId[0]);
        setScrolled((ratios.current["top"] ?? 0) < 0.55);
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "#soluciones", id: "soluciones", label: t.nav.products },
    { href: "#portafolio", id: "portafolio", label: t.nav.portfolio },
    { href: "#precios", id: "precios", label: t.nav.pricing },
    { href: "#condiciones", id: "condiciones", label: t.nav.terms },
    { href: "#contacto", id: "contacto", label: t.nav.contact },
  ];

  const sceneLabel =
    links.find((link) => link.id === activeId)?.label ?? "Facilazo AI";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-navy-900/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <BoltMark />
          <span className="font-display text-lg font-bold tracking-tight text-crema-100">
            Facilazo
            <span className="ml-1.5 rounded-full bg-navy-500 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-crema-100">
              AI
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeId === link.id ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeId === link.id
                  ? "bg-white/8 text-crema-100"
                  : "text-crema-300/75 hover:text-crema-100"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <MagneticButton
            href="#contacto"
            className="hidden rounded-full bg-terracota-500 px-4 py-2 text-sm font-semibold text-crema-100 sm:inline-block"
          >
            {t.nav.cta}
          </MagneticButton>
        </div>
      </div>

      {/* Lectura de "sistema" tipo HUD: refleja la sección activa, en vez de
          un simple ancla de navegación — refuerza que la página es una
          consola con estado, no una lista de secciones. Solo desktop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 left-5 z-30 hidden items-center gap-2 rounded-full border border-white/10 bg-navy-900/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-crema-300/50 backdrop-blur-sm lg:flex"
      >
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            scrolled ? "bg-ambar-400" : "bg-crema-300/40"
          }`}
        />
        {sceneLabel}
      </div>
    </header>
  );
}
