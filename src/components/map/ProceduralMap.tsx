import {
  contourSet,
  graticule,
  landMass,
  river,
  rng,
  settlements,
} from "@/lib/mapgen";

export type MapVariant = "relief" | "thematic" | "tourism" | "political" | "physical" | "reference";

type Props = {
  seed: number;
  variant?: MapVariant;
  className?: string;
  /** Aspect ratio as width/height of the drawing box. */
  w?: number;
  h?: number;
  /** Extra zoom for loupe-style uses. */
  zoom?: number;
  decorative?: boolean;
  title?: string;
};

const C = {
  navy900: "#0f2e4d",
  navy700: "#274c77",
  navy500: "#3f6a99",
  mist: "#b7c6db",
  mistLight: "#d6e0ec",
  parchment: "#e8ddc6",
  parchmentLight: "#f4eee2",
  parchmentDeep: "#d9caa9",
  umber: "#6d5b49",
  umberLight: "#9a8468",
};

/**
 * A seeded, server-renderable SVG "map". Not real geography: a placeholder
 * that reads as a professional sheet until the client's scans are dropped in.
 */
export default function ProceduralMap({
  seed,
  variant = "relief",
  className,
  w = 400,
  h = 300,
  zoom = 1,
  decorative = true,
  title,
}: Props) {
  const rand = rng(seed);
  const id = `pm${seed}`;
  const land = landMass(w * (0.35 + rand() * 0.3), h * (0.4 + rand() * 0.2), Math.min(w, h) * 0.62, seed + 1, 28, 0.5);
  const island = landMass(w * (0.15 + rand() * 0.7), h * (0.15 + rand() * 0.7), Math.min(w, h) * 0.12, seed + 7, 12, 0.6);
  const peaks = Array.from({ length: 3 }, (_, i) =>
    contourSet(w * (0.25 + rand() * 0.5), h * (0.3 + rand() * 0.45), Math.min(w, h) * (0.14 + rand() * 0.14), 6, seed + 11 + i),
  );
  const rivers = Array.from({ length: 2 }, (_, i) =>
    river([w * (0.2 + rand() * 0.3), h * rand() * 0.3], [w * (0.5 + rand() * 0.4), h * (0.7 + rand() * 0.3)], seed + 31 + i, 14, 0.18),
  );
  const towns = settlements(w, h, variant === "tourism" ? 26 : 16, seed + 51);
  const grid = graticule(w, h, Math.round(w / 6));
  const sea = variant === "thematic" ? C.parchmentLight : C.mist;
  const landFill =
    variant === "political" ? C.parchmentDeep : variant === "thematic" ? C.parchmentLight : C.parchment;

  const vb = zoom === 1 ? `0 0 ${w} ${h}` : `${(w - w / zoom) / 2} ${(h - h / zoom) / 2} ${w / zoom} ${h / zoom}`;

  return (
    <svg
      viewBox={vb}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      <defs>
        <clipPath id={`${id}-land`}>
          <path d={land} />
        </clipPath>
        <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={C.navy700} strokeWidth="0.8" opacity="0.5" />
        </pattern>
      </defs>

      <rect width={w} height={h} fill={sea} />

      {/* Sea shading: bathymetric rings around the coast */}
      <path d={land} fill="none" stroke={C.navy500} strokeWidth="6" opacity="0.14" />
      <path d={land} fill="none" stroke={C.navy500} strokeWidth="14" opacity="0.07" />

      <path d={land} fill={landFill} stroke={C.navy700} strokeWidth="0.9" />
      <path d={island} fill={landFill} stroke={C.navy700} strokeWidth="0.8" />

      {/* Terrain */}
      <g clipPath={`url(#${id}-land)`}>
        {peaks.map((set, pi) =>
          set.map((d, li) =>
            variant === "thematic" ? (
              <path key={`${pi}-${li}`} d={d} fill={C.navy700} opacity={0.06 + li * 0.07} stroke="none" />
            ) : (
              <path
                key={`${pi}-${li}`}
                d={d}
                fill={variant === "physical" && li > 3 ? C.umberLight : "none"}
                fillOpacity={0.25}
                stroke={C.umber}
                strokeWidth={li % 2 === 0 ? 0.7 : 0.4}
                opacity={0.75}
              />
            ),
          ),
        )}
        {variant === "political" && (
          <path d={peaks[1][5]} fill={C.mistLight} stroke={C.navy700} strokeWidth="0.7" strokeDasharray="3 2" />
        )}
        {variant === "reference" && <path d={peaks[0][5]} fill={`url(#${id}-hatch)`} stroke="none" />}
        {rivers.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={C.navy500} strokeWidth="1.1" opacity="0.9" />
        ))}
      </g>

      {/* Graticule */}
      <g stroke={C.navy900} strokeWidth="0.4" opacity="0.28">
        {grid.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>

      {/* Settlements and label stubs */}
      <g clipPath={`url(#${id}-land)`}>
        {towns.map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={t.y} r={t.r} fill={C.navy900} />
            {variant === "tourism" && <circle cx={t.x} cy={t.y} r={(t.r + 3).toFixed(2)} fill="none" stroke={C.umber} strokeWidth="0.6" />}
            <rect x={(t.x + t.r + 2).toFixed(2)} y={(t.y - 1.2).toFixed(2)} width={(8 + t.r * 4).toFixed(2)} height="2" fill={C.umber} opacity="0.7" />
          </g>
        ))}
      </g>

      {/* Neatline and north arrow */}
      <rect x="4" y="4" width={w - 8} height={h - 8} fill="none" stroke={C.navy900} strokeWidth="1" opacity="0.7" />
      <rect x="8" y="8" width={w - 16} height={h - 16} fill="none" stroke={C.navy900} strokeWidth="0.4" opacity="0.5" />
      <g transform={`translate(${w - 26} 30)`} fill={C.navy900}>
        <path d="M0 -12 L4 4 L0 1 L-4 4 Z" />
        <circle r="12" fill="none" stroke={C.navy900} strokeWidth="0.5" />
      </g>
      {/* Scale bar */}
      <g transform={`translate(16 ${h - 18})`}>
        <rect width="40" height="3" fill={C.navy900} />
        <rect x="40" width="40" height="3" fill="none" stroke={C.navy900} strokeWidth="0.6" />
      </g>
    </svg>
  );
}
