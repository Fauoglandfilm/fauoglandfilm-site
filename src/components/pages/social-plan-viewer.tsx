"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { PresentationFullscreenHint } from "@/components/ui/presentation-fullscreen-hint";
import {
  SOCIAL_PLAN_CANVA_EMBED_SRC,
  SOCIAL_PLAN_SESSION_STORAGE_KEY,
} from "@/lib/social-plan-access";

function getInitialAccessState() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(SOCIAL_PLAN_SESSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function SocialPlanViewer() {
  const router = useRouter();
  const [hasAccess] = useState(getInitialAccessState);

  useEffect(() => {
    if (!hasAccess) {
      router.replace("/some-plan");
    }
  }, [hasAccess, router]);

  const handleLock = () => {
    try {
      window.sessionStorage.removeItem(SOCIAL_PLAN_SESSION_STORAGE_KEY);
    } catch {}

    router.replace("/some-plan");
  };

  if (!hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f1eb] px-4 text-[#181818]">
        <div className="rounded-[1.5rem] border border-black/8 bg-white px-5 py-4 text-sm text-black/62 shadow-[0_18px_40px_rgba(18,14,10,0.08)]">
          Kontrollerer tilgang...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f3ee_0%,#efede7_100%)] text-[#181818]">
      <section className="p-2.5 sm:p-4">
        <div className="relative flex h-[calc(100dvh-1.25rem)] min-h-[36rem] flex-col overflow-hidden rounded-[1.8rem] border border-black/8 bg-[rgba(255,255,255,0.88)] shadow-[0_32px_90px_rgba(18,14,10,0.12)] backdrop-blur-[18px] sm:h-[calc(100dvh-2rem)] sm:rounded-[2rem]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.08)_20%,rgba(255,255,255,0)_48%)]" />

          <div className="relative flex items-center justify-between gap-4 border-b border-black/8 px-4 py-3.5 sm:px-5 sm:py-4">
            <div className="min-w-0">
              <div className="flex w-[8.8rem] max-w-full items-center sm:w-[9.8rem]">
                <BrandLogo
                  variant="full"
                  priority
                  className="brightness-[0.82] contrast-[1.08] saturate-[0.92]"
                />
              </div>
              <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black/44">
                Sosiale medier plan viewer
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/some-plan"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-black/66 transition hover:border-black/14 hover:text-black"
              >
                <span>Tilbake</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 rotate-180" />
              </Link>
              <Button
                variant="secondary"
                size="compact"
                className="shrink-0 border-black/10 bg-white/70 text-black hover:border-black/14 hover:bg-white"
                onClick={handleLock}
              >
                Lås
              </Button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 p-2.5 sm:p-3.5">
            <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_18px_36px_rgba(18,14,10,0.06)] sm:rounded-[1.55rem]">
              <iframe
                src={SOCIAL_PLAN_CANVA_EMBED_SRC}
                title="Sosiale medier plan"
                loading="eager"
                allow="fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              <PresentationFullscreenHint theme="light" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
