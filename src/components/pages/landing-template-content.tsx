"use client";

import {
  CtaBanner,
  FeaturedCasesSection,
  PackagesSection,
  PageHero,
  RelatedLinks,
} from "@/components/sections/site-sections";
import { useSitePreferences } from "@/components/providers/site-preferences";
import {
  caseStudies,
  landingTemplateBullets,
  offerPackages,
} from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";

export function LandingTemplateContent() {
  const featuredCases = caseStudies.slice(0, 2);
  const { language } = useSitePreferences();
  const copy = uiCopy.pages[language];

  return (
    <main>
      <PageHero
        eyebrow={{ no: uiCopy.pages.no.landingHeroEyebrow, en: uiCopy.pages.en.landingHeroEyebrow }}
        title={{ no: uiCopy.pages.no.landingHeroTitle, en: uiCopy.pages.en.landingHeroTitle }}
        description={{
          no: uiCopy.pages.no.landingHeroDescription,
          en: uiCopy.pages.en.landingHeroDescription,
        }}
        primaryCta={{ label: { no: uiCopy.pages.no.landingPrimaryCta, en: uiCopy.pages.en.landingPrimaryCta }, href: "/kontakt" }}
      />

      <section className="section-space">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {landingTemplateBullets.map((bullet, index) => (
              <article key={`landing-bullet-${index}`} className="card-surface rounded-[1.6rem] p-5 sm:rounded-[1.8rem] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  {copy.landingPrinciple}
                </p>
                <h2 className="feature-title mt-4 text-[color:var(--foreground)]">
                  {resolveLocalizedValue(bullet, language)}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCasesSection cases={featuredCases} showVerificationNote={false} />
      <PackagesSection packages={offerPackages} />

      <section className="section-space pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RelatedLinks
            links={[
              { href: "/", label: { no: uiCopy.pages.no.landingHome, en: uiCopy.pages.en.landingHome } },
              { href: "/tjenester", label: { no: uiCopy.pages.no.landingServices, en: uiCopy.pages.en.landingServices } },
              { href: "/kontakt", label: { no: uiCopy.pages.no.landingContact, en: uiCopy.pages.en.landingContact } },
            ]}
          />
        </div>
      </section>

      <CtaBanner
        title={{ no: uiCopy.pages.no.landingCtaTitle, en: uiCopy.pages.en.landingCtaTitle }}
        description={{
          no: uiCopy.pages.no.landingCtaDescription,
          en: uiCopy.pages.en.landingCtaDescription,
        }}
        secondaryLabel={null}
        align="center"
      />
    </main>
  );
}
