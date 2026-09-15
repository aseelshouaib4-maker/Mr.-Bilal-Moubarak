"use client";

import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Bits";
import SiteShell from "@/components/site/SiteShell";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import ProceduralMap, { type MapVariant } from "@/components/map/ProceduralMap";
import { useReveals } from "@/components/site/useReveals";
import type { ProjectCategory } from "@/lib/i18n/pages";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "atlas", "education", "thematic", "tourism", "reference"];

/** Placeholder drawing per category, until the studio's scans replace them. */
const VARIANT: Record<ProjectCategory, MapVariant[]> = {
  atlas: ["reference", "relief", "physical"],
  education: ["physical", "political"],
  thematic: ["thematic"],
  tourism: ["tourism"],
  reference: ["relief", "political"],
};

function ProjectsContent() {
  const { t } = useLang();
  const p = t.pages.projects;
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  useReveals(root);

  const counts = FILTERS.reduce(
    (acc, f) => ({ ...acc, [f]: f === "all" ? p.items.length : p.items.filter((it) => it.cat === f).length }),
    {} as Record<Filter, number>,
  );
  const shown = p.items.map((item, i) => ({ item, i })).filter(({ item }) => filter === "all" || item.cat === filter);
  const variantOf = (cat: ProjectCategory, i: number) => VARIANT[cat][i % VARIANT[cat].length];

  return (
    <div ref={root}>
      <PageHeader
        eyebrow={p.eyebrow}
        title={p.title}
        body={p.body}
      />

      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
          {/* Filter by kind of work. */}
          <div className="flex flex-wrap items-center justify-between gap-5" data-reveal>
            <div className="flex flex-wrap gap-2" role="group" aria-label={p.eyebrow}>
              {FILTERS.map((f) => (
                <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {p.filters[f]}
                  <span className="chip-count">{counts[f]}</span>
                </button>
              ))}
            </div>
            <p className="eyebrow tabular-nums text-umber-light" aria-live="polite">
              {String(shown.length).padStart(2, "0")} {p.shown}
            </p>
          </div>

          {/* The work. Keyed by filter so the set arrives together. */}
          <ul key={filter} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map(({ item, i }, n) => (
              <li key={item.t} className="card-in" style={{ animationDelay: `${n * 60}ms` }}>
                <article className="sheet sheet-hover flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-navy-900/10">
                    <ProceduralMap seed={700 + i * 17} variant={variantOf(item.cat, i)} className="h-full w-full" title={item.t} decorative={false} />
                    <span className="absolute start-3 top-3 rounded-full bg-parchment-light/90 px-2.5 py-1 text-[0.66rem] tracking-[0.12em] text-navy-700 tabular-nums backdrop-blur-sm">
                      {item.y}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-navy-700/70">{item.k}</p>
                    <h2 className="font-display mt-2 text-[1.3rem] leading-snug text-navy-900">{item.t}</h2>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink/68">{item.d}</p>
                    <p className="mt-auto flex items-center gap-2 border-t border-navy-900/10 pt-4 text-[0.86rem] text-navy-900">
                      <span className="eyebrow text-umber-light">{p.roleLabel}</span>
                      {item.role}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.82rem] text-ink/50">{p.note}</p>
        </div>
      </section>

      {/* One flagship project, told as challenge, approach and result. */}
      <section data-nav-theme="light" className="bg-parchment-light">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6" data-reveal>
            <div className="sheet overflow-hidden !bg-paper">
              <div className="aspect-[5/4]">
                <ProceduralMap seed={700} variant="reference" w={500} h={400} className="h-full w-full" title={p.caseTitle} decorative={false} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow className="text-navy-700">{p.caseLabel}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.1] text-navy-900" data-split>
              {p.caseTitle}
            </h2>
            <p className="eyebrow mt-4 text-umber-light" data-reveal="0.1">
              {p.caseMeta}
            </p>
            <ol className="mt-10 flex flex-col" data-stagger>
              {p.caseSteps.map((step, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-navy-900/10 py-6">
                  <span className="font-display text-[1.4rem] leading-none text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-[1.25rem] leading-tight text-navy-900">{step.k}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <SiteShell>
      <ProjectsContent />
    </SiteShell>
  );
}
