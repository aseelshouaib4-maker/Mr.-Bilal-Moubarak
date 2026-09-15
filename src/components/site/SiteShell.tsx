"use client";

import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { MotionReadyProvider } from "@/components/MotionReady";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import ScrollRefresh from "@/components/ScrollRefresh";
import Footer from "@/components/site/Footer";

/**
 * The frame shared by every page: smooth scrolling, the nav, the page itself
 * and the footer. Everything below the nav is keyed by language so a toggle
 * remounts the page, re-splits headings and rebuilds its ScrollTriggers.
 */
export default function SiteShell({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  return (
    <MotionReadyProvider>
      <SmoothScroll />
      <Nav key={`nav-${lang}`} />
      <div key={lang} className="relative z-10">
        <main>{children}</main>
        <Footer />
      </div>
      <ScrollRefresh key={`refresh-${lang}`} />
    </MotionReadyProvider>
  );
}
