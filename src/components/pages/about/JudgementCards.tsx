"use client";

import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";

/**
 * "What sets the studio apart" as feature cards, after "Features 8" by Méschac
 * Irung (21st.dev): each card carries a small drawn instrument instead of an
 * icon. Top row: the figure ringed by contours, a layer panel with one layer
 * switched off, a graticule over a scale bar. Bottom row: a map legend, and an
 * elevation profile that runs from pen and ink into GIS. Each drawing wakes a
 * little under the cursor.
 */

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <article className={`feat-card sheet group relative overflow-hidden ${className}`}>{children}</article>;
}

/** The figure inside two loose contour rings. */
function FigureRing({ years }: { years: string }) {
  return (
    <div className="relative mx-auto grid h-36 w-full max-w-[16rem] place-items-center">
      <svg viewBox="0 0 260 140" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" fill="none">
        <path
          className="feat-ring"
          d="M22 74c-4-30 44-56 112-57 66-1 110 20 106 50-4 32-54 56-118 56-60 0-96-20-100-49z"
          stroke="var(--color-gold)"
          strokeOpacity="0.65"
          strokeWidth="1.4"
        />
        <path
          className="feat-ring feat-ring--outer"
          d="M8 70C6 32 62 6 136 6c76 0 118 26 116 64-3 38-60 64-126 64C58 134 10 108 8 70z"
          stroke="var(--color-navy-900)"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
      </svg>
      <p className="font-display relative flex items-start leading-none text-navy-900" dir="ltr">
        <span className="text-[4.2rem] tracking-[-0.03em]">{years}</span>
        <span className="mt-1.5 text-[1.6rem] text-gold">+</span>
      </p>
    </div>
  );
}

/** A layer panel: three layers on, one switched off and struck through. */
function LayerPanel({ layers }: { layers: string[] }) {
  return (
    <ul className="mx-auto flex w-full max-w-[15rem] flex-col gap-1.5" aria-hidden="true">
      {layers.map((name, i) => {
        const off = i === layers.length - 1;
        return (
          <li
            key={name}
            className={`feat-layer flex items-center justify-between rounded-lg border px-3 py-2 text-[0.78rem] ${
              off ? "feat-layer--off border-dashed border-navy-900/15 text-ink/40" : "border-navy-900/10 bg-paper text-navy-900"
            }`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className={off ? "line-through decoration-umber-light/70" : ""}>{name}</span>
            <span className={`feat-toggle ${off ? "" : "is-on"}`} />
          </li>
        );
      })}
    </ul>
  );
}

/** Curved meridians and parallels, over a checkered scale bar. */
function Graticule({ unit }: { unit: string }) {
  return (
    <svg viewBox="0 0 240 132" className="mx-auto h-36 w-full max-w-[16rem]" aria-hidden="true" fill="none">
      <g className="feat-grid" stroke="var(--color-navy-900)" strokeOpacity="0.22" strokeWidth="1">
        {[40, 80, 120, 160, 200].map((x, i) => (
          <path key={x} d={`M${x} 10Q${120 + (x - 120) * 1.18} 50 ${x + (x - 120) * 0.12} 92`} strokeOpacity={i === 2 ? 0.45 : 0.22} />
        ))}
        {[22, 44, 66, 88].map((y) => (
          <path key={y} d={`M18 ${y + 4}Q120 ${y - 10} 222 ${y + 4}`} />
        ))}
      </g>
      <circle className="feat-pin" cx="146" cy="46" r="3.5" fill="var(--color-gold)" />
      <g transform="translate(40 108)">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={i * 40}
            y="0"
            width="40"
            height="6"
            fill={i % 2 ? "transparent" : "var(--color-navy-900)"}
            stroke="var(--color-navy-900)"
            strokeWidth="1"
          />
        ))}
        {["0", "50", "100"].map((label, i) => (
          <text key={label} x={i * 80} y="20" textAnchor="middle" fontSize="10.5" fill="var(--color-umber)" style={{ fontFamily: "var(--font-body)" }}>
            {label}
          </text>
        ))}
        <text x="174" y="20" fontSize="10.5" fill="var(--color-umber)" style={{ fontFamily: "var(--font-body)" }}>
          {unit}
        </text>
      </g>
    </svg>
  );
}

/** A small legend: each entry tagged beside its symbol, set at staggered offsets. */
function Legend({ entries }: { entries: string[] }) {
  const symbols = [
    <svg key="c" viewBox="0 0 20 20" className="h-4 w-4"><circle cx="10" cy="10" r="5" fill="var(--color-navy-900)" /><circle cx="10" cy="10" r="8" fill="none" stroke="var(--color-navy-900)" strokeWidth="1.2" /></svg>,
    <svg key="t" viewBox="0 0 20 20" className="h-4 w-4"><circle cx="10" cy="10" r="4.5" fill="var(--color-paper)" stroke="var(--color-navy-900)" strokeWidth="1.6" /></svg>,
    <svg key="r" viewBox="0 0 20 20" className="h-4 w-4"><path d="M2 10h16" stroke="var(--color-gold)" strokeWidth="3" /><path d="M2 10h16" stroke="var(--color-navy-900)" strokeWidth="0.8" /></svg>,
    <svg key="w" viewBox="0 0 20 20" className="h-4 w-4"><path d="M2 12c3-5 5 3 8-2s5 2 8-3" fill="none" stroke="#3f6a99" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  ];
  const offsets = ["ms-0", "ms-10", "ms-4", "ms-14"];
  return (
    <ul className="flex flex-col gap-2.5" aria-hidden="true">
      {entries.map((entry, i) => (
        <li key={entry} className={`feat-legend flex items-center gap-2.5 ${offsets[i]}`} style={{ transitionDelay: `${i * 50}ms` }}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-navy-900/10 bg-paper shadow-[0_6px_14px_-10px_rgba(20,32,51,0.5)]">
            {symbols[i]}
          </span>
          <span className="rounded-md border border-navy-900/10 bg-paper px-2.5 py-1 text-[0.76rem] text-navy-900">{entry}</span>
        </li>
      ))}
    </ul>
  );
}

/** An elevation profile in a sheet window: hand-inked on the left, gridded GIS on the right. */
function Profile({ label, pen, gis }: { label: string; pen: string; gis: string }) {
  const line = "M0 92 C22 88 30 70 46 72 S70 40 88 46 S112 78 128 64 S150 22 170 30 S196 60 214 50 S240 34 260 40";
  return (
    <div className="overflow-hidden rounded-xl border border-navy-900/10 bg-paper" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-navy-900/10 px-3 py-2">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-navy-900/20" />
          ))}
        </span>
        <span className="eyebrow !text-[0.68rem] text-umber-light">{label}</span>
      </div>
      <svg viewBox="0 0 260 110" preserveAspectRatio="none" className="block h-32 w-full" fill="none">
        <defs>
          <linearGradient id="feat-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="var(--color-navy-900)" strokeOpacity="0.08">
          {[130, 160, 190, 220, 250].map((x) => (
            <path key={x} d={`M${x} 0V110`} />
          ))}
          {[30, 55, 80].map((y) => (
            <path key={y} d={`M130 ${y}H260`} />
          ))}
        </g>
        <path d={`${line} L260 110 L0 110Z`} fill="url(#feat-fill)" />
        <path className="feat-profile" d={line} stroke="var(--color-navy-900)" strokeWidth="1.5" pathLength={1} />
        <path d="M130 0V110" stroke="var(--color-gold)" strokeDasharray="2 3" strokeOpacity="0.8" />
      </svg>
      <div className="flex justify-between border-t border-navy-900/10 px-3 py-1.5 text-[0.68rem] text-umber">
        <span>{pen}</span>
        <span>{gis}</span>
      </div>
    </div>
  );
}

export default function JudgementCards() {
  const { t } = useLang();
  const a = t.pages.about;
  const v = a.visual;
  const [show, scale, symbols, heritage] = a.judgement;

  const text = (item: { t: string; d: string }, align = "text-center") => (
    <div className={align}>
      <h3 className="font-display text-[1.2rem] leading-snug text-navy-900">{item.t}</h3>
      <p className={`mt-2 text-[0.92rem] leading-relaxed text-ink/70 ${align === "text-center" ? "mx-auto max-w-[19rem]" : "max-w-[20rem]"}`}>{item.d}</p>
    </div>
  );

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6" data-stagger>
      <Card className="flex flex-col justify-center gap-6 p-7 md:p-8 lg:col-span-2">
        <FigureRing years={t.experience.years} />
        <p className="font-display mx-auto max-w-[15rem] text-center text-[1.25rem] leading-snug text-navy-900">{a.judgementFigure}</p>
      </Card>

      <Card className="flex flex-col gap-7 p-7 md:p-8 lg:col-span-2">
        <LayerPanel layers={v.layers} />
        {text(show)}
      </Card>

      <Card className="flex flex-col gap-7 p-7 md:p-8 md:col-span-2 lg:col-span-2">
        <Graticule unit={v.scale} />
        {text(scale)}
      </Card>

      <Card className="grid items-center gap-8 p-7 sm:grid-cols-2 md:col-span-1 md:grid-cols-1 md:p-8 lg:col-span-3 lg:grid-cols-2">
        {text(symbols, "text-start")}
        <Legend entries={v.legend} />
      </Card>

      <Card className="grid items-center gap-8 p-7 sm:grid-cols-2 md:col-span-1 md:grid-cols-1 md:p-8 lg:col-span-3 lg:grid-cols-2">
        {text(heritage, "text-start")}
        <Profile label={v.profile} pen={v.pen} gis={v.gis} />
      </Card>
    </div>
  );
}
