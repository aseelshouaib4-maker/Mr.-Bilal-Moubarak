"use client";

import { useRef } from "react";
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
    <section ref={root} id="cta" data-nav-theme="dark" className="on-dark relative overflow-hidden bg-navy-900 text-parchment-light">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Oversized so the drift never shows an edge; mirrored under RTL so the hand still points at the copy. */}
        <div className="cta-photo absolute inset-x-0 -top-[8%] h-[116%] rtl:-scale-x-100">
          <Image src="/images/cta-hand.jpg" alt="" fill sizes="100vw" className="object-cover object-[35%_50%] md:object-center" />
        </div>
        {/* Navy wash: deepest behind the copy, lighter over the hand. Phones wash from the bottom, where the copy sits. */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "linear-gradient(to top, rgba(15,46,77,0.95) 0%, rgba(15,46,77,0.82) 50%, rgba(15,46,77,0.35) 100%)" }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: `linear-gradient(${dir === "rtl" ? "to right" : "to left"}, rgba(15,46,77,0.92) 0%, rgba(15,46,77,0.78) 42%, rgba(15,46,77,0.25) 75%, rgba(15,46,77,0.15) 100%)`,
          }}
        />
      </div>

      {/* The copy sits on the end side, where the pencil points. */}
      <div className="relative mx-auto flex w-full max-w-[1600px] px-5 pb-14 pt-56 md:justify-end md:px-10 md:py-28 lg:py-36">
        <div className="max-w-[38rem]">
          <p className="kicker text-parchment-light/80" data-reveal>
            {c.ctaEyebrow}
          </p>
          <h2 className="font-display mt-4 text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.08] text-parchment-light" data-split>
            {c.ctaTitle}
          </h2>
          <p className="mt-4 max-w-[26rem] text-[1rem] leading-relaxed text-parchment-light/80" data-reveal="0.12">
            {c.ctaBody}
          </p>
          <div data-reveal="0.18">
            <Link href={ROUTES.contact} className="btn btn-ghost mt-7">
              {c.ctaButton}
              <span className="btn-dot" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}