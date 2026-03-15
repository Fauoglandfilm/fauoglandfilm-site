import { LandingTemplateContent } from "@/components/pages/landing-template-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Landingsside-mal | Kampanjer og lead pages",
  description:
    "En enkel og premium landingsside-mal for Fau&Land Film som kan brukes til annonser, outbound og segmenterte kampanjer med tydelig CTA.",
  path: "/landingsside-mal",
});

export default function LandingTemplatePage() {
  return <LandingTemplateContent />;
}
