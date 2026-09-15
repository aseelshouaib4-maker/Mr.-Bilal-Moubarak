import type { SocialName } from "@/lib/site";

/** Outline marks drawn to match the other contact icons (24px grid, 1.4 stroke). */
export default function SocialIcon({ name, className = "h-[18px] w-[18px]" }: { name: SocialName; className?: string }) {
  const common = { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: 1.4, "aria-hidden": true } as const;
  if (name === "Instagram")
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "Facebook")
    return (
      <svg {...common}>
        <path d="M13.5 20.5v-7h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4a19 19 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5v7" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5v6M8 7.6v.1M11.5 16.5v-6M11.5 13.2c0-1.6 1-2.7 2.4-2.7s2.1.9 2.1 2.6v3.4" strokeLinecap="round" />
    </svg>
  );
}

/** Props that keep a placeholder "#" link from jumping the page. */
export function socialLinkProps(href: string) {
  return href === "#"
    ? { onClick: (e: { preventDefault: () => void }) => e.preventDefault() }
    : { target: "_blank", rel: "noopener noreferrer" };
}
