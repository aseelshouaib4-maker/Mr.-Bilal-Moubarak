"use client";

import { useEffect, useRef, useState } from "react";
import { PAGE_READY_EVENT } from "@/components/ScrollRefresh";
import { COORDS } from "@/lib/site";

/** Shortest time the sheet stays up, so a fast load still reads as intentional. */
const MIN_MS = 1400;
/** Never hold the page longer than this, whatever happens. */
const MAX_MS = 7000;

/**
 * The opening sheet shown on a full page load: the studio's monogram and name,
 * with a scale bar beneath them that fills with the load. When the
 * page is laid out, a lens opens in the middle of the sheet and widens until
 * the site is revealed through it, echoing the magnifier in the hero.
 *
 * Rendered in the root layout, so it is in the first HTML paint (covering the
 * page before its pinned sections are built) and survives client navigation
 * without showing again.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "opening" | "done">("loading");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let pageReady = Boolean(window.__bmcsPageReady);
    let finished = false;
    let raf = 0;
    let shown = 0;

    // Progress eases toward 90% on its own and only completes once the page is ready.
    const tick = (now: number) => {
      const elapsed = now - start;
      const target = pageReady && elapsed >= MIN_MS ? 100 : Math.min(90, 90 * (1 - Math.exp(-elapsed / 900)));
      shown += (target - shown) * (target === 100 ? 0.18 : 0.08);
      if (target === 100 && shown > 99.5) shown = 100;
      setProgress(Math.round(shown));
      if (shown >= 100) return open();
      raf = requestAnimationFrame(tick);
    };

    const open = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setProgress(100);
      setPhase("opening");
      const duration = reduced ? 250 : 1100;
      const t0 = performance.now();
      const ease = (x: number) => (x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2);
      const grow = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        // The hole widens from nothing to past the corners of the screen.
        el.style.setProperty("--hole", `${(ease(p) * 150).toFixed(2)}vmax`);
        if (p < 1) raf = requestAnimationFrame(grow);
        else {
          setPhase("done");
          html.classList.remove("is-loading");
        }
      };
      raf = requestAnimationFrame(grow);
    };

    const onReady = () => {
      pageReady = true;
    };
    window.addEventListener(PAGE_READY_EVENT, onReady);
    const failsafe = window.setTimeout(() => {
      pageReady = true;
    }, MAX_MS);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.removeEventListener(PAGE_READY_EVENT, onReady);
      html.classList.remove("is-loading");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      ref={root}
      className={`site-loader ${phase === "opening" ? "is-opening" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress}%`}
    >
      <div className="site-loader-inner">
        <span className="site-loader-monogram font-display" aria-hidden="true">
          BM
        </span>
        <p className="font-display site-loader-name">Bilal Moubarak</p>
        <p className="eyebrow site-loader-sub">Cartography Studio</p>

        {/* A medium scale bar under the name fills with the load. */}
        <div className="site-loader-line" aria-hidden="true">
          <div className="site-loader-bar">
            <span className="site-loader-fill" style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <div className="site-loader-meta">
            <span className="tabular-nums" dir="ltr">
              {COORDS}
            </span>
            <span className="tabular-nums">{String(progress).padStart(3, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
