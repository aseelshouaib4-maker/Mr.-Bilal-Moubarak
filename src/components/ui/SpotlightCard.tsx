"use client";

import { useRef, type MouseEvent, type ReactNode, type CSSProperties } from "react";

/**
 * Ported from React Bits "Spotlight Card" (https://reactbits.dev): a radial
 * highlight follows the cursor across the surface. Two changes from the
 * published source: the glow colour is a CSS variable so the section palette
 * drives it, and the styling lives in globals.css under `.spot` so it can be
 * shared with keyboard focus.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(183, 198, 219, 0.24)",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const style = { "--spot": spotlightColor } as CSSProperties;

  return (
    // The element type is a prop so the card can be a list item.
    <Tag ref={ref as never} onMouseMove={onMove} className={`spot ${className}`} style={style}>
      {children}
    </Tag>
  );
}
