import {
  AboutSection,
  ClientSlider,
  ContactSection,
  FeaturedCase,
  HeroSection,
  SelectedWorkSection,
  ServicesSection,
} from "@/components/sections/home-sections";
import { selectedWork } from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Premium videoproduksjon i Oslo for brands, campaigns og visual storytelling",
  description:
    "Fau&Land Film bygger premium commercial film, brand storytelling og content production for selskaper som vil se større, skarpere og mer internasjonale ut.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SelectedWorkSection items={selectedWork} />
      <ClientSlider />
      <ServicesSection />
      <FeaturedCase />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
