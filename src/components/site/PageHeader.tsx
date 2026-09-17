"use client";

import { Fragment, useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useMotionReady } from "@/components/MotionReady";

type Props = {
  eyebrow: string;
  title: string[];
  body: string;
  /** Optional banner image set behind the title, e.g. "/images/about-banner.jpg". */
  image?: string;
  children?: ReactNode;
};

/**
 * The opening of an inner page, set like the title block of a map sheet:
 * a large serif title and a short introduction, closed by a ruled line with ticks.
 * With an image it becomes a banner: the sheet runs full width behind the
 * title under a navy wash, and the type turns to parchment.
 */
export default function PageHeader({ eyebrow, title, body, image, children }: Props) {
  const ready = useMotionReady();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!image || !ready || !root.current || prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      // Settles in on arrival, then drifts slower than the page as it scrolls away.
      gsap.from(q(".page-banner-img"), { scale: 1.12, duration: 1.8, ease: "expo.out" });
      gsap.to(q(".page-banner-drift"), {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [ready, image] },
  );

  const banner = Boolean(image);

  return (
    <header
      ref={root}
      data-nav-theme={banner ? "dark" : "light"}
      className={`relative overflow-hidden ${banner ? "on-dark bg-navy-900" : "bg-paper"}`}
    >
      {image && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="page-banner-drift absolute inset-0">
            <div className="page-banner-img absolute inset-0">
              <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
            </div>
          </div>
          {/* Navy wash: deepest behind the text, lighter where the maps show through. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(15,46,77,0.88) 0%, rgba(15,46,77,0.7) 45%, rgba(15,46,77,0.35) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-40"
            style={{ background: "linear-gradient(to bottom, rgba(15,46,77,0.55), rgba(15,46,77,0))" }}
          />
        </div>
      )}

      <div
        className={`relative mx-auto w-full max-w-[1600px] px-5 pt-28 sm:pt-32 md:px-10 md:pt-44 ${
          banner ? "pb-16 md:pb-28" : "pb-12 md:pb-20"
        }`}
      >
        <div className="max-w-[60rem]">
          <p className={`eyebrow flex items-center gap-3 ${banner ? "text-parchment-light/80" : "text-navy-700"}`} data-reveal>
            <span className="h-px w-6 shrink-0 bg-gold" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1
            className={`font-display mt-5 text-[clamp(2.1rem,6vw,4.6rem)] leading-[1.06] md:mt-6 ${
              banner ? "text-parchment-light" : "text-navy-900"
            }`}
            data-split
          >
            {title.map((line, i) => (
              <Fragment key={i}>
                {line}
                {/* Line breaks are for wide screens; phones let the title wrap naturally. */}
                {i < title.length - 1 && (
                  <>
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                  </>
                )}
              </Fragment>
            ))}
          </h1>
          <p
            className={`mt-5 max-w-[38rem] text-[1rem] leading-relaxed md:mt-6 md:text-[1.08rem] ${
              banner ? "text-parchment-light/85" : "text-ink/70"
            }`}
            data-reveal="0.12"
          >
            {body}
          </p>
          {children}
        </div>
      </div>
      {!banner && (
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10" aria-hidden="true">
          <div className="rule-ticks text-navy-900/60" />
        </div>
      )}
    </header>
  );
}
