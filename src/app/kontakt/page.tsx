import {
  ContactLeadSection,
  PageHero,
} from "@/components/sections/site-sections";
import { uiCopy } from "@/data/ui-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontakt | Book møte med Fau&Land Film i Oslo",
  description:
    "Kontakt Fau&Land Film for møtebooking, prisestimat eller spørsmål om reklamefilm, bedriftsfilm, innhold til sosiale medier og eventfilm.",
  path: "/kontakt",
});

export default function ContactPage() {
  const copy = uiCopy.pages;

  return (
    <main>
      <PageHero
        eyebrow={{ no: copy.no.contactHeroEyebrow, en: copy.en.contactHeroEyebrow }}
        title={{ no: copy.no.contactHeroTitle, en: copy.en.contactHeroTitle }}
        description={{ no: copy.no.contactHeroDescription, en: copy.en.contactHeroDescription }}
        visualKey="contact"
      />
      <ContactLeadSection />
    </main>
  );
}
