import {
  CtaBanner,
  PageHero,
  ProcessSection,
  ServicesSection,
} from "@/components/sections/site-sections";
import {
  processSteps,
  serviceAreas,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tjenester | Reklamefilm, innhold og videodrevet markedsføring i Oslo",
  description:
    "Se Fau&Land Films tjenester innen reklamefilm, SoMe-innhold, bedriftsfilm, employer branding, eventfilm og løpende innholdspakker for bedrifter i Oslo.",
  path: "/tjenester",
});

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tjenester"
        title="Video og innhold som er lett å forstå"
        description="Vi fokuserer på fire områder som gjør det enklere å skape synlighet, tillit og respons."
        primaryCta={{ label: "Book et møte", href: "/kontakt" }}
      />
      <ServicesSection
        services={serviceAreas}
        title="Tjenester for bedrifter og organisasjoner"
        description="Kort forklart, visuelt vist og bygget for å være enkle å kjøpe."
      />
      <ProcessSection steps={processSteps} />
      <CtaBanner
        title="Usikre på hvilken type innhold dere trenger?"
        description="Vi anbefaler raskt riktig format, riktig omfang og et realistisk oppsett for målene deres."
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
