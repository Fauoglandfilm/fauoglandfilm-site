import type { Metadata } from "next";

import { MatterixPitchPageContent } from "@/components/pages/matterix-pitch-page-content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Matterix Pitch Presentation",
    description: "Private Matterix presentation for Fau&Land Film.",
    path: "/pitch/matterix",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function MatterixPitchPage() {
  return <MatterixPitchPageContent />;
}
