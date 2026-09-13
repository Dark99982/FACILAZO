"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { ScrollFillLine } from "./motion/ScrollFillLine";
import { SceneReveal } from "./motion/SceneReveal";

export function Terms() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const stepsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="condiciones" className="border-t border-white/8 bg-navy-900/40 py-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <SceneReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-crema-100 sm:text-4xl">
            {t.terms.headline}
          </h2>
        </SceneReveal>

        <div ref={stepsRef} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.terms.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-navy-700/50 p-5"
            >
              <p className="font-display text-base font-semibold text-terracota-300">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-crema-300/75">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <ScrollFillLine targetRef={stepsRef} />

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-crema-300/50">
          {t.terms.pendingNote}
        </p>
      </div>
    </section>
  );
}
