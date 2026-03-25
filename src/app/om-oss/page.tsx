import {
  TeamSection,
  PageHero,
} from "@/components/sections/site-sections";
import {
  aboutBullets,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { getTeamMembers } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Om oss | Fau&Land Film i Oslo",
  description:
    "Møt Tommy og Gard i Fau&Land Film. Et seniorledet produksjonsselskap i Oslo for reklamefilm og visuelt innhold til bedrifter og organisasjoner.",
  path: "/om-oss",
});

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  const copy = uiCopy.pages;

  return (
    <main>
      <PageHero
        compact
        eyebrow={{ no: copy.no.aboutHeroEyebrow, en: copy.en.aboutHeroEyebrow }}
        title={{ no: copy.no.aboutHeroTitle, en: copy.en.aboutHeroTitle }}
        description={{ no: copy.no.aboutHeroDescription, en: copy.en.aboutHeroDescription }}
        primaryCta={{ label: { no: copy.no.aboutPrimaryCta, en: copy.en.aboutPrimaryCta }, href: "/kontakt" }}
        visualKey="about"
      />
      <TeamSection team={teamMembers} bullets={aboutBullets} compact />
    </main>
  );
}
