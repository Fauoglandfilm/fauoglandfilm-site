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
        ? "text-[0.88rem] leading-6 text-white/66"
        : "body-copy max-w-lg text-white/72"
      : "body-copy max-w-lg text-[var(--muted)]";
  const linkClassName = cn(
    "social-link",
    compact && "min-h-[2.2rem] gap-2 px-3 py-2 text-[0.78rem] sm:text-[0.8rem]",
  );
  const iconClassName = compact ? "h-[0.95rem] w-[0.95rem]" : "h-4 w-4";
  const linkRowClassName = compact
    ? "mt-2.5 flex flex-wrap gap-2.5 sm:gap-2"
    : "mt-3 flex flex-wrap gap-2.5 sm:gap-3";

  return (
    <div className={className}>
      <div className={compact ? "space-y-1.5" : "space-y-2.5"}>
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
              <span>{item.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
