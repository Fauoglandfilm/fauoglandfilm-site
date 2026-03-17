import { ArticleJsonLd } from "next-seo";

import { siteConfig } from "@/data/site-content";
import { absoluteUrl } from "@/lib/seo";

type ArticleStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
};

export function ArticleStructuredData({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName = siteConfig.name,
}: ArticleStructuredDataProps) {
  return (
    <ArticleJsonLd
      type="Article"
      headline={title}
      url={absoluteUrl(path)}
      description={description}
      author={authorName}
      datePublished={datePublished}
      dateModified={dateModified}
      image={image ? [image] : undefined}
      publisher={{
        "@type": "Organization",
        name: siteConfig.legalName,
        logo: absoluteUrl("/opengraph-image"),
      }}
      isAccessibleForFree
    />
  );
}
