"use client";

import { useLocale } from "./LocaleProvider";
import { BoltMark } from "./BoltMark";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 py-10">
      <div className="mx-auto flex max-w-8xl flex-col items-center gap-3 px-4 text-center sm:px-6">
        <div className="flex items-center gap-2">
          <BoltMark className="h-6 w-6" />
          <span className="font-display text-sm font-semibold text-crema-100">Facilazo AI</span>
        </div>
        <p className="text-xs text-crema-300/55">{t.footer.tagline}</p>
        <p className="text-xs text-crema-300/40">
          © {year} Facilazo AI. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
