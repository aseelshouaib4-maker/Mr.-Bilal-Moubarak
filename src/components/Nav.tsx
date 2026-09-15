"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import { Monogram } from "@/components/ui/Bits";
import { ROUTES } from "@/lib/site";

type Theme = "light" | "dark";
export const NAV_THEME_EVENT = "bmcs:navtheme";

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const ready = useMotionReady();
  const root = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  const links = [
    { href: ROUTES.about, label: t.nav.about },
    { href: ROUTES.services, label: t.nav.services },
    { href: ROUTES.projects, label: t.nav.work },
    { href: ROUTES.process, label: t.nav.process },
    { href: ROUTES.contact, label: t.nav.contact },
  ];
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onTheme = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener(NAV_THEME_EVENT, onTheme);
    return () => window.removeEventListener(NAV_THEME_EVENT, onTheme);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("lenis-stopped", open);
    // Leaving the page with the menu open must not leave scrolling locked.
    return () => html.classList.remove("lenis-stopped");
  }, [open]);

  useGSAP(
    () => {
      if (!ready) return;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          setScrolled(y > 40);
          setHidden(self.direction === 1 && y > 240);
        },
      });
      document.querySelectorAll<HTMLElement>("[data-nav-theme]").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 72px",
          end: "bottom 72px",
          onToggle: (self) => {
            if (self.isActive) setTheme(sec.dataset.navTheme as Theme);
          },
        });
      });
    },
    { dependencies: [ready, lang] },
  );

  useGSAP(
    () => {
      if (!root.current) return;
      gsap.to(root.current, { yPercent: hidden && !open ? -110 : 0, duration: 0.6, ease: "power3.out" });
    },
    { dependencies: [hidden, open] },
  );

  const dark = theme === "dark" || open;
  const brand = (
    <>
      <Monogram />
      <span className="hidden flex-col leading-tight sm:flex">
        <span className="font-display text-[0.95rem]">Bilal Moubarak</span>
        <span className="eyebrow !text-[0.68rem] opacity-70">{t.meta.short}</span>
      </span>
    </>
  );
  const ink = dark ? "text-parchment-light" : "text-navy-900";

  return (
    <>
    <header
      ref={root}
      className={`fixed inset-x-0 top-0 z-50 ${open ? "" : "transition-colors duration-500"} ${ink} ${dark ? "on-nav-dark" : ""} ${
        open ? "bg-navy-900" : scrolled ? (dark ? "bg-navy-900/70" : "bg-parchment/75") + " backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10" aria-label="Primary">
        {/* On the home page the mark scrolls back to the top; elsewhere it goes home. */}
        {isHome ? (
          <a href="#top" className="flex items-center gap-3" aria-label={t.nav.home}>
            {brand}
          </a>
        ) : (
          <Link href={ROUTES.home} className="flex items-center gap-3" aria-label={t.nav.home}>
            {brand}
          </Link>
        )}

        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="nav-link" aria-current={isCurrent(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 sm:gap-5">
          <span className="nav-sep hidden lg:block" aria-hidden="true" />
          <button
            type="button"
            onClick={toggle}
            className="nav-link"
            aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
            lang={lang === "en" ? "ar" : "en"}
          >
            {t.nav.langLabel}
          </button>
          {/* Wrapped: .btn sets its own display, which would override `hidden`. */}
          <span className="hidden md:inline-flex">
            <Link href={ROUTES.contact} className={`btn ${dark ? "btn-ghost" : "btn-solid"}`}>
              {t.nav.cta}
              <span className="btn-dot" aria-hidden="true" />
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>
    </header>

      {/* Outside the header on purpose: the header is moved with a transform
          (and blurred when scrolled), which would make it the containing block
          of a fixed child and shrink the menu to the header's height. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="mobile-menu on-dark fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-navy-900 px-6 pb-10 pt-[calc(72px+1.5rem)] text-parchment-light lg:hidden"
        data-lenis-prevent
      >
        <ul className="flex flex-col gap-1">
          {links.map((l, i) => (
            <li key={l.href} style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className="font-display flex items-baseline gap-4 border-b border-mist/15 py-4 text-[1.9rem] aria-[current=page]:text-gold"
              >
                <span className="eyebrow opacity-50">0{i + 1}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={ROUTES.contact} onClick={() => setOpen(false)} className="btn btn-ghost mt-10 self-start">
          {t.nav.cta}
          <span className="btn-dot" aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
