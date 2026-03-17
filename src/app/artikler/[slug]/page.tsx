import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleStructuredData } from "@/components/seo/article-structured-data";
import { PageHero } from "@/components/sections/site-sections";
import { VideoEmbed } from "@/components/media/video-embed";
import { getArticleBySlug, getArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: "Artikkel ikke funnet",
      description: "Artikkelen finnes ikke.",
      path: `/artikler/${slug}`,
    });
  }

  return buildMetadata({
    title: article.seoTitle ?? article.title.no,
    description: article.seoDescription ?? article.excerpt.no,
    path: `/artikler/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <ArticleStructuredData
        title={article.title.no}
        description={article.excerpt.no}
        path={`/artikler/${article.slug}`}
        image={article.image}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
        authorName={article.authorName}
      />
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        visualKey="portfolio"
      />

      <section className="section-space pt-0">
        <div className="site-container">
          <article className="glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-7">
            {article.externalVideo ? (
              <div className="mb-6 overflow-hidden rounded-[1.6rem]">
                <VideoEmbed
                  title={article.title}
                  externalVideo={article.externalVideo}
                  image={article.image}
                  imageAlt={article.imageAlt}
                  className="relative aspect-video w-full"
                />
              </div>
            ) : article.image ? (
              <div className="relative mb-6 aspect-video overflow-hidden rounded-[1.6rem]">
                <Image
                  src={article.image}
                  alt={article.imageAlt?.no ?? article.title.no}
                  fill
                  sizes="(min-width: 1024px) 72vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="prose prose-invert max-w-none text-[color:var(--foreground)]">
              <PortableText value={article.body.no} />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
