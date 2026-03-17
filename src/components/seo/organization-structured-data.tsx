import { OrganizationJsonLd } from "next-seo";

import { siteConfig } from "@/data/site-content";

export function OrganizationStructuredData() {
  return (
    <OrganizationJsonLd
      type="Organization"
      id={`${siteConfig.domain}#organization`}
      name={siteConfig.legalName}
      url={siteConfig.domain}
      logo={`${siteConfig.domain}/opengraph-image`}
      sameAs={siteConfig.socialLinks.map((link) => link.href)}
      contactPoint={[
        {
          contactType: "sales",
          email: siteConfig.email,
          telephone: siteConfig.phonePrimary,
          areaServed: "NO",
          availableLanguage: ["nb", "en"],
        },
      ]}
    />
  );
}
