"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, CloseIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import { SectionShell } from "@/components/ui/section-shell";
import {
  tommyPortfolioPage,
  type TommyPortfolioImage,
  type TommyPortfolioLink,
  type TommyRoleGroup,
  type TommyShortFilmProject,
  type TommyShowcaseProject,
} from "@/data/tommy-profile";
import { siteConfig } from "@/data/site-content";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LightboxState = {
  title: string;
  images: TommyPortfolioImage[];
  index: number;
} | null;

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function getAspectClass(image?: TommyPortfolioImage, fallback: "poster" | "landscape" = "poster") {
  if (!image) {
    return fallback === "landscape" ? "aspect-[16/9]" : "aspect-[0.72/1]";
  }

  switch (image.aspect) {
    case "wide":
      return "aspect-[2.2/1]";
    case "landscape":
      return "aspect-[16/10]";
    case "square":
      return "aspect-square";
    case "portrait":
    default:
      return "aspect-[0.72/1]";
  }
}

function ProjectLinkPill({ link }: { link: TommyPortfolioLink }) {
  const { language } = useSitePreferences();
  const label = link.label;
  const href = link.href;

  if (isExternalHref(href) || link.external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)]/75 bg-[color:var(--surface)]/78 px-3 py-2 text-[0.72rem] font-semibold tracking-[0.12em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]/36 hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
      >
        <span>{resolveLocalizedValue(label, language)}</span>
        <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)]/75 bg-[color:var(--surface)]/78 px-3 py-2 text-[0.72rem] font-semibold tracking-[0.12em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]/36 hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
    >
      <span>{resolveLocalizedValue(label, language)}</span>
      <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0" />
    </Link>
  );
}

function PosterButton({
  image,
  title,
  images,
  onOpen,
  className,
}: {
  image?: TommyPortfolioImage;
  title: string;
  images: TommyPortfolioImage[];
  onOpen: (title: string, images: TommyPortfolioImage[], index?: number) => void;
  className?: string;
}) {
  if (!image) {
    return (
      <div
        className={cn(
          "flex items-end rounded-[1.5rem] border border-dashed border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/78 p-4",
          className,
        )}
      >
        <p className="max-w-[14ch] text-sm font-medium leading-6 text-[var(--muted-2)]">{title}</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(title, images.length ? images : [image], 0)}
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-[color:var(--line)]/70 bg-[#0b0d12] text-left transition hover:border-[color:var(--accent)]/36",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt.no}
        fill
        sizes="(min-width: 1280px) 18rem, (min-width: 768px) 42vw, 100vw"
        className={cn(
          "transition duration-500 group-hover:scale-[1.015]",
          image.fit === "cover" ? "object-cover" : "object-contain p-3 sm:p-4",
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.02),rgba(8,10,14,0.12)_42%,rgba(8,10,14,0.5)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/88 sm:px-4">
        <span>Poster</span>
        <span className="rounded-full border border-white/16 bg-black/26 px-2 py-1 text-[0.58rem] tracking-[0.14em] text-white/82">
          {images.length > 1 ? `${images.length} bilder` : "Åpne"}
        </span>
      </div>
    </button>
  );
}

function GalleryStrip({
  images,
  title,
  onOpen,
}: {
  images: TommyPortfolioImage[];
  title: string;
  onOpen: (title: string, images: TommyPortfolioImage[], index?: number) => void;
}) {
  if (images.length <= 1) {
    return null;
  }

  return (
    <div className="space-y-2.5">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Galleri</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => onOpen(title, images, index)}
            className="relative h-[4.5rem] w-14 shrink-0 overflow-hidden rounded-[0.9rem] border border-[color:var(--line)]/70 bg-[#0b0d12] transition hover:border-[color:var(--accent)]/36"
          >
            <Image
              src={image.src}
              alt={image.alt.no}
              fill
              sizes="56px"
              className={cn(image.fit === "cover" ? "object-cover" : "object-contain p-1.5")}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ShortFilmCard({
  project,
  index,
  onOpenGallery,
}: {
  project: TommyShortFilmProject;
  index: number;
  onOpenGallery: (title: string, images: TommyPortfolioImage[], index?: number) => void;
}) {
  const { language } = useSitePreferences();
  const allImages = [project.poster, ...project.gallery];
  const title = resolveLocalizedValue(project.title, language);

  return (
    <Reveal delay={0.04 * index}>
      <article className="card-surface overflow-hidden rounded-[2rem] p-4 sm:p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(14rem,17rem)_1fr] xl:grid-cols-[18rem_1fr] xl:gap-6">
          <PosterButton
            image={project.poster}
            title={title}
            images={allImages}
            onOpen={onOpenGallery}
            className={cn("w-full", getAspectClass(project.poster))}
          />

          <div className="flex flex-col gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                <span>{project.year}</span>
                <span className="h-1 w-1 rounded-full bg-[color:var(--muted)]/50" />
                <span>{resolveLocalizedValue(project.role, language)}</span>
                <span className="h-1 w-1 rounded-full bg-[color:var(--muted)]/50" />
                <span>{language === "no" ? "Kortfilm" : "Short film"}</span>
              </div>

              <h3 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-[1.72rem]">
                {title}
              </h3>

              <p className="mt-3 max-w-3xl text-[0.94rem] leading-7 text-[var(--muted-2)]">
                {resolveLocalizedValue(project.logline, language)}
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-[1.35rem] border border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/75 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {language === "no" ? "Awards & nominasjoner" : "Awards & nominations"}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {project.awards.map((award) => (
                    <li key={award} className="flex gap-2.5 text-sm leading-6 text-[color:var(--foreground)]/92">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]/58" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.35rem] border border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/75 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {language === "no" ? "Festivaler & seleksjoner" : "Festivals & selections"}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {project.festivals.map((festival) => (
                    <li key={festival} className="flex gap-2.5 text-sm leading-6 text-[color:var(--foreground)]/92">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]/58" />
                      <span>{festival}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <ProjectLinkPill key={`${project.slug}-${link.href}`} link={link} />
              ))}
            </div>

            <GalleryStrip images={allImages} title={title} onOpen={onOpenGallery} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ShowcaseCard({
  project,
  index,
  onOpenGallery,
}: {
  project: TommyShowcaseProject;
  index: number;
  onOpenGallery: (title: string, images: TommyPortfolioImage[], index?: number) => void;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const gallery = project.poster ? [project.poster, ...(project.gallery ?? [])] : project.gallery ?? [];

  return (
    <Reveal delay={0.05 * index}>
      <article className="card-surface overflow-hidden rounded-[1.9rem]">
        {project.poster ? (
          <PosterButton
            image={project.poster}
            title={title}
            images={gallery}
            onOpen={onOpenGallery}
            className={cn("w-full rounded-none", getAspectClass(project.poster, "landscape"))}
          />
        ) : null}

        <div className="p-5 sm:p-6">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{project.client}</div>

          <h3 className="mt-3 text-[1.28rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            {title}
          </h3>

          <p className="mt-3 text-[0.94rem] font-medium leading-7 text-[color:var(--foreground)]/92">
            {resolveLocalizedValue(project.impact, language)}
          </p>

          <p className="mt-2.5 text-sm leading-6 text-[var(--muted-2)]">
            {resolveLocalizedValue(project.summary, language)}
          </p>

          {project.links.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <ProjectLinkPill key={`${project.slug}-${link.href}`} link={link} />
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

function RoleGroupCard({
  group,
  index,
  onOpenGallery,
}: {
  group: TommyRoleGroup;
  index: number;
  onOpenGallery: (title: string, images: TommyPortfolioImage[], index?: number) => void;
}) {
  const { language } = useSitePreferences();

  return (
    <Reveal delay={0.04 * index}>
      <article className="glass-panel rounded-[1.9rem] px-5 py-5 sm:px-6 sm:py-6">
        <div className="space-y-2">
          <h3 className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-[1.2rem]">
            {resolveLocalizedValue(group.title, language)}
          </h3>
          <p className="text-sm leading-6 text-[var(--muted-2)]">
            {resolveLocalizedValue(group.description, language)}
          </p>
        </div>

        <div className="mt-5">
          <div className="mb-4 inline-flex min-h-9 items-center rounded-full border border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/78 px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {language === "no" ? "Producer / Crew" : "Producer / Crew"}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {group.items.map((item) => {
            const gallery = item.poster ? [item.poster] : [];

            return (
              <div key={item.slug} className="min-w-0">
                <div className="flex h-full flex-col gap-3">
                  {item.poster ? (
                    <button
                      type="button"
                      onClick={() => onOpenGallery(resolveLocalizedValue(item.title, language), gallery, 0)}
                      className={cn(
                        "relative w-full shrink-0 overflow-hidden rounded-[1.2rem] border border-[color:var(--line)]/70 bg-[#0b0d12] transition hover:border-[color:var(--accent)]/36",
                        item.poster.aspect === "landscape" || item.poster.aspect === "wide"
                          ? "aspect-[16/10]"
                          : "aspect-[0.72/1]",
                      )}
                    >
                      <Image
                        src={item.poster.src}
                        alt={resolveLocalizedValue(item.poster.alt, language)}
                        fill
                        sizes="(min-width: 1280px) 14rem, (min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw"
                        className={cn(item.poster.fit === "cover" ? "object-cover" : "object-contain p-1.5")}
                      />
                    </button>
                  ) : (
                    <div className="flex aspect-[0.72/1] items-end rounded-[1.2rem] border border-dashed border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/76 p-4">
                      <p className="max-w-[12ch] text-sm font-medium leading-6 text-[var(--muted)]">
                        {resolveLocalizedValue(item.title, language)}
                      </p>
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-[color:var(--foreground)]">
                      {resolveLocalizedValue(item.title, language)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function GalleryLightbox({
  state,
  onClose,
  onSelect,
}: {
  state: LightboxState;
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const { language } = useSitePreferences();

  useEffect(() => {
    if (!state) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, state]);

  if (!state) {
    return null;
  }

  const activeImage = state.images[state.index];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(4,6,10,0.82)] px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={state.title}>
      <button type="button" aria-label={language === "no" ? "Lukk galleri" : "Close gallery"} className="absolute inset-0" onClick={onClose} />

      <div className="relative z-[1] w-full max-w-5xl rounded-[2rem] border border-white/12 bg-[rgba(10,14,22,0.58)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/62">
              {language === "no" ? "Galleri" : "Gallery"}
            </p>
            <h3 className="mt-2 text-[1.15rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.32rem]">
              {state.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white transition hover:bg-white/16"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#090c12]">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={activeImage.src}
              alt={resolveLocalizedValue(activeImage.alt, language)}
              fill
              sizes="100vw"
              className={cn(activeImage.fit === "cover" ? "object-cover" : "object-contain p-4 sm:p-6")}
            />
          </div>
        </div>

        {state.images.length > 1 ? (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {state.images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => onSelect(index)}
                className={cn(
                  "relative h-[4.5rem] w-14 shrink-0 overflow-hidden rounded-[0.95rem] border transition",
                  state.index === index
                    ? "border-white/42"
                    : "border-white/12 hover:border-white/24",
                )}
              >
                <Image
                  src={image.src}
                  alt={resolveLocalizedValue(image.alt, language)}
                  fill
                  sizes="56px"
                  className={cn(image.fit === "cover" ? "object-cover" : "object-contain p-1.5")}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function TommyProfileContent() {
  const { language } = useSitePreferences();
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const profile = tommyPortfolioPage.baseProfile;

  const openGallery = (title: string, images: TommyPortfolioImage[], index = 0) => {
    setLightbox({
      title,
      images,
      index,
    });
  };

  return (
    <main>
      <section className="relative isolate overflow-hidden pt-22 sm:pt-28">
        <div className="absolute inset-0 bg-[#05070a]" />
        <Image
          src={profile.heroBackground}
          alt={resolveLocalizedValue(profile.heroBackgroundAlt, language)}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_16%] opacity-24 sm:object-[72%_14%] sm:opacity-28 lg:opacity-34"
        />
        <div className="absolute inset-0 bg-[linear-gradient(94deg,rgba(5,7,11,0.96),rgba(5,7,11,0.88)_24%,rgba(5,7,11,0.56)_52%,rgba(5,7,11,0.74)_100%),linear-gradient(180deg,rgba(5,7,11,0.08),rgba(5,7,11,0.18)_34%,rgba(5,7,11,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(212,177,120,0.18),transparent_24%),radial-gradient(circle_at_78%_20%,rgba(116,150,255,0.1),transparent_24%)]" />
        <div className="grain-overlay absolute inset-0 opacity-34" />

        <div className="site-container relative z-[1] grid gap-7 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-8 lg:py-18 xl:grid-cols-[minmax(0,1fr)_23rem]">
          <Reveal className="max-w-3xl" delay={0.04} y={18}>
            <div className="text-white">
              <ButtonLink
                href="/om-oss"
                variant="ghost"
                size="compact"
                className="w-fit border-white/14 text-white/82 hover:border-white/26 hover:text-white"
              >
                {language === "no" ? "Tilbake til Om oss" : "Back to About"}
              </ButtonLink>

              <span className="hero-badge mt-5 text-white/72">
                {resolveLocalizedValue(tommyPortfolioPage.heroEyebrow, language)}
              </span>
              <h1 className="page-title mt-4 max-w-[11ch] text-white">
                {resolveLocalizedValue(tommyPortfolioPage.heroTitle, language)}
              </h1>
              <p className="mt-4 max-w-[39rem] text-[0.98rem] leading-7 text-white/84 sm:text-[1.04rem] sm:leading-8">
                {resolveLocalizedValue(tommyPortfolioPage.heroDescription, language)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {tommyPortfolioPage.heroRoles.map((role) => (
                  <span
                    key={resolveLocalizedValue(role, language)}
                    className="inline-flex min-h-9 items-center justify-center rounded-full border border-white/14 bg-white/8 px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/86 backdrop-blur-md"
                  >
                    {resolveLocalizedValue(role, language)}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                  {resolveLocalizedValue(tommyPortfolioPage.heroPrimaryCta, language)}
                </ButtonLink>
                <ButtonLink href="#tommy-shortfilms" variant="secondary" className="w-full border-white/18 bg-white/8 text-white hover:bg-white/14 hover:text-white sm:w-auto">
                  {resolveLocalizedValue(tommyPortfolioPage.heroSecondaryCta, language)}
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={18}>
            <article className="hero-glass-panel overflow-hidden rounded-[2rem] p-4 sm:p-5">
              <div className="relative overflow-hidden rounded-[1.45rem] border border-white/12 bg-[#07090d]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={profile.portrait}
                    alt={resolveLocalizedValue(profile.portraitAlt, language)}
                    fill
                    sizes="(min-width: 1280px) 23rem, (min-width: 1024px) 20rem, 100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.04),rgba(8,10,14,0.12)_56%,rgba(8,10,14,0.62)_100%)]" />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/62">
                  {language === "no" ? "Direkte kontakt" : "Direct contact"}
                </p>
                <div className="grid gap-2">
                  <a
                    href={`mailto:${tommyPortfolioPage.contactEmail}`}
                    className="inline-flex items-center gap-3 rounded-[1rem] border border-white/12 bg-white/7 px-3.5 py-3 text-sm text-white/88 transition hover:bg-white/12"
                  >
                    <MailIcon className="h-4.5 w-4.5 shrink-0" />
                    <span className="truncate">{tommyPortfolioPage.contactEmail}</span>
                  </a>
                  <a
                    href={siteConfig.phonePrimaryHref}
                    className="inline-flex items-center gap-3 rounded-[1rem] border border-white/12 bg-white/7 px-3.5 py-3 text-sm text-white/88 transition hover:bg-white/12"
                  >
                    <PhoneIcon className="h-4.5 w-4.5 shrink-0" />
                    <span>{tommyPortfolioPage.contactPhone}</span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <SectionShell
        id="tommy-shortfilms"
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.shortFilmsEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.shortFilmsTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.shortFilmsDescription, language)}
        className="pt-0"
      >
        <div className="grid gap-4">
          {tommyPortfolioPage.shortFilms.map((project, index) => (
            <ShortFilmCard
              key={project.slug}
              project={project}
              index={index}
              onOpenGallery={openGallery}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.otherRolesEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.otherRolesTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.otherRolesDescription, language)}
        className="pt-0"
      >
        <div className="grid gap-4">
          {tommyPortfolioPage.otherRoleGroups.map((group, index) => (
            <RoleGroupCard
              key={group.slug}
              group={group}
              index={index}
              onOpenGallery={openGallery}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.commercialEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.commercialTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.commercialDescription, language)}
        className="pt-0"
      >
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {tommyPortfolioPage.commercialProjects.map((project, index) => (
            <ShowcaseCard
              key={project.slug}
              project={project}
              index={index}
              onOpenGallery={openGallery}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.eventsEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.eventsTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.eventsDescription, language)}
        className="pt-0"
      >
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {tommyPortfolioPage.eventProjects.map((project, index) => (
            <ShowcaseCard
              key={project.slug}
              project={project}
              index={index}
              onOpenGallery={openGallery}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.aboutEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.aboutTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.aboutDescription, language)}
        className="pt-0"
      >
        <Reveal>
          <article className="card-surface overflow-hidden rounded-[2rem] p-5 sm:p-6 lg:p-7">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="space-y-5">
                <div className="space-y-3">
                  {tommyPortfolioPage.aboutHighlights.map((item) => (
                    <div key={resolveLocalizedValue(item, language)} className="flex gap-3">
                      <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]/58" />
                      <p className="text-[0.98rem] leading-7 text-[color:var(--foreground)]/92">
                        {resolveLocalizedValue(item, language)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${tommyPortfolioPage.contactEmail}`}
                    className="inline-flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)]/75 bg-[color:var(--surface-muted)]/76 px-4 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]/36"
                  >
                    <MailIcon className="h-4.5 w-4.5 shrink-0 text-[color:var(--accent)]/74" />
                    <span className="truncate">{tommyPortfolioPage.contactEmail}</span>
                  </a>
                  <a
                    href={siteConfig.phonePrimaryHref}
                    className="inline-flex items-center gap-3 rounded-[1rem] border border-[color:var(--line)]/75 bg-[color:var(--surface-muted)]/76 px-4 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]/36"
                  >
                    <PhoneIcon className="h-4.5 w-4.5 shrink-0 text-[color:var(--accent)]/74" />
                    <span>{tommyPortfolioPage.contactPhone}</span>
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                {tommyPortfolioPage.aboutInfoGroups.map((group) => (
                  <div
                    key={resolveLocalizedValue(group.title, language)}
                    className="rounded-[1.5rem] border border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/76 p-4"
                  >
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {resolveLocalizedValue(group.title, language)}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={resolveLocalizedValue(item, language)}
                          className="flex gap-2.5 text-sm leading-6 text-[var(--muted-2)]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]/58" />
                          <span>{resolveLocalizedValue(item, language)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </SectionShell>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <article className="card-surface overflow-hidden rounded-[2rem] px-5 py-6 sm:px-6 sm:py-6 lg:px-7">
              <div className="max-w-3xl space-y-3">
                <span className="eyebrow">{profile.name}</span>
                <h2 className="section-title text-[color:var(--foreground)]">
                  {resolveLocalizedValue(tommyPortfolioPage.ctaTitle, language)}
                </h2>
                <p className="body-lead max-w-2xl text-[var(--muted-2)]">
                  {resolveLocalizedValue(tommyPortfolioPage.ctaDescription, language)}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                  {resolveLocalizedValue(tommyPortfolioPage.ctaPrimaryLabel, language)}
                </ButtonLink>
                <ButtonLink href="/kontakt" variant="ghost" className="w-full sm:w-auto">
                  {resolveLocalizedValue(tommyPortfolioPage.ctaSecondaryLabel, language)}
                  <ArrowUpRightIcon className="h-4 w-4" />
                </ButtonLink>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {tommyPortfolioPage.contactEmail} · {tommyPortfolioPage.contactPhone} · {siteConfig.locationLabel}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <GalleryLightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onSelect={(index) =>
          setLightbox((current) => (current ? { ...current, index } : current))
        }
      />
    </main>
  );
}
