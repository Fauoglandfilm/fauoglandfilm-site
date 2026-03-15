"use client";

import { useEffect, useRef, useState } from "react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import type { WorkSample } from "@/data/site-content";
import { uiCopy } from "@/data/ui-copy";
import { resolveLocalizedValue } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { ArrowUpRightIcon, CloseIcon, PlayIcon } from "../ui/icons";

type WorkGridProps = {
  items: WorkSample[];
};

export function WorkGrid({ items }: WorkGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const { language } = useSitePreferences();
  const copy = uiCopy.home[language];

  const activeItem = items.find((item) => item.slug === activeSlug) ?? null;

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSlug(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  const playPreview = (slug: string) => {
    const element = videoRefs.current[slug];
    element?.play().catch(() => undefined);
  };

  const pausePreview = (slug: string) => {
    const element = videoRefs.current[slug];
    if (!element) {
      return;
    }

    element.pause();
    element.currentTime = 0;
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.slug}
            type="button"
            className="group text-left"
            onClick={() => setActiveSlug(item.slug)}
            onMouseEnter={() => playPreview(item.slug)}
            onMouseLeave={() => pausePreview(item.slug)}
            onFocus={() => playPreview(item.slug)}
            onBlur={() => pausePreview(item.slug)}
          >
            <article className="overflow-hidden rounded-[1.6rem] border border-black/8 bg-white/70 shadow-[0_24px_60px_rgba(18,18,18,0.06)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(18,18,18,0.08)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    item.accent ?? "from-[#efe9df] via-[#ddd4c7] to-[#c4b49c]",
                  )}
                />
                <video
                  ref={(element) => {
                    videoRefs.current[item.slug] = element;
                  }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  muted
                  loop
                  playsInline
                  preload="none"
                >
                  <source src={item.video.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,19,19,0.02),rgba(19,19,19,0.08)_45%,rgba(19,19,19,0.44)_100%)]" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/24 bg-white/12 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur sm:bottom-4 sm:left-4">
                  <PlayIcon className="h-3.5 w-3.5" />
                  {copy.workWatch}
                </div>
              </div>

              <div className="space-y-2 p-3.5 sm:p-4">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {resolveLocalizedValue(item.category, language)}
                </p>
                <div className="space-y-1">
                  <h3 className="font-display text-[1.05rem] leading-[1.02] text-[color:var(--foreground)] sm:text-[1.35rem]">
                    {resolveLocalizedValue(item.title, language)}
                  </h3>
                  <p className="text-sm text-[var(--muted-2)]">{item.client}</p>
                </div>
              </div>
            </article>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[70] flex items-end bg-[rgba(10,10,10,0.82)] p-3 backdrop-blur md:items-center md:justify-center md:p-6"
          onClick={() => setActiveSlug(null)}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] text-white shadow-[0_32px_120px_rgba(0,0,0,0.4)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/44">
                  {resolveLocalizedValue(activeItem.category, language)}
                </p>
                <h3 className="mt-1 font-display text-[1.2rem] text-white sm:text-[1.5rem]">
                  {resolveLocalizedValue(activeItem.title, language)}
                </h3>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white"
                onClick={() => setActiveSlug(null)}
                aria-label={copy.workCloseVideo}
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-black">
              <video
                className="aspect-video w-full object-cover"
                src={activeItem.video.src}
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm text-white/58">{activeItem.client}</p>
                <p className="mt-2 text-sm leading-6 text-white/74 sm:text-base sm:leading-7">
                  {resolveLocalizedValue(activeItem.summary, language)}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/70">
                {copy.workSelectedWork}
                <ArrowUpRightIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
