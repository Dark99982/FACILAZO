"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { contactInfo } from "@/lib/catalog";
import { TiltCard } from "./motion/TiltCard";
import { SceneReveal } from "./motion/SceneReveal";

function ContactCard({
  label,
  value,
  href,
  comingSoonLabel,
  openLabel,
}: {
  label: string;
  value: string | null;
  href?: string;
  comingSoonLabel: string;
  openLabel: string;
}) {
  const inner = (
    <div className="rounded-2xl border border-white/10 bg-navy-700/50 p-5 text-center transition-colors hover:border-ambar-500/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-crema-300/60">{label}</p>
      <p className="mt-2 font-display text-lg font-semibold text-crema-100">
        {value ?? comingSoonLabel}
      </p>
    </div>
  );

  return (
    <TiltCard maxTilt={4}>
      {value && href ? (
        <a href={href} target="_blank" rel="noreferrer" data-cursor={openLabel} className="block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </TiltCard>
  );
}

export function Contact() {
  const { t, locale } = useLocale();
  const reduce = useReducedMotion();
  const openLabel = locale === "en" ? "Open" : "Abrir";

  return (
    <section id="contacto" className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SceneReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-crema-100 sm:text-4xl">
          {t.contact.headline}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-crema-300/75">{t.contact.body}</p>
      </SceneReveal>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <ContactCard
          label={t.contact.whatsapp}
          value={contactInfo.whatsapp}
          href={contactInfo.whatsapp ? `https://wa.me/${contactInfo.whatsapp}` : undefined}
          comingSoonLabel={t.contact.comingSoon}
          openLabel={openLabel}
        />
        <ContactCard
          label={t.contact.email}
          value={contactInfo.email}
          href={contactInfo.email ? `mailto:${contactInfo.email}` : undefined}
          comingSoonLabel={t.contact.comingSoon}
          openLabel={openLabel}
        />
        <ContactCard
          label={t.contact.social}
          value={contactInfo.social.length > 0 ? contactInfo.social.map((s) => s.label).join(" · ") : null}
          comingSoonLabel={t.contact.comingSoon}
          openLabel={openLabel}
        />
      </motion.div>
    </section>
  );
}
