"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Ported from React Bits "Magnet" (https://reactbits.dev): the element eases a
 * little toward the cursor while it is near, then springs home. Rebuilt on
 * GSAP's quickTo instead of React state so it never re-renders, and skipped
 * entirely under reduced motion.
 */
export default function Magnet({
  children,
  className = "",
  strength = 0.35,
  reach = 60,
}: {
  children: ReactNode;
  className?: string;
  /** How far toward the cursor to move, as a fraction of the offset. */
  strength?: number;
  /** How far outside the element the pull still applies, in px. */
  reach?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const inside = Math.abs(dx) < r.width / 2 + reach && Math.abs(dy) < r.height / 2 + reach;
        xTo(inside ? dx * strength : 0);
        yTo(inside ? dy * strength : 0);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  );
}
