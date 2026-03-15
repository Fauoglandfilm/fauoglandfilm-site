import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBanner, PageHero } from "@/components/sections/site-sections";
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
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
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
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04),rgba(17,17,17,0.24))]" />
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
                  className={`flex aspect-[4/5] items-end bg-gradient-to-br ${
                    caseStudy.palette ?? "from-[#efe9df] via-[#d4c8b5] to-[#bba68a]"
                  } p-6 sm:p-8`}
                >
                  <div className="max-w-sm rounded-[1.6rem] border border-white/28 bg-white/62 p-5 backdrop-blur">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {caseStudy.category}
                    </p>
                    <h2 className="mt-3 font-display text-[2rem] leading-[0.95] text-[#111111] sm:text-[2.5rem]">
                      {caseStudy.client}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                      {caseStudy.summary}
                    </p>
                  </div>
                </div>
              )}
            </article>

            <article className="card-surface rounded-[2rem] p-5 sm:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
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
                    className="rounded-[1.2rem] border border-black/8 bg-white/74 px-4 py-3.5"
                  >
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>

            {caseStudy.verificationNote ? (
              <div className="rounded-[1.4rem] border border-dashed border-[var(--accent)]/35 bg-[var(--accent)]/10 p-4 text-sm leading-6 text-[var(--accent-2)]">
                {caseStudy.verificationNote}
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="card-surface rounded-[1.6rem] p-4 sm:p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {metric.label}
                  </p>
                  <p className="mt-3 font-display text-[1.7rem] leading-none text-[#111111] sm:text-[2rem]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Mål
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[0.95] text-[#111111] sm:text-[2.6rem]">
                  Hva kunden trengte at innholdet skulle løse
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {caseStudy.goal}
                </p>
              </article>

              <article className="card-surface rounded-[2rem] p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Løsning
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {caseStudy.solution}
                </p>

                <div className="mt-5 rounded-[1.3rem] border border-black/8 bg-white/72 p-4">
                  <p className="text-sm font-semibold text-[#111111]">Det vi leverte</p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-6 text-[var(--muted-2)]">
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
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Effekt
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted-2)] sm:text-base sm:leading-7">
                  {caseStudy.impact}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/8 bg-white/64 px-3.5 py-1.5 text-sm text-[#111111]"
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
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Flere prosjekter</p>
              <h2 className="mt-3 font-display text-[2rem] leading-[0.94] text-[#111111] sm:text-[2.8rem]">
                Se lignende case eller gå rett til en prat
              </h2>
            </div>
            <Link
              href="/case"
              className="rounded-full border border-black/10 bg-white/72 px-4 py-2 text-sm font-semibold text-[#111111]/68 transition hover:text-[#111111]"
            >
              Tilbake til caseoversikt
            </Link>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {relatedCases.map((entry) => (
              <Link
                key={entry.slug}
                href={`/case/${entry.slug}`}
                className="card-surface rounded-[1.8rem] p-5 transition duration-200 hover:-translate-y-1"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {entry.client}
                </p>
                <h3 className="mt-3 font-display text-[1.8rem] leading-[0.98] text-[#111111]">
                  {entry.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{entry.summary}</p>
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
