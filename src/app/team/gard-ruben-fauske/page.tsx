import { GardProfileContent } from "@/components/pages/gard-profile-content";
import { gardProfilePage } from "@/data/gard-profile";
import { buildMetadata } from "@/lib/seo";

const profile = gardProfilePage.baseProfile;

export const metadata = buildMetadata({
  title: "Gard Ruben Fauske",
  description:
    "Møt Gard Ruben Fauske, regissør, prosjektleder og kreativ produsent i Fau&Land Film med bakgrunn fra reklame, branded content, kortfilm og større produksjoner.",
  path: profile.href,
});

export default function GardRubenFauskePage() {
  return <GardProfileContent />;
}
