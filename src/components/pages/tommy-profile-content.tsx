"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { ProfileImageCard } from "@/components/pages/profile-image-card";
import { useSitePreferences } from "@/components/providers/site-preferences";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import {
  tommyPortfolioPage,
  type TommyPortfolioImage,
  type TommyPortfolioLink,
  type TommyRoleItem,
  type TommyShortFilmProject,
  type TommyShowcaseProject,
} from "@/data/tommy-profile";
import { siteConfig } from "@/data/site-content";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
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
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)]/78 px-3.5 py-2 text-[0.72rem] font-semibold tracking-[0.12em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]/38 hover:bg-[color:var(--surface-2)] hover:text-[color:var(--foreground)]"
      >
        <span>{resolveLocalizedValue(label, language)}</span>
        <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)]/78 px-3.5 py-2 text-[0.72rem] font-semibold tracking-[0.12em] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]/38 hover:bg-[color:var(--surface-2)] hover:text-[color:var(--foreground)]"
    >
      <span>{resolveLocalizedValue(label, language)}</span>
      <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0" />
    </Link>
  );
}

function PosterButton({
  image,
  title,
  className,
}: {
  image?: TommyPortfolioImage;
  title: string;
  className?: string;
}) {
  if (!image) {
    return (
      <div
        className={cn(
          "flex items-end rounded-[1.45rem] border border-dashed border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/78 p-4",
          className,
        )}
      >
        <p className="max-w-[14ch] text-sm font-medium leading-6 text-[var(--muted-2)]">{title}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.45rem] border border-[color:var(--line)]/70 bg-[#0b0d12] text-left",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt.no}
        fill
        sizes="(min-width: 1280px) 18rem, (min-width: 768px) 42vw, 100vw"
        className={cn(
          "transition duration-500",
          image.fit === "cover" ? "object-cover" : "object-contain p-3 sm:p-4",
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.02),rgba(8,10,14,0.12)_42%,rgba(8,10,14,0.5)_100%)]" />
    </div>
  );
}

function ShortFilmCard({
  project,
  index,
}: {
  project: TommyShortFilmProject;
  index: number;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);
  const credits = project.credits ?? [];
  const awards = project.awards ?? [];
  const festivals = project.festivals ?? [];
  const infoSections: ProjectDetailGroup[] = [
    { label: language === "no" ? "Awards / priser" : "Awards", items: awards },
    { label: language === "no" ? "Credits" : "Credits", items: credits },
    { label: language === "no" ? "Festivaler & seleksjoner" : "Festivals & selections", items: festivals },
  ].filter((section) => section.items.length > 0);

  return (
    <Reveal delay={0.04 * index}>
      <article className="card-surface group flex h-full flex-col overflow-hidden rounded-[1.7rem] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--line-strong)]">
        <div className="relative">
          <PosterButton
            image={project.poster}
            title={title}
            className="aspect-[16/10] w-full rounded-none border-0"
          />
          <div className="grain-overlay absolute inset-0 opacity-20" />
          <div className="absolute inset-x-3 bottom-3 z-[2] flex flex-wrap items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/78">
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-white/32" />
            <span>{language === "no" ? "Kortfilm" : "Short film"}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="founder-profile-chip">{resolveLocalizedValue(project.role, language)}</span>
            {awards.length ? (
              <span className="founder-profile-chip founder-profile-chip-muted">
                {awards.length} {language === "no" ? "priser" : "awards"}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-[1.18rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.28rem]">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
            {resolveLocalizedValue(project.logline, language)}
          </p>

          <div className="mt-4 grid gap-2">
            {infoSections.map((section) => (
              <ProjectDetails key={`${project.slug}-${section.label}`} section={section} />
            ))}
          </div>

          {project.links.length ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
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

function ShowcaseCard({
  project,
  index,
}: {
  project: TommyShowcaseProject;
  index: number;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(project.title, language);

  return (
    <Reveal delay={0.05 * index}>
      <article className="card-surface group flex h-full flex-col overflow-hidden rounded-[1.7rem] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--line-strong)]">
        {project.poster ? (
          <PosterButton
            image={project.poster}
            title={title}
            className="aspect-[16/10] w-full rounded-none border-0"
          />
        ) : null}

        <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
          <div className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {project.client}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="founder-profile-chip founder-profile-chip-muted">
              {resolveLocalizedValue(project.role, language)}
            </span>
          </div>

          <h3 className="mt-3 text-[1.18rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.28rem]">
            {title}
          </h3>

          <p className="mt-3 text-sm font-medium leading-6 text-[color:var(--foreground)]/92">
            {resolveLocalizedValue(project.impact, language)}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-2)]">
            {resolveLocalizedValue(project.summary, language)}
          </p>

          {project.links.length ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
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

type ProjectDetailGroup = {
  label: string;
  items: string[];
};

function ProjectDetails({ section }: { section: ProjectDetailGroup }) {
  if (!section.items.length) {
    return null;
  }

  return (
    <details className="group/details rounded-[1.05rem] border border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/68 px-3 py-2.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:text-[color:var(--foreground)]">
        <span>{section.label}</span>
        <span className="rounded-full border border-[color:var(--line)]/70 px-2 py-0.5 text-[0.58rem] text-[var(--muted-2)]">
          {section.items.length}
        </span>
      </summary>
      <ul className="mt-3 space-y-2.5">
        {section.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-6 text-[color:var(--foreground)]/92">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]/58" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

function RoleItemCard({
  item,
  index,
}: {
  item: TommyRoleItem;
  index: number;
}) {
  const { language } = useSitePreferences();
  const title = resolveLocalizedValue(item.title, language);

  return (
    <Reveal delay={0.04 * index}>
      <article className="card-surface group flex h-full flex-col overflow-hidden rounded-[1.7rem] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--line-strong)]">
        <PosterButton
          image={item.poster}
          title={title}
          className="aspect-[16/10] w-full rounded-none border-0"
        />

        <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
          <span className="founder-profile-chip founder-profile-chip-muted w-fit">
            {language === "no" ? "Film & TV" : "Film & TV"}
          </span>

          <h3 className="mt-3 text-[1.18rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[1.28rem]">
            {title}
          </h3>

          {item.summary ? (
            <p className="mt-3 text-sm leading-6 text-[var(--muted-2)]">
              {resolveLocalizedValue(item.summary, language)}
            </p>
          ) : null}

          {item.links?.length ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {item.links.map((link) => (
                <ProjectLinkPill key={`${item.slug}-${link.href}`} link={link} />
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}

function TommyGridSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section-space pt-0">
      <div className="site-container">
        <Reveal className="max-w-3xl">
          <div className="space-y-3">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title text-[color:var(--foreground)]">{title}</h2>
            {description ? (
              <p className="body-lead text-[var(--muted-2)]">{description}</p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-7 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {children}
        </div>
      </div>
    </section>
  );
}

export function TommyProfileContent() {
  const { language } = useSitePreferences();
  const profile = tommyPortfolioPage.baseProfile;

  return (
    <main>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),linear-gradient(180deg,#0b1220_0%,#0d1422_52%,#101723_100%)] pt-[6.35rem] sm:pt-28">
        <div className="site-container py-8 sm:py-10 lg:py-14">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] md:items-end lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:gap-12">
            <Reveal className="max-w-3xl" delay={0.04} y={18}>
              <div className="max-w-[42rem] text-white">
                <ButtonLink
                  href="/om-oss"
                  variant="ghost"
                  size="compact"
                  className="w-fit border-white/14 text-white/84 hover:border-white/26 hover:text-white"
                >
                  {language === "no" ? "Tilbake til Om oss" : "Back to About"}
                </ButtonLink>

                <span className="hero-badge mt-5 text-white/72">
                  {resolveLocalizedValue(tommyPortfolioPage.heroTitle, language)}
                </span>
                <h1 className="page-title mt-4 max-w-[10ch] text-white">{profile.name}</h1>
                <p className="mt-4 max-w-[34rem] text-[1rem] leading-7 text-white/84 sm:text-[1.08rem] sm:leading-8">
                  {resolveLocalizedValue(tommyPortfolioPage.heroDescription, language)}
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                    {resolveLocalizedValue(tommyPortfolioPage.heroPrimaryCta, language)}
                  </ButtonLink>
                  <ButtonLink href="#tommy-shortfilms" variant="secondary" className="w-full sm:w-auto">
                    {resolveLocalizedValue(tommyPortfolioPage.heroSecondaryCta, language)}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} y={18} className="w-full md:flex md:justify-end">
              <ProfileImageCard
                src={profile.portrait}
                alt={resolveLocalizedValue(profile.portraitAlt, language)}
                priority
                sizes="(min-width: 1024px) 22rem, (min-width: 768px) 20rem, 72vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <article className="card-surface relative overflow-hidden rounded-[2rem] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)]" />
              <div className="relative grid gap-5 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:items-stretch">
                <aside className="rounded-[1.55rem] border border-[color:var(--line)]/75 bg-[color:var(--surface-muted)]/72 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-4">
                  <div className="media-frame relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#090b10]">
                    <Image
                      src={profile.portrait}
                      alt={resolveLocalizedValue(profile.portraitAlt, language)}
                      fill
                      sizes="(min-width: 1280px) 19rem, (min-width: 1024px) 24vw, 100vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,10,0.02),rgba(7,8,10,0.06)_44%,rgba(7,8,10,0.62)_100%)]" />
                    <div className="grain-overlay absolute inset-0 opacity-20" />
                    <div className="absolute inset-x-3 bottom-3">
                      <span className="founder-profile-chip border-white/16 bg-white/10 text-white/86">
                        {resolveLocalizedValue(profile.role, language)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      {language === "no" ? "Produksjon / Oslo" : "Production / Oslo"}
                    </p>
                    <h2 className="text-[1.55rem] font-semibold leading-none tracking-[-0.055em] text-[color:var(--foreground)] sm:text-[1.8rem]">
                      {profile.name}
                    </h2>
                    <p className="text-sm leading-6 text-[var(--muted-2)]">
                      {resolveLocalizedValue(profile.tagline, language)}
                    </p>
                  </div>
                </aside>

                <div className="flex min-w-0 flex-col justify-between gap-6 px-1 py-1 sm:px-2 sm:py-2 lg:px-4">
                  <div>
                    <span className="eyebrow">{resolveLocalizedValue(profile.introEyebrow, language)}</span>
                    <h2 className="mt-3 max-w-[18ch] text-[clamp(2rem,4.2vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-[color:var(--foreground)]">
                      {resolveLocalizedValue(profile.introTitle, language)}
                    </h2>
                    <p className="mt-5 max-w-3xl text-[1rem] leading-7 text-[var(--muted-2)] sm:text-[1.05rem] sm:leading-8">
                      {resolveLocalizedValue(profile.introBody, language)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2.5">
                      {tommyPortfolioPage.heroRoles.map((role) => (
                        <span
                          key={resolveLocalizedValue(role, language)}
                          className="founder-profile-chip founder-profile-chip-muted"
                        >
                          {resolveLocalizedValue(role, language)}
                        </span>
                      ))}
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      {tommyPortfolioPage.aboutHighlights.map((item) => (
                        <div
                          key={resolveLocalizedValue(item, language)}
                          className="rounded-[1.2rem] border border-[color:var(--line)]/70 bg-[color:var(--surface-muted)]/68 p-4"
                        >
                          <span className="mb-3 block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]/70" />
                          <p className="text-sm leading-6 text-[color:var(--foreground)]/90">
                            {resolveLocalizedValue(item, language)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <TommyGridSection
        id="tommy-shortfilms"
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.shortFilmsEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.shortFilmsTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.shortFilmsDescription, language)}
      >
        {tommyPortfolioPage.shortFilms.map((project, index) => (
          <ShortFilmCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </TommyGridSection>

      <TommyGridSection
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.otherRolesEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.otherRolesTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.otherRolesDescription, language)}
      >
        {tommyPortfolioPage.otherRoleGroups.flatMap((group) => group.items).map((item, index) => (
          <RoleItemCard
            key={item.slug}
            item={item}
            index={index}
          />
        ))}
      </TommyGridSection>

      <TommyGridSection
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.commercialEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.commercialTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.commercialDescription, language)}
      >
        {tommyPortfolioPage.commercialProjects.map((project, index) => (
          <ShowcaseCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </TommyGridSection>

      <TommyGridSection
        eyebrow={resolveLocalizedValue(tommyPortfolioPage.eventsEyebrow, language)}
        title={resolveLocalizedValue(tommyPortfolioPage.eventsTitle, language)}
        description={resolveLocalizedValue(tommyPortfolioPage.eventsDescription, language)}
      >
        {tommyPortfolioPage.eventProjects.map((project, index) => (
          <ShowcaseCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </TommyGridSection>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal className="max-w-3xl">
            <div className="space-y-3">
              <span className="eyebrow">{resolveLocalizedValue(tommyPortfolioPage.aboutEyebrow, language)}</span>
              <h2 className="section-title text-[color:var(--foreground)]">
                {resolveLocalizedValue(tommyPortfolioPage.aboutTitle, language)}
              </h2>
              <p className="body-lead text-[var(--muted-2)]">
                {resolveLocalizedValue(tommyPortfolioPage.aboutDescription, language)}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <article className="card-surface mt-7 overflow-hidden rounded-[2rem] px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
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
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-container">
          <Reveal>
            <article className="card-surface overflow-hidden rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,1.08fr)] lg:items-end">
                <div className="space-y-3">
                  <span className="eyebrow">{profile.name}</span>
                  <h2 className="section-title text-[color:var(--foreground)]">
                    {resolveLocalizedValue(tommyPortfolioPage.ctaTitle, language)}
                  </h2>
                  <p className="body-lead max-w-2xl text-[var(--muted-2)]">
                    {resolveLocalizedValue(tommyPortfolioPage.ctaDescription, language)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                      {resolveLocalizedValue(tommyPortfolioPage.ctaPrimaryLabel, language)}
                    </ButtonLink>
                    <ButtonLink href="/kontakt" variant="secondary" className="w-full sm:w-auto">
                      {resolveLocalizedValue(tommyPortfolioPage.ctaSecondaryLabel, language)}
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </ButtonLink>
                    <ButtonLink href={siteConfig.phonePrimaryHref} variant="ghost" className="w-full sm:w-auto">
                      {siteConfig.phonePrimary}
                    </ButtonLink>
                  </div>

                  <p className="text-sm leading-6 text-[var(--muted)]">
                    {tommyPortfolioPage.contactEmail} · {tommyPortfolioPage.contactPhone} · {siteConfig.locationLabel}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
