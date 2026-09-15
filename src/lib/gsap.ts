"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ ease: "power3.out", duration: 0.9 });
// Phones resize the viewport as the address bar shows and hides; re-measuring
// every pin on that would make the pinned hero jump mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** True when the visitor asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Line-masked heading reveal for every `[data-split]` inside `scope`, plus a
 * soft rise for every `[data-reveal]`. Call inside a useGSAP callback once
 * fonts are ready so line breaks are measured correctly.
 */
export function initReveals(scope: HTMLElement) {
  if (prefersReducedMotion()) return;

  scope.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
    });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.09,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });

  scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const delay = Number(el.dataset.reveal || 0);
    gsap.from(el, {
      autoAlpha: 0,
      y: 26,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });

  scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
    gsap.from(el.children, {
      autoAlpha: 0,
      y: 22,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });
}
