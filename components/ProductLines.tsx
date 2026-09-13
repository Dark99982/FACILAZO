"use client";

import { useLocale } from "./LocaleProvider";
import { productLines } from "@/lib/catalog";
import { HorizontalRail } from "./motion/HorizontalRail";
import { TiltCard } from "./motion/TiltCard";

const ACCENT_STYLES: Record<string, { chip: string; ring: string; glow: string }> = {
  terracota: {
    chip: "bg-terracota-500 text-crema-100",
    ring: "group-hover:border-terracota-500/50",
    glow: "from-terracota-500/25",
  },
  ambar: {
    chip: "bg-ambar-500 text-navy-900",
    ring: "group-hover:border-ambar-500/50",
    glow: "from-ambar-500/25",
  },
  navy: {
    chip: "bg-navy-400 text-crema-100",
    ring: "group-hover:border-navy-400/60",
    glow: "from-navy-400/25",
  },
};

export function ProductLines() {
  const { locale, t } = useLocale();

  return (
    <section id="soluciones" className="py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-crema-100 sm:text-4xl">
          {t.productLines.headline}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-crema-300/75">{t.productLines.body}</p>
        <p className="mt-2 hidden text-xs text-crema-300/40 lg:block">
          {locale === "en" ? "Scroll to move through the systems →" : "Seguí bajando para recorrer las líneas →"}
        </p>
      </div>

      <div className="mt-12">
        <HorizontalRail className="px-4 sm:px-6 lg:px-[8vw]">
          {productLines.map((line, index) => {
            const accent = ACCENT_STYLES[line.accent];
            return (
              <TiltCard
                key={line.id}
                maxTilt={6}
                className={`w-full shrink-0 lg:w-[420px] ${index === 0 ? "" : ""}`}
              >
                <div
                  className={`relative overflow-hidden rounded-3xl border border-white/10 bg-navy-700/50 p-7 transition-colors ${accent.ring}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${accent.glow} to-transparent blur-2xl`}
                  />
                  <span className={`inline-flex rounded-xl px-2.5 py-1 font-mono text-[11px] font-semibold ${accent.chip}`}>
                    {String(index + 1).padStart(2, "0")} / {String(productLines.length).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-crema-100">
                    {line.name[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-crema-300/70">{line.tagline[locale]}</p>
                  <p className="mt-3 text-sm leading-relaxed text-crema-300/70">{line.description[locale]}</p>
                  <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4">
                    {line.examples.map((example) => (
                      <li key={example.es} className="text-sm text-crema-300/80">
                        {example[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            );
          })}
        </HorizontalRail>
      </div>
    </section>
  );
}
