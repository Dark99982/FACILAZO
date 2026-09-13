"use client";

import { useLocale } from "./LocaleProvider";
import { productLines } from "@/lib/catalog";

const ACCENT_STYLES: Record<string, { chip: string; ring: string }> = {
  terracota: { chip: "bg-terracota-500 text-crema-100", ring: "hover:border-terracota-500/50" },
  ambar: { chip: "bg-ambar-500 text-navy-900", ring: "hover:border-ambar-500/50" },
  navy: { chip: "bg-navy-400 text-crema-100", ring: "hover:border-navy-400/60" },
};

const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function ProductLines() {
  const { locale, t } = useLocale();

  return (
    <section id="soluciones" className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-crema-100 sm:text-4xl">
          {t.productLines.headline}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-crema-300/75">{t.productLines.body}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {productLines.map((line, index) => {
          const accent = ACCENT_STYLES[line.accent];
          return (
            <div
              key={line.id}
              className={`group rounded-3xl border border-white/10 bg-navy-700/50 p-6 transition-colors ${accent.ring} ${SPANS[index]}`}
            >
              <span className={`inline-flex rounded-xl px-2.5 py-1 text-[11px] font-semibold ${accent.chip}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-crema-100">
                {line.name[locale]}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-crema-300/70">{line.tagline[locale]}</p>
              <p className="mt-3 text-sm leading-relaxed text-crema-300/70">{line.description[locale]}</p>
              <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                {line.examples.map((example) => (
                  <li key={example.es} className="text-sm text-crema-300/80">
                    {example[locale]}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
