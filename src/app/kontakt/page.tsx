import { ContactLeadSection } from "@/components/sections/site-sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontakt | Book møte med Fau&Land Film i Oslo",
  description:
    "Kontakt Fau&Land Film for møtebooking, prisestimat eller spørsmål om reklamefilm, bedriftsfilm, innhold til sosiale medier og aftermovie.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <main>
      <ContactLeadSection />
    </main>
  );
}
