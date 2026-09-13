"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useMotionReady } from "@/components/MotionReady";

/**
 * Every section builds its triggers once fonts are ready, which is after the
 * load event, so nothing recomputes their positions on its own. Rendered last,
 * this recomputes them all once the pins are in place.
 */
export default function ScrollRefresh() {
  const ready = useMotionReady();

  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [ready]);

  return null;
}
