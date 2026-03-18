"use client";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { siteConfig } from "@/data/site-content";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type SocialLinksRowProps = {
  title: string;
  description?: string;
  compact?: boolean;
  className?: string;
  tone?: "default" | "inverse";
};

function getSocialIcon(name: string) {
  if (name === "Facebook") {
    return FacebookIcon;
  }

  if (name === "LinkedIn") {
    return LinkedInIcon;
  }

  return InstagramIcon;
}

export function SocialLinksRow({
  title,
  description,
  compact = false,
  className,
  tone = "default",
}: SocialLinksRowProps) {
  const { language } = useSitePreferences();
  const titleClassName =
    tone === "inverse"
      ? "text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/52"
      : "eyebrow";
  const descriptionClassName =
    tone === "inverse"
      ? compact
        ? "text-[0.8rem] leading-[1.25rem] text-white/60"
        : "body-copy max-w-lg text-white/72"
      : "body-copy max-w-lg text-[var(--muted)]";
  const linkClassName = cn(
    "social-link",
    compact && "min-h-[1.8rem] gap-1 px-2 py-1 text-[0.72rem] sm:text-[0.76rem]",
    tone === "inverse" &&
      "border-[color:var(--line)] bg-[color:var(--surface)]/76 text-[color:var(--foreground)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]",
  );
  const iconClassName = compact ? "h-[0.82rem] w-[0.82rem]" : "h-4 w-4";
  const linkRowClassName = compact
    ? "mt-1.5 flex flex-wrap gap-1.5 sm:gap-1.5"
    : "mt-3 flex flex-wrap gap-2.5 sm:gap-3";

  return (
    <div className={className}>
      <div className={compact ? "space-y-1" : "space-y-2.5"}>
        <p className={titleClassName}>{title}</p>
        {description ? (
          <p className={descriptionClassName}>
            {description}
          </p>
        ) : null}
      </div>

      <div className={linkRowClassName}>
        {siteConfig.socialLinks.map((item) => {
          const Icon = getSocialIcon(item.name);

          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${item.name} ${language === "no" ? "åpnes i ny fane" : "opens in new tab"}`}
              className={linkClassName}
            >
              <span className="social-link__icon" aria-hidden="true">
                <Icon className={iconClassName} />
              </span>
              <span className={compact ? "hidden sm:inline" : undefined}>{item.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
