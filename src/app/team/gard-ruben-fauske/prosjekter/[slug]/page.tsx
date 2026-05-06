import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GardProjectPageContent } from "@/components/pages/gard-project-page-content";
import {
  getGardProjectBySlug,
  getGardProjectIndex,
  getGardProjectPath,
  getGardRelatedProjects,
} from "@/data/gard-profile";
import { resolveLocalizedValue } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type GardProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getGardProjectIndex().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: GardProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getGardProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Gard-prosjekt",
      description: "Prosjektside for Gard Ruben Fauske i Fau&Land Film.",
      path: getGardProjectPath(slug),
    });
  }

  return buildMetadata({
    title: `${project.client} | ${resolveLocalizedValue(project.title, "no")}`,
    description: resolveLocalizedValue(project.summary, "no"),
    path: getGardProjectPath(project.slug),
    keywords: [
      project.client,
      resolveLocalizedValue(project.format, "no"),
      resolveLocalizedValue(project.group.title, "no"),
    ],
  });
}

export default async function GardProjectPage({ params }: GardProjectPageProps) {
  const { slug } = await params;
  const project = getGardProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getGardRelatedProjects(slug);

  return (
    <GardProjectPageContent
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
