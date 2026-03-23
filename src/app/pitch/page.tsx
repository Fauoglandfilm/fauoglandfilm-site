import type { Metadata } from "next";

import { PitchPageContent } from "@/components/pages/pitch-page-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Pitch Presentation",
    description: "Private pitch presentation for Fau&Land Film.",
    path: "/pitch",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function PitchPage() {
  return <PitchPageContent />;
}
