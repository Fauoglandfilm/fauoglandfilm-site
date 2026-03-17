import { GardProfileContent } from "@/components/pages/gard-profile-content";
import { getFounderProfileBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gard Ruben Fauske",
  description:
    "Møt Gard Ruben Fauske, regissør, prosjektleder og kreativ produsent i Fau&Land Film med bakgrunn fra reklame, branded content, kortfilm og større produksjoner.",
  path: "/team/gard-ruben-fauske",
});

export default async function GardRubenFauskePage() {
  await getFounderProfileBySlug("gard-ruben-fauske");
  return <GardProfileContent />;
}
