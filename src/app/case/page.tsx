import { PortfolioPageContent } from "@/components/pages/portfolio-page-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portefølje | Reklamefilm, bedriftsfilm og eventfilm",
  description:
    "Se Fau&Land Films portefølje med showreel, kampanjefilm, organisasjonsfilm, musikkvideo og eventarbeid hentet fra dagens live-portefølje.",
  path: "/case",
});

export default function CasePage() {
  return <PortfolioPageContent />;
}
