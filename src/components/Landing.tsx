"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import { MotionReadyProvider } from "@/components/MotionReady";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import ScrollRefresh from "@/components/ScrollRefresh";
import HeroStage from "@/components/sections/HeroStage";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

/**
 * Composes the page. Everything under <main> is keyed by language so that a
 * toggle remounts the sections, re-splits headings and rebuilds ScrollTriggers.
 */
export default function Landing() {
  const { lang } = useLang();
  return (
    <MotionReadyProvider>
      <SmoothScroll />
      <Nav key={`nav-${lang}`} />
      <main key={lang} className="relative z-10">
        <HeroStage />
        <Services />
        <Work />
        <Process />
        <Experience />
        <Contact />
      </main>
      <ScrollRefresh key={`refresh-${lang}`} />
    </MotionReadyProvider>
  );
}
