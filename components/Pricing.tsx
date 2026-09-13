"use client";

import { useLocale } from "./LocaleProvider";
import { pricingTiers } from "@/lib/catalog";
import { lineNameFor } from "@/lib/search";

export function Pricing() {
  const { locale, t } = useLocale();

  return (
    <section id="precios" className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-crema-100 sm:text-4xl">
          {t.pricing.headline}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-crema-300/75">{t.pricing.body}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pricingTiers.map((tier) => (
          <div
            key={tier.lineId}
            className="rounded-2xl border border-white/10 bg-navy-700/50 p-5 text-center"
          >
            <p className="text-sm font-semibold text-crema-100">{lineNameFor(tier.lineId, locale)}</p>
            <p className="mt-3 font-display text-2xl font-bold text-ambar-400">
              {tier.rangeLabel[locale]}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-crema-300/65">{tier.note[locale]}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-xs text-crema-300/50">
        {t.pricing.footnote}
      </p>
    </section>
  );
}
