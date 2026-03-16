import {
  ContactLeadSection,
  FaqList,
  PageHero,
} from "@/components/sections/site-sections";
import {
  contactFaq,
  pricingFaq,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Vanlige spørsmål | Fau&Land Film",
  description:
    "Vanlige spørsmål om pris, tidslinje, leveranse og hvordan Fau&Land Film jobber med reklamefilm, bedriftsfilm, SoMe-innhold og eventfilm.",
  path: "/faq",
});

export default function FaqPage() {
  const copy = uiCopy.pages;

  return (
    <main>
      <PageHero
        eyebrow={{ no: copy.no.faqHeroEyebrow, en: copy.en.faqHeroEyebrow }}
        title={{ no: copy.no.faqHeroTitle, en: copy.en.faqHeroTitle }}
        description={{ no: copy.no.faqHeroDescription, en: copy.en.faqHeroDescription }}
      />
      <FaqList
        title={{ no: copy.no.faqHeroTitle, en: copy.en.faqHeroTitle }}
        description={{ no: copy.no.faqHeroDescription, en: copy.en.faqHeroDescription }}
        items={[...pricingFaq, ...contactFaq]}
      />
      <ContactLeadSection compact />
    </main>
  );
}
