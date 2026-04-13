import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/ui/section-shell";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: "Sosiale medier plan | Fau&Land Film",
  description:
    "Få en konkret plan for hva dere skal poste for å få flere kunder fra sosiale medier",
  alternates: {
    canonical: absoluteUrl("/some-plan"),
  },
  openGraph: {
    title: "Sosiale medier plan | Fau&Land Film",
    description:
      "Få en konkret plan for hva dere skal poste for å få flere kunder fra sosiale medier",
    url: absoluteUrl("/some-plan"),
    siteName: siteConfig.name,
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Fau&Land Film - Sosiale medier plan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sosiale medier plan | Fau&Land Film",
    description:
      "Få en konkret plan for hva dere skal poste for å få flere kunder fra sosiale medier",
    images: [absoluteUrl("/opengraph-image")],
  },
};

const valuePoints = [
  "Konkrete poster",
  "Tydelig struktur",
  "Fokus på hva som gir respons og salg",
] as const;

export default function SocialMediaPlanPage() {
  return (
    <main>
      <section className="border-b border-[color:var(--line)]/70 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_97%,white)_0%,color-mix(in_srgb,var(--surface-muted)_92%,white)_100%)] pt-[max(6.6rem,calc(env(safe-area-inset-top,0px)+5.9rem))] sm:pt-[max(7.25rem,calc(env(safe-area-inset-top,0px)+6.4rem))]">
        <div className="site-container">
          <div className="py-10 sm:py-14 lg:py-16">
            <div className="max-w-[43rem]">
              <span className="hero-badge text-[var(--muted)]">Sosiale medier plan</span>
              <h1 className="page-title mt-3 max-w-[12ch] text-[color:var(--foreground)]">
                Få flere kunder fra sosiale medier uten å bruke mer tid
              </h1>
              <p className="body-copy mt-3.5 max-w-2xl text-[var(--muted-2)] sm:mt-4 sm:text-base sm:leading-7">
                Vi lager en konkret plan for hva dere skal poste, når og hvorfor det gir resultater
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-2.5">
                <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                  Book møte
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="mx-auto max-w-[62rem]">
            <div className="overflow-hidden rounded-[1.9rem] border border-[color:var(--line)]/80 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_98%,white),color-mix(in_srgb,var(--surface-muted)_94%,white))] shadow-[0_18px_36px_rgba(18,14,10,0.06)]">
              <div className="relative aspect-square w-full overflow-hidden bg-[color:var(--surface)] sm:aspect-[1/1]">
                <iframe
                  title="Sosiale medier plan Canva"
                  src="https://www.canva.com/design/DAG3XOWLTnA/q-8DUYc6k-SChHrTsPVQ9A/view?embed"
                  loading="lazy"
                  allowFullScreen
                  allow="fullscreen"
                  scrolling="no"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-sm text-[var(--muted)]">
              <Link
                href="https://www.canva.com/design/DAG3XOWLTnA/q-8DUYc6k-SChHrTsPVQ9A/view?utm_content=DAG3XOWLTnA&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[color:var(--foreground)]"
              >
                Sosiale medier plan NTA
              </Link>{" "}
              av Tommy Garland
            </p>
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Hva dere får"
        title="En plan som gjør publisering enklere å gjennomføre."
        description="Kort, konkret og bygget for å gjøre det lettere å poste jevnt med innhold som faktisk støtter salg."
        align="center"
      >
        <div className="grid gap-3.5 sm:grid-cols-3">
          {valuePoints.map((point) => (
            <article
              key={point}
              className="glass-panel rounded-[1.6rem] px-5 py-6 text-center sm:px-5 sm:py-6"
            >
              <p className="font-display text-[1.2rem] leading-[1.02] tracking-[-0.045em] text-[color:var(--foreground)] sm:text-[1.35rem]">
                {point}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>

      <section className="pt-[clamp(0.2rem,0.5vw,0.45rem)] pb-[clamp(0.55rem,1vw,0.9rem)]">
        <div className="site-container">
          <div className="overflow-hidden rounded-[1.2rem] border border-[color:var(--line)]/80 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_96%,white),color-mix(in_srgb,var(--surface-muted)_92%,white))] px-4 py-5 text-center shadow-[0_16px_36px_rgba(18,14,10,0.08)] sm:rounded-[1.35rem] sm:px-6 sm:py-6 lg:px-8">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Neste steg</p>
            <h2 className="mx-auto mt-2 max-w-[20ch] text-balance font-sans text-[clamp(1.35rem,2.8vw,2.15rem)] font-semibold leading-[1.01] tracking-[-0.055em] text-[color:var(--foreground)]">
              Book møte og få en konkret plan å jobbe ut fra.
            </h2>
            <div className="mt-4 flex justify-center">
              <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                Book møte
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
