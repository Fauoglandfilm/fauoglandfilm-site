import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/sections/site-sections";
import { getArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Artikler | Fau&Land Film",
  description:
    "Fagstoff, innsikt og prosjektfortellinger fra Fau&Land Film om reklamefilm, produksjon og innholdsarbeid.",
  path: "/artikler",
});

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <PageHero
        eyebrow={{ no: "Artikler", en: "Articles" }}
        title={{ no: "Innsikt, arbeid og faglige notater.", en: "Insights, work and production notes." }}
        description={{
          no: "Artikler og prosjektfortellinger fra Fau&Land Film, publisert med samme premium uttrykk som resten av siden.",
          en: "Articles and project notes from Fau&Land Film, published with the same premium tone as the rest of the site.",
        }}
        visualKey="portfolio"
      />

      <section className="section-space pt-0">
        <div className="site-container">
          {articles.length ? (
            <div className="adaptive-grid-cards">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/artikler/${article.slug}`}
                  className="card-surface group overflow-hidden rounded-[1.8rem]"
                >
                  <div className="relative aspect-[1.2/0.9] overflow-hidden bg-[#0a0d12]">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.imageAlt?.no ?? article.title.no}
                        fill
                        sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.03),rgba(8,8,8,0.26)_56%,rgba(8,8,8,0.82)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                        {article.category.no}
                      </p>
                      <h2 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.04em]">
                        {article.title.no}
                      </h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="body-copy text-[var(--muted-2)]">{article.excerpt.no}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-surface rounded-[1.8rem] p-6">
              <p className="body-copy text-[var(--muted-2)]">
                Ingen artikler er publisert ennå. Når Sanity er koblet opp med innhold, vil de vises her automatisk.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
