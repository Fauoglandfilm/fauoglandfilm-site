import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseDetailContent } from "@/components/pages/case-detail-content";
import { caseStudies } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type CaseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: CaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((entry) => entry.slug === slug);

  if (!caseStudy) {
    return buildMetadata({
      title: uiCopy.pages.no.caseMissingTitle,
      description: uiCopy.pages.no.caseMissingDescription,
      path: `/case/${slug}`,
    });
  }

  return buildMetadata({
    title: `${caseStudy.client} | ${caseStudy.title.no}`,
    description: caseStudy.summary.no,
    path: `/case/${caseStudy.slug}`,
    keywords: caseStudy.tags.map((tag) => tag.no),
  });
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((entry) => entry.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCases = caseStudies
    .filter((entry) => entry.slug !== caseStudy.slug)
    .slice(0, 3);

  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${caseStudy.client} - ${caseStudy.title.no}`,
    description: caseStudy.summary.no,
    url: absoluteUrl(`/case/${caseStudy.slug}`),
    creator: "Fau&Land Film AS",
    about: caseStudy.tags.map((tag) => tag.no),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />
      <CaseDetailContent caseStudy={caseStudy} relatedCases={relatedCases} />
    </>
  );
}
