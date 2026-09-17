"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import { ROUTES } from "@/lib/site";

/**
 * The closing invitation on inner pages, set on a photograph of a map on the
 * desk: the copy sits in the open stone on the left, the map on the right.
 */
export default function CtaBand() {
  const { t, dir } = useLang();
  const c = t.pages.common;
  const ready = useMotionReady();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current || prefersReducedMotion()) return;
      // The photo drifts a little against the scroll.
      gsap.fromTo(
        root.current.querySelector(".cta-photo"),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} id="cta" data-nav-theme="light" className="relative overflow-hidden bg-paper text-navy-900">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Oversized so the drift never shows an edge; mirrored under RTL so the copy keeps the open side. */}
        <div className="cta-photo absolute inset-x-0 -top-[8%] h-[116%] rtl:-scale-x-100">
          <Image
            src="/images/cta-banner.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[80%_50%] md:object-center"
          />
        </div>
        {/* Paper wash so the copy reads: down from the top on phones, in from the start side on wide screens. */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "linear-gradient(to bottom, rgba(252,250,242,0.94) 0%, rgba(252,250,242,0.85) 55%, rgba(252,250,242,0.2) 100%)" }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: `linear-gradient(${dir === "rtl" ? "to left" : "to right"}, rgba(252,250,242,0.9) 0%, rgba(252,250,242,0.6) 45%, rgba(252,250,242,0) 70%)`,
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-40 pt-14 md:px-10 md:py-28 lg:py-32">
        <div className="max-w-[34rem]">
          <p className="eyebrow flex items-center gap-3 text-navy-700" data-reveal>
            <span className="inline-block h-px w-6 bg-gold" />
            {c.ctaEyebrow}
          </p>
          <h2 className="font-display mt-5 text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.08] text-navy-900" data-split>
            {c.ctaTitle.map((line, i) => (
              <Fragment key={i}>
                {line}
                {i < c.ctaTitle.length - 1 && <br />}
              </Fragment>
            ))}
          </h2>
          <p className="mt-5 max-w-[26rem] text-[1rem] leading-relaxed text-ink/75" data-reveal="0.12">
            {c.ctaBody}
          </p>
          <div data-reveal="0.18">
            <Link href={ROUTES.contact} className="btn btn-solid mt-7">
              {c.ctaButton}
              <span className="btn-dot" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
