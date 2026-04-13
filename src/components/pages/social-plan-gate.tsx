"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SOCIAL_PLAN_PASSWORD,
  SOCIAL_PLAN_SESSION_STORAGE_KEY,
  SOCIAL_PLAN_VIEWER_PATH,
} from "@/lib/social-plan-access";

export function SocialPlanGate() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === SOCIAL_PLAN_PASSWORD) {
      try {
        window.sessionStorage.setItem(SOCIAL_PLAN_SESSION_STORAGE_KEY, "true");
      } catch {}

      setErrorMessage("");
      setPassword("");
      router.push(SOCIAL_PLAN_VIEWER_PATH);
      return;
    }

    setErrorMessage("Feil passord. Prøv igjen.");
  };

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_98%,white),color-mix(in_srgb,var(--surface-muted)_93%,white))] text-[color:var(--foreground)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,191,154,0.16),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(28,36,52,0.07),transparent_20%)]" />
        <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-[#f1ead7] blur-3xl sm:h-56 sm:w-56" />
      </div>

      <section className="relative z-[1] flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 pb-16 pt-[max(5.6rem,calc(env(safe-area-inset-top,0px)+4.8rem))] sm:px-6 sm:pb-20 sm:pt-[max(6rem,calc(env(safe-area-inset-top,0px)+5rem))]">
        <div className="w-full max-w-[31rem]">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--line)]/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.84))] shadow-[0_28px_70px_rgba(18,14,10,0.12)] backdrop-blur-[18px]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.14)_28%,rgba(255,255,255,0)_62%)]" />

            <div className="relative px-5 py-6 sm:px-7 sm:py-8">
              <div className="mx-auto flex w-[10rem] max-w-full justify-center sm:w-[11rem]">
                <BrandLogo
                  variant="full"
                  priority
                  className="brightness-[0.82] contrast-[1.08] saturate-[0.92]"
                />
              </div>

              <div className="mt-7 space-y-3 text-center sm:mt-8">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  Midlertidig tilgang
                </p>
                <h1 className="text-balance font-sans text-[clamp(2rem,6vw,3rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[color:var(--foreground)]">
                  Åpne sosial medier-planen
                </h1>
                <p className="mx-auto max-w-[23rem] text-[0.96rem] leading-7 text-[var(--muted-2)] sm:text-base">
                  Skriv inn passordet for å åpne planen i en ren visningsflate.
                </p>
              </div>

              <form className="mt-7 space-y-4 sm:mt-8" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Passord
                  </span>
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (errorMessage) {
                        setErrorMessage("");
                      }
                    }}
                    placeholder="Skriv inn passord"
                    autoComplete="current-password"
                    className={cn(
                      "w-full rounded-[1.15rem] border bg-white/72 px-4 py-3.5 text-[0.98rem] font-medium tracking-[-0.02em] text-[color:var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70",
                      errorMessage
                        ? "border-[#c96e64]/55 focus:border-[#c96e64]"
                        : "border-[color:var(--line)]/80 focus:border-[color:var(--foreground)]/18",
                    )}
                  />
                </label>

                {errorMessage ? (
                  <p className="rounded-[1rem] border border-[#c96e64]/18 bg-[#c96e64]/8 px-3.5 py-2.5 text-sm text-[#8d433b]">
                    {errorMessage}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  fullWidth
                  className="justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,#181818,#2a2a2a)] text-white shadow-[0_20px_34px_rgba(18,14,10,0.18)] hover:brightness-[1.03]"
                >
                  Åpne plan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
