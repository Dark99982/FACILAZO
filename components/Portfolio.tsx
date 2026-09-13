"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { portfolio } from "@/lib/catalog";
import { TiltCard } from "./motion/TiltCard";

export function Portfolio() {
  const { locale, t } = useLocale();
  const reduce = useReducedMotion();

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
          {portfolio.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={5} className="h-full">
                <article className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-navy-700/50">
                  <div className="relative flex h-44 items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(242,180,65,0.08),rgba(242,180,65,0.08)_10px,rgba(217,96,59,0.08)_10px,rgba(217,96,59,0.08)_20px)]">
                    <span aria-hidden="true" className="absolute left-3 top-3 h-3 w-3 border-l border-t border-ambar-500/40" />
                    <span aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-r border-t border-ambar-500/40" />
                    <span aria-hidden="true" className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-ambar-500/40" />
                    <span aria-hidden="true" className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-ambar-500/40" />
                    {!item.hasRealMedia && (
                      <span className="rounded-full bg-navy-900/70 px-3 py-1.5 text-xs font-medium text-crema-300/80">
                        {t.portfolio.placeholderLabel}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-ambar-400" aria-hidden="true" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-ambar-500">
                        {item.category[locale]}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-crema-100">
                      {item.name[locale]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-crema-300/75">
                      {item.description[locale]}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
