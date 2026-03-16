import type { MetadataRoute } from "next";

import { caseStudies } from "@/data/site-content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tjenester",
    "/case",
    "/om-oss",
    "/priser",
    "/kontakt",
    "/faq",
    "/landingsside-mal",
  ];

  const staticPages = routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
  }));

  const casePages = caseStudies.map((caseStudy) => ({
    url: absoluteUrl(`/case/${caseStudy.slug}`),
    lastModified: new Date(),
  }));

  return [...staticPages, ...casePages];
}
