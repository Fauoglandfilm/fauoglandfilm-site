import { defineQuery } from "next-sanity";

export const portfolioGroupsQuery = defineQuery(`
  *[_type == "portfolioGroup"] | order(title.no asc) {
    _id,
    slug,
    title,
    description
  }
`);

export const portfolioProjectsQuery = defineQuery(`
  *[_type == "portfolioProject"] | order(featured desc, year desc, _createdAt desc) {
    _id,
    slug,
    group->{
      slug,
      title,
      description
    },
    client,
    title,
    format,
    summary,
    result,
    year,
    detailHref,
    sourceUrl,
    ctaLabel,
    mediaFit,
    image,
    imageAlt,
    video,
    featured
  }
`);

export const caseStudiesQuery = defineQuery(`
  *[_type == "caseStudy"] | order(featured desc, _createdAt desc) {
    _id,
    slug,
    client,
    title,
    category,
    industry,
    summary,
    goal,
    solution,
    deliverables,
    impact,
    metrics,
    tags,
    image,
    imageAlt,
    video,
    palette,
    featured,
    verificationNote
  }
`);

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    slug,
    client,
    title,
    category,
    industry,
    summary,
    goal,
    solution,
    deliverables,
    impact,
    metrics,
    tags,
    image,
    imageAlt,
    video,
    palette,
    featured,
    verificationNote
  }
`);

export const serviceAreasQuery = defineQuery(`
  *[_type == "serviceArea"] | order(_createdAt asc) {
    _id,
    slug,
    title,
    summary,
    eyebrow,
    value,
    ctaLabel,
    href,
    exampleHref,
    exampleLabel
  }
`);

export const teamMembersQuery = defineQuery(`
  *[_type == "teamMember"] | order(featuredOrder asc, name asc) {
    _id,
    slug,
    name,
    role,
    summary,
    image,
    imageAlt,
    href
  }
`);

export const articlesQuery = defineQuery(`
  *[_type == "article"] | order(datePublished desc, _createdAt desc) {
    _id,
    slug,
    title,
    excerpt,
    body,
    authorName,
    category,
    image,
    imageAlt,
    video,
    datePublished,
    dateModified,
    readingTime,
    seoTitle,
    seoDescription
  }
`);

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    excerpt,
    body,
    authorName,
    category,
    image,
    imageAlt,
    video,
    datePublished,
    dateModified,
    readingTime,
    seoTitle,
    seoDescription
  }
`);
