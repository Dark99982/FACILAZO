"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { SearchBar } from "./SearchBar";

export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-20 sm:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(217,96,59,0.22),transparent)]"
      />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full border border-ambar-500/40 bg-ambar-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ambar-300"
        >
          {t.hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-balance mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-crema-100 sm:text-5xl lg:text-6xl"
        >
          {t.hero.headline}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-balance mx-auto mt-4 max-w-xl text-base leading-relaxed text-crema-300/80"
        >
          {t.hero.subhead}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-6"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}
