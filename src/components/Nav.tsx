"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useMotionReady } from "@/components/MotionReady";
import { Monogram } from "@/components/ui/Bits";

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
  const [active, setActive] = useState<string>("");

  const links = [
    { href: "#experience", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#work", label: t.nav.work },
    { href: "#process", label: t.nav.process },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onTheme = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener(NAV_THEME_EVENT, onTheme);
    return () => window.removeEventListener(NAV_THEME_EVENT, onTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
  }, [open]);

  useGSAP(
    () => {
      if (!ready) return;
      // Which link is current: whichever section the reading line sits in.
      // Measured live, so pinned sections report the box they hold on screen.
      const marks = links.map((l) => ({
        href: l.href,
        el: document.querySelector<HTMLElement>(l.href),
      }));
      const readCurrent = () => {
        const line = window.innerHeight * 0.55;
        let current = "";
        marks.forEach((m) => {
          if (!m.el) return;
          const r = m.el.getBoundingClientRect();
          if (r.top <= line && r.bottom > line) current = m.href;
        });
        setActive(current);
      };

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          setScrolled(y > 40);
          setHidden(self.direction === 1 && y > 240);
          readCurrent();
        },
      });
      // Re-measure whenever pins are laid out: before that, sections that
      // overlap a pinned stage report a box that is not where they will be.
      readCurrent();
      ScrollTrigger.addEventListener("refresh", readCurrent);
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
      return () => ScrollTrigger.removeEventListener("refresh", readCurrent);
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
  const ink = dark ? "text-parchment-light" : "text-navy-900";

  return (
    <header
      ref={root}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${ink} ${dark ? "on-nav-dark" : ""} ${
        scrolled && !open ? (dark ? "bg-navy-900/70" : "bg-parchment/75") + " backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10" aria-label="Primary">
        <a href="#top" className="flex items-center gap-3">
          <Monogram />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[0.95rem]">Bilal Moubarak</span>
            <span className="eyebrow !text-[0.58rem] opacity-70">{t.meta.short}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" aria-current={active === l.href}>
                {l.label}
              </a>
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
          <a href="#contact" className={`btn hidden md:inline-flex ${dark ? "btn-ghost" : "btn-solid"}`}>
            {t.nav.cta}
            <span className="btn-dot" aria-hidden="true" />
          </a>
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

      <div
        id="mobile-menu"
        hidden={!open}
        className="on-dark fixed inset-0 top-[72px] z-40 flex flex-col justify-between bg-navy-900 px-6 pb-10 pt-10 text-parchment-light lg:hidden"
        data-lenis-prevent
      >
        <ul className="flex flex-col gap-2">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display flex items-baseline gap-4 border-b border-mist/15 py-4 text-[1.9rem]"
              >
                <span className="eyebrow opacity-50">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={() => setOpen(false)} className="btn btn-ghost self-start">
          {t.nav.cta}
          <span className="btn-dot" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
