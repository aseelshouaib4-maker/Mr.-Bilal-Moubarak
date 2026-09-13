"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, initReveals } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import { smoothOpen, type Pt } from "@/lib/mapgen";
import { Eyebrow } from "@/components/ui/Bits";

/** Where each stop sits along the route, as a fraction of the stage width in reading order. */
const STOPS = [0.11, 0.305, 0.5, 0.695, 0.89];
/** Where the route starts and ends, as a fraction of the stage width. */
const ROUTE = [0.01, 0.99] as const;
/** Normalised length of the route path (its pathLength), for the drawing dash. */
const ROUTE_LEN = 1000;

/**
 * The route's vertical wander at reading position u (0..1), in px. Two slow,
 * unrelated waves, so it reads as a drawn boundary rather than a sine.
 */
const wander = (u: number) =>
  13 * Math.sin(u * Math.PI * 2 * 1.25 + 0.7) + 5 * Math.sin(u * Math.PI * 2 * 3.4 + 2.1);

/**
 * A map of the method. On wide screens the section pins and one route is
 * inked across the sheet like a boundary on an old map; each stage is a
 * located point on it, labelled alternately above and below the line, and is
 * discovered as the ink reaches it. The most recent point keeps a slow ripple.
 * Narrow screens and reduced motion get the same route running down the page.
 */
export default function Process() {
  const { t, dir } = useLang();
  const ready = useMotionReady();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const mobileList = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current || !stage.current) return;
      initReveals(root.current);
      const q = gsap.utils.selector(root);
      const host = stage.current;
      const inks = q<SVGPathElement>(".route-ink");
      const stops = q<HTMLElement>(".route-stop");
      const rtl = dir === "rtl";

      /**
       * Lays the route out for the current stage size: the path through the
       * stops, and each stop's anchor on it. Returns how far along the path
       * (0..1, by length) each stop lies, which is when the ink reaches it.
       */
      const build = (): number[] => {
        const W = host.clientWidth;
        const H = host.clientHeight;
        if (!W || !H) return STOPS;
        const mid = H / 2;
        const X = (u: number) => (rtl ? W * (1 - u) : W * u);

        // Sample the route densely, and always through the stops themselves,
        // so the smoothed curve passes exactly through every marker.
        const us = new Set<number>(STOPS);
        for (let k = 0; k <= 40; k++) us.add(ROUTE[0] + ((ROUTE[1] - ROUTE[0]) * k) / 40);
        const pts: Pt[] = [...us].sort((a, b) => a - b).map((u) => [X(u), mid + wander(u)]);
        const d = smoothOpen(pts);
        q<SVGPathElement>(".route-path").forEach((p) => p.setAttribute("d", d));
        svg.current?.setAttribute("viewBox", `0 0 ${W} ${H}`);

        stops.forEach((el, i) => {
          el.style.left = `${X(STOPS[i])}px`;
          el.style.top = `${mid + wander(STOPS[i])}px`;
        });

        // Arc-length position of each stop: x runs monotonically along the
        // route, so a bisection on length finds it.
        const probe = inks[0];
        const total = probe.getTotalLength();
        return STOPS.map((u) => {
          const target = X(u);
          let lo = 0;
          let hi = total;
          for (let n = 0; n < 24; n++) {
            const m = (lo + hi) / 2;
            const x = probe.getPointAtLength(m).x;
            if (rtl ? x > target : x < target) lo = m;
            else hi = m;
          }
          return lo / total;
        });
      };

      let fracs = build();
      const ro = new ResizeObserver(() => {
        fracs = build();
      });
      ro.observe(host);

      const setState = (current: number) => {
        stops.forEach((s, i) => {
          s.classList.toggle("is-reached", i <= current);
          s.classList.toggle("is-current", i === current);
        });
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const DRAW = 5; // the ink's travel, in timeline units
        const LEAD = 0.35; // a beat of blank sheet before the pen moves
        const HOLD = 0.9; // time on the finished route before the pin releases
        let thresholds: number[] = [];

        // Paths are normalised to ROUTE_LEN units: GSAP rounds px values, so a
        // 0..1 offset would jump from drawn-nothing to drawn-all at halfway.
        gsap.set(inks, { strokeDasharray: ROUTE_LEN, strokeDashoffset: ROUTE_LEN });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(inks, { strokeDashoffset: 0, duration: DRAW, ease: "none" }, LEAD);
        stops.forEach((stop, i) => {
          const at = LEAD + fracs[i] * DRAW;
          const above = i % 2 === 0;
          tl.fromTo(
            stop.querySelector(".route-mark"),
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.22, ease: "power2.out" },
            at - 0.04,
          )
            .fromTo(
              stop.querySelector(".route-leader"),
              { scaleY: 0 },
              { scaleY: 1, duration: 0.3, ease: "power2.out" },
              at,
            )
            .fromTo(
              stop.querySelector(".route-card"),
              { autoAlpha: 0, y: above ? 22 : -22, scale: 0.97 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" },
              at + 0.08,
            );
        });
        tl.to({}, { duration: HOLD });

        // Active stop follows the smoothed timeline, not the raw scroll, so the
        // ripple starts when the marker actually appears.
        thresholds = fracs.map((f) => (LEAD + f * DRAW) / tl.duration());
        tl.eventCallback("onUpdate", () => {
          const p = tl.progress();
          let current = -1;
          thresholds.forEach((th, i) => {
            if (p >= th) current = i;
          });
          setState(current);
        });
        setState(-1);

        return () => {
          tl.eventCallback("onUpdate", null);
        };
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const list = mobileList.current;
        if (!list) return;
        const items = gsap.utils.toArray<HTMLElement>(".m-stop", list);
        gsap.fromTo(
          list.querySelector(".m-line"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 72%", end: "bottom 72%", scrub: 0.6 } },
        );
        items.forEach((li) => {
          gsap.from(li.querySelector(".m-body"), {
            autoAlpha: 0,
            y: 18,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: li, start: "top 78%", toggleActions: "play none none reverse" },
          });
          // Reached once the line passes it; current while it is on the reading line.
          ScrollTrigger.create({
            trigger: li,
            start: "top 72%",
            end: "bottom 72%",
            onEnter: () => li.classList.add("is-reached", "is-current"),
            onLeave: () => li.classList.remove("is-current"),
            onEnterBack: () => li.classList.add("is-current"),
            onLeaveBack: () => li.classList.remove("is-reached", "is-current"),
          });
        });
      });

      // Reduced motion: the finished map, every stop located and labelled.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(inks, { strokeDasharray: "none", strokeDashoffset: 0 });
        stops.forEach((s) => s.classList.add("is-reached"));
        mobileList.current?.querySelectorAll(".m-stop").forEach((li) => li.classList.add("is-reached"));
      });

      return () => ro.disconnect();
    },
    { scope: root, dependencies: [ready, dir] },
  );

  const steps = t.process.steps;

  return (
    <section
      ref={root}
      id="process"
      data-nav-theme="light"
      className="relative overflow-hidden bg-parchment-light py-24 md:py-32 lg:flex lg:h-[100svh] lg:flex-col lg:py-0"
    >
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 md:px-10 lg:pb-10 lg:pt-28">
        {/* Title block: heading on the left, the one-line key on the right. */}
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[44rem]">
            <Eyebrow className="text-navy-700">{t.process.eyebrow}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(1.8rem,3vw,2.9rem)] leading-[1.15] text-navy-900" data-split>
              {t.process.title.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < t.process.title.length - 1 && <br />}
                </Fragment>
              ))}
            </h2>
          </div>
          <p className="mt-4 max-w-[22rem] text-[1rem] leading-relaxed text-ink/75 lg:mt-0 lg:pb-2" data-reveal="0.12">
            {t.process.body}
          </p>
        </div>

        {/* Wide screens: the route across the sheet. */}
        <div ref={stage} className="relative mt-8 hidden min-h-[420px] flex-1 lg:block">
          <svg ref={svg} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {/* A soft casing under the line, as a boundary is printed on a sheet. */}
            <path className="route-path route-ink fill-none stroke-navy-900/[0.07]" pathLength={ROUTE_LEN} strokeWidth="9" strokeLinecap="round" />
            <path className="route-path route-ink fill-none stroke-navy-900" pathLength={ROUTE_LEN} strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          <ol className="absolute inset-0">
            {steps.map((s, i) => {
              const above = i % 2 === 0;
              return (
                <li key={i} className={`route-stop ${above ? "is-above" : "is-below"}`}>
                  <span className="route-mark" aria-hidden="true">
                    <span className="route-ring" />
                    <span className="route-ring route-ring--late" />
                    <span className="route-dot" />
                  </span>
                  <span className="route-leader" aria-hidden="true" />
                  <div className="route-slot">
                    <div className="route-card">
                      <div className="route-card-inner">
                        <p className="eyebrow text-navy-700/60">0{i + 1}</p>
                        <h3 className="font-display mt-2 text-[clamp(1.2rem,1.55vw,1.55rem)] leading-[1.22] text-navy-900">{s.t}</h3>
                        <p className="mx-auto mt-2 max-w-[17rem] text-[0.9rem] leading-relaxed text-ink/70">{s.d}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Narrow screens: the same route, running down the page. */}
        <ol ref={mobileList} className="relative mt-12 lg:hidden">
          <span className="m-line absolute bottom-6 start-[11px] top-6 w-[1.5px] origin-top bg-navy-900/80" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={i} className="m-stop relative ps-12 py-5">
              <span className="route-mark m-mark" aria-hidden="true">
                <span className="route-ring" />
                <span className="route-ring route-ring--late" />
                <span className="route-dot" />
              </span>
              <div className="m-body">
                <p className="eyebrow text-navy-700/60">0{i + 1}</p>
                <h3 className="font-display mt-1 text-[1.25rem] leading-[1.25] text-navy-900">{s.t}</h3>
                <p className="mt-1.5 max-w-[32rem] text-[0.95rem] leading-relaxed text-ink/75">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
