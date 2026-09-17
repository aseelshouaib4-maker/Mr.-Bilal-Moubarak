"use client";

import { useRef } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import SiteShell from "@/components/site/SiteShell";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import { useReveals } from "@/components/site/useReveals";

function ProcessContent() {
  const { t } = useLang();
  const pr = t.pages.process;
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);

  return (
    <div ref={root}>
      <PageHeader
        eyebrow={pr.eyebrow}
        title={pr.title}
        body={pr.body}
        image="/images/header-process.jpg"
      />

      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-10 md:py-24">
          {/* The seven stages along one route. */}
          <ol className="stage-list mx-auto flex max-w-[60rem] flex-col gap-4">
            {pr.steps.map((step, i) => (
              <li key={i} className="stage" data-reveal>
                <article className="sheet grid grid-cols-[2.5rem_1fr] gap-5 !bg-paper p-5 transition-colors duration-500 hover:!bg-parchment-light sm:gap-7 sm:p-7">
                  <span className="stage-marker">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="eyebrow text-umber-light">
                      {pr.stageLabel} {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display mt-2 text-[clamp(1.3rem,2vw,1.7rem)] leading-snug text-navy-900">{step.t}</h2>
                    <p className="mt-3 max-w-[40rem] text-[0.97rem] leading-relaxed text-ink/70">{step.d}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {step.points.map((point) => (
                        <li key={point} className="tag">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The idea behind the order, on its own. */}
      <section data-nav-theme="light" className="bg-parchment-light">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 text-center md:px-10 md:py-28">
          <div className="mx-auto max-w-[48rem]">
            <span className="mx-auto block h-px w-10 bg-gold" aria-hidden="true" />
            <p className="font-display mt-8 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.35] text-navy-900" data-split>
              {t.experience.quote}
            </p>
            <p className="mt-6 text-[0.9rem] text-umber" data-reveal="0.2">
              Bilal Moubarak
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

export default function ProcessPage() {
  return (
    <SiteShell>
      <ProcessContent />
    </SiteShell>
  );
}
