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
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Priser | Pakker for videoproduksjon og innhold i Oslo",
  description:
    "Se Fau&Land Films pakkestruktur og veiledende prisnivåer for reklamefilm, bedriftsfilm, SoMe-innhold, eventfilm og løpende innholdsavtaler.",
  path: "/priser",
});

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Priser"
        title="Tydelige pakker og prisrammer"
        description="Pris skal gjøre neste steg enklere, ikke mer uklart."
        primaryCta={{ label: "Få et prisestimat", href: "/kontakt" }}
      />
      <PackagesSection packages={offerPackages} />
      <PriceGuideSection items={priceGuides} />
      <FaqList
        title="Spørsmål om pris, omfang og samarbeid"
        description="Her er de vanligste avklaringene om pakker, prosjektpriser og hva som driver nivået opp eller ned."
        items={pricingFaq}
      />
      <CtaBanner
        title="Vil dere ha et konkret forslag til nivå?"
        description="Vi kan raskt si om dere bør starte med et prosjekt, en innholdspakke eller et mer løpende samarbeid."
        secondaryLabel={null}
        align="center"
      />
      <ContactLeadSection faqs={contactFaq} compact />
    </main>
  );
}
