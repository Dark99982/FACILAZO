"use client";

import { useLocale } from "./LocaleProvider";
import { LanguageToggle } from "./LanguageToggle";
import { BoltMark } from "./BoltMark";

export function Header() {
  const { t } = useLocale();

  const links = [
    { href: "#soluciones", label: t.nav.products },
    { href: "#portafolio", label: t.nav.portfolio },
    { href: "#precios", label: t.nav.pricing },
    { href: "#condiciones", label: t.nav.terms },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-navy-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <BoltMark />
          <span className="font-display text-lg font-bold tracking-tight text-crema-100">
            Facilazo
            <span className="ml-1.5 rounded-full bg-navy-500 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-crema-100">
              AI
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-crema-300/80 transition-colors hover:text-crema-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="#contacto"
            className="hidden rounded-full bg-terracota-500 px-4 py-2 text-sm font-semibold text-crema-100 transition-transform active:scale-[0.98] sm:inline-block"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
