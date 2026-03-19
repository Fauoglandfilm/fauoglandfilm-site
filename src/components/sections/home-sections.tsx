"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PreviewMedia } from "@/components/media/preview-media";
import { useSitePreferences } from "@/components/providers/site-preferences";
import {
  clientLogos,
  homeHeroContent,
  homeServiceVideoLibrary,
  servicePillars,
  siteConfig,
  testimonials,
  videoLibrary,
  type CaseStudy,
  type ServicePillar,
} from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Reveal } from "../motion/reveal";
import { ButtonLink } from "../ui/button-link";
import { ArrowUpRightIcon } from "../ui/icons";
import { ClientLogoMarquee } from "./client-logo-marquee";

const whyChooseUsItems = [
  {
    title: {
      no: "Seniorer på hele produksjonen",
      en: "Senior leads on every production",
    },
    description: {
      no: "Kort vei fra brief til beslutning og tydelig ansvar hele veien.",
      en: "A short path from brief to decisions with clear ownership throughout.",
    },
  },
  {
    title: {
      no: "Bygget for nettside, annonser og SoMe",
      en: "Built for web, ads and social",
    },
    description: {
      no: "Vi planlegger formatene fra start, så filmene faktisk blir brukt.",
      en: "We plan formats from the start so the films actually get used.",
    },
  },
  {
    title: {
      no: "Rask fremdrift uten unødvendig friksjon",
      en: "Fast progress without unnecessary friction",
    },
    description: {
      no: "Færre ledd, tydeligere neste steg og levering som holder tempoet oppe.",
      en: "Fewer handoffs, clearer next steps and delivery that keeps momentum high.",
    },
  },
] satisfies Array<{
  title: LocalizedText;
  description: LocalizedText;
}>;

const closingCtaContent = {
  eyebrow: {
    no: "Neste steg",
    en: "Next step",
  },
  title: {
    no: "Book et kort møte, så foreslår vi riktig oppsett.",
    en: "Book a short meeting and we will recommend the right setup.",
  },
  description: {
    no: "Send noen linjer om mål, kanal og timing. Vi følger opp innen 24 timer.",
    en: "Send a few lines about the goal, channel and timeline. We follow up within 24 hours.",
  },
  secondaryCta: {
    no: "Se priser",
    en: "See pricing",
  },
} satisfies {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  secondaryCta: LocalizedText;
};

export function HeroSection() {
  const heroVideo = videoLibrary.hero;
  const { language } = useSitePreferences();
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const eyebrow =
    language === "no"
      ? "Oslo / Reklamefilm / Produksjon"
      : "Oslo / Commercial Film / Production";
  const secondaryCta = language === "no" ? "Se arbeid" : "View work";
  const activeHeroSrc =
    isMobileViewport && heroVideo.mobileSrc ? heroVideo.mobileSrc : heroVideo.src;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    updateViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video || hasVideoError) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.load();

    const playVideo = () => {
      video
        .play()
        .then(() => undefined)
        .catch(() => {
          window.setTimeout(() => {
            video.play().catch(() => undefined);
          }, 180);
        });
    };

    playVideo();
    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("canplay", playVideo);

    return () => {
      video.removeEventListener("loadedmetadata", playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, [activeHeroSrc, hasVideoError]);

  return (
    <section className="relative isolate overflow-hidden bg-[#05070a] text-white">
      <div className="absolute inset-0">
        {hasVideoError ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroVideo.poster})` }}
          />
        ) : null}
        <video
          ref={heroVideoRef}
          key={activeHeroSrc}
          className="relative h-full w-full scale-[1.03] object-cover brightness-[0.82] saturate-[1.05] contrast-[1.08]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroVideo.poster}
          disablePictureInPicture
          onError={() => setHasVideoError(true)}
          src={activeHeroSrc}
        >
          <source src={activeHeroSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.38)_0%,rgba(5,7,10,0.18)_24%,rgba(5,7,10,0.32)_56%,rgba(5,7,10,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.76)_0%,rgba(5,7,10,0.62)_22%,rgba(5,7,10,0.22)_56%,rgba(5,7,10,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,173,116,0.22),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(112,143,216,0.12),transparent_22%)]" />
      </div>

      <div className="site-container relative z-[1] flex min-h-[74svh] items-end pb-6 pt-[5.8rem] sm:min-h-[92svh] sm:pb-14 sm:pt-[8.8rem] lg:min-h-[96vh] lg:pb-16 lg:pt-[10.5rem]">
        <Reveal y={20} className="w-full">
          <div className="max-w-[42rem]">
            <div className="hero-label-chip">
              <span className="hero-label-chip__segment">
                <span className="hero-label-chip__item">{eyebrow}</span>
              </span>
            </div>
            <h1 className="hero-title mt-4 max-w-[9.4ch] text-white sm:mt-6">
              {resolveLocalizedValue(homeHeroContent.title, language)}
            </h1>
            <p className="mt-3.5 max-w-[32rem] text-[0.94rem] leading-6 text-white/78 sm:mt-5 sm:text-[1.05rem] sm:leading-7">
              {resolveLocalizedValue(homeHeroContent.description, language)}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
              <ButtonLink
                href={siteConfig.bookingHref}
                className="w-full border-white/16 bg-white text-[#111111] hover:bg-white/92 hover:text-[#111111] sm:w-auto"
              >
                {resolveLocalizedValue(homeHeroContent.ctaLabel, language)}
              </ButtonLink>
              <ButtonLink
                href="#selected-work"
                variant="secondary"
                className="w-full border-white/18 bg-white/8 text-white hover:bg-white/14 hover:text-white sm:w-auto"
              >
                {secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ClientSlider() {
  const { language } = useSitePreferences();
  const label =
    language === "no" ? "Utvalgte kunder" : "Selected clients";

  return (
    <section className="border-y border-[color:var(--line)] bg-[color:var(--surface-muted)] py-4 sm:py-6">
      <div className="site-container">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {label}
        </p>
        <div className="mt-3 sm:mt-4.5">
          <ClientLogoMarquee logos={clientLogos} durationSeconds={46} />
        </div>
      </div>
    </section>
  );
}

export function SelectedWorkSection({ items }: { items: CaseStudy[] }) {
  const { language } = useSitePreferences();
  const eyebrow = language === "no" ? "Utvalgt arbeid" : "Selected work";
  const title =
    language === "no"
      ? "Arbeid som gjør det lettere å velge dere."
      : "Work that makes you easier to choose.";
  const description =
    language === "no"
      ? "Et lite utvalg produksjoner brukt til nettside, kampanjer og sosiale medier."
      : "A small set of productions built for websites, campaigns and social media.";

  return (
    <section id="selected-work" className="section-space">
      <div className="site-container">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title mt-3 text-[color:var(--foreground)] sm:mt-4">
              {title}
            </h2>
            <p className="body-lead mt-3 max-w-[34rem] text-[var(--muted-2)] sm:mt-4">
              {description}
            </p>
          </div>
          <ButtonLink href="/case" variant="ghost" className="w-full sm:w-auto">
            {language === "no" ? "Se alle case" : "View all cases"}
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
          {items[0] ? <HomeCaseCard caseStudy={items[0]} featured /> : null}
          <div className="grid gap-4">
            {items.slice(1, 3).map((caseStudy, index) => (
              <HomeCaseCard key={caseStudy.slug} caseStudy={caseStudy} delay={0.06 * (index + 1)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const { language } = useSitePreferences();
  const eyebrow = language === "no" ? "Hvorfor Fau&Land" : "Why Fau&Land";
  const title =
    language === "no"
      ? "Mindre friksjon. Tydeligere levering. Mer brukbar film."
      : "Less friction. Clearer delivery. More useful film.";
  const description =
    language === "no"
      ? "Alt på forsiden deres skal peke mot neste steg. Det samme gjelder hvordan vi produserer."
      : "Everything on your front page should point toward the next step. The same goes for how we produce.";

  return (
    <section className="section-space bg-[color:var(--surface-muted)]">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
          <Reveal y={16}>
            <div className="max-w-[34rem]">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="section-title mt-3 text-[color:var(--foreground)] sm:mt-4">
                {title}
              </h2>
              <p className="body-lead mt-4 text-[var(--muted-2)]">{description}</p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {whyChooseUsItems.map((item, index) => (
              <Reveal key={resolveLocalizedValue(item.title, language)} delay={0.05 * index} y={12}>
                <article className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-5 shadow-[0_18px_48px_rgba(18,14,10,0.06)] sm:px-6 sm:py-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                      0{index + 1}
                    </span>
                    <div className="max-w-[34rem]">
                      <h3 className="font-display text-[1.35rem] leading-[1.02] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.6rem]">
                        {resolveLocalizedValue(item.title, language)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted-2)] sm:text-[0.98rem]">
                        {resolveLocalizedValue(item.description, language)}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const { language } = useSitePreferences();
  const eyebrow = language === "no" ? "Tjenester" : "Services";
  const title =
    language === "no"
      ? "Fire formater vi leverer oftest."
      : "Four formats we deliver most often.";
  const description =
    language === "no"
      ? "Tydelige leveranser for nettside, kampanjer, sosiale medier og arrangementer."
      : "Clear deliverables for websites, campaigns, social media and events.";

  return (
    <section className="section-space">
      <div className="site-container">
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[38rem]">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title mt-3 text-[color:var(--foreground)] sm:mt-4">
              {title}
            </h2>
            <p className="body-lead mt-3 text-[var(--muted-2)] sm:mt-4">{description}</p>
          </div>
          <ButtonLink href="/tjenester" variant="ghost" className="w-full sm:w-auto">
            {language === "no" ? "Se tjenester" : "See services"}
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {servicePillars.map((pillar, index) => (
            <ServiceCard key={pillar.eyebrow} pillar={pillar} delay={0.05 * index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResultsSection() {
  const { language } = useSitePreferences();
  const resultMetrics =
    language === "no"
      ? [
          {
            value: "10",
            label: "filmer levert",
            detail: "Bygget for flere uttak, flater og kampanjer.",
          },
          {
            value: "60 000+",
            label: "SoMe-visninger",
            detail: "Dokumentert rekkevidde fra kampanjer og promofilmer.",
          },
          {
            value: "Mer verdi",
            label: "for samme opptak",
            detail: "Flere versjoner gir lengre levetid og tydeligere ROI.",
          },
        ]
      : [
          {
            value: "10",
            label: "films delivered",
            detail: "Built for multiple cutdowns, placements and campaigns.",
          },
          {
            value: "60,000+",
            label: "social views",
            detail: "Documented reach from campaigns and promo films.",
          },
          {
            value: "More value",
            label: "from one production",
            detail: "More versions create longer use and clearer ROI.",
          },
        ];

  return (
    <section className="section-space">
      <div className="site-container">
        <Reveal y={18}>
          <div className="overflow-hidden rounded-[2rem] bg-[#0d1014] text-white shadow-[0_38px_120px_rgba(0,0,0,0.22)]">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/48">
                  {language === "no" ? "Resultater" : "Results"}
                </p>
                <h2 className="feature-title mt-4 max-w-[13ch] text-white">
                  {language === "no"
                    ? "Film som fortsatt jobber etter publisering."
                    : "Film that keeps working after launch."}
                </h2>
                <p className="mt-4 max-w-[34rem] text-sm leading-7 text-white/72 sm:text-base">
                  {language === "no"
                    ? "Vi bygger filmer som kan brukes i annonser, SoMe og nettside over tid. Det gir mer materiale per opptak, flere uttak og tydeligere kommersiell effekt."
                    : "We build films that can keep working across ads, social and websites over time. That means more material per shoot, more cutdowns and clearer commercial impact."}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {resultMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4"
                    >
                      <p className="text-[1.7rem] font-semibold leading-none tracking-[-0.05em] text-white">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/44">
                        {metric.label}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/66">{metric.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/18 px-5 py-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/44">
                    {language === "no" ? "Forventet ROI" : "Expected ROI"}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {(
                      language === "no"
                        ? [
                            "Flere annonser og uttak fra samme opptak.",
                            "Lenger levetid på innholdet i digitale flater.",
                            "Klarere vei fra synlighet til henvendelser.",
                          ]
                        : [
                            "More ads and cutdowns from the same shoot.",
                            "Longer content lifespan across digital placements.",
                            "A clearer path from visibility to enquiries.",
                          ]
                    ).map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-white/74"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <ButtonLink
                    href="/kontakt"
                    className="w-full border-white/16 bg-white text-[#111111] hover:bg-white/92 hover:text-[#111111] sm:w-auto"
                  >
                    {language === "no" ? "Book møte" : "Book a meeting"}
                  </ButtonLink>
                </div>
              </div>

              <div className="border-t border-white/8 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                  {language === "no" ? "Hvorfor oss?" : "Why us?"}
                </p>
                <div className="mt-5 grid gap-4">
                  {testimonials.map((testimonial) => (
                    <blockquote
                      key={`${testimonial.company}-${testimonial.name}`}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-5 py-5 text-white/78"
                    >
                      <p className="text-[1rem] leading-7 sm:text-[1.06rem]">
                        “{resolveLocalizedValue(testimonial.quote, language)}”
                      </p>
                      <footer className="mt-4 text-sm text-white/54">
                        {testimonial.name} ({testimonial.company})
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ClosingCtaSection() {
  const { language } = useSitePreferences();

  return (
    <section className="section-space pt-0">
      <div className="site-container">
        <Reveal y={16}>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] px-6 py-8 text-white shadow-[0_34px_110px_rgba(0,0,0,0.16)] sm:px-8 sm:py-10 lg:flex lg:items-end lg:justify-between lg:gap-8">
            <div className="max-w-[38rem]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                {resolveLocalizedValue(closingCtaContent.eyebrow, language)}
              </p>
              <h2 className="section-title mt-3 text-white sm:mt-4">
                {resolveLocalizedValue(closingCtaContent.title, language)}
              </h2>
              <p className="body-lead mt-4 text-white/72">
                {resolveLocalizedValue(closingCtaContent.description, language)}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <ButtonLink
                href={siteConfig.bookingHref}
                className="w-full border-white/16 bg-white text-[#111111] hover:bg-white/92 hover:text-[#111111] sm:w-auto"
              >
                {resolveLocalizedValue(homeHeroContent.ctaLabel, language)}
              </ButtonLink>
              <ButtonLink
                href="/priser"
                variant="secondary"
                className="w-full border-white/18 bg-white/8 text-white hover:bg-white/14 hover:text-white sm:w-auto"
              >
                {resolveLocalizedValue(closingCtaContent.secondaryCta, language)}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomeCaseCard({
  caseStudy,
  featured = false,
  delay = 0,
}: {
  caseStudy: CaseStudy;
  featured?: boolean;
  delay?: number;
}) {
  const { language } = useSitePreferences();
  const shouldForcePreview = caseStudy.slug === "treningshuset";
  const metric = caseStudy.metrics[0]
    ? `${caseStudy.metrics[0].value} ${resolveLocalizedValue(caseStudy.metrics[0].label, language)}`
    : resolveLocalizedValue(caseStudy.category, language);

  return (
    <Reveal delay={delay} y={16}>
      <Link href={`/case/${caseStudy.slug}`} className="group block h-full">
        <article
          className={cn(
            "relative h-full overflow-hidden rounded-[1.9rem] bg-[#0c1016] text-white shadow-[0_28px_90px_rgba(0,0,0,0.18)]",
            featured ? "min-h-[24rem] sm:min-h-[29rem] lg:min-h-[34rem]" : "min-h-[18rem] sm:min-h-[20rem]",
          )}
        >
          <PreviewMedia
            title={caseStudy.title}
            video={caseStudy.video}
            externalVideo={caseStudy.externalVideo}
            image={caseStudy.image}
            imageAlt={caseStudy.imageAlt}
            mediaFit={caseStudy.mediaFit}
            previewBehavior={
              caseStudy.video || caseStudy.externalVideo
                ? shouldForcePreview
                  ? "always"
                  : "viewport"
                : "static"
            }
            className="absolute inset-0"
            sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 36vw, 100vw"}
            priority={shouldForcePreview}
            rootMargin="160px 0px -8% 0px"
            inViewThreshold={0.18}
            posterClassName="transition duration-700 group-hover:scale-[1.035]"
            previewClassName="scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.06),rgba(8,10,14,0.08)_24%,rgba(8,10,14,0.78)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,14,0.48),rgba(8,10,14,0.1)_38%,rgba(8,10,14,0.36)_100%)]" />

          <div className="relative z-[1] flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex w-fit rounded-full border border-white/16 bg-black/20 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-md">
                {resolveLocalizedValue(caseStudy.category, language)}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white/86 backdrop-blur-md transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </div>

            <div className={cn("max-w-xl", !featured && "max-w-[20rem]")}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/54">
                {caseStudy.client}
              </p>
              <h3
                className={cn(
                  "mt-2 font-display leading-[0.98] tracking-[-0.055em] text-white",
                  featured ? "text-[clamp(2rem,4vw,3.4rem)]" : "text-[clamp(1.45rem,3vw,2.2rem)]",
                )}
              >
                {resolveLocalizedValue(caseStudy.title, language)}
              </h3>
              <p className="mt-3 max-w-[32rem] text-sm leading-6 text-white/70 sm:text-[0.98rem]">
                {featured ? resolveLocalizedValue(caseStudy.summary, language) : metric}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

function ServiceCard({
  pillar,
  delay,
}: {
  pillar: ServicePillar;
  delay: number;
}) {
  const { language } = useSitePreferences();
  const video = homeServiceVideoLibrary[pillar.eyebrow as keyof typeof homeServiceVideoLibrary];

  return (
    <Reveal delay={delay} y={14}>
      <Link href="/tjenester" className="group block h-full">
        <article className="card-surface flex h-full flex-col overflow-hidden rounded-[1.7rem] shadow-[0_18px_48px_rgba(18,14,10,0.08)]">
          <div className="relative aspect-[1.02/0.78] overflow-hidden bg-[#0b0d12]">
            <PreviewMedia
              title={pillar.title}
              video={video}
              image={video?.poster}
              imageAlt={pillar.title}
              previewBehavior="viewport"
              className="absolute inset-0"
              sizes="(min-width: 1280px) 22vw, (min-width: 640px) 48vw, 100vw"
              rootMargin="140px 0px -8% 0px"
              inViewThreshold={0.16}
              posterClassName="transition duration-700 group-hover:scale-[1.04]"
              previewClassName="scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.02),rgba(8,8,8,0.1)_36%,rgba(8,8,8,0.42)_100%)]" />
            <div className="absolute left-3 top-3 inline-flex rounded-full border border-white/14 bg-black/20 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-md">
              {pillar.eyebrow}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4 sm:p-5">
            <h3 className="font-display text-[1.28rem] leading-[1.02] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.42rem]">
              {resolveLocalizedValue(pillar.title, language)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-2)] sm:text-[0.98rem]">
              {resolveLocalizedValue(pillar.summary, language)}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--foreground)]">
              <span>{language === "no" ? "Se tjenester" : "See services"}</span>
              <ArrowUpRightIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
