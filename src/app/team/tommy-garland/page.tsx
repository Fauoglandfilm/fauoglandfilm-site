import { FounderProfileContent } from "@/components/pages/founder-profile-content";
import { getFounderProfile } from "@/data/founder-profiles";
import { buildMetadata } from "@/lib/seo";

const profile =
  getFounderProfile("tommy-garland") ??
  (() => {
    throw new Error("Missing founder profile: tommy-garland");
  })();

export const metadata = buildMetadata({
  title: "Tommy R.A. Garland",
  description:
    "Møt Tommy R.A. Garland, producer og partner i Fau&Land Film med erfaring fra reklame, event, TV og kortfilm.",
  path: profile.href,
});

export default function TommyGarlandPage() {
  return <FounderProfileContent profile={profile} />;
}
