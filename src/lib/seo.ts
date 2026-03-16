import type { Metadata } from "next";

import { siteConfig } from "@/data/site-content";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.domain).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = absoluteUrl(path);

  return {
    metadataBase: new URL(siteConfig.domain),
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "nb_NO",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.legalName,
  url: siteConfig.domain,
  description: siteConfig.description,
  vatID: siteConfig.orgId,
  telephone: siteConfig.phonePrimary,
  email: siteConfig.email,
  priceRange: "$$",
  areaServed: siteConfig.coverageArea,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location,
    addressRegion: "Oslo",
    addressCountry: "NO",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: siteConfig.phonePrimary,
      email: siteConfig.email,
      contactType: "sales",
      areaServed: "NO",
      availableLanguage: ["nb", "en"],
    },
  ],
  knowsAbout: siteConfig.keywords,
};
