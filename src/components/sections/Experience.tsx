"use client";

import { useRef } from "react";
import { useGSAP, initReveals } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import BearingCompass from "@/components/ui/carto/BearingCompass";
import TypewriterQuote from "@/components/ui/TypewriterQuote";

/**
 * The studio's standing: the five qualities as bearings on a compass dial,
 * beside Bilal Moubarak's own line, written out as it comes into view.
 */
export default function Experience() {
  const { t, lang } = useLang();
  const ready = useMotionReady();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      initReveals(root.current);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      ref={root}
      id="experience"
      data-nav-theme="dark"
      className="on-dark relative overflow-hidden bg-slate py-24 text-parchment-light [--compass-ground:var(--color-slate)] md:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        {/* The line first, read on its own; the dial below it. */}
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <p className="eyebrow text-mist/70" data-reveal>
            {t.experience.qualitiesLabel}
          </p>
          <TypewriterQuote
            text={t.experience.quote}
            author="Bilal Moubarak"
            byWord={lang === "ar"}
            centered
            className="mt-8 w-full"
          />
        </div>
        <div className="mt-16 sm:px-24 md:mt-20" data-reveal="0.1">
          <BearingCompass labels={t.experience.qualities} lines={t.experience.qualityLines} />
        </div>
      </div>
    </section>
  );
}
