import type { Metadata } from "next";

import { NorScoutPitchPageContent } from "@/components/pages/norscout-pitch-page-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "NorScout Pitch Presentation",
    description: "Private NorScout presentation for Fau&Land Film.",
    path: "/pitch/norscout",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function NorScoutPitchPage() {
  return <NorScoutPitchPageContent />;
}
