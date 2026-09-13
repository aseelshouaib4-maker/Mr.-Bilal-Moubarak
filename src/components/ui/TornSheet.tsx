import type { CSSProperties, ReactNode } from "react";
import { tornPolygon } from "@/lib/mapgen";

type Props = {
  seed: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  tone?: "light" | "paper" | "deep";
};

const TONES = {
  light: "bg-parchment-light",
  paper: "bg-parchment",
  deep: "bg-parchment-deep",
};

/** A sheet of paper with a deterministic torn edge. */
export default function TornSheet({ seed, className = "", style, children, tone = "light" }: Props) {
  return (
    <div
      className={`${TONES[tone]} ${className}`}
      style={{ clipPath: tornPolygon(seed), ...style }}
    >
      {children}
    </div>
  );
}
