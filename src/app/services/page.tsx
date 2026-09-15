import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services · Bilal Moubarak Cartography Studio",
  description: "Atlas development, educational cartography, thematic and data-driven mapping, tourism maps, custom projects and GIS data services.",
};

export default function Page() {
  return <ServicesPage />;
}
