# Bilal Moubarak Cartography Studio — landing page

Next.js 16 + TypeScript + Tailwind v4 + GSAP (ScrollTrigger, SplitText) + Lenis.
Bilingual English / Arabic with a live RTL toggle.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Concept

The whole page is one continuous map sheet. A fixed procedural SVG map
(`src/components/map/MapCanvas.tsx`) sits behind every section. Each section
declares a `data-map` JSON state (`x`, `y`, `s`, `theme`, `lat`, `lon`); as the
visitor scrolls, the camera pans and zooms to that state, the sheet turns from
parchment to navy and back, and the coordinate readout in the corner ticks over.

Section devices, in order:

| Section | File | Device |
|---|---|---|
| Hero → Statement | `sections/HeroStage.tsx` | Supplied map-collage artwork (`src/assets/hero-maps.png`) on a `#fcfaf2` sheet, mirrored under RTL. The magnifier (`src/assets/magnifier.png`) is clear glass at rest. On scroll one value, the magnifier's scale, drives both the glass and a `clip-path: circle()` cut through the navy statement layer, so the rim frames the next page as it opens and can never drift off the lens edge. The magnifier fades before the page is fully open. Lens geometry is measured in `GLASS`; `LOUPE_BASE` is the rest radius. |
| Services | `sections/Services.tsx` | Blank `#fcfaf2` sheet with a fine survey grid (`map/SheetBackdrop.tsx`). Six field-note sheets sit square and drop in one by one (≥1280px pins); each leans a little under the cursor, alternating sides. Line icons per service live in `ui/ServiceIcon.tsx`. |
| Selected work | `sections/Work.tsx` | Pinned horizontal strip of clean project cards (map preview, coordinate chip, kind · year, title, role, case-study link); the background map pans in the same direction at reduced opacity (≥1024px). |
| Method | `sections/Process.tsx` | Seven stages on one boundary line. The line is routed through the stage markers with a little lateral wander and dashed like a political border; a solid line inks over it on scroll, and each marker pulses while its stage is on the reading line. |
| Experience | `sections/Experience.tsx` | One plain navy sheet: the 34-year CountUp, organisations as magnetic pills (`ui/Magnet.tsx`, React Bits port) and five qualities as spotlight tiles (`ui/SpotlightCard.tsx`, React Bits port) that reveal a line under the cursor. |
| Contact | `sections/Contact.tsx` | Three parchment panels fold away (rotateX) to reveal the navy contact sheet: three required fields with sending → sent feedback, the address as a display-size link, and a one-row footer. |

The 34-year figure in the Experience section uses the React Bits "CountUp"
component (`components/ui/CountUp.tsx`, from https://reactbits.dev), ported to
TypeScript and driven by the `motion` spring. One change from the published
source is noted in the file header: the span is server-rendered with the target
value instead of empty, so the figure survives with JavaScript disabled.

All motion respects `prefers-reduced-motion` (scenes render in their final
state). Under that setting the lens never opens, so `globals.css` unclips the
statement layer and hides the magnifier — otherwise the statement would stay
trapped inside a 150px circle.
Below the breakpoints listed above, sections fall back to simple reveals.

## Type and colour

- Instrument Serif (400, no italics anywhere) for headings via `.font-display`.
- Fustat for everything else. Arabic headings fall back to Fustat 600 because
  Instrument Serif has no Arabic glyphs (`globals.css`, `html[lang="ar"]`).
- Palette from the mood board: navy `#0F2E4D` / `#274C77`, mist `#B7C6DB`,
  parchment `#E8DDC6`, umber `#6D5B49`. Tokens live in `globals.css` `@theme`.

## Content

All copy is in `src/lib/i18n/dictionary.ts` (`en` and `ar`). It is placeholder
text drafted from the client Q&A document; replace it there. Toggling language
remounts the sections so headings re-split and ScrollTriggers rebuild.

## Placeholders still to replace

- **Map imagery**: the hero uses the client-supplied artwork. Everything else is
  drawn procedurally by `src/lib/mapgen.ts` and `ProceduralMap.tsx`. Swap the
  `<ProceduralMap>` in `Work.tsx` and `Services.tsx` for `next/image` scans when
  the client supplies them.
- **Project titles, roles and years** in `dictionary.ts › work.items` are taken
  from the old demo and must be confirmed with the client.
- **Contact form** has no backend; `Contact.tsx › onSubmit` only shows the
  thank-you line. Wire it to an API route or a form service.
- **Email / location** in `Contact.tsx` (`EMAIL` const) are from the old demo.
- **Unused copy key**: `dictionary.ts › hero.eyebrow` is no longer rendered
  (the hero kicker was removed). Delete it or restore the line if wanted.
- **Studio name**: the code uses "Bilal Moubarak Cartography Studio" as written
  in the client's document. Change `meta.studio` in the dictionary if the brand
  is finalised as "Mbarak".
