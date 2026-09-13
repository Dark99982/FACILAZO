"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { SearchBar } from "./SearchBar";
import { HeroOrbit } from "./motion/HeroOrbit";
import { RevealText } from "./motion/RevealText";
import { AnimatedCounter } from "./motion/AnimatedCounter";

export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <HeroOrbit />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(251,243,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(251,243,234,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,black_10%,transparent_75%)]"
      />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-ambar-500/40 bg-ambar-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ambar-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ambar-400" aria-hidden="true" />
          {t.hero.eyebrow}
        </motion.span>

        <RevealText
          as="h1"
          text={t.hero.headline}
          delay={0.15}
          className="text-balance mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-crema-100 sm:text-5xl lg:text-6xl"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="text-balance mx-auto mt-4 max-w-xl text-base leading-relaxed text-crema-300/80"
        >
          {t.hero.subhead}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-6"
        >
          {!reduce && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-ambar-400/10 via-transparent to-transparent"
            />
          )}
          {/* corner brackets: marco tipo HUD */}
          <span aria-hidden="true" className="absolute left-2 top-2 h-3 w-3 border-l border-t border-ambar-500/40" />
          <span aria-hidden="true" className="absolute right-2 top-2 h-3 w-3 border-r border-t border-ambar-500/40" />
          <span aria-hidden="true" className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-ambar-500/40" />
          <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-ambar-500/40" />

          <SearchBar />
        </motion.div>

        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/8 pt-8"
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl font-bold text-crema-100 sm:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </dd>
              <p className="mt-1 text-[11px] leading-tight text-crema-300/55">{stat.label}</p>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
