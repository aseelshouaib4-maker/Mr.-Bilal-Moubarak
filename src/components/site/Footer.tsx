"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Monogram } from "@/components/ui/Bits";
import SocialIcon, { socialLinkProps } from "@/components/ui/SocialIcon";
import { COORDS, EMAIL, PHONE, ROUTES, SOCIAL } from "@/lib/site";

/** The navy foot of every page: the studio, its pages, how to reach it. */
export default function Footer() {
  const { t, lang } = useLang();
  const p = t.pages.common;

  const links = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.services, label: t.nav.services },
    { href: ROUTES.projects, label: t.nav.work },
    { href: ROUTES.process, label: t.nav.process },
    { href: ROUTES.contact, label: t.nav.contact },
  ];

  return (
    <div data-nav-theme="dark" className="on-dark bg-navy-950 text-parchment-light">
      <footer className="mx-auto w-full max-w-[1600px] px-5 pb-8 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* The studio */}
          <div className="md:col-span-5">
            <Link href={ROUTES.home} className="inline-flex items-center gap-3">
              <Monogram />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[0.95rem]">Bilal Moubarak</span>
                <span className="eyebrow !text-[0.68rem] opacity-70">{t.meta.short}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-[22rem] text-[0.92rem] leading-relaxed text-mist/80">{t.contact.footerTagline}</p>
            <ul className="mt-6 flex items-center gap-2">
              {SOCIAL.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    title={s.name}
                    className="grid h-10 w-10 place-items-center rounded-full border border-mist/20 text-mist transition-colors duration-300 hover:border-gold hover:text-parchment-light"
                    {...socialLinkProps(s.href)}
                  >
                    <SocialIcon name={s.name} className="h-[17px] w-[17px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="md:col-span-3">
            <p className="eyebrow text-mist/55">{p.footerExplore}</p>
            <ul className="mt-4 flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="nav-link !min-h-[36px] !px-0">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach */}
          <div className="md:col-span-4">
            <p className="eyebrow text-mist/55">{p.footerContact}</p>
            <ul className="mt-3 flex flex-col text-[0.92rem]">
              <li>
                <a href={`mailto:${EMAIL}`} className="nav-link !min-h-[44px] !px-0" dir="ltr">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={PHONE.href} className="nav-link !min-h-[44px] !px-0 tabular-nums" dir="ltr">
                  {PHONE.display}
                </a>
              </li>
              <li className="text-mist/80">
                {t.contact.location}
                <span className="eyebrow mt-1 block !text-[0.68rem] tabular-nums text-mist/45" dir="ltr">
                  {COORDS}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-mist/15 pt-6 text-[0.78rem] text-mist/55 sm:flex-row sm:items-center sm:justify-between">
          <p dir={lang === "ar" ? "rtl" : "ltr"}>
            © {new Date().getFullYear()} {t.meta.studio}. {t.contact.rights}
          </p>
          <p className="eyebrow !text-[0.68rem]">{t.hero.stamp2}</p>
        </div>
      </footer>
    </div>
  );
}
