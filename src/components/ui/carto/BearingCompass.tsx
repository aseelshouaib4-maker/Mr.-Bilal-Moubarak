"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";

type Props = {
  /** Point names, clockwise from north. */
  labels: string[];
  /** One line per point, revealed in the centre. */
  lines: string[];
  className?: string;
};

/** Dial geometry, in viewBox units (the dial is 400 across). */
const POINT_R = 152; // radius of the bearing points
const CENTER_R = 98; // radius of the reading window

const EASE = [0.4, 0, 0.2, 1] as const;

/**
 * Rounds trig results for rendering. Server and browser disagree in the last
 * floating-point digit of sin/cos, which React reports as a hydration mismatch.
 */
const r2 = (v: number) => Math.round(v * 100) / 100;

/**
 * A compass dial with one bearing per quality. Choosing a bearing swings the
 * index round the reading window the short way, like a needle settling, and
 * the window shows that quality. On first view the needle swings in from the
 * south and settles on north.
 */
export default function BearingCompass({ labels, lines, className = "" }: Props) {
  const n = labels.length;
  const ref = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  // Accumulated rotation, so each move takes the shortest way round.
  const [rotation, setRotation] = useState(0);

  const bearing = (i: number) => (i * 360) / n;

  const select = (i: number) => {
    const delta = ((((bearing(i) - rotation) % 360) + 540) % 360) - 180;
    setRotation(rotation + delta);
    setActive(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + n) % n;
    select(next);
    buttons.current[next]?.focus();
  };

  // Placement of each point on the dial, in % of the square.
  const at = (i: number, r: number) => {
    const a = (bearing(i) * Math.PI) / 180;
    return { x: r2(50 + (r / 400) * 100 * Math.sin(a)), y: r2(50 - (r / 400) * 100 * Math.cos(a)), sin: Math.sin(a), cos: Math.cos(a) };
  };

  return (
    <div ref={ref} className={`compass relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[26rem] ${className}`}>
      {/* The dial: bezel, degree scale, a faint rose, and the bearing lines. */}
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <circle r="194" fill="none" stroke="var(--color-mist)" strokeOpacity="0.22" />
        <circle r="180" fill="none" stroke="var(--color-mist)" strokeOpacity="0.14" />
        <g stroke="var(--color-mist)">
          {Array.from({ length: 72 }, (_, k) => {
            const major = k % 6 === 0;
            const a = (k * 5 * Math.PI) / 180;
            const r1 = 180;
            const rOut = major ? 192 : 186;
            return (
              <line
                key={k}
                x1={r2(r1 * Math.sin(a))}
                y1={r2(-r1 * Math.cos(a))}
                x2={r2(rOut * Math.sin(a))}
                y2={r2(-rOut * Math.cos(a))}
                strokeOpacity={major ? 0.5 : 0.22}
                strokeWidth={major ? 1 : 0.7}
              />
            );
          })}
        </g>

        {/* A faint eight-point rose behind everything. */}
        <g fill="var(--color-mist)" fillOpacity="0.05">
          {[0, 90, 180, 270].map((d) => (
            <path key={d} d="M0 -176 L14 -14 L0 0 L-14 -14 Z" transform={`rotate(${d})`} />
          ))}
          {[45, 135, 225, 315].map((d) => (
            <path key={d} d="M0 -120 L9 -9 L0 0 L-9 -9 Z" transform={`rotate(${d})`} />
          ))}
        </g>

        {labels.map((_, i) => {
          const a = (bearing(i) * Math.PI) / 180;
          const on = i === active;
          return (
            <line
              key={i}
              x1={r2((CENTER_R + 8) * Math.sin(a))}
              y1={r2(-(CENTER_R + 8) * Math.cos(a))}
              x2={r2((POINT_R - 24) * Math.sin(a))}
              y2={r2(-(POINT_R - 24) * Math.cos(a))}
              stroke={on ? "var(--color-gold)" : "var(--color-mist)"}
              strokeOpacity={on ? 0.9 : 0.25}
              strokeWidth={on ? 1.3 : 1}
              strokeDasharray={on ? undefined : "2 4"}
              style={{ transition: "stroke 0.4s ease, stroke-opacity 0.4s ease" }}
            />
          );
        })}

        <circle r={CENTER_R} fill="var(--color-navy-950)" fillOpacity="0.55" stroke="var(--color-gold)" strokeOpacity="0.45" />
      </svg>

      {/* The index: rides the rim of the reading window toward the chosen bearing. */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={reduced ? false : { rotate: 180 }}
        animate={inView || reduced ? { rotate: rotation } : undefined}
        transition={{ duration: 0.45, ease: EASE }}
        aria-hidden="true"
      >
        <svg viewBox="-200 -200 400 400" className="h-full w-full overflow-visible">
          <path d={`M0 ${-(CENTER_R + 22)} L7 ${-(CENTER_R + 2)} L0 ${-(CENTER_R + 7)} L-7 ${-(CENTER_R + 2)} Z`} fill="var(--color-gold)" />
          <line y1={CENTER_R + 4} y2={CENTER_R + 14} stroke="var(--color-parchment-light)" strokeOpacity="0.5" strokeWidth="1.2" />
        </svg>
      </motion.div>

      {/* The reading window. */}
      <div className="absolute inset-[26%] grid place-items-center text-center" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="px-1"
          >
            <p className="eyebrow !text-[0.68rem] text-gold">{String(active + 1).padStart(2, "0")}</p>
            <p className="font-display mt-1.5 text-[clamp(0.95rem,2.2vw,1.35rem)] leading-tight text-parchment-light">{labels[active]}</p>
            <p className="mt-1.5 hidden text-[0.8rem] leading-snug text-mist sm:block">{lines[active]}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The bearings themselves. */}
      <div role="group" onKeyDown={onKeyDown}>
        {labels.map((label, i) => {
          const p = at(i, POINT_R);
          const on = i === active;
          // Labels sit outside the dial, on the side of the point.
          const side = p.sin > 0.3 ? "right" : p.sin < -0.3 ? "left" : p.cos > 0 ? "top" : "bottom";
          return (
            <button
              key={i}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              onClick={() => select(i)}
              aria-pressed={on}
              aria-label={label}
              className={`compass-point ${on ? "is-on" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="compass-dot">{String(i + 1).padStart(2, "0")}</span>
              <span className={`compass-label is-${side}`} aria-hidden="true">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
