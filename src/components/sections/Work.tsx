"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { fmtCoord } from "@/lib/mapgen";
import ProceduralMap, { type MapVariant } from "@/components/map/ProceduralMap";
import { Arrow, Eyebrow } from "@/components/ui/Bits";
import { useReveals } from "@/components/site/useReveals";
import { ROUTES } from "@/lib/site";

const VARIANTS: MapVariant[] = ["reference", "relief", "political", "physical", "tourism", "thematic"];

/**
 * Selected work as a grid read top to bottom: the heading and a link to the
 * full projects page, then the six projects side by side, each with the role
 * held. No pinning, so the page simply scrolls on.
 */
export default function Work() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="work" data-nav-theme="light" className="relative bg-paper py-14 md:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[40rem]">
            <Eyebrow className="text-navy-700">{t.work.eyebrow}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.08] text-navy-900" data-split>
              {t.work.title.join(" ")}
            </h2>
            <p className="mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-ink/75" data-reveal="0.12">
              {t.work.body}
            </p>
          </div>
          <div className="shrink-0" data-reveal="0.18">
            <Link href={ROUTES.projects} className="btn btn-solid">
              {t.pages.projects.filters.all}
              <span className="btn-dot" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-5 md:mt-14 lg:grid-cols-3" data-stagger>
          {t.work.items.map((item, i) => {
            const c = fmtCoord(item.lat, item.lon);
            return (
              <li key={i}>
                <article className="work-card grid h-full grid-cols-[6.5rem_1fr] overflow-hidden rounded-2xl border border-navy-900/10 bg-parchment-light sm:flex sm:flex-col">
                  <div className="work-img relative h-full min-h-[7.5rem] overflow-hidden border-e border-navy-900/10 sm:aspect-[4/3] sm:h-auto sm:min-h-0 sm:border-b sm:border-e-0">
                    <ProceduralMap
                      seed={500 + i * 13}
                      variant={VARIANTS[i]}
                      className="h-full w-full"
                      title={item.t}
                      decorative={false}
                    />
                    <span className="absolute start-3 top-3 hidden rounded-full bg-parchment-light/90 px-2.5 py-1 text-[0.68rem] tracking-[0.14em] text-navy-700 tabular-nums backdrop-blur-sm sm:inline">
                      {c.lat} · {c.lon}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 md:p-6">
                    <p className="eyebrow text-navy-700/70">
                      {item.k} · {item.y}
                    </p>
                    <h3 className="font-display mt-1.5 text-[1.1rem] leading-[1.25] text-navy-900 sm:mt-2 sm:text-[1.2rem]">{item.t}</h3>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-3 sm:border-t sm:border-navy-900/10 sm:pt-4">
                      <p className="text-[0.86rem] text-ink/75">
                        <span className="eyebrow me-2 text-navy-700/60">{t.work.roleLabel}</span>
                        {item.role}
                      </p>
                      <Link href={ROUTES.projects} className="link-line hidden shrink-0 text-[0.78rem] font-medium text-navy-700 sm:inline-flex">
                        {t.work.caseStudy}
                        <Arrow />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
