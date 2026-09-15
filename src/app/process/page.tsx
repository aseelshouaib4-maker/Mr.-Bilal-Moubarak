import type { Metadata } from "next";
import ProcessPage from "@/components/pages/ProcessPage";

export const metadata: Metadata = {
  title: "Process · Bilal Moubarak Cartography Studio",
  description: "Seven stages from cartographic brief to final production. Mapmaking begins with understanding, not with drawing.",
};

export default function Page() {
  return <ProcessPage />;
}
