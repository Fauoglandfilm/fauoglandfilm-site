import {
  AboutSection,
  ClientSlider,
  ContactSection,
  FeaturedCase,
  HeroSection,
  IntroSection,
  SelectedWorkSection,
  ServicesSection,
} from "@/components/sections/home-sections";
import { caseStudies, siteConfig } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reklamefilm og innholdsproduksjon i Oslo",
  description: siteConfig.description,
  path: "/",
});

const homepageCaseStudies = caseStudies
  .filter((entry) => entry.slug !== "nei-til-atomvapen")
  .slice(0, 3);

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <SelectedWorkSection items={homepageCaseStudies} />
      <ClientSlider />
      <ServicesSection />
      <FeaturedCase />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
