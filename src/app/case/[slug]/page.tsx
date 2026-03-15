import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CtaBanner,
  PageHero,
} from "@/components/sections/site-sections";
import { caseStudies } from "@/data/site-content";
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
      title: "Case finnes ikke",
      description: "Denne casen ble ikke funnet.",
      path: `/case/${slug}`,
    });
  }

  return buildMetadata({
    title: `${caseStudy.client} | ${caseStudy.title}`,
    description: caseStudy.summary,
    path: `/case/${caseStudy.slug}`,
    keywords: caseStudy.tags,
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
    name: `${caseStudy.client} - ${caseStudy.title}`,
    description: caseStudy.summary,
    url: absoluteUrl(`/case/${caseStudy.slug}`),
    creator: "Fau&Land Film AS",
    about: caseStudy.tags,
  };

  return (
    <main>
      <PageHero
        eyebrow={caseStudy.client}
        title={caseStudy.title}
        description={caseStudy.summary}
        primaryCta={{ label: "Book et møte", href: "/kontakt" }}
        secondaryCta={{ label: "Se flere case", href: "/case" }}
        video={caseStudy.video}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />

      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-5">
            <article className="card-surface overflow-hidden rounded-[2rem]">
              {caseStudy.video ? (
                <div className="relative aspect-[4/5] w-full">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={caseStudy.video.poster}
                  >
                    <source src={caseStudy.video.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,15,0.12),rgba(4,8,15,0.72))]" />
                </div>
              ) : caseStudy.image ? (
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.imageAlt ?? `${caseStudy.client} case`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`flex aspect-[4/5] items-end bg-gradient-to-br ${caseStudy.palette ?? "from-[#111827] via-[#0f172a] to-[#020617]"} p-6`}
                >
                  <div className="max-w-sm rounded-[1.4rem] border border-white/10 bg-black/25 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                      {caseStudy.category}
                    </p>
                    <h2 className="mt-2.5 font-display text-[2.3rem] text-white">{caseStudy.client}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/78 sm:text-base sm:leading-7">{caseStudy.summary}</p>
                  </div>
                </div>
              )}
            </article>

            <article className="card-surface rounded-[2rem] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                Prosjektfakta
              </p>
              <dl className="mt-5 grid gap-3">
                {[
                  ["Kategori", caseStudy.category],
                  ["Bransje", caseStudy.industry],
                  ["Leveranse", caseStudy.deliverables.join(", ")],
                  ["Impact", caseStudy.impact],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.2rem] border border-white/10 bg-[var(--panel-2)] px-4 py-3.5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-white sm:text-base sm:leading-7">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            {caseStudy.verificationNote ? (
              <div className="rounded-[1.4rem] border border-dashed border-[var(--accent)]/35 bg-[var(--accent)]/8 p-4 text-sm leading-6 text-[#f1deab]">
                {caseStudy.verificationNote}
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="card-surface rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-[1.7rem] font-semibold text-white sm:text-[1.9rem]">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                  Mål
                </p>
                <h2 className="mt-2.5 font-display text-[2.2rem] text-white sm:text-[2.5rem]">
                  Hva kunden trengte at innholdet skulle løse
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">{caseStudy.goal}</p>
              </article>

              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                  Løsning
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">{caseStudy.solution}</p>

                <div className="mt-5 rounded-[1.3rem] border border-white/10 bg-[var(--panel-2)] p-4">
                  <p className="text-sm font-semibold text-white">Det vi leverte</p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-6 text-[var(--muted)]">
                    {caseStudy.deliverables.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                  Effekt
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">{caseStudy.impact}</p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-white/84"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-2)]">
                Flere prosjekter
              </p>
              <h2 className="mt-2.5 font-display text-[2.2rem] text-white sm:text-[2.6rem]">
                Se lignende case eller gå rett til en prat
              </h2>
            </div>
            <Link
              href="/case"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--muted)] transition hover:border-white/24 hover:text-white"
            >
              Tilbake til caseoversikt
            </Link>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {relatedCases.map((entry) => (
              <Link
                key={entry.slug}
                href={`/case/${entry.slug}`}
                className="card-surface rounded-[1.7rem] p-5 transition duration-200 hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)]">
                  {entry.client}
                </p>
                <h3 className="mt-2.5 font-display text-[1.9rem] text-white">{entry.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Lignende prosjekt på gang?"
        description="Fortell kort hva dere vil oppnå, så viser vi hvordan et lignende oppsett kan tilpasses budsjett, kanal og ønsket effekt."
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
