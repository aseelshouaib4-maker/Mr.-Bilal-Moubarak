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
    <section ref={root} id="work" data-nav-theme="light" className="relative bg-paper py-20 md:py-28">
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

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-14" data-stagger>
          {t.work.items.map((item, i) => {
            const c = fmtCoord(item.lat, item.lon);
            return (
              <li key={i}>
                <article className="work-card flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-parchment-light">
                  <div className="work-img relative aspect-[4/3] overflow-hidden border-b border-navy-900/10">
                    <ProceduralMap
                      seed={500 + i * 13}
                      variant={VARIANTS[i]}
                      className="h-full w-full"
                      title={item.t}
                      decorative={false}
                    />
                    <span className="absolute start-3 top-3 rounded-full bg-parchment-light/90 px-2.5 py-1 text-[0.68rem] tracking-[0.14em] text-navy-700 tabular-nums backdrop-blur-sm">
                      {c.lat} · {c.lon}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="eyebrow text-navy-700/70">
                      {item.k} · {item.y}
                    </p>
                    <h3 className="font-display mt-2 text-[1.2rem] leading-[1.25] text-navy-900">{item.t}</h3>
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-navy-900/10 pt-4">
                      <p className="text-[0.86rem] text-ink/75">
                        <span className="eyebrow me-2 text-navy-700/60">{t.work.roleLabel}</span>
                        {item.role}
                      </p>
                      <Link href={ROUTES.projects} className="link-line shrink-0 text-[0.78rem] font-medium text-navy-700">
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
