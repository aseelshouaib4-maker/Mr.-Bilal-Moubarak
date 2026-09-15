"use client";

import { Fragment, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Eyebrow } from "@/components/ui/Bits";
import SocialIcon, { socialLinkProps } from "@/components/ui/SocialIcon";
import { useReveals } from "@/components/site/useReveals";
import { COORDS, EMAIL, PHONE, SOCIAL } from "@/lib/site";
import contactMap from "@/assets/contact-map.png";

type Status = "idle" | "sending" | "sent";

type Props = {
  /** Show the invitation heading inside the card (off when the page has its own header). */
  heading?: boolean;
  /** Add organisation and project type to the form. */
  extended?: boolean;
  /** Show email, phone, location and profiles under the form. */
  details?: boolean;
};

/**
 * The enquiry sheet: a parchment card holding the form and the studio's
 * whereabouts, beside an old map of Europe that runs off the edge of the page.
 */
export default function Contact({ heading = true, extended = false, details = true }: Props) {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  useReveals(root);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // No backend yet: hold the sending state briefly so the feedback reads,
    // then confirm. Wire this to a route handler or form service.
    window.setTimeout(() => setStatus("sent"), 700);
  };

  const req = <span className="text-umber-light"> · {t.contact.required}</span>;
  const opt = <span className="text-umber-light"> · {t.pages.contact.optional}</span>;

  return (
    <section ref={root} id="contact" data-nav-theme="light" className="relative overflow-hidden bg-paper">
      {/* Wide screens: the map lies to the side of the card and bleeds off
          the page. Not mirrored in Arabic: a map must not be read backwards. */}
      <div
        className="pointer-events-none absolute -end-[16%] bottom-0 hidden w-[70%] max-w-[1100px] lg:block rtl:-end-[21%]"
        aria-hidden="true"
        data-reveal="0.15"
      >
        <Image
          src={contactMap}
          alt=""
          sizes="(min-width: 1024px) 70vw, 0px"
          className="h-auto w-full drop-shadow-[0_30px_40px_rgba(20,32,51,0.16)]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-14 md:px-10 md:py-32">
        <div className="contact-card relative z-10 w-full p-6 sm:p-9 md:p-11 lg:max-w-[40rem]" data-reveal>
          {heading ? (
            <>
              <Eyebrow className="text-navy-700">{t.contact.eyebrow}</Eyebrow>
              <h2 className="font-display mt-5 text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.14] text-navy-900" data-split>
                {t.contact.title.map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    {i < t.contact.title.length - 1 && <br />}
                  </Fragment>
                ))}
              </h2>
              <p className="mt-4 max-w-[30rem] text-[0.98rem] leading-relaxed text-ink/70">{t.contact.body}</p>
            </>
          ) : (
            <h2 className="font-display text-[1.7rem] leading-tight text-navy-900">{t.pages.contact.formTitle}</h2>
          )}

          <form onSubmit={onSubmit} className={heading ? "mt-9" : "mt-7"}>
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="field-label text-[0.82rem] font-medium">
                  {t.contact.name}
                  {req}
                </span>
                <input className="field" name="name" type="text" autoComplete="name" placeholder={t.contact.placeholders.name} required />
              </label>
              <label className="flex flex-col gap-2">
                <span className="field-label text-[0.82rem] font-medium">
                  {t.contact.email}
                  {req}
                </span>
                <input
                  className="field"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.contact.placeholders.email}
                  required
                  dir="ltr"
                />
              </label>
              {extended && (
                <>
                  <label className="flex flex-col gap-2">
                    <span className="field-label text-[0.82rem] font-medium">
                      {t.contact.org}
                      {opt}
                    </span>
                    <input className="field" name="organisation" type="text" autoComplete="organization" placeholder={t.pages.contact.orgPlaceholder} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="field-label text-[0.82rem] font-medium">
                      {t.contact.type}
                      {opt}
                    </span>
                    <select className="field field-select" name="type" defaultValue="">
                      <option value="" disabled>
                        {t.pages.contact.typePlaceholder}
                      </option>
                      {t.contact.types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="field-label text-[0.82rem] font-medium">
                  {t.contact.message}
                  {req}
                </span>
                <textarea className="field min-h-[128px] resize-y" name="message" rows={4} placeholder={t.contact.placeholders.message} required />
              </label>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <button type="submit" className="btn btn-solid" disabled={status !== "idle"} aria-busy={status === "sending"}>
                {status === "sending" ? t.contact.sending : t.contact.submit}
                <span className="btn-dot" aria-hidden="true" />
              </button>
              <p className="text-[0.9rem] text-navy-700" role="status" aria-live="polite">
                {status === "sent" ? t.contact.sent : ""}
              </p>
            </div>
          </form>

          {/* Whereabouts: each detail on its own small tile. */}
          {details && (
          <div className="mt-9 border-t border-navy-900/10 pt-7">
            <p className="eyebrow text-umber-light">{t.contact.direct}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-x-8">
              <li>
                <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 text-navy-900" dir="ltr">
                  <span className="info-tile" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                      <path d="m4.5 7 7.5 6 7.5-6" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[0.95rem] underline decoration-navy-900/20 underline-offset-4 transition-colors group-hover:decoration-gold">
                    {EMAIL}
                  </span>
                </a>
              </li>
              <li>
                <a href={PHONE.href} className="group flex items-center gap-3 text-navy-900" dir="ltr">
                  <span className="info-tile" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path
                        d="M6.6 3.5h2.6l1.4 4.1-1.9 1.3a11 11 0 0 0 6.4 6.4l1.3-1.9 4.1 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[0.95rem] tabular-nums underline decoration-navy-900/20 underline-offset-4 transition-colors group-hover:decoration-gold">
                    {PHONE.display}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-navy-900">
                <span className="info-tile" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11z" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.3" />
                  </svg>
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.95rem]">{t.contact.location}</span>
                  <span className="eyebrow mt-1 !text-[0.68rem] tabular-nums text-umber-light" dir="ltr">
                    {COORDS}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <ul className="flex items-center gap-2">
                  {SOCIAL.map((s) => (
                    <li key={s.name}>
                      <a href={s.href} aria-label={s.name} title={s.name} className="info-tile" {...socialLinkProps(s.href)}>
                        <SocialIcon name={s.name} />
                      </a>
                    </li>
                  ))}
                </ul>
                <span className="text-[0.85rem] text-umber">{t.contact.follow}</span>
              </li>
            </ul>
          </div>
          )}
        </div>

        {/* Narrow screens: the map follows the card, still running off the edge. */}
        <div className="pointer-events-none -me-5 mt-10 lg:hidden" aria-hidden="true">
          <Image src={contactMap} alt="" sizes="100vw" className="ms-auto h-auto w-[108%] max-w-none" />
        </div>
      </div>
    </section>
  );
}
