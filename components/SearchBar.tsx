"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { searchSolutions, lineNameFor } from "@/lib/search";
import { productLines } from "@/lib/catalog";

const ACCENT_CLASSES: Record<string, string> = {
  terracota: "bg-terracota-500 text-crema-100",
  ambar: "bg-ambar-500 text-navy-900",
  navy: "bg-navy-400 text-crema-100",
};

function accentForLine(lineId: string): string {
  const line = productLines.find((candidate) => candidate.id === lineId);
  return ACCENT_CLASSES[line?.accent ?? "terracota"];
}

export function SearchBar() {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const results = useMemo(() => searchSolutions(query, locale), [query, locale]);
  const hasQuery = query.trim().length >= 3;

  return (
    <div className="w-full">
      <label htmlFor="pain-point-search" className="mb-2 block text-sm font-semibold text-crema-100">
        {t.hero.searchLabel}
      </label>

      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-crema-300/60"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" strokeLinecap="round" />
        </svg>
        <input
          id="pain-point-search"
          type="text"
          inputMode="search"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.hero.searchPlaceholder}
          className="w-full rounded-2xl border border-white/12 bg-white/[0.06] py-4 pl-12 pr-4 text-base text-crema-100 placeholder:text-crema-300/45 outline-none ring-terracota-500/60 transition-shadow focus:ring-2"
        />
      </div>
      <p className="mt-2 text-xs text-crema-300/55">{t.hero.searchHint}</p>

      <div className="mt-5 min-h-[3rem]">
        {!hasQuery && <p className="text-sm text-crema-300/60">{t.hero.emptyState}</p>}

        {hasQuery && results.length === 0 && (
          <p className="text-sm text-crema-300/70">{t.hero.noResults}</p>
        )}

        <AnimatePresence mode="popLayout">
          {hasQuery && results.length > 0 && (
            <motion.ul
              key="results"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {results.map(({ solution }, index) => (
                <motion.li
                  key={solution.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-white/10 bg-navy-700/60 p-4 text-left"
                >
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${accentForLine(
                      solution.lineId
                    )}`}
                  >
                    {lineNameFor(solution.lineId, locale)}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-crema-100">
                    {solution.title[locale]}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-crema-300/75">
                    {solution.summary[locale]}
                  </p>
                  <a
                    href="#portafolio"
                    className="mt-3 inline-block text-sm font-semibold text-ambar-500 hover:text-ambar-300"
                  >
                    {t.hero.resultsCta} →
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
