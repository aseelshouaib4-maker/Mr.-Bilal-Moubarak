"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP, initReveals } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import TornSheet from "@/components/ui/TornSheet";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { Eyebrow, Tape } from "@/components/ui/Bits";

/**
 * Six services as field-note sheets laid square on the table. On wide screens
 * the section pins and the sheets drop in one by one; each one leans a little
 * under the cursor, alternating sides so the grid never tilts the same way.
 */
export default function Services() {
  const { t } = useLang();
  const ready = useMotionReady();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      initReveals(root.current);
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1280px) and (prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=110%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .from(q(".service-sheet"), {
            y: () => window.innerHeight * 1.1,
            rotation: (i) => (i % 2 ? 6 : -5),
            duration: 1,
            stagger: 0.14,
            ease: "power2.out",
          })
          .to({}, { duration: 0.3 });
      });
      mm.add("(max-width: 1279px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(q(".service-sheet"), {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: q(".service-grid")[0], start: "top 82%" },
        });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      ref={root}
      id="services"
      data-nav-theme="light"
      className="services-overlap relative overflow-hidden py-24 md:py-28 xl:flex xl:min-h-[100svh] xl:items-center xl:py-0"
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        {/* Header runs full width so the title can hold one line. */}
        <div className="max-w-[54rem]">
          <Eyebrow className="text-navy-700">{t.services.eyebrow}</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(1.7rem,2.8vw,2.7rem)] leading-[1.15] text-navy-900" data-split>
            {t.services.title.join(" ")}
          </h2>
          <p className="mt-4 max-w-[40rem] text-[1rem] leading-relaxed text-ink/75" data-reveal="0.12">
            {t.services.body}
          </p>
        </div>

        <div className="service-grid mt-12 grid gap-5 sm:grid-cols-2 xl:mt-14 xl:grid-cols-3 xl:gap-6">
          {t.services.items.map((item, i) => (
            <div
              key={i}
              className="service-sheet relative will-change-transform"
              style={{ "--tilt": i % 2 ? "1.8deg" : "-1.8deg" } as CSSProperties}
            >
              <Tape className={`-top-3 z-10 ${i % 2 ? "end-8 rotate-3" : "start-8 -rotate-3"}`} />
              <TornSheet seed={100 + i} className="sheet-card flex h-full flex-col p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-navy-700/70">
                    {t.services.sheet} 0{i + 1}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-navy-900/15 text-navy-900">
                    <ServiceIcon index={i} className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="font-display mt-5 text-[1.15rem] leading-[1.3] text-navy-900 md:text-[1.25rem]">{item.t}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-umber">{item.d}</p>
              </TornSheet>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
