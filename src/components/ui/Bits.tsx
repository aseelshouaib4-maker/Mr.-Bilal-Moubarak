import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 rtl:-scale-x-100 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display inline-flex h-10 w-10 items-center justify-center border border-current text-[0.95rem] leading-none tracking-tight ${className}`}
      aria-hidden="true"
    >
      BM
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`kicker ${className}`} data-reveal>
      {children}
    </p>
  );
}

export function Tape({ className = "" }: { className?: string }) {
  return <span className={`tape ${className}`} aria-hidden="true" />;
}

/** Circular rubber-stamp text ring. */
export function Stamp({ text, className = "" }: { text: string; className?: string }) {
  // Arabic must not be letter-spaced (it breaks joined forms) and must be laid
  // out along the path left-to-right, or an RTL page renders nothing at all.
  const isArabic = /[؀-ۿ]/.test(text);
  const id = `stamp-path-${text.length}`;
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <defs>
        <path id={id} d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" />
      </defs>
      <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        fontSize={isArabic ? 12 : 11.5}
        letterSpacing={isArabic ? 0 : 2.5}
        fill="currentColor"
        fontFamily="var(--font-fustat), system-ui, sans-serif"
        fontWeight="500"
        style={{ direction: "ltr" }}
      >
        <textPath href={`#${id}`} startOffset="4%">
          {isArabic ? text : text.toUpperCase()}
        </textPath>
      </text>
      <path d="M80 56 L84 76 L104 80 L84 84 L80 104 L76 84 L56 80 L76 76 Z" fill="currentColor" />
    </svg>
  );
}
