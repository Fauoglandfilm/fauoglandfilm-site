import type { Metadata } from "next";

import { OsloParkourParkPitchPageContent } from "@/components/pages/oslo-parkour-park-pitch-page-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Oslo Parkour Park Pitch Presentation",
    description: "Private Oslo Parkour Park presentation for Fau&Land Film.",
    path: "/pitch/oslo-parkour-park",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function OsloParkourParkPitchPage() {
  return <OsloParkourParkPitchPageContent />;
}
