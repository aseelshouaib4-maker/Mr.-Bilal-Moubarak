"use client";

import SiteShell from "@/components/site/SiteShell";
import HeroStage from "@/components/sections/HeroStage";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import Experience from "@/components/sections/Experience";

/** The home page: every section in sequence, inside the shared site frame. */
export default function Landing() {
  return (
    <SiteShell>
      <HeroStage />
      <Services />
      <Work />
      <Process />
      <Experience />
    </SiteShell>
  );
}
