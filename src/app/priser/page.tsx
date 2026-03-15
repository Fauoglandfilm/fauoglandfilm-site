import {
  ContactLeadSection,
  CtaBanner,
  FaqList,
  PackagesSection,
  PageHero,
  PriceGuideSection,
} from "@/components/sections/site-sections";
import {
  contactFaq,
  offerPackages,
  priceGuides,
  pricingFaq,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Priser | Pakker for videoproduksjon og innhold i Oslo",
  description:
    "Se Fau&Land Films pakkestruktur og veiledende prisnivåer for reklamefilm, bedriftsfilm, SoMe-innhold, eventfilm og løpende innholdsavtaler.",
  path: "/priser",
});

export default function PricingPage() {
  const copy = uiCopy.pages;

  return (
    <main>
      <PageHero
        eyebrow={{ no: copy.no.pricingHeroEyebrow, en: copy.en.pricingHeroEyebrow }}
        title={{ no: copy.no.pricingHeroTitle, en: copy.en.pricingHeroTitle }}
        description={{ no: copy.no.pricingHeroDescription, en: copy.en.pricingHeroDescription }}
        primaryCta={{
          label: { no: copy.no.pricingPrimaryCta, en: copy.en.pricingPrimaryCta },
          href: "/kontakt",
        }}
      />
      <PackagesSection packages={offerPackages} />
      <PriceGuideSection items={priceGuides} />
      <FaqList
        title={{ no: copy.no.pricingFaqTitle, en: copy.en.pricingFaqTitle }}
        description={{ no: copy.no.pricingFaqDescription, en: copy.en.pricingFaqDescription }}
        items={pricingFaq}
      />
      <CtaBanner
        title={{ no: copy.no.pricingCtaTitle, en: copy.en.pricingCtaTitle }}
        description={{ no: copy.no.pricingCtaDescription, en: copy.en.pricingCtaDescription }}
        secondaryLabel={null}
        align="center"
      />
      <ContactLeadSection faqs={contactFaq} compact />
    </main>
  );
}
