"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor links travel through Lenis. Targets that live inside a pinned
    // stage carry `data-pin-offset` (in viewport heights) on the stage.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      e.preventDefault();
      if (id === "#top") {
        lenis.scrollTo(0, { duration: 1.4 });
        return;
      }
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      const stage = target.closest<HTMLElement>("[data-pin-offset]");
      const spacer = stage?.parentElement;
      if (stage && spacer && spacer.classList.contains("pin-spacer")) {
        const y = spacer.getBoundingClientRect().top + window.scrollY + window.innerHeight * Number(stage.dataset.pinOffset || 0);
        lenis.scrollTo(y, { duration: 1.6 });
      } else {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
