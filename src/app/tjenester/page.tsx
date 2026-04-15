import { ServiceAccordionSection } from "@/components/sections/service-accordion";
import {
  CtaBanner,
  PageHero,
  ProcessSection,
} from "@/components/sections/site-sections";
import {
  processSteps,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { getServiceAreas } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tjenester | Reklamefilm, marketing og innhold i Oslo",
  description:
    "Se Fau&Land Films tjenester innen reklamefilm, marketing, bedriftsfilm, innhold for sosiale medier og eventproduksjon for bedrifter og organisasjoner.",
  path: "/tjenester",
});

export default async function ServicesPage() {
  const services = await getServiceAreas();
  const copy = uiCopy.pages;

  return (
    <main>
      <PageHero
        eyebrow={{ no: copy.no.servicesHeroEyebrow, en: copy.en.servicesHeroEyebrow }}
        title={{ no: copy.no.servicesHeroTitle, en: copy.en.servicesHeroTitle }}
        description={{ no: copy.no.servicesHeroDescription, en: copy.en.servicesHeroDescription }}
        primaryCta={{
          label: { no: copy.no.servicesPrimaryCta, en: copy.en.servicesPrimaryCta },
          href: "/kontakt",
        }}
        compact
      />
      <ServiceAccordionSection
        services={services}
        title={{ no: copy.no.servicesSectionTitle, en: copy.en.servicesSectionTitle }}
        description={{
          no: copy.no.servicesSectionDescription,
          en: copy.en.servicesSectionDescription,
        }}
      />
      <ProcessSection steps={processSteps} />
      <CtaBanner
        title={{ no: copy.no.servicesCtaTitle, en: copy.en.servicesCtaTitle }}
        description={{ no: copy.no.servicesCtaDescription, en: copy.en.servicesCtaDescription }}
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
