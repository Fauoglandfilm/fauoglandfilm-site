import { TommyProfileContent } from "@/components/pages/tommy-profile-content";
import { getFounderProfileBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tommy R.A. Garland",
  description:
    "Møt Tommy R.A. Garland, producer og partner i Fau&Land Film med erfaring fra reklame, event, TV og kortfilm.",
  path: "/team/tommy-garland",
});

export default async function TommyGarlandPage() {
  await getFounderProfileBySlug("tommy-garland");
  return <TommyProfileContent />;
}
