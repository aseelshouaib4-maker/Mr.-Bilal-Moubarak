"use client";

import { Fragment, useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Bits";
import SiteShell from "@/components/site/SiteShell";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { useReveals } from "@/components/site/useReveals";

/** One photograph per service, in the order of the services list. */
const PHOTOS = [
  "/images/banner-projects.jpg",
  "/images/banner-about.jpg",
  "/images/photo-magnifier.jpg",
  "/images/banner-contact.jpg",
  "/images/cta-hand.jpg",
  "/images/banner-process.jpg",
];

/**
 * Touch screens have no hover, so there the one card nearest the middle of
 * the screen shows its photograph instead.
 */
function useCenterActive(list: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia("(hover: hover)").matches) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".svc-card"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        // Only a card that actually spans the middle of the screen counts.
        if (r.top > mid || r.bottom < mid) continue;
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      }
      cards.forEach((c) => {
        if (c === best) c.dataset.active = "";
        else delete c.dataset.active;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [list]);
}

function ServicesContent() {
  const { t } = useLang();
  const s = t.pages.services;
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLOListElement>(null);
  useReveals(root);
  useCenterActive(grid);

  return (
    <div ref={root}>
      <PageHeader
        eyebrow={s.eyebrow}
        title={s.title}
        body={s.body}
        image="/images/banner-services.jpg"
      />

      {/* The six services as text-first cards; each one's photograph rises in behind it on hover. */}
      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-10 md:py-24">
          <ol ref={grid} className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3" data-stagger>
            {s.items.map((item, i) => (
              <li key={i}>
                <article className="svc-card flex h-full min-h-[19rem] flex-col p-6 md:min-h-[23rem] md:p-8">
                  <div className="svc-photo" aria-hidden="true">
                    <Image src={PHOTOS[i]} alt="" fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="svc-num font-display text-[clamp(2.6rem,4vw,3.4rem)] leading-none tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="info-tile" aria-hidden="true">
                      <ServiceIcon index={i} className="h-[18px] w-[18px]" />
                    </span>
                  </div>
                  <div className="mt-auto pt-10">
                    <h2 className="font-display text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.15]">{item.t}</h2>
                    <p className="svc-muted mt-2.5 text-[0.98rem] leading-relaxed">{item.d}</p>
                    <p className="svc-muted mt-5 text-[0.8rem] tracking-[0.02em]">{item.tags.join(" · ")}</p>
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
