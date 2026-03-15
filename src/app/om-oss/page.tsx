import {
  CtaBanner,
  TeamSection,
  PageHero,
} from "@/components/sections/site-sections";
import {
  aboutBullets,
  teamMembers,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Om oss | Fau&Land Film i Oslo",
  description:
    "Møt Tommy og Gard i Fau&Land Film. Et seniorledet produksjonsteam i Oslo med tydelig budskap, høy produksjonsverdi og fleksibel gjennomføring.",
  path: "/om-oss",
});

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Om oss"
        title="Et lite team med tydelig ansvar"
        description="Fau&Land Film drives av Gard Ruben Fauske og Tommy R.A. Garland."
        primaryCta={{ label: "Book et møte", href: "/kontakt" }}
      />
      <TeamSection team={teamMembers} bullets={aboutBullets} />
      <CtaBanner
        title="Vil dere ha et lite team som følger prosjektet tett?"
        description="Vi tar gjerne en kort prat om hvordan et samarbeid kan se ut for deres marked og behov."
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
