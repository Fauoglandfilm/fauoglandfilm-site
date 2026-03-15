import {
  CtaBanner,
  FeaturedCasesSection,
  PageHero,
} from "@/components/sections/site-sections";
import { caseStudies } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case | Reklamefilm og videoproduksjon som skaper effekt",
  description:
    "Utforsk Fau&Land Films case innen kampanjevideo, medlemsvekst, bedriftsfilm og innholdsproduksjon med tydelig mål, leveranse og effekt.",
  path: "/case",
});

export default function CasePage() {
  const copy = uiCopy.pages;

  return (
    <main>
      <PageHero
        eyebrow={{ no: copy.no.caseHeroEyebrow, en: copy.en.caseHeroEyebrow }}
        title={{ no: copy.no.caseHeroTitle, en: copy.en.caseHeroTitle }}
        description={{ no: copy.no.caseHeroDescription, en: copy.en.caseHeroDescription }}
        primaryCta={{ label: { no: copy.no.casePrimaryCta, en: copy.en.casePrimaryCta }, href: "/kontakt" }}
      />
      <FeaturedCasesSection cases={caseStudies} />
      <CtaBanner
        title={{ no: copy.no.caseCtaTitle, en: copy.en.caseCtaTitle }}
        description={{ no: copy.no.caseCtaDescription, en: copy.en.caseCtaDescription }}
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
