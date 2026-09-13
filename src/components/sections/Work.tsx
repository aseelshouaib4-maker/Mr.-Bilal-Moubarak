"use client";

import { useRef } from "react";
import { gsap, useGSAP, initReveals } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import { fmtCoord } from "@/lib/mapgen";
import ProceduralMap, { type MapVariant } from "@/components/map/ProceduralMap";
import { Arrow, Eyebrow } from "@/components/ui/Bits";

const VARIANTS: MapVariant[] = ["reference", "relief", "political", "physical", "tourism", "thematic"];

/**
 * A horizontal strip of project cards. The section pins and the strip travels
 * sideways; the persistent map behind it pans in the same direction.
 */
export default function Work() {
  const { t, dir } = useLang();
  const ready = useMotionReady();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current || !track.current) return;
      initReveals(root.current);
      const sign = dir === "rtl" ? 1 : -1;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tr = track.current!;
        const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
        gsap.to(tr, {
          x: () => sign * dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root, dependencies: [ready, dir] },
  );

  return (
    <section ref={root} id="work" data-nav-theme="light" className="relative overflow-hidden">
      <div
        ref={track}
        className="flex w-full flex-col gap-12 px-5 py-28 md:px-10 lg:h-[100svh] lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:py-0 lg:pe-[10vw]"
      >
        <div className="max-w-[34rem] shrink-0 lg:me-[4vw] lg:w-[min(34vw,500px)]">
          <Eyebrow className="text-navy-700">{t.work.eyebrow}</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2.2rem,4.2vw,3.9rem)] leading-[1.08] text-navy-900" data-split>
            {t.work.title.join(" ")}
          </h2>
          <p className="mt-5 max-w-[26rem] text-[1.02rem] leading-relaxed text-ink/75" data-reveal="0.12">
            {t.work.body}
          </p>
          <p className="eyebrow mt-9 hidden items-center gap-3 text-navy-700 lg:flex" data-reveal="0.25">
            <Arrow />
            {t.work.hint}
          </p>
        </div>

        {t.work.items.map((item, i) => {
          const c = fmtCoord(item.lat, item.lon);
          return (
            <div key={i} className="w-full shrink-0 lg:w-[min(27vw,400px)]" data-reveal>
              <article className="work-card overflow-hidden rounded-2xl border border-navy-900/10 bg-parchment-light">
                <div className="work-img relative aspect-[4/3] overflow-hidden border-b border-navy-900/10">
                  <ProceduralMap
                    seed={500 + i * 13}
                    variant={VARIANTS[i]}
                    className="h-full w-full"
                    title={item.t}
                    decorative={false}
                  />
                  <span className="absolute start-3 top-3 rounded-full bg-parchment-light/90 px-2.5 py-1 text-[0.64rem] tracking-[0.14em] text-navy-700 tabular-nums backdrop-blur-sm">
                    {c.lat} · {c.lon}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <p className="eyebrow text-navy-700/70">
                    {item.k} · {item.y}
                  </p>
                  <h3 className="font-display mt-2 text-[1.2rem] leading-[1.25] text-navy-900">{item.t}</h3>
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-navy-900/10 pt-4">
                    <p className="text-[0.86rem] text-ink/75">
                      <span className="eyebrow me-2 text-navy-700/60">{t.work.roleLabel}</span>
                      {item.role}
                    </p>
                    <a href="#contact" className="link-line shrink-0 text-[0.78rem] font-medium text-navy-700">
                      {t.work.caseStudy}
                      <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          );
        })}

        <div className="shrink-0 lg:ms-[2vw] lg:w-[min(22vw,320px)]" data-reveal>
          <a href="#contact" className="btn btn-solid">
            {t.nav.cta}
            <span className="btn-dot" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
