"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useMotionReady } from "@/components/MotionReady";

/** Fired once the page's pinned sections are laid out; the loading screen waits for it. */
export const PAGE_READY_EVENT = "bmcs:page-ready";

declare global {
  interface Window {
    __bmcsPageReady?: boolean;
  }
}

/**
 * Every section builds its triggers once fonts are ready, which is after the
 * load event, so nothing recomputes their positions on its own. Rendered last,
 * this recomputes them all once the pins are in place, then announces that the
 * page is ready to be seen.
 */
export default function ScrollRefresh() {
  const ready = useMotionReady();

  useEffect(() => {
    if (!ready) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // One more frame so the refreshed pins have painted before the reveal.
      second = requestAnimationFrame(() => {
        window.__bmcsPageReady = true;
        window.dispatchEvent(new Event(PAGE_READY_EVENT));
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [ready]);

  return null;
}
