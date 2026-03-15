import {
  CtaBanner,
  FeaturedCasesSection,
  PageHero,
  PackagesSection,
  RelatedLinks,
} from "@/components/sections/site-sections";
import {
  caseStudies,
  landingTemplateBullets,
  offerPackages,
} from "@/data/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Landingsside-mal | Kampanjer og lead pages",
  description:
    "En enkel og premium landingsside-mal for Fau&Land Film som kan brukes til annonser, outbound og segmenterte kampanjer med tydelig CTA.",
  path: "/landingsside-mal",
});

export default function LandingTemplatePage() {
  const featuredCases = caseStudies.slice(0, 2);

  return (
    <main>
      {/* Bytt hero-copy, proof og CTA her når dere lager en faktisk kampanjelandingsside. */}
      <PageHero
        eyebrow="Landingsside-mal"
        title="En enkel mal for kampanjer som skal skape leads"
        description="Bygget for ett tydelig tilbud, ett tydelig budskap og en tydelig handling."
        primaryCta={{ label: "Book et møte", href: "/kontakt" }}
      />

      <section className="section-space">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {landingTemplateBullets.map((bullet) => (
              <article key={bullet} className="card-surface rounded-[1.8rem] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  Malprinsipp
                </p>
                <h2 className="mt-4 font-display text-3xl leading-[0.96] text-[#111111]">
                  {bullet}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCasesSection cases={featuredCases} showVerificationNote={false} />
      <PackagesSection packages={offerPackages} />

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RelatedLinks
            links={[
              { href: "/", label: "Til forsiden" },
              { href: "/tjenester", label: "Se tjenester" },
              { href: "/kontakt", label: "Gå til kontakt" },
            ]}
          />
        </div>
      </section>

      <CtaBanner
        title="Vil dere lage en egen landingsside for et konkret tilbud eller segment?"
        description="Malen kan tilpasses raskt til en kampanje, et bransjeutspill eller en målgruppe med helt egen salgsflate."
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
