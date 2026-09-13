"use client";

import { useLocale } from "./LocaleProvider";
import { portfolio } from "@/lib/catalog";

export function Portfolio() {
  const { locale, t } = useLocale();

  return (
    <section id="portafolio" className="border-t border-white/8 bg-navy-900/40 py-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-terracota-500/40 bg-terracota-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-terracota-300">
            {t.portfolio.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-crema-100 sm:text-4xl">
            {t.portfolio.headline}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-crema-300/75">{t.portfolio.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {portfolio.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-navy-700/50"
            >
              <div className="relative flex h-44 items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(242,180,65,0.08),rgba(242,180,65,0.08)_10px,rgba(217,96,59,0.08)_10px,rgba(217,96,59,0.08)_20px)]">
                {!item.hasRealMedia && (
                  <span className="rounded-full bg-navy-900/70 px-3 py-1.5 text-xs font-medium text-crema-300/80">
                    {t.portfolio.placeholderLabel}
                  </span>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-ambar-500">
                  {item.category[locale]}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-crema-100">
                  {item.name[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-crema-300/75">
                  {item.description[locale]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
