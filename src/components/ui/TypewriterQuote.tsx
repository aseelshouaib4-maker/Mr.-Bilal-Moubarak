"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useMotionReady } from "@/components/MotionReady";

type Props = {
  text: string;
  author: string;
  /** Arabic is written word by word: splitting it into letters breaks the joins. */
  byWord?: boolean;
  /** Centre the attribution under a centred quote. */
  centered?: boolean;
  className?: string;
};

/** Time between characters, and the extra breath taken at punctuation. */
const EACH = 0.034;
const PAUSE = { ",": 0.22, ".": 0.38, "،": 0.22 } as Record<string, number>;

/**
 * A quotation written out as if by hand, the first time it comes into view.
 * Each character settles in with a soft fade rather than popping on, a fine
 * gold caret travels just ahead of the pen, lingers for a few slow blinks
 * once the line is finished, and fades. The attribution follows.
 */
export default function TypewriterQuote({ text, author, byWord = false, centered = false, className = "" }: Props) {
  const ready = useMotionReady();
  const root = useRef<HTMLQuoteElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const by = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current || !line.current || !caret.current) return;
      if (prefersReducedMotion()) return;

      const split = new SplitText(line.current, { type: byWord ? "words" : "words,chars" });
      const units = (byWord ? split.words : split.chars) as HTMLElement[];
      const pen = caret.current;

      gsap.set(units, { opacity: 0 });
      gsap.set(by.current, { autoAlpha: 0, y: 8 });
      gsap.set(pen, { autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true });
      let t = 0.15;
      tl.set(pen, { autoAlpha: 1 }, 0);
      units.forEach((u) => {
        // Move the caret to just after this character as it is written.
        tl.call(() => u.after(pen), undefined, t);
        tl.to(u, { opacity: 1, duration: 0.28, ease: "power1.out" }, t);
        const last = u.textContent?.slice(-1) ?? "";
        t += (byWord ? EACH * 5 : EACH) + (PAUSE[last] ?? 0);
      });
      tl.call(() => pen.classList.add("is-done"), undefined, t + 0.1);
      tl.to(by.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, t + 0.35);

      // Start when the quote is genuinely on screen. Deliberately not a
      // ScrollTrigger start position: those are measured up front, and the
      // pinned sections above this one keep changing height as fonts and
      // images settle, so a stored position fires early and the line gets
      // written while it is still far below the fold. An observer reads the
      // real layout at the moment it matters.
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            tl.play();
          }
        },
        // The quote's top third has to clear the lower 30% of the viewport.
        { rootMargin: "0px 0px -30% 0px", threshold: 0.35 },
      );
      io.observe(line.current);

      return () => {
        io.disconnect();
        // Put the caret back where React rendered it before the split text is torn down.
        line.current?.after(pen);
        split.revert();
      };
    },
    { scope: root, dependencies: [ready, text, byWord] },
  );

  return (
    <blockquote ref={root} className={className}>
      <p ref={line} className="font-display text-[clamp(1.45rem,2.7vw,2.35rem)] leading-[1.4]">
        {text}
      </p>
      {/* Lives outside the text until the timeline moves it in, so SplitText never splits it. */}
      <span ref={caret} className="type-caret invisible opacity-0" aria-hidden="true" />
      <footer ref={by} className={`mt-6 flex items-center gap-3 text-mist ${centered ? "justify-center" : ""}`}>
        <span className="inline-block h-px w-8 bg-gold opacity-80" />
        <span className="text-[0.9rem]">{author}</span>
      </footer>
    </blockquote>
  );
}
