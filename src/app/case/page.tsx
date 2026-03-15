import {
  CtaBanner,
  FeaturedCasesSection,
  PageHero,
} from "@/components/sections/site-sections";
import { caseStudies } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case | Reklamefilm og videoproduksjon som skaper effekt",
  description:
    "Utforsk Fau&Land Films case innen kampanjevideo, medlemsvekst, bedriftsfilm og innholdsproduksjon med tydelig mål, leveranse og effekt.",
  path: "/case",
});

export default function CasePage() {
  return (
    <main>
      <PageHero
        eyebrow="Case"
        title="Case som viser behov, leveranse og effekt"
        description="Få, tydelige prosjekter med premium presentasjon og kort vei videre til kontakt."
        primaryCta={{ label: "Book et møte", href: "/kontakt" }}
      />
      <FeaturedCasesSection cases={caseStudies} />
      <CtaBanner
        title="Vil dere lage noe lignende?"
        description="Fortell kort hva dere vil oppnå, så viser vi hva som er relevant for deres marked og budsjett."
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
