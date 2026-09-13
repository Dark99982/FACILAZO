"use client";

import { useLocale } from "./LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-1 text-xs font-medium"
    >
      {(["es", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`rounded-full px-3 py-1.5 uppercase tracking-wide transition-colors ${
            locale === option
              ? "bg-terracota text-crema-100"
              : "text-crema-300/70 hover:text-crema-100"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
