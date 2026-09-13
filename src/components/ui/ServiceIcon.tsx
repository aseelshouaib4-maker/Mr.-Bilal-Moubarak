/**
 * Six line icons on a 24px grid, one per service, drawn to match the sheet:
 * single-weight stroke, rounded joins, navy via currentColor. Decorative,
 * so every one is hidden from assistive tech; the card title carries meaning.
 */
const ICONS = [
  // Atlas: an open book
  <>
    <path d="M3 5.5c3-1.2 6-1.2 9 0 3-1.2 6-1.2 9 0v13c-3-1.2-6-1.2-9 0-3-1.2-6-1.2-9 0z" />
    <path d="M12 5.5v13" />
    <path d="M6 9.5h3M15 9.5h3M6 12.5h3M15 12.5h3" />
  </>,
  // Education: mortarboard
  <>
    <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
    <path d="M6.5 11.3V16c1.8 1.6 3.6 2.3 5.5 2.3s3.7-.7 5.5-2.3v-4.7" />
    <path d="M21.5 9v5" />
  </>,
  // Thematic: data bars over a baseline
  <>
    <path d="M4 19.5h16" />
    <path d="M7 19.5v-6M11 19.5V8.5M15 19.5v-9M19 19.5v-13" />
  </>,
  // Tourism: place marker
  <>
    <path d="M12 21s-6.2-5.4-6.2-10.2a6.2 6.2 0 0 1 12.4 0C18.2 15.6 12 21 12 21z" />
    <circle cx="12" cy="10.8" r="2.3" />
  </>,
  // Custom: compass with a needle
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.4 8.6-2.1 5-5 2.1 2.1-5z" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2" />
  </>,
  // GIS: stacked layers
  <>
    <path d="m12 4.5 8 4.4-8 4.4-8-4.4z" />
    <path d="m4 13 8 4.4L20 13" />
    <path d="m4 17 8 4.4L20 17" />
  </>,
];

export default function ServiceIcon({ index, className = "" }: { index: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[index % ICONS.length]}
    </svg>
  );
}
