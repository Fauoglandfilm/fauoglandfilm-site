import type { Metadata } from "next";

import { SocialPlanGate } from "@/components/pages/social-plan-gate";
import { siteConfig } from "@/data/site-content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: "Sosiale medier plan | Fau&Land Film",
  description:
    "Få en konkret plan for hva dere skal poste for å få flere kunder fra sosiale medier",
  alternates: {
    canonical: absoluteUrl("/some-plan"),
  },
  openGraph: {
    title: "Sosiale medier plan | Fau&Land Film",
    description:
      "Få en konkret plan for hva dere skal poste for å få flere kunder fra sosiale medier",
    url: absoluteUrl("/some-plan"),
    siteName: siteConfig.name,
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Fau&Land Film - Sosiale medier plan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sosiale medier plan | Fau&Land Film",
    description:
      "Få en konkret plan for hva dere skal poste for å få flere kunder fra sosiale medier",
    images: [absoluteUrl("/opengraph-image")],
  },
};

export default function SocialMediaPlanPage() {
  return <SocialPlanGate />;
}
