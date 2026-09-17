"use client";

import { Fragment, useRef } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Bits";
import SiteShell from "@/components/site/SiteShell";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import JudgementCards from "@/components/pages/about/JudgementCards";
import { useReveals } from "@/components/site/useReveals";

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

function AboutContent() {
  const { t } = useLang();
  const a = t.pages.about;
  const x = t.experience;
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);

  return (
    <div ref={root}>
      <PageHeader eyebrow={a.eyebrow} title={a.title} body={a.body} image="/images/header-about.jpg" />

      {/* The studio's story, beside the idea it rests on. */}
      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 py-14 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow className="text-navy-700">{a.storyLabel}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.12] text-navy-900" data-split>
              <Lines lines={a.storyTitle} />
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7" data-stagger>
            {a.story.map((para, i) => (
              <p key={i} className="text-[1.02rem] leading-relaxed text-ink/75">
                {para}
              </p>
            ))}
            <blockquote className="mt-4 border-s-2 border-gold ps-6">
              <p className="font-display text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.4] text-navy-900">{a.quote}</p>
              <footer className="mt-4 text-[0.88rem] text-umber">Bilal Moubarak</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Judgement: a figure beside four decisions, set as a quiet bento. */}
      <section data-nav-theme="light" className="bg-parchment-light">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 md:px-10 md:py-28">
          <div className="max-w-[46rem]">
            <Eyebrow className="text-navy-700">{a.judgementLabel}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.12] text-navy-900" data-split>
              <Lines lines={a.judgementTitle} />
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink/70" data-reveal="0.1">
              {a.judgementBody}
            </p>
          </div>

          <JudgementCards />
        </div>
      </section>

      {/* Five qualities, read across like a map's legend. */}
      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 md:px-10 md:py-24">
          <Eyebrow className="text-navy-700">{x.qualitiesLabel}</Eyebrow>
          <ol className="mt-10 grid border-t border-navy-900/10 sm:grid-cols-2 lg:grid-cols-5" data-stagger>
            {x.qualities.map((q, i) => (
              <li key={i} className="border-b border-navy-900/10 py-7 lg:border-b-0 lg:border-e lg:px-6 lg:first:ps-0 lg:last:border-e-0">
                <span className="eyebrow tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display mt-3 text-[1.35rem] leading-tight text-navy-900">{q}</p>
                <p className="mt-1.5 text-[0.9rem] text-ink/65">{x.qualityLines[i]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where the experience was built, stated carefully. */}
      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 md:pb-32">
          <div className="sheet grid gap-10 p-7 md:p-10 lg:grid-cols-12 lg:gap-8" data-reveal>
            <div className="lg:col-span-4">
              <p className="eyebrow text-umber-light">{x.orgsLabel}</p>
            </div>
            <div className="lg:col-span-8">
              <ul className="flex flex-wrap gap-2.5">
                {x.orgs.map((o) => (
                  <li key={o} className="tag !px-4 !py-2 !text-[0.9rem] !text-navy-900">
                    {o}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[40rem] text-[0.88rem] leading-relaxed text-ink/60">{a.sectorsNote}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutContent />
    </SiteShell>
  );
}
