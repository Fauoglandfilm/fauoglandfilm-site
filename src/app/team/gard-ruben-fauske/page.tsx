import { GardProfileContent } from "@/components/pages/gard-profile-content";
import { getFounderProfileBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gard Ruben Fauske",
  description:
    "Møt Gard Ruben Fauske, regissør og prosjektleder med erfaring fra film, TV, reklame, Yellow Banana, kortfilm og større produksjoner.",
  path: "/team/gard-ruben-fauske",
});

export default async function GardRubenFauskePage() {
  await getFounderProfileBySlug("gard-ruben-fauske");
  return <GardProfileContent />;
}
