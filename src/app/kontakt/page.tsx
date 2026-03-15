import {
  ContactLeadSection,
  PageHero,
} from "@/components/sections/site-sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontakt | Book møte med Fau&Land Film i Oslo",
  description:
    "Kontakt Fau&Land Film i Oslo for møtebooking, prisestimat eller spørsmål om reklamefilm, innholdsproduksjon, eventfilm og videodrevet markedsføring.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kontakt"
        title="Book et uforpliktende møte"
        description="Send en kort melding, så følger vi opp raskt med forslag til neste steg."
      />
      <ContactLeadSection />
    </main>
  );
}
