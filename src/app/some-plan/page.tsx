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
      <section className="bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_98%,white)_0%,color-mix(in_srgb,var(--surface-muted)_94%,white)_100%)] pt-[max(3.9rem,calc(env(safe-area-inset-top,0px)+3.2rem))] sm:pt-[max(4.25rem,calc(env(safe-area-inset-top,0px)+3.45rem))]">
        <div className="site-container">
          <div className="pb-8 pt-3 sm:pb-10 sm:pt-4 lg:pb-12 lg:pt-5">
            <div className="max-w-[40rem]">
              <span className="hero-badge text-[var(--muted)]">Sosiale medier plan</span>
              <h1 className="mt-2 max-w-[9ch] text-balance font-sans text-[clamp(3.7rem,9vw,6.4rem)] font-semibold leading-[0.88] tracking-[-0.085em] text-[color:var(--foreground)]">
                Få flere kunder fra sosiale medier uten å bruke mer tid
              </h1>
              <p className="mt-3 max-w-[34rem] text-[1rem] leading-7 text-[var(--muted-2)] sm:text-[1.04rem]">
                Vi lager en konkret plan for hva dere skal poste, når og hvorfor det gir resultater
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-2.5">
                <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                  Book møte
                </ButtonLink>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[2rem] border border-[color:var(--line)]/80 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_99%,white),color-mix(in_srgb,var(--surface-muted)_95%,white))] shadow-[0_26px_56px_rgba(18,14,10,0.08)] sm:mt-7 lg:mt-8">
              <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)]/70 px-4 py-3 sm:px-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Sosiale medier plan
                </p>
                <span className="hidden h-2.5 w-2.5 rounded-full bg-[color:var(--foreground)]/18 sm:block" />
              </div>
              <div className="p-2 sm:p-3">
                <div className="overflow-hidden rounded-[1.45rem] border border-[color:var(--line)]/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                  <div className="relative h-[clamp(32rem,74vh,72rem)] w-full bg-[color:var(--surface)]">
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
              </div>
              <div className="border-t border-[color:var(--line)]/70 px-4 py-3 text-center sm:px-5">
                <p className="text-sm text-[var(--muted)]">
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
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Hva dere får"
        title="En plan som gjør publisering enklere å gjennomføre."
        description="Kort, konkret og bygget for å gjøre det lettere å poste jevnt med innhold som faktisk støtter salg."
        align="center"
        className="pt-8 sm:pt-10 lg:pt-12"
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
