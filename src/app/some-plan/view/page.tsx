import type { Metadata } from "next";

import { SocialPlanViewer } from "@/components/pages/social-plan-viewer";
import { siteConfig } from "@/data/site-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: "Sosiale medier plan viewer | Fau&Land Film",
  description: "Privat visning av sosial medier-planen.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SocialMediaPlanViewerPage() {
  return <SocialPlanViewer />;
}
