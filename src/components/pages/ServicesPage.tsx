"use client";

import { Fragment, useRef } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Bits";
import SiteShell from "@/components/site/SiteShell";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { useReveals } from "@/components/site/useReveals";

function ServicesContent() {
  const { t } = useLang();
  const s = t.pages.services;
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);

  return (
    <div ref={root}>
      <PageHeader
        eyebrow={s.eyebrow}
        title={s.title}
        body={s.body}
      />

      {/* The six services as an index: number, mark, name, what it covers. */}
      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-10 md:py-24">
          <ol>
            {s.items.map((item, i) => (
              <li key={i} className="group border-b border-navy-900/10 first:border-t" data-reveal>
                <article className="grid gap-4 py-7 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-11">
                  <div className="flex items-center gap-4 md:col-span-1 md:flex-col md:items-start">
                    <span className="eyebrow tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex items-start gap-4 md:col-span-5">
                    <span className="info-tile mt-1 transition-colors duration-500 group-hover:border-gold" aria-hidden="true">
                      <ServiceIcon index={i} className="h-[18px] w-[18px]" />
                    </span>
                    <h2 className="font-display text-[clamp(1.4rem,2.2vw,1.95rem)] leading-[1.18] text-navy-900">{item.t}</h2>
                  </div>
                  <div className="md:col-span-6">
                    <p className="max-w-[36rem] text-[1rem] leading-relaxed text-ink/72">{item.d}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
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

      {/* The two kinds of visitor, each spoken to directly. */}
      <section data-nav-theme="light" className="bg-parchment-light">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 py-14 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow className="text-navy-700">{s.audienceLabel}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.12] text-navy-900" data-split>
              {s.audienceTitle.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < s.audienceTitle.length - 1 && <br />}
                </Fragment>
              ))}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7" data-stagger>
            {s.audience.map((a, i) => (
              <article key={i} className="sheet !bg-paper p-7 md:p-8">
                <span className="eyebrow tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-4 text-[1.35rem] leading-snug text-navy-900">{a.k}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{a.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <SiteShell>
      <ServicesContent />
    </SiteShell>
  );
}
