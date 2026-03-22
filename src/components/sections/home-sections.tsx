"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

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
    no: "Send noen linjer om mål, kanal og timing. Vi foreslår riktig oppsett og neste steg.",
    en: "Send a few lines about the goal, channel and timeline. We recommend the right setup and next step.",
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

function HeroTypewriterTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <span className={cn("hero-typewriter", className)}>
      <span className="hero-typewriter__line">{title.trim()}</span>
    </span>
  );
}

export function HeroSection() {
  const heroVideo = videoLibrary.hero;
  const { language } = useSitePreferences();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isPosterVisible, setIsPosterVisible] = useState(true);

  const eyebrow =
    language === "no"
      ? "Oslo / Reklamefilm / Produksjon"
      : "Oslo / Commercial Film / Production";
  const secondaryCta = language === "no" ? "Se arbeid" : "View work";
  const heroTitle = resolveLocalizedValue(homeHeroContent.title, language);
  const revealVideoFrame = () => {
    setHasVideoError(false);
    setIsPosterVisible(false);
  };

  useEffect(() => {
    const node = videoRef.current;

    if (!node) {
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const syncPlaybackFlags = () => {
      node.defaultMuted = true;
      node.muted = true;
      node.playsInline = true;
      node.setAttribute("muted", "");
      node.setAttribute("playsinline", "");
      node.setAttribute("webkit-playsinline", "");
      node.preload = "auto";
    };

    const revealIfReady = () => {
      if (cancelled) {
        return false;
      }

      if (
        node.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        (node.currentTime > 0 || !node.paused)
      ) {
        revealVideoFrame();
        return true;
      }

      return false;
    };

    const tryPlay = () => {
      if (cancelled) {
        return;
      }

      syncPlaybackFlags();

      if (node.networkState === HTMLMediaElement.NETWORK_EMPTY) {
        node.load();
      }

      void node.play().then(() => {
        revealIfReady();
      }).catch(() => undefined);
    };

    tryPlay();

    [180, 650, 1400, 2600].forEach((delay) => {
      timers.push(
        window.setTimeout(() => {
          if (!revealIfReady() && node.paused) {
            tryPlay();
          }
        }, delay),
      );
    });

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    const handlePageShow = () => {
      tryPlay();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [heroVideo.src]);

  return (
    <section className="relative isolate overflow-hidden bg-[#05070a] text-white">
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 z-[1] block overflow-hidden transition-opacity duration-300 pointer-events-none",
            hasVideoError || isPosterVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={heroVideo.poster ?? ""}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <video
          ref={videoRef}
          className={cn(
            "pointer-events-none absolute inset-0 z-0 h-full w-full object-cover brightness-[1.16] saturate-[1.02] contrast-[1.01] transition-opacity duration-300 sm:brightness-[1.16] sm:saturate-[1.03] sm:contrast-[1.02]",
            hasVideoError ? "opacity-0" : "opacity-100",
          )}
          src={heroVideo.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          onLoadedMetadata={(event) => {
            const node = event.currentTarget;

            node.defaultMuted = true;
            node.muted = true;
            node.playsInline = true;
            node.setAttribute("muted", "");
            node.setAttribute("playsinline", "");
            node.setAttribute("webkit-playsinline", "");
            void node.play().catch(() => undefined);
          }}
          onLoadedData={() => {
            setHasVideoError(false);
          }}
          onCanPlay={(event) => {
            void event.currentTarget.play().catch(() => undefined);
          }}
          onPlaying={() => {
            revealVideoFrame();
          }}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime > 0) {
              revealVideoFrame();
            }
          }}
          onError={() => {
            setHasVideoError(true);
            setIsPosterVisible(true);
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.13)_0%,rgba(5,7,10,0.055)_24%,rgba(5,7,10,0.115)_56%,rgba(5,7,10,0.315)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.31)_0%,rgba(5,7,10,0.21)_22%,rgba(5,7,10,0.075)_56%,rgba(5,7,10,0.035)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(210,173,116,0.11),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(112,143,216,0.06),transparent_22%)]" />
      </div>

      <div className="site-container relative z-[1] flex min-h-[72svh] items-end pb-7 pt-[5.35rem] sm:min-h-[92svh] sm:pb-14 sm:pt-[8.8rem] lg:min-h-[96vh] lg:pb-16 lg:pt-[10.5rem]">
        <div className="w-full">
          <div className="w-full max-w-full sm:max-w-[27rem] lg:max-w-[33rem] xl:max-w-[35rem]">
            <div className="hero-editorial-block">
              <p className="hero-editorial-kicker">{eyebrow}</p>
              <h1 className="hero-title hero-title--editorial text-white">
                <HeroTypewriterTitle title={heroTitle} className="hero-typewriter--gold hero-typewriter--editorial" />
              </h1>
              <p className="hero-editorial-support text-[0.98rem] leading-6 text-white/88 sm:text-[1.02rem] sm:leading-7">
                {resolveLocalizedValue(homeHeroContent.description, language)}
              </p>
            </div>

            <div className="hidden sm:mt-7 sm:flex sm:flex-row sm:gap-3">
              <ButtonLink
                href={siteConfig.bookingHref}
                className="hero-cta-primary w-full sm:w-auto"
              >
                {resolveLocalizedValue(homeHeroContent.ctaLabel, language)}
              </ButtonLink>
              <ButtonLink
                href="#selected-work"
                variant="secondary"
                className="hero-cta-secondary w-full sm:w-auto"
              >
                {secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClientSlider() {
  const { language } = useSitePreferences();
  const label =
    language === "no" ? "Utvalgte kunder" : "Selected clients";

  return (
    <section className="bg-transparent py-4 sm:py-5">
      <div className="site-container">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {label}
        </p>
        <div className="carousel-mobile-bleed mt-3 sm:mt-4.5">
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
    <section id="selected-work" className="section-space pt-[clamp(2.3rem,3.8vw,5.3rem)]">
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

function CountUpValue({
  target,
  prefix = "",
  suffix,
  trigger,
  locale,
  durationMs,
}: {
  target: number;
  prefix?: string;
  suffix: string;
  trigger: boolean;
  locale: string;
  durationMs: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);
  const displayValue = shouldReduceMotion && trigger ? target : value;

  useEffect(() => {
    if (!trigger) {
      return;
    }

    if (shouldReduceMotion) {
      return;
    }

    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    startTimeRef.current = null;

    const startValue = 0;
    const endValue = target;
    const effectiveDuration = durationMs;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / effectiveDuration, 1);
      const eased = easeOutCubic(progress);
      const currentValue = startValue + (endValue - startValue) * eased;

      setValue(progress >= 1 ? endValue : Math.floor(currentValue));

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [durationMs, shouldReduceMotion, target, trigger]);

  return (
    <>
      {prefix}
      {displayValue.toLocaleString(locale)}
      {suffix}
    </>
  );
}

export function ResultsSection() {
  const { language } = useSitePreferences();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsGridRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationReady = shouldReduceMotion || hasAnimated;
  const resultMetrics = useMemo(
    () =>
      language === "no"
        ? [
            {
              value: "100+",
              label: "filmer levert",
              detail: "Over 100 filmer levert for kampanjer, nettsider, annonser og SoMe.",
            },
            {
              value: "5 000 000+",
              label: "visninger på sosiale medier",
              detail: "Over 5 millioner visninger på sosiale medier fra kampanjer og promofilmer.",
            },
            {
              value: "Mer verdi",
              label: "fra samme opptak",
              detail: "Flere versjoner gir lengre levetid, flere uttak og tydeligere ROI.",
            },
          ]
        : [
            {
              value: "100+",
              label: "films delivered",
              detail: "Over 100 films delivered for campaigns, websites, ads and social.",
            },
            {
              value: "5,000,000+",
              label: "social views",
              detail: "Over 5 million social views across campaigns and promo films.",
            },
            {
              value: "More value",
              label: "from one production",
              detail: "More versions create longer use, more cutdowns and clearer ROI.",
            },
          ],
    [language],
  );
  const roiPoints = useMemo(
    () =>
      language === "no"
        ? [
            {
              value: "93%",
              label: "av bedrifter får positiv avkastning fra video",
              detail: "Video er en av de mest lønnsomme kanalene i moderne markedsføring.",
            },
            {
              value: "Opptil 80%",
              label: "høyere konvertering med video",
              detail: "Flere besøk blir til faktiske kunder.",
            },
            {
              value: "87%",
              label: "opplever økt salg fra video",
              detail: "Video driver både leads, kjøp og omsetning.",
            },
          ]
        : [
            {
              value: "93%",
              label: "of businesses report positive ROI from video",
              detail: "Video remains one of the highest-yield channels in modern marketing.",
            },
            {
              value: "Up to 80%",
              label: "higher conversion with video",
              detail: "More visits turn into actual customers.",
            },
            {
              value: "87%",
              label: "report higher sales from video",
              detail: "Video drives leads, purchases and revenue.",
            },
          ],
    [language],
  );
  const animatedRoiPoints = useMemo(
    () => [
      {
        value: (
          <CountUpValue
            target={93}
            suffix="%"
            trigger={animationReady}
            locale={language === "no" ? "nb-NO" : "en-US"}
            durationMs={2200}
          />
        ),
        label: roiPoints[0]?.label ?? "",
        detail: roiPoints[0]?.detail ?? "",
      },
      {
        value: (
          <CountUpValue
            target={80}
            prefix={language === "no" ? "Opptil " : "Up to "}
            suffix="%"
            trigger={animationReady}
            locale={language === "no" ? "nb-NO" : "en-US"}
            durationMs={2200}
          />
        ),
        label: roiPoints[1]?.label ?? "",
        detail: roiPoints[1]?.detail ?? "",
      },
      {
        value: (
          <CountUpValue
            target={87}
            suffix="%"
            trigger={animationReady}
            locale={language === "no" ? "nb-NO" : "en-US"}
            durationMs={2200}
          />
        ),
        label: roiPoints[2]?.label ?? "",
        detail: roiPoints[2]?.detail ?? "",
      },
    ],
    [animationReady, language, roiPoints],
  );
  const animatedMetrics = useMemo(
    () => [
      {
        value: (
          <CountUpValue
            target={100}
            suffix="+"
            trigger={animationReady}
            locale={language === "no" ? "nb-NO" : "en-US"}
            durationMs={3200}
          />
        ),
        label: resultMetrics[0]?.label ?? "",
        detail: resultMetrics[0]?.detail ?? "",
      },
      {
        value: (
          <CountUpValue
            target={5_000_000}
            suffix="+"
            trigger={animationReady}
            locale={language === "no" ? "nb-NO" : "en-US"}
            durationMs={3400}
          />
        ),
        label: resultMetrics[1]?.label ?? "",
        detail: resultMetrics[1]?.detail ?? "",
      },
      {
        value: resultMetrics[2]?.value ?? "",
        label: resultMetrics[2]?.label ?? "",
        detail: resultMetrics[2]?.detail ?? "",
      },
    ],
    [animationReady, language, resultMetrics],
  );

  useEffect(() => {
    const triggerNode = statsGridRef.current ?? sectionRef.current;

    if (shouldReduceMotion || !triggerNode || hasAnimated) {
      return;
    }

    const viewport = window.matchMedia("(max-width: 767px)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const isMobileViewport = viewport.matches || coarsePointer.matches;
    let frameId: number | null = null;
    let mobileFallbackTimer: number | null = null;
    let mobileSafetyTimer: number | null = null;

    const triggerAnimation = () => {
      setHasAnimated((current) => {
        if (current) {
          return current;
        }

        return true;
      });
    };

    const isNearViewport = () => {
      const rect = triggerNode.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const enterBuffer = isMobileViewport ? viewportHeight * 0.95 : viewportHeight * 0.5;
      const exitBuffer = isMobileViewport ? viewportHeight * 0.35 : viewportHeight * 0.18;

      return rect.top <= viewportHeight + enterBuffer && rect.bottom >= -exitBuffer;
    };

    const evaluateTrigger = () => {
      if (isNearViewport()) {
        triggerAnimation();
      }
    };

    const scheduleEvaluation = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(evaluateTrigger);
    };

    scheduleEvaluation();

    window.addEventListener("scroll", scheduleEvaluation, { passive: true });
    window.addEventListener("resize", scheduleEvaluation);
    window.addEventListener("orientationchange", scheduleEvaluation);
    window.addEventListener("pageshow", scheduleEvaluation);

    if (isMobileViewport) {
      mobileFallbackTimer = window.setTimeout(() => {
        const rect = triggerNode.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

        if (rect.top <= viewportHeight * 1.7) {
          triggerAnimation();
          return;
        }

        scheduleEvaluation();
      }, 900);

      mobileSafetyTimer = window.setTimeout(() => {
        const rect = triggerNode.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

        if (window.scrollY > 0 && rect.top <= viewportHeight * 2.2) {
          triggerAnimation();
        }
      }, 1800);
    }

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (mobileFallbackTimer !== null) {
        window.clearTimeout(mobileFallbackTimer);
      }

      if (mobileSafetyTimer !== null) {
        window.clearTimeout(mobileSafetyTimer);
      }

      window.removeEventListener("scroll", scheduleEvaluation);
      window.removeEventListener("resize", scheduleEvaluation);
      window.removeEventListener("orientationchange", scheduleEvaluation);
      window.removeEventListener("pageshow", scheduleEvaluation);
    };
  }, [hasAnimated, shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="section-space">
      <div className="site-container">
        <Reveal y={18}>
          <div className="results-showcase">
            <div className="grid gap-0 lg:grid-cols-[1fr_0.92fr]">
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  {language === "no" ? "Resultater" : "Results"}
                </p>
                <h2 className="feature-title mt-4 max-w-[12ch] text-[color:var(--foreground)]">
                  {language === "no"
                    ? "Film som fortsatt jobber etter publisering."
                    : "Film that keeps working after launch."}
                </h2>
                <p className="mt-4 max-w-[34rem] text-sm leading-7 text-[var(--muted-2)] sm:text-base">
                  {language === "no"
                    ? "Vi bygger filmer som kan brukes i annonser, SoMe og nettside over tid. Det gir mer materiale per opptak, flere uttak og tydeligere kommersiell effekt."
                    : "We build films that can keep working across ads, social and websites over time. That means more material per shoot, more cutdowns and clearer commercial impact."}
                </p>

                <div className="mt-6">
                  <ButtonLink
                    href="/kontakt"
                    className="w-full sm:w-auto"
                  >
                    {language === "no" ? "Book møte" : "Book a meeting"}
                  </ButtonLink>
                </div>

                <div ref={statsGridRef} className="mt-6 grid gap-3 sm:grid-cols-2">
                  {animatedMetrics.slice(0, 2).map((metric) => (
                    <div
                      key={metric.label}
                      className="result-stat-card px-5 py-5"
                    >
                      <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.07em] text-[color:var(--foreground)] sm:text-[3rem]">
                        {metric.value}
                      </p>
                      <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                        {metric.label}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">{metric.detail}</p>
                    </div>
                  ))}
                </div>

              </div>

              <div className="border-t border-[color:var(--line)]/90 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="roi-proof-card px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {language === "no" ? "Forventet ROI" : "Expected ROI"}
                  </p>
                  <h3 className="mt-3 max-w-[15ch] font-display text-[1.75rem] leading-[1.02] tracking-[-0.055em] text-[color:var(--foreground)] sm:text-[2.15rem]">
                    {language === "no"
                      ? "Bevis som støtter investeringene tidligere i prosessen."
                      : "Proof that supports the investment earlier in the process."}
                  </h3>
                  <div className="mt-6 grid gap-6">
                    {animatedRoiPoints.map((item, index) => (
                      <div key={index} className="roi-proof-card__item">
                        <p className="text-[2.15rem] font-semibold leading-none tracking-[-0.075em] text-[color:var(--foreground)] sm:text-[2.55rem]">
                          {item.value}
                        </p>
                        <p className="mt-2 max-w-[19rem] text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                          {item.label}
                        </p>
                        <p className="mt-3 max-w-[23rem] text-sm leading-6 text-[var(--muted-2)] sm:text-[0.98rem]">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhyUsProofSection() {
  const { language, theme } = useSitePreferences();
  const testimonialLogos = useMemo(
    () =>
      new Map(
        clientLogos
          .filter((logo) => ["Ville Gleder", "Nei til Atomvåpen", "Vikingmaxtrading"].includes(logo.name))
          .map((logo) => [logo.name, logo]),
      ),
    [],
  );

  return (
    <section className="section-space pt-0">
      <div className="site-container">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <Reveal y={14}>
            <div className="max-w-[32rem]">
              <p className="eyebrow">{language === "no" ? "Hvorfor oss?" : "Why us?"}</p>
              <h2 className="section-title mt-3 text-[color:var(--foreground)] sm:mt-4">
                {language === "no"
                  ? "Trygg levering med tydelig oppfølging hele veien."
                  : "Reliable delivery with clear follow-through throughout."}
              </h2>
              <p className="body-lead mt-4 text-[var(--muted-2)]">
                {language === "no"
                  ? "Etter proof-delen kommer bekreftelsen: kundene beskriver samarbeidet som nært, ryddig og profesjonelt."
                  : "After the proof comes the confirmation: clients describe the collaboration as close, structured and professional."}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {testimonials.map((testimonial, index) => {
              const logo = testimonialLogos.get(testimonial.company);

              return (
                <Reveal key={`${testimonial.company}-${testimonial.name}`} delay={0.04 * index} y={12}>
                  <blockquote className="result-testimonial-card px-5 py-4.5 text-[var(--muted-2)] sm:px-6 sm:py-5.5">
                    <p className="text-[0.98rem] leading-7 sm:text-[1.03rem]">
                      “{resolveLocalizedValue(testimonial.quote, language)}”
                    </p>
                    <footer className="mt-4 border-t border-[color:var(--line)]/80 pt-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex min-h-[2rem] items-center">
                          {logo ? (
                            <Image
                              src={theme === "dark" ? logo.darkSrc ?? logo.src : logo.lightSrc ?? logo.src}
                              alt={testimonial.company}
                              width={logo.width}
                              height={logo.height}
                              className="block h-[1.65rem] w-auto max-w-[8.5rem] object-contain"
                            />
                          ) : (
                            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                              {testimonial.company}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-[var(--muted)]">{testimonial.name}</span>
                      </div>
                    </footer>
                  </blockquote>
                </Reveal>
              );
            })}
          </div>
        </div>
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
                className="w-full sm:w-auto"
              >
                {resolveLocalizedValue(homeHeroContent.ctaLabel, language)}
              </ButtonLink>
              <ButtonLink
                href="/priser"
                variant="secondary"
                className="w-full sm:w-auto"
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
  const metric = caseStudy.metrics[0]
    ? `${caseStudy.metrics[0].value} ${resolveLocalizedValue(caseStudy.metrics[0].label, language)}`
    : resolveLocalizedValue(caseStudy.category, language);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isPosterVisible, setIsPosterVisible] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const previewVideo = caseStudy.video?.videoType === "direct" ? caseStudy.video : null;
  const isTreningshuset = caseStudy.slug === "treningshuset";
  const hasMobilePreview = Boolean(previewVideo?.mobileSrc || previewVideo?.mobilePoster);
  const useMobilePreview = isTreningshuset && isMobileViewport && hasMobilePreview;
  const previewMediaFit = isTreningshuset ? "contain" : caseStudy.mediaFit ?? "cover";
  const previewImage = useMobilePreview
    ? previewVideo?.mobilePoster ?? caseStudy.image ?? previewVideo?.poster
    : caseStudy.image ?? previewVideo?.poster;
  const previewImageAlt = caseStudy.imageAlt ?? caseStudy.title;
  const previewSizes = featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 36vw, 100vw";
  const previewVideoSrc = useMobilePreview ? previewVideo?.mobileSrc ?? previewVideo?.src : previewVideo?.src;
  const previewVideoPoster = useMobilePreview
    ? previewVideo?.mobilePoster ?? previewVideo?.poster ?? previewImage
    : previewVideo?.poster ?? previewImage;
  const previewMediaClassName = cn(
    previewMediaFit === "contain" ? "object-contain p-4 sm:p-5" : "object-cover",
    "transition duration-700",
    isTreningshuset ? "" : "group-hover:scale-[1.035]",
  );
  const previewMediaStyle = isTreningshuset
    ? { objectPosition: useMobilePreview ? "center top" : "center center" }
    : undefined;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  return (
    <Reveal delay={delay} y={16}>
      <Link href={`/case/${caseStudy.slug}`} className="group block h-full">
        <article
          className={cn(
            "relative h-full overflow-hidden rounded-[1.9rem] bg-[#0c1016] text-white shadow-[0_28px_90px_rgba(0,0,0,0.18)]",
            featured ? "min-h-[24rem] sm:min-h-[29rem] lg:min-h-[34rem]" : "min-h-[18rem] sm:min-h-[20rem]",
          )}
        >
          {previewVideo ? (
            <div className="absolute inset-0 bg-[#05070b]">
              {previewImage ? (
                <div
                  key={`${caseStudy.slug}-${useMobilePreview ? "mobile" : "desktop"}-poster`}
                  className={cn(
                    "absolute inset-0 z-[1] transition-opacity duration-300",
                    hasVideoError || isPosterVisible ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={previewImage}
                    alt={resolveLocalizedValue(previewImageAlt, language)}
                    fill
                    sizes={previewSizes}
                    className={previewMediaClassName}
                    style={previewMediaStyle}
                  />
                </div>
              ) : null}
              <video
                key={`${caseStudy.slug}-${useMobilePreview ? "mobile" : "desktop"}-video`}
                ref={videoRef}
                className={cn("absolute inset-0 z-0 h-full w-full transition-opacity duration-300", previewMediaClassName, hasVideoError ? "opacity-0" : "opacity-100")}
                style={previewMediaStyle}
                src={previewVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                poster={previewVideoPoster}
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                aria-hidden="true"
                onLoadedMetadata={(event) => {
                  const node = event.currentTarget;

                  node.defaultMuted = true;
                  node.muted = true;
                  node.playsInline = true;
                  node.setAttribute("muted", "");
                  node.setAttribute("playsinline", "");
                  node.setAttribute("webkit-playsinline", "");
                  void node.play().catch(() => undefined);
                }}
                onLoadedData={(event) => {
                  if (event.currentTarget.readyState >= 2) {
                    setHasVideoError(false);
                    setIsPosterVisible(false);
                  }
                }}
                onCanPlay={(event) => {
                  void event.currentTarget.play().catch(() => undefined);
                }}
                onPlaying={() => {
                  setHasVideoError(false);
                  setIsPosterVisible(false);
                }}
                onTimeUpdate={(event) => {
                  if (event.currentTarget.currentTime > 0) {
                    setIsPosterVisible(false);
                  }
                }}
                onError={() => {
                  setHasVideoError(true);
                  setIsPosterVisible(true);
                }}
              />
            </div>
          ) : (
            <PreviewMedia
              title={caseStudy.title}
              video={caseStudy.video}
              externalVideo={caseStudy.externalVideo}
              image={caseStudy.image}
              imageAlt={caseStudy.imageAlt}
              mediaFit={caseStudy.mediaFit}
              previewBehavior={caseStudy.video || caseStudy.externalVideo ? "always" : "static"}
              className="absolute inset-0"
              sizes={previewSizes}
              priority={false}
              rootMargin="160px 0px -8% 0px"
              inViewThreshold={0.18}
              posterClassName="transition duration-700 group-hover:scale-[1.035]"
              previewClassName="scale-[1.03]"
            />
          )}
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
