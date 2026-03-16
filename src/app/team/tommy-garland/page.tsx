import { TommyProfileContent } from "@/components/pages/tommy-profile-content";
import { tommyProfilePage } from "@/data/tommy-profile";
import { buildMetadata } from "@/lib/seo";

const profile = tommyProfilePage.baseProfile;

export const metadata = buildMetadata({
  title: "Tommy R.A. Garland",
  description:
    "Møt Tommy R.A. Garland, producer og partner i Fau&Land Film med erfaring fra reklame, event, TV og kortfilm.",
  path: profile.href,
});

export default function TommyGarlandPage() {
  return <TommyProfileContent />;
}
