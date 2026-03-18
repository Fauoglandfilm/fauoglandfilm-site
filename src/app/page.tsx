import {
  ClientSlider,
  ClosingCtaSection,
  HeroSection,
  ResultsSection,
  SelectedWorkSection,
  ServicesSection,
  WhyChooseUsSection,
} from "@/components/sections/home-sections";
import { caseStudies, siteConfig } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reklamefilm og innholdsproduksjon i Oslo",
  description: siteConfig.description,
  path: "/",
});

const homepageCaseStudies = ["treningshuset", "ville-gleder", "foreningen-norden"]
  .map((slug) => caseStudies.find((entry) => entry.slug === slug))
  .filter((entry): entry is (typeof caseStudies)[number] => Boolean(entry));

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ClientSlider />
      <SelectedWorkSection items={homepageCaseStudies} />
      <WhyChooseUsSection />
      <ServicesSection />
      <ResultsSection />
      <ClosingCtaSection />
    </main>
  );
}
