type Props = { className?: string; letters?: boolean };

/** Sixteen-point compass rose drawn in currentColor. */
export default function CompassRose({ className, letters = true }: Props) {
  const pts = (r1: number, r2: number, n: number, offset = 0) => {
    const out: string[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + offset;
      const b = a + Math.PI / n;
      out.push(`M0 0 L${(Math.cos(a) * r1).toFixed(2)} ${(Math.sin(a) * r1).toFixed(2)} L${(Math.cos(b) * r2).toFixed(2)} ${(Math.sin(b) * r2).toFixed(2)} Z`);
    }
    return out.join(" ");
  };
  return (
    <svg viewBox="-110 -110 220 220" className={className} aria-hidden="true">
      <circle r="100" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <circle r="86" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" strokeDasharray="1 3" />
      <circle r="18" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <g opacity="0.9">
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i / 72) * Math.PI * 2;
          const len = i % 9 === 0 ? 10 : i % 3 === 0 ? 6 : 3;
          const f = (n: number) => n.toFixed(2);
          return (
            <line
              key={i}
              x1={f(Math.cos(a) * 100)}
              y1={f(Math.sin(a) * 100)}
              x2={f(Math.cos(a) * (100 - len))}
              y2={f(Math.sin(a) * (100 - len))}
              stroke="currentColor"
              strokeWidth="0.7"
            />
          );
        })}
      </g>
      <path d={pts(52, 12, 8, Math.PI / 8)} fill="currentColor" opacity="0.45" />
      <path d={pts(80, 14, 4, -Math.PI / 2)} fill="currentColor" />
      <path d={pts(80, 14, 4, -Math.PI / 2 + Math.PI / 4)} fill="none" stroke="currentColor" strokeWidth="0.8" transform="scale(0.72)" />
      {letters && (
        <g fill="currentColor" fontSize="13" fontFamily="var(--font-instrument), serif" textAnchor="middle">
          <text y="-88">N</text>
          <text x="92" y="5">E</text>
          <text y="97">S</text>
          <text x="-92" y="5">W</text>
        </g>
      )}
    </svg>
  );
}
