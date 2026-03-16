import {
  CtaBanner,
  TeamSection,
  PageHero,
} from "@/components/sections/site-sections";
import {
  aboutBullets,
  teamMembers,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Om oss | Fau&Land Film i Oslo",
  description:
    "Møt Tommy og Gard i Fau&Land Film. Et seniorledet produksjonsselskap i Oslo for reklamefilm og visuelt innhold til bedrifter og organisasjoner.",
  path: "/om-oss",
});

export default function AboutPage() {
  const copy = uiCopy.pages;

  return (
    <main>
      <PageHero
        eyebrow={{ no: copy.no.aboutHeroEyebrow, en: copy.en.aboutHeroEyebrow }}
        title={{ no: copy.no.aboutHeroTitle, en: copy.en.aboutHeroTitle }}
        description={{ no: copy.no.aboutHeroDescription, en: copy.en.aboutHeroDescription }}
        primaryCta={{ label: { no: copy.no.aboutPrimaryCta, en: copy.en.aboutPrimaryCta }, href: "/kontakt" }}
        visualKey="about"
      />
      <TeamSection team={teamMembers} bullets={aboutBullets} />
      <CtaBanner
        title={{ no: copy.no.aboutCtaTitle, en: copy.en.aboutCtaTitle }}
        description={{ no: copy.no.aboutCtaDescription, en: copy.en.aboutCtaDescription }}
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
