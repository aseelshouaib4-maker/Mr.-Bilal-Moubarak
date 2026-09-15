"use client";

import { Fragment, useRef, type ReactNode } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Bits";
import SiteShell from "@/components/site/SiteShell";
import PageHeader from "@/components/site/PageHeader";
import Contact from "@/components/sections/Contact";
import SocialIcon, { socialLinkProps } from "@/components/ui/SocialIcon";
import { useReveals } from "@/components/site/useReveals";
import { COORDS, EMAIL, PHONE, SOCIAL } from "@/lib/site";

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

const ICON = {
  email: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" strokeLinejoin="round" />
    </>
  ),
  phone: (
    <path
      d="M6.6 3.5h2.6l1.4 4.1-1.9 1.3a11 11 0 0 0 6.4 6.4l1.3-1.9 4.1 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"
      strokeLinejoin="round"
    />
  ),
  visit: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
};

function ChannelCard({ icon, label, children, note }: { icon: ReactNode; label: string; children: ReactNode; note: string }) {
  return (
    <div className="sheet sheet-hover flex h-full flex-col p-6">
      <span className="info-tile" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
          {icon}
        </svg>
      </span>
      <p className="eyebrow mt-6 text-umber-light">{label}</p>
      <div className="mt-0.5 text-[1.02rem] text-navy-900">{children}</div>
      <p className="mt-auto pt-4 text-[0.85rem] text-ink/60">{note}</p>
    </div>
  );
}

/** Header, direct lines. Each block runs its own reveals; the enquiry sheet runs its own too. */
function Intro() {
  const { t } = useLang();
  const c = t.pages.contact;
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);

  return (
    <div ref={root}>
      <PageHeader
        eyebrow={c.eyebrow}
        title={c.title}
        body={c.body}
      />

      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 pt-14 md:px-10 md:pt-20">
          <Eyebrow className="text-navy-700">{c.channelsLabel}</Eyebrow>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            <li>
              <ChannelCard icon={ICON.email} label={c.channels.email.k} note={c.channels.email.d}>
                <a href={`mailto:${EMAIL}`} className="inline-block break-all py-2.5 underline decoration-navy-900/20 underline-offset-4 hover:decoration-gold" dir="ltr">
                  {EMAIL}
                </a>
              </ChannelCard>
            </li>
            <li>
              <ChannelCard icon={ICON.phone} label={c.channels.phone.k} note={c.channels.phone.d}>
                <a href={PHONE.href} className="inline-block py-2.5 tabular-nums underline decoration-navy-900/20 underline-offset-4 hover:decoration-gold" dir="ltr">
                  {PHONE.display}
                </a>
              </ChannelCard>
            </li>
            <li>
              <ChannelCard icon={ICON.visit} label={c.channels.visit.k} note={c.channels.visit.d}>
                {c.channels.visit.v}
                <span className="eyebrow mt-1 block !text-[0.68rem] tabular-nums text-umber-light" dir="ltr">
                  {COORDS}
                </span>
              </ChannelCard>
            </li>
            <li>
              <div className="sheet sheet-hover flex h-full flex-col p-6">
                <ul className="flex gap-2">
                  {SOCIAL.map((s) => (
                    <li key={s.name}>
                      <a href={s.href} aria-label={s.name} title={s.name} className="info-tile" {...socialLinkProps(s.href)}>
                        <SocialIcon name={s.name} />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-6 text-umber-light">{c.channels.follow.k}</p>
                <p className="mt-2 text-[1.02rem] text-navy-900">Instagram · Facebook · LinkedIn</p>
                <p className="mt-auto pt-4 text-[0.85rem] text-ink/60">{c.channels.follow.d}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/** How to brief the studio, what follows, and the common questions. */
function Guidance() {
  const { t } = useLang();
  const c = t.pages.contact;
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);

  return (
    <div ref={root}>
      {/* The brief, in five points. */}
      <section data-nav-theme="light" className="bg-parchment-light">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow className="text-navy-700">{c.briefLabel}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.12] text-navy-900" data-split>
              <Lines lines={c.briefTitle} />
            </h2>
            <p className="mt-5 max-w-[26rem] text-[1rem] leading-relaxed text-ink/70" data-reveal="0.1">
              {c.briefBody}
            </p>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7" data-stagger>
            {c.brief.map((item, i) => (
              <li key={i} className="grid grid-cols-[2.75rem_1fr] items-baseline gap-4 border-t border-navy-900/10 py-5 last:border-b">
                <span className="font-display text-[1.3rem] leading-none text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[1.2rem] leading-tight text-navy-900">{item.k}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/70">{item.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What follows an enquiry. */}
      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-20 md:px-10 md:py-24">
          <Eyebrow className="text-navy-700">{c.nextLabel}</Eyebrow>
          <ol className="mt-10 grid gap-4 md:grid-cols-3" data-stagger>
            {c.next.map((step, i) => (
              <li key={i} className="sheet relative overflow-hidden p-7">
                <span className="font-display text-[1.6rem] leading-none text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-5 text-[1.3rem] leading-snug text-navy-900">{step.t}</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-ink/70">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Common questions. */}
      <section data-nav-theme="light" className="bg-paper">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 pb-24 md:px-10 md:pb-32 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow className="text-navy-700">{c.faqLabel}</Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.12] text-navy-900" data-split>
              <Lines lines={c.faqTitle} />
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6" data-reveal="0.1">
            {c.faq.map((item, i) => (
              <details key={i} className="faq group border-t border-navy-900/10 last:border-b" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.05rem] text-navy-900">
                  <span className="font-display text-[1.2rem] leading-snug">{item.q}</span>
                  <span className="faq-mark" aria-hidden="true" />
                </summary>
                <p className="max-w-[40rem] pb-6 text-[0.97rem] leading-relaxed text-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <SiteShell>
      <Intro />
      <Contact heading={false} extended details={false} />
      <Guidance />
    </SiteShell>
  );
}
