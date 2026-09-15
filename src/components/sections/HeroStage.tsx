"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import Image from "next/image";
import CountUp from "@/components/ui/CountUp";
import heroMaps from "@/assets/hero-maps.png";
import magnifier from "@/assets/magnifier.png";

/** Where the full hero composition runs: wide, landscape screens. Mirrors the `wide` variant in globals.css. */
const WIDE_QUERY = "(min-width: 1024px) and (orientation: landscape)";

/**
 * Measured from magnifier.png (2000x2000): the glass circle is centred at
 * (1006, 628) with a radius of 352px. These map that circle onto the lens box.
 */
const LOUPE_BASE = 150; // lens radius, in px
const LOUPE_MOBILE = 64; // lens radius on the smaller mobile collage
const MY = "48%"; // lens centre height on the mobile collage
const GLASS = (() => {
  const IMG = 2000, CX = 1006, CY = 628, R = 352;
  const size = (IMG / (2 * R)) * 100;
  return {
    size,
    left: 50 - (CX / IMG) * size,
    top: 50 - (CY / IMG) * size,
    originX: (CX / IMG) * 100,
    originY: (CY / IMG) * 100,
  };
})();

/** How far the sheet is enlarged under the glass at full zoom. */
const MAG_MAX = 2.1;

/**
 * The opening sheet: the studio's line on the left, the table of maps with
 * the magnifier resting on it on the right.
 *
 * On desktop the stage pins and one scroll drives the lens: it grows about its
 * own centre while the maps under the glass enlarge, then clean paper opens
 * through it until the frame is covered. The magnifier leaves before the page
 * is fully open, and Services rises straight on from the same paper.
 */
export default function HeroStage() {
  const { t, dir } = useLang();
  const ready = useMotionReady();
  const stage = useRef<HTMLElement>(null);
  const cx = dir === "rtl" ? 30 : 70;
  const cy = 56;
  // Lens centre on the mobile collage, over the blue sheet.
  const mx = dir === "rtl" ? "40%" : "60%";

  useGSAP(
    () => {
      if (!ready || !stage.current) return;
      const q = gsap.utils.selector(stage);
      if (prefersReducedMotion()) return;

      const split = new SplitText(q("[data-hero-title]"), { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.15)
        .from(q("[data-hero-item]"), { autoAlpha: 0, y: 24, duration: 1, stagger: 0.1 }, 0.55)
        .from(q("[data-hero-art]"), { autoAlpha: 0, y: 50, rotation: (i) => (i % 2 ? 5 : -4), duration: 1.4, stagger: 0.12 }, 0.35)
        .from(q(".loupe-ui"), { autoAlpha: 0, scale: 0.85, duration: 1.2 }, 0.9);

      const mm = gsap.matchMedia();
      // Wide landscape screens only: in portrait the collage would sit behind the text.
      mm.add(WIDE_QUERY, () => {
        // One object drives the glass: its scale sets the magnifier and the
        // radius of every circle clipped to it, so they can never separate.
        const lens = { s: 1, mag: 1 };
        const applyLens = () => {
          const el = stage.current;
          if (!el) return;
          el.style.setProperty("--loupe-s", `${lens.s}`);
          el.style.setProperty("--r", `${LOUPE_BASE * lens.s}px`);
          el.style.setProperty("--mag", `${lens.mag}`);
        };
        applyLens();
        const coverScale = () => (Math.hypot(window.innerWidth, window.innerHeight) * 1.02) / LOUPE_BASE;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: stage.current,
              start: "top top",
              // The reveal takes the first ~60vh; the last 100vh of the pin is
              // plain paper, which Services scrolls up onto (it overlaps the
              // stage by one viewport, see .services-overlap).
              end: "+=162%",
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          // No element here is also animated by the intro. ScrollTrigger renders
          // this timeline through while laying out the pin, so a tween records
          // its start value early; on an element the intro is still fading in,
          // that start value is "hidden" and the element never comes back.
          // Hence the sheet fades on its own wrapper (.hero-art-fade), not on
          // [data-hero-art], which the intro owns.
          .to(q(".hero-copy"), { y: -60, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.02)
          // the enlarged copy of the sheet takes over inside the glass...
          .to(q(".lens-zoom"), { autoAlpha: 1, duration: 0.06, ease: "none" }, 0.02)
          .to(lens, { mag: MAG_MAX, duration: 0.3, ease: "power2.out", onUpdate: applyLens }, 0.03)
          // ...while the glass grows until it is larger than the frame
          .to(lens, { s: coverScale, duration: 0.7, ease: "power2.inOut", onUpdate: applyLens }, 0.02)
          // then clean paper opens through the magnified maps
          .to(q(".lens-paper"), { autoAlpha: 1, duration: 0.26, ease: "power1.inOut" }, 0.26)
          // the sheet is covered by then; the magnifier leaves before the
          // page is fully open, so it never sits on top of it
          .to(q(".hero-art-fade"), { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.42)
          .to(q(".loupe-img"), { autoAlpha: 0, duration: 0.17, ease: "power2.in" }, 0.45)
          // Hold on paper for the rest of the pin. Sized so Services starts
          // rising (0.62vh in) just as the magnifier finishes leaving.
          .to({}, { duration: 0.85 });

        // Cursor parallax on the paper composition.
        const setters = q<HTMLElement>("[data-depth]").map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }),
          d: Number(el.dataset.depth),
        }));
        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * 40 * s.d);
            s.y(ny * 30 * s.d);
          });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      });

      // Portrait and small screens: the same story on the cropped collage.
      mm.add(`not all and ${WIDE_QUERY}`, () => {
        const el = stage.current!;
        const lens = { s: 1, mag: 1 };
        const applyLens = () => {
          el.style.setProperty("--loupe-s", `${lens.s}`);
          el.style.setProperty("--mr", `${LOUPE_MOBILE * lens.s}px`);
          el.style.setProperty("--mag", `${lens.mag}`);
        };
        applyLens();
        // Large enough for the circle to reach every corner of the stage.
        const coverScale = () => (Math.hypot(window.innerWidth, el.offsetHeight) * 1.05) / LOUPE_MOBILE;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              // Pin once the whole collage is on screen: at the top when the
              // hero fits the viewport, otherwise when its bottom arrives.
              start: () => (el.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
              end: "+=90%",
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(q(".hero-copy"), { y: -40, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.02)
          .to(q(".m-zoom"), { autoAlpha: 1, duration: 0.06, ease: "none" }, 0.02)
          .to(lens, { mag: MAG_MAX, duration: 0.3, ease: "power2.out", onUpdate: applyLens }, 0.03)
          .to(lens, { s: coverScale, duration: 0.7, ease: "power2.inOut", onUpdate: applyLens }, 0.02)
          .to(q(".m-paper"), { autoAlpha: 1, duration: 0.26, ease: "power1.inOut" }, 0.26)
          .to(q(".m-art"), { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.42)
          .to(q(".loupe-img"), { autoAlpha: 0, duration: 0.17, ease: "power2.in" }, 0.45)
          .to({}, { duration: 0.1 });

        // Services rises onto the opened paper instead of after a blank screen.
        // Set as a variable, not on Services' own style: a pin restores the
        // style attribute it saved when it reverts, which would wipe it.
        const root = document.documentElement;
        root.style.setProperty("--hero-overlap", `${Math.round(window.innerHeight * 0.35)}px`);

        return () => {
          root.style.removeProperty("--hero-overlap");
          el.style.setProperty("--loupe-s", "1");
          el.style.setProperty("--mr", `${LOUPE_MOBILE}px`);
          el.style.setProperty("--mag", "1");
        };
      });
    },
    { scope: stage, dependencies: [ready] },
  );

  const vars = {
    "--cx": `${cx}%`,
    "--cy": `${cy}%`,
    "--r": `${LOUPE_BASE}px`,
    "--loupe-s": "1",
    "--mag": "1",
    "--mr": `${LOUPE_MOBILE}px`,
  } as CSSProperties;

  /** The collage, rendered identically outside and (enlarged) inside the glass. */
  const collage = (
    <div className="absolute inset-0 rtl:-scale-x-100">
      <Image src={heroMaps} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "100% 100%" }} />
    </div>
  );
  const glassClip = "circle(var(--r) at var(--cx) var(--cy))";

  const mobileCollage = (
    <div className="absolute inset-0 rtl:-scale-x-100">
      <Image src={heroMaps} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "100% 50%" }} />
    </div>
  );

  /** The magnifier, its glass circle mapped onto the lens box it sits in. */
  const loupe = (
    <div
      className="loupe-img absolute"
      style={{
        width: `${GLASS.size}%`,
        height: `${GLASS.size}%`,
        left: `${GLASS.left}%`,
        top: `${GLASS.top}%`,
        transformOrigin: `${GLASS.originX}% ${GLASS.originY}%`,
        rotate: dir === "rtl" ? "45deg" : "-45deg",
        scale: "var(--loupe-s)",
      }}
    >
      <Image src={magnifier} alt="" fill sizes="(min-width: 1024px) 900px, 400px" style={{ objectFit: "contain" }} priority />
    </div>
  );

  return (
    <section ref={stage} id="hero" className="hero-stage relative overflow-hidden" style={vars}>
      <div className="relative flex items-center overflow-hidden wide:min-h-[100svh]">
        {/* The sheet of maps. Mirrored under RTL so the open area of the
            composition always falls behind the headline. */}
        <div className="hero-art-fade pointer-events-none absolute inset-0 hidden wide:block" aria-hidden="true">
          <div className="absolute inset-0 overflow-hidden" data-hero-art data-depth="0.25">
            {collage}
          </div>
        </div>

        {/* Nav legibility scrim. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 wide:block"
          aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, #fcfaf2 0%, rgba(252,250,242,0) 100%)" }}
        />

        <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-12 gap-8 px-5 pb-10 pt-28 md:px-10 md:pb-16 wide:pb-24">
          <div className="hero-copy col-span-12 wide:col-span-6">
            {/* Experience first, as one quiet line that counts itself in. */}
            <div className="flex items-center gap-3" data-hero-item>
              <p className="hero-stat-num flex items-start tabular-nums" dir="ltr">
                <CountUp to={34} from={0} duration={1.6} delay={0.9} />
                <span className="ms-0.5 text-[0.55em] leading-none text-gold">+</span>
              </p>
              <span className="h-6 w-px bg-navy-900/20" aria-hidden="true" />
              <p className="eyebrow whitespace-nowrap text-umber">{t.hero.badgeLabel}</p>
            </div>

            <h1 className="hero-title font-display mt-5 text-[clamp(1.9rem,3.5vw,3.3rem)] text-navy-900" data-hero-title>
              {t.hero.title.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < t.hero.title.length - 1 && <br />}
                </Fragment>
              ))}
            </h1>

            <div className="mt-8" data-hero-item>
              <a href="#work" className="btn btn-solid">
                {t.hero.primary}
                <span className="btn-dot" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Mobile: the same sheet cropped to the collage, with the magnifier
              on it. The same scroll story plays here: the glass enlarges the
              maps, grows, and opens onto clean paper. */}
          <div className="col-span-12 wide:hidden" data-hero-item>
            <div className="relative aspect-[5/4] w-full" aria-hidden="true">
              <div className="m-art absolute inset-0 overflow-hidden">{mobileCollage}</div>
              <div
                className="m-zoom pointer-events-none invisible absolute inset-0 overflow-hidden opacity-0"
                style={{ clipPath: `circle(var(--mr) at ${mx} ${MY})` }}
              >
                <div className="absolute inset-0" style={{ scale: "var(--mag)", transformOrigin: `${mx} ${MY}` }}>
                  {mobileCollage}
                </div>
              </div>
              {/* Oversized so the opening circle can cover the whole stage; the section clips it. */}
              <div
                className="m-paper pointer-events-none invisible absolute bg-paper opacity-0"
                style={{
                  left: mx,
                  top: MY,
                  width: "320vmax",
                  height: "320vmax",
                  translate: "-50% -50%",
                  clipPath: "circle(var(--mr) at 50% 50%)",
                }}
              />
              <div
                className="loupe-ui pointer-events-none absolute z-20"
                style={{
                  left: mx,
                  top: MY,
                  width: `${LOUPE_MOBILE * 2}px`,
                  height: `${LOUPE_MOBILE * 2}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {loupe}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Under the glass: the same sheet enlarged about the lens centre. It
          follows the cursor parallax like the sheet itself, so it stays in
          register with what lies outside the rim. */}
      <div
        className="lens-zoom pointer-events-none invisible absolute inset-0 hidden overflow-hidden opacity-0 wide:block"
        style={{ clipPath: glassClip }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ scale: "var(--mag)", transformOrigin: "var(--cx) var(--cy)" }}>
          <div className="absolute inset-0" data-depth="0.25">
            {collage}
          </div>
        </div>
      </div>

      {/* The clean page that opens through the glass and runs on into Services. */}
      <div
        className="lens-paper pointer-events-none invisible absolute inset-0 hidden bg-paper opacity-0 wide:block"
        style={{ clipPath: glassClip }}
        aria-hidden="true"
      />

      {/* The magnifier, above both so its rim frames them. Its glass circle is mapped onto the lens box. */}
      <div
        className="loupe-ui pointer-events-none absolute z-20 hidden wide:block"
        style={{
          left: "var(--cx)",
          top: "var(--cy)",
          width: `${LOUPE_BASE * 2}px`,
          height: `${LOUPE_BASE * 2}px`,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      >
        {loupe}
      </div>
    </section>
  );
}
