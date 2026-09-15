"use client";

import type { RefObject } from "react";
import { useGSAP, initReveals } from "@/lib/gsap";
import { useMotionReady } from "@/components/MotionReady";

/**
 * Runs the site's heading splits and soft rises (`data-split`, `data-reveal`,
 * `data-stagger`) inside a page once fonts are ready.
 */
export function useReveals(root: RefObject<HTMLElement | null>) {
  const ready = useMotionReady();
  useGSAP(
    () => {
      if (!ready || !root.current) return;
      initReveals(root.current);
    },
    { scope: root, dependencies: [ready] },
  );
}
