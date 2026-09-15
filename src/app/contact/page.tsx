import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact · Bilal Moubarak Cartography Studio",
  description: "Start a cartographic project with Bilal Moubarak Cartography Studio in Beirut, Lebanon.",
};

export default function Page() {
  return <ContactPage />;
}
