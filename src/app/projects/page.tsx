import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/ProjectsPage";

export const metadata: Metadata = {
  title: "Selected Work · Bilal Moubarak Cartography Studio",
  description: "Selected cartographic work from 34+ years of experience: atlases, educational, thematic, tourism, physical and political maps.",
};

export default function Page() {
  return <ProjectsPage />;
}
