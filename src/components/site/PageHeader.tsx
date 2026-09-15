"use client";

import { Fragment, type ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string[];
  body: string;
  children?: ReactNode;
};

/**
 * The opening of an inner page, set like the title block of a map sheet:
 * a large serif title and a short introduction, closed by a ruled line with ticks.
 */
export default function PageHeader({ eyebrow, title, body, children }: Props) {
  return (
    <header data-nav-theme="light" className="relative bg-paper">
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-12 pt-28 sm:pt-32 md:px-10 md:pb-20 md:pt-44">
        <div className="max-w-[60rem]">
          <p className="eyebrow flex items-center gap-3 text-navy-700" data-reveal>
            <span className="h-px w-6 shrink-0 bg-gold" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4.6rem)] leading-[1.06] text-navy-900 md:mt-6" data-split>
            {title.map((line, i) => (
              <Fragment key={i}>
                {line}
                {/* Line breaks are for wide screens; phones let the title wrap naturally. */}
                {i < title.length - 1 && (
                  <>
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                  </>
                )}
              </Fragment>
            ))}
          </h1>
          <p className="mt-5 max-w-[38rem] text-[1rem] leading-relaxed text-ink/70 md:mt-6 md:text-[1.08rem]" data-reveal="0.12">
            {body}
          </p>
          {children}
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10" aria-hidden="true">
        <div className="rule-ticks text-navy-900/60" />
      </div>
    </header>
  );
}
