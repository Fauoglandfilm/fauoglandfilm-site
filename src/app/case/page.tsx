import { PortfolioPageContent } from "@/components/pages/portfolio-page-content";
import { getPortfolioGroups, getPortfolioProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portefølje | Showreel, kampanje, kortfilm og event",
  description:
    "Se Fau&Land Films portefølje med showreel, kampanjefilm, kortfilm, musikkvideo, event og kommersielt innhold bygget på dagens live-portefølje.",
  path: "/case",
});

export default async function CasePage() {
  const [projects, groups] = await Promise.all([
    getPortfolioProjects(),
    getPortfolioGroups(),
  ]);

  return <PortfolioPageContent projects={projects} groups={groups} />;
}
