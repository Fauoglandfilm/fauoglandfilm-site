import {
  AboutSection,
  ClientSlider,
  ContactSection,
  FeaturedCase,
  HeroSection,
  IntroSection,
  MediaInterludeSection,
  SelectedWorkSection,
  ServicesSection,
} from "@/components/sections/home-sections";
import { caseStudies, siteConfig } from "@/data/site-content";
import { siteVisuals } from "@/data/visual-assets";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reklamefilm og innholdsproduksjon i Oslo",
  description: siteConfig.description,
  path: "/",
});

const homepageCaseStudies = caseStudies
  .filter((entry) => entry.slug !== "nei-til-atomvapen")
  .slice(0, 3);
const portfolioInterlude = caseStudies.find((entry) => entry.slug === "foreningen-norden") ?? caseStudies[0];
const servicesInterlude = caseStudies.find((entry) => entry.slug === "ville-gleder") ?? caseStudies[0];

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <MediaInterludeSection
        eyebrow={{
          no: "Nettsidefilm / organisasjon / kampanje",
          en: "Website film / organisation / campaign",
        }}
        title={{
          no: "Mer enn en film. Ett opptak som kan bli nettsidefilm, kampanjemateriale og nye uttak.",
          en: "More than a single film. One production that can become a website film, campaign material and new cutdowns.",
        }}
        description={{
          no: "Vi planlegger produksjoner så de kan leve på tvers av nettside, sosiale medier, annonser og videre bruk etter lansering.",
          en: "We plan productions to keep working across the website, social channels, ads and follow-up use after launch.",
        }}
        ctaHref="/case"
        ctaLabel={{
          no: "Se hva vi har laget",
          en: "See what we have made",
        }}
        video={portfolioInterlude.video}
        externalVideo={portfolioInterlude.externalVideo}
        image={portfolioInterlude.image ?? siteVisuals.companyStory.src}
        imageAlt={portfolioInterlude.imageAlt ?? siteVisuals.companyStory.alt}
      />
      <IntroSection />
      <SelectedWorkSection items={homepageCaseStudies} />
      <ClientSlider />
      <ServicesSection />
      <MediaInterludeSection
        eyebrow={{
          no: "Promofilm / villmark / opplevelse",
          en: "Promo film / outdoors / experience",
        }}
        title={{
          no: "Preview, cutdowns og hovedfilm kan bygges fra samme opptaksdag.",
          en: "Preview, cutdowns and the hero film can all come from the same production day.",
        }}
        description={{
          no: "Vi filmer med tanke på rytme, videre bruk og flere formater, slik at materialet jobber lenge etter at opptaket er ferdig.",
          en: "We shoot with rhythm, reuse and multiple formats in mind, so the material keeps working long after the shoot is done.",
        }}
        ctaHref="/tjenester"
        ctaLabel={{
          no: "Se tjenestene",
          en: "See services",
        }}
        video={servicesInterlude.video}
        externalVideo={servicesInterlude.externalVideo}
        image={servicesInterlude.image ?? siteVisuals.introShowcase.src}
        imageAlt={servicesInterlude.imageAlt ?? siteVisuals.introShowcase.alt}
        align="right"
      />
      <FeaturedCase />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
