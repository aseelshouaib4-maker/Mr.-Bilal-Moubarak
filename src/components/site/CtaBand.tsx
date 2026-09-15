"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { ROUTES } from "@/lib/site";

/** The closing invitation on inner pages, on the section slate. */
export default function CtaBand() {
  const { t } = useLang();
  const c = t.pages.common;

  return (
    <section data-nav-theme="dark" className="on-dark bg-slate text-parchment-light">
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-5 py-14 md:px-10 md:py-24 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3 text-gold" data-reveal>
            <span className="inline-block h-px w-6 bg-current opacity-70" />
            {c.ctaEyebrow}
          </p>
          <h2 className="font-display mt-5 text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.08]" data-split>
            {c.ctaTitle.map((line, i) => (
              <Fragment key={i}>
                {line}
                {i < c.ctaTitle.length - 1 && <br />}
              </Fragment>
            ))}
          </h2>
        </div>
        <div className="lg:col-span-5" data-reveal="0.12">
          <p className="max-w-[26rem] text-[1rem] leading-relaxed text-mist">{c.ctaBody}</p>
          <Link href={ROUTES.contact} className="btn btn-ghost mt-7">
            {c.ctaButton}
            <span className="btn-dot" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
