import type { MetadataRoute } from "next";

import { getArticles, getCaseStudies } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/tjenester",
    "/case",
    "/artikler",
    "/om-oss",
    "/priser",
    "/kontakt",
    "/faq",
    "/landingsside-mal",
    "/team/tommy-garland",
    "/team/gard-ruben-fauske",
  ];

  const staticPages = routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
  }));

  const [allCaseStudies, articles] = await Promise.all([
    getCaseStudies(),
    getArticles(),
  ]);

  const casePages = allCaseStudies.map((caseStudy) => ({
    url: absoluteUrl(`/case/${caseStudy.slug}`),
    lastModified: new Date(),
  }));

  const articlePages = articles.map((article) => ({
    url: absoluteUrl(`/artikler/${article.slug}`),
    lastModified: article.dateModified ? new Date(article.dateModified) : new Date(),
  }));

  return [...staticPages, ...casePages, ...articlePages];
}
