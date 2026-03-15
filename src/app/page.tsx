import {
  AboutPreviewSection,
  CtaBanner,
  FeaturedCasesSection,
  HomeIntroSection,
  ProcessSection,
  SalesHero,
  SocialProofSection,
  ServicesSection,
  TestimonialsSection,
} from "@/components/sections/site-sections";
import {
  caseStudies,
  aboutBullets,
  processSteps,
  serviceAreas,
  teamMembers,
  testimonials,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Videoproduksjon i Oslo som skaper synlighet, tillit og leads",
  description:
    "Fau&Land Film er et premium produksjonsselskap i Oslo som leverer reklamefilm, bedriftsfilm, SoMe-innhold, eventfilm og videodrevet markedsføring for bedrifter.",
  path: "/",
});

export default function HomePage() {
  const featuredCases = caseStudies.filter((caseStudy) => caseStudy.featured).slice(0, 2);
  const homeServices = serviceAreas.slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 2);
  const previewBullets = aboutBullets.slice(0, 3);

  return (
    <main>
      <SalesHero />
      <HomeIntroSection />
      <SocialProofSection />
      <ServicesSection
        services={homeServices}
        title="Fire måter å bruke video på"
        description="Reklamefilm, SoMe-innhold, bedriftsfilm og eventproduksjon forklart kort og tydelig."
      />
      <FeaturedCasesSection cases={featuredCases} showVerificationNote={false} />
      <ProcessSection steps={processSteps} />
      <TestimonialsSection testimonials={featuredTestimonials} />
      <AboutPreviewSection team={teamMembers} bullets={previewBullets} />
      <CtaBanner
        title="Klar for neste produksjon?"
        description="Book et møte, så ser vi raskt på hva dere trenger og hvordan innholdet faktisk skal brukes."
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
