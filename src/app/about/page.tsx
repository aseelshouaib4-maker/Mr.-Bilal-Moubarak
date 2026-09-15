import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About · Bilal Moubarak Cartography Studio",
  description: "An independent cartography studio founded on more than 34 years of professional experience in maps, atlases and geographic information.",
};

export default function Page() {
  return <AboutPage />;
}
