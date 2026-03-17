import type {
  CaseStudy,
  ExternalVideoAsset,
  MetricItem,
  PortfolioGroup,
  PortfolioProject,
  ServiceArea,
  TeamMember,
} from "@/data/site-content";
import {
  caseStudies,
  portfolioGroups,
  portfolioProjects,
  serviceAreas,
  teamMembers,
} from "@/data/site-content";
import { gardProfilePage } from "@/data/gard-profile";
import { tommyProfilePage } from "@/data/tommy-profile";
import type { LocalizedText } from "@/lib/i18n";
import { sanityFetch } from "@/lib/sanity/client";
import {
  articleBySlugQuery,
  articlesQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  portfolioGroupsQuery,
  portfolioProjectsQuery,
  serviceAreasQuery,
  teamMembersQuery,
} from "@/lib/sanity/queries";
import { parseExternalVideoUrl } from "@/lib/video";
import { urlForSanityImage } from "@/lib/sanity/image";

type SanityLocalized = Partial<Record<"no" | "en", string>> | string | null | undefined;

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

type SanityVideo = {
  url?: string | null;
  poster?: SanityImage;
  label?: SanityLocalized;
};

type SanityPortfolioGroup = {
  slug?: string;
  title?: SanityLocalized;
  description?: SanityLocalized;
};

type SanityPortfolioProject = {
  slug?: { current?: string } | string;
  group?: SanityPortfolioGroup | null;
  client?: string;
  title?: SanityLocalized;
  format?: SanityLocalized;
  summary?: SanityLocalized;
  result?: SanityLocalized;
  year?: string;
  detailHref?: string;
  sourceUrl?: string;
  ctaLabel?: SanityLocalized;
  mediaFit?: "cover" | "contain";
  image?: SanityImage;
  imageAlt?: SanityLocalized;
  video?: SanityVideo;
  palette?: string;
  featured?: boolean;
};

type SanityCaseStudy = {
  slug?: { current?: string } | string;
  client?: string;
  title?: SanityLocalized;
  category?: SanityLocalized;
  industry?: SanityLocalized;
  summary?: SanityLocalized;
  goal?: SanityLocalized;
  solution?: SanityLocalized;
  deliverables?: SanityLocalized[];
  impact?: SanityLocalized;
  metrics?: Array<{ value?: string; label?: SanityLocalized }>;
  tags?: SanityLocalized[];
  image?: SanityImage;
  imageAlt?: SanityLocalized;
  video?: SanityVideo;
  palette?: string;
  featured?: boolean;
  verificationNote?: SanityLocalized;
};

type SanityServiceArea = {
  slug?: string;
  title?: SanityLocalized;
  summary?: SanityLocalized;
  eyebrow?: SanityLocalized;
  value?: SanityLocalized;
  ctaLabel?: SanityLocalized;
  href?: string;
  exampleHref?: string;
  exampleLabel?: SanityLocalized;
};

type SanityTeamMember = {
  slug?: { current?: string } | string;
  name?: string;
  role?: SanityLocalized;
  summary?: SanityLocalized;
  image?: SanityImage;
  imageAlt?: SanityLocalized;
  href?: string;
};

type SanityArticle = {
  slug?: { current?: string } | string;
  title?: SanityLocalized;
  excerpt?: SanityLocalized;
  body?: {
    no?: unknown[];
    en?: unknown[];
  };
  authorName?: string;
  category?: SanityLocalized;
  image?: SanityImage;
  imageAlt?: SanityLocalized;
  video?: SanityVideo;
  datePublished?: string;
  dateModified?: string;
  readingTime?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ArticleEntry = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: {
    no: unknown[];
    en: unknown[];
  };
  authorName: string;
  category: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
  externalVideo?: ExternalVideoAsset;
  datePublished?: string;
  dateModified?: string;
  readingTime?: string;
  seoTitle?: string;
  seoDescription?: string;
};

function toLocalizedText(value: SanityLocalized, fallback = ""): LocalizedText {
  if (typeof value === "string") {
    return {
      no: value,
      en: value,
    };
  }

  return {
    no: value?.no ?? fallback,
    en: value?.en ?? fallback,
  };
}

function toSlug(value: { current?: string } | string | undefined, fallback = "") {
  if (typeof value === "string") {
    return value;
  }

  return value?.current ?? fallback;
}

function toImageUrl(image?: SanityImage, width = 1600) {
  if (!image?.asset) {
    return undefined;
  }

  return urlForSanityImage(image).width(width).auto("format").url();
}

function mapPortfolioGroup(group: SanityPortfolioGroup): PortfolioGroup | null {
  if (!group.slug || !group.title) {
    return null;
  }

  return {
    slug: group.slug,
    title: toLocalizedText(group.title, group.slug),
    description: toLocalizedText(group.description, ""),
  };
}

function mapPortfolioProject(project: SanityPortfolioProject): PortfolioProject | null {
  const slug = toSlug(project.slug);

  if (!slug || !project.client || !project.title || !project.group?.slug) {
    return null;
  }

  const image = toImageUrl(project.image);
  const fallbackPoster = toImageUrl(project.video?.poster);
  const label = toLocalizedText(project.video?.label, project.title.no ?? project.client);

  return {
    slug,
    group: project.group.slug,
    client: project.client,
    title: toLocalizedText(project.title, project.client),
    format: toLocalizedText(project.format, ""),
    summary: toLocalizedText(project.summary, ""),
    result: project.result ? toLocalizedText(project.result, "") : undefined,
    year: project.year,
    detailHref: project.detailHref,
    sourceUrl: project.sourceUrl,
    ctaLabel: toLocalizedText(project.ctaLabel, "View project"),
    mediaFit: project.mediaFit,
    image,
    imageAlt: project.imageAlt ? toLocalizedText(project.imageAlt, "") : undefined,
    externalVideo: parseExternalVideoUrl({
      url: project.video?.url,
      label,
      thumbnailSrc: fallbackPoster ?? image,
    }) ?? undefined,
    palette: project.palette,
    featured: project.featured,
  };
}

function mapMetric(metric: { value?: string; label?: SanityLocalized }): MetricItem | null {
  if (!metric.value) {
    return null;
  }

  return {
    value: metric.value,
    label: toLocalizedText(metric.label, metric.value),
  };
}

function mapCaseStudy(caseStudy: SanityCaseStudy): CaseStudy | null {
  const slug = toSlug(caseStudy.slug);

  if (!slug || !caseStudy.client || !caseStudy.title) {
    return null;
  }

  const image = toImageUrl(caseStudy.image);
  const fallbackPoster = toImageUrl(caseStudy.video?.poster);
  const label = toLocalizedText(caseStudy.video?.label, caseStudy.title.no ?? caseStudy.client);

  return {
    slug,
    client: caseStudy.client,
    title: toLocalizedText(caseStudy.title, caseStudy.client),
    category: toLocalizedText(caseStudy.category, ""),
    industry: toLocalizedText(caseStudy.industry, ""),
    summary: toLocalizedText(caseStudy.summary, ""),
    goal: toLocalizedText(caseStudy.goal, ""),
    solution: toLocalizedText(caseStudy.solution, ""),
    deliverables: (caseStudy.deliverables ?? []).map((item) => toLocalizedText(item, "")),
    impact: toLocalizedText(caseStudy.impact, ""),
    metrics: (caseStudy.metrics ?? []).map(mapMetric).filter((item): item is MetricItem => Boolean(item)),
    tags: (caseStudy.tags ?? []).map((tag) => toLocalizedText(tag, "")),
    image,
    imageAlt: caseStudy.imageAlt ? toLocalizedText(caseStudy.imageAlt, "") : undefined,
    externalVideo: parseExternalVideoUrl({
      url: caseStudy.video?.url,
      label,
      thumbnailSrc: fallbackPoster ?? image,
    }) ?? undefined,
    palette: caseStudy.palette,
    featured: caseStudy.featured,
    verificationNote: caseStudy.verificationNote
      ? toLocalizedText(caseStudy.verificationNote, "")
      : undefined,
  };
}

function mapServiceArea(service: SanityServiceArea): ServiceArea | null {
  if (!service.slug || !service.title) {
    return null;
  }

  return {
    slug: service.slug,
    title: toLocalizedText(service.title, service.slug),
    summary: toLocalizedText(service.summary, ""),
    eyebrow: toLocalizedText(service.eyebrow, ""),
    value: toLocalizedText(service.value, ""),
    ctaLabel: toLocalizedText(service.ctaLabel, "Read more"),
    href: service.href ?? "/kontakt",
    exampleHref: service.exampleHref,
    exampleLabel: service.exampleLabel ? toLocalizedText(service.exampleLabel, "") : undefined,
  };
}

function mapTeamMember(member: SanityTeamMember): TeamMember | null {
  if (!member.name || !member.role || !member.summary) {
    return null;
  }

  return {
    name: member.name,
    role: toLocalizedText(member.role, member.name),
    summary: toLocalizedText(member.summary, ""),
    image: toImageUrl(member.image, 1200),
    imageAlt: member.imageAlt ? toLocalizedText(member.imageAlt, member.name) : undefined,
    href: member.href ?? (member.slug ? `/team/${toSlug(member.slug)}` : undefined),
  };
}

function mapArticle(article: SanityArticle): ArticleEntry | null {
  const slug = toSlug(article.slug);

  if (!slug || !article.title) {
    return null;
  }

  const image = toImageUrl(article.image, 1600);
  const fallbackPoster = toImageUrl(article.video?.poster, 1600);

  return {
    slug,
    title: toLocalizedText(article.title, slug),
    excerpt: toLocalizedText(article.excerpt, ""),
    body: {
      no: article.body?.no ?? [],
      en: article.body?.en ?? [],
    },
    authorName: article.authorName ?? "Fau&Land Film",
    category: toLocalizedText(article.category, "Article"),
    image,
    imageAlt: article.imageAlt ? toLocalizedText(article.imageAlt, "") : undefined,
    externalVideo: parseExternalVideoUrl({
      url: article.video?.url,
      label: toLocalizedText(article.video?.label, article.title.no ?? slug),
      thumbnailSrc: fallbackPoster ?? image,
    }) ?? undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    readingTime: article.readingTime,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
  };
}

export async function getPortfolioGroups() {
  const cmsGroups = await sanityFetch<SanityPortfolioGroup[]>({
    query: portfolioGroupsQuery,
    tags: ["portfolio-groups"],
  });

  const mapped = cmsGroups?.map(mapPortfolioGroup).filter((item): item is PortfolioGroup => Boolean(item));

  return mapped?.length ? mapped : portfolioGroups;
}

export async function getPortfolioProjects() {
  const cmsProjects = await sanityFetch<SanityPortfolioProject[]>({
    query: portfolioProjectsQuery,
    tags: ["portfolio-projects"],
  });

  const mapped = cmsProjects?.map(mapPortfolioProject).filter((item): item is PortfolioProject => Boolean(item));

  return mapped?.length ? mapped : portfolioProjects;
}

export async function getCaseStudies() {
  const cmsCases = await sanityFetch<SanityCaseStudy[]>({
    query: caseStudiesQuery,
    tags: ["case-studies"],
  });

  const mapped = cmsCases?.map(mapCaseStudy).filter((item): item is CaseStudy => Boolean(item));

  return mapped?.length ? mapped : caseStudies;
}

export async function getCaseStudyBySlug(slug: string) {
  const cmsCase = await sanityFetch<SanityCaseStudy>({
    query: caseStudyBySlugQuery,
    params: { slug },
    tags: [`case-study-${slug}`],
  });

  const mapped = cmsCase ? mapCaseStudy(cmsCase) : null;

  return mapped ?? caseStudies.find((item) => item.slug === slug) ?? null;
}

export async function getServiceAreas() {
  const cmsServices = await sanityFetch<SanityServiceArea[]>({
    query: serviceAreasQuery,
    tags: ["services"],
  });

  const mapped = cmsServices?.map(mapServiceArea).filter((item): item is ServiceArea => Boolean(item));

  return mapped?.length ? mapped : serviceAreas;
}

export async function getTeamMembers() {
  const cmsMembers = await sanityFetch<SanityTeamMember[]>({
    query: teamMembersQuery,
    tags: ["team-members"],
  });

  const mapped = cmsMembers?.map(mapTeamMember).filter((item): item is TeamMember => Boolean(item));

  return mapped?.length ? mapped : teamMembers;
}

export async function getArticles() {
  const cmsArticles = await sanityFetch<SanityArticle[]>({
    query: articlesQuery,
    tags: ["articles"],
  });

  const mapped = cmsArticles?.map(mapArticle).filter((item): item is ArticleEntry => Boolean(item));

  return mapped ?? [];
}

export async function getArticleBySlug(slug: string) {
  const cmsArticle = await sanityFetch<SanityArticle>({
    query: articleBySlugQuery,
    params: { slug },
    tags: [`article-${slug}`],
  });

  return cmsArticle ? mapArticle(cmsArticle) : null;
}

export async function getFounderProfileBySlug(slug: "tommy-garland" | "gard-ruben-fauske") {
  if (slug === "tommy-garland") {
    return tommyProfilePage;
  }

  return gardProfilePage;
}
