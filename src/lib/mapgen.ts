/**
 * Deterministic procedural cartography. Everything here is seeded so the
 * server and the client draw identical SVG (no hydration mismatch).
 */

export type Pt = [number, number];

export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f1 = (n: number) => n.toFixed(1);

/** Catmull-Rom → cubic bezier, closed loop. */
export function smoothClosed(pts: Pt[]): string {
  const n = pts.length;
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + "Z";
}

/** Catmull-Rom → cubic bezier, open path. */
export function smoothOpen(pts: Pt[]): string {
  const n = pts.length;
  if (n < 2) return "";
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, n - 1)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d;
}

/** Nested topographic contour rings around a summit. */
export function contourSet(
  cx: number,
  cy: number,
  r: number,
  levels: number,
  seed: number,
  points = 18,
): string[] {
  const rand = rng(seed);
  const base = Array.from({ length: points }, () => 0.62 + rand() * 0.76);
  const wobble = Array.from({ length: points }, () => (rand() - 0.5) * 0.08);
  const out: string[] = [];
  for (let l = 1; l <= levels; l++) {
    const f = l / levels;
    const pts: Pt[] = base.map((b, i) => {
      const a = (i / points) * Math.PI * 2;
      const rr = r * f * (1 + (b - 1) * (0.25 + 0.75 * f)) * (1 + wobble[i] * f);
      return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
    });
    out.push(smoothClosed(pts));
  }
  return out;
}

/** Large irregular land mass. */
export function landMass(
  cx: number,
  cy: number,
  r: number,
  seed: number,
  points = 26,
  jitter = 0.4,
): string {
  const rand = rng(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (1 - jitter / 2 + rand() * jitter);
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.85]);
  }
  return smoothClosed(pts);
}

/** Wobbly river between two points. */
export function river(from: Pt, to: Pt, seed: number, segs = 12, amp = 0.12): string {
  const rand = rng(seed);
  const pts: Pt[] = [];
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const off = (rand() - 0.5) * len * amp * Math.sin(t * Math.PI);
    pts.push([from[0] + dx * t + nx * off, from[1] + dy * t + ny * off]);
  }
  return smoothOpen(pts);
}

/** Scattered settlement points. */
export function settlements(
  w: number,
  h: number,
  n: number,
  seed: number,
): { x: number; y: number; r: number }[] {
  const rand = rng(seed);
  const r2 = (v: number) => Math.round(v * 100) / 100;
  return Array.from({ length: n }, () => ({
    x: r2(w * 0.06 + rand() * w * 0.88),
    y: r2(h * 0.06 + rand() * h * 0.88),
    r: r2(1 + rand() * 2.4),
  }));
}

/** Graticule lines as an array of {x1,y1,x2,y2}. */
export function graticule(w: number, h: number, step: number) {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let x = 0; x <= w; x += step) lines.push({ x1: x, y1: 0, x2: x, y2: h });
  for (let y = 0; y <= h; y += step) lines.push({ x1: 0, y1: y, x2: w, y2: y });
  return lines;
}

/** Torn-paper polygon for CSS clip-path, in percentages. */
export function tornPolygon(seed: number, steps = 22, amp = 1.6): string {
  const rand = rng(seed);
  const pts: string[] = [];
  const j = () => (rand() - 0.5) * amp * 2;
  for (let i = 0; i <= steps; i++) pts.push(`${(i / steps) * 100}% ${Math.max(0, j())}%`);
  for (let i = 1; i <= steps; i++) pts.push(`${Math.min(100, 100 + j())}% ${(i / steps) * 100}%`);
  for (let i = steps - 1; i >= 0; i--) pts.push(`${(i / steps) * 100}% ${Math.min(100, 100 + j())}%`);
  for (let i = steps - 1; i > 0; i--) pts.push(`${Math.max(0, j())}% ${(i / steps) * 100}%`);
  return `polygon(${pts.join(", ")})`;
}

/** Format a coordinate as a cartographic string. */
export function fmtCoord(lat: number, lon: number): { lat: string; lon: string } {
  const la = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`;
  const lo = `${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;
  return { lat: la, lon: lo };
}
