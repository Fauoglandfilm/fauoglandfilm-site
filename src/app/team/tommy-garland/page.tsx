import { TommyProfileContent } from "@/components/pages/tommy-profile-content";
import { getFounderProfileBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tommy R.A. Garland",
  description:
    "Tommy R.A. Garland er producer, line producer og prosjektleder med erfaring fra prisvinnende kortfilm, reklame, event og større produksjoner.",
  path: "/team/tommy-garland",
});

export default async function TommyGarlandPage() {
  await getFounderProfileBySlug("tommy-garland");
  return <TommyProfileContent />;
}
