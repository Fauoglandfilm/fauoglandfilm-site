"use client";

import { useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PITCH_PASSWORD = "Pitch2025";
const PITCH_SESSION_STORAGE_KEY = "fauoglandfilm-pitch-unlocked";
const CANVA_EMBED_SRC = "https://www.canva.com/design/DAG3RXNIGSE/G4rLZh6jUuoESeePfHQ7bw/view?embed";

function getInitialUnlockedState() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(PITCH_SESSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function PitchPageContent() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(getInitialUnlockedState);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isUnlocked) {
      inputRef.current?.focus();
    }
  }, [isUnlocked]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === PITCH_PASSWORD) {
      setIsUnlocked(true);
      setErrorMessage("");
      setPassword("");

      try {
        window.sessionStorage.setItem(PITCH_SESSION_STORAGE_KEY, "true");
      } catch {}

      return;
    }

    setErrorMessage("Incorrect password. Please try again.");
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPassword("");
    setErrorMessage("");

    try {
      window.sessionStorage.removeItem(PITCH_SESSION_STORAGE_KEY);
    } catch {}
  };

  if (isUnlocked) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#08111b] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(112,143,216,0.22),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(214,176,109,0.18),transparent_24%),linear-gradient(180deg,#08111b_0%,#09131f_52%,#071019_100%)]" />
          <div className="absolute left-[6%] top-[10%] h-40 w-40 rounded-full bg-[#7ba3ff]/10 blur-3xl sm:h-64 sm:w-64" />
          <div className="absolute bottom-[8%] right-[4%] h-48 w-48 rounded-full bg-[#d7b068]/10 blur-3xl sm:h-72 sm:w-72" />
        </div>

        <section className="relative z-[1] p-2.5 sm:p-4">
          <div className="relative flex h-[calc(100dvh-1.25rem)] min-h-[34rem] flex-col overflow-hidden rounded-[1.8rem] border border-white/12 bg-[rgba(9,14,22,0.72)] shadow-[0_36px_110px_rgba(0,0,0,0.4)] backdrop-blur-[24px] sm:h-[calc(100dvh-2rem)] sm:rounded-[2rem]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_22%,rgba(255,255,255,0)_52%)]" />

            <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <div className="flex w-[8.8rem] max-w-full items-center sm:w-[10rem]">
                  <BrandLogo
                    variant="full"
                    priority
                    className="brightness-[1.92] contrast-[1.08] saturate-[1.02] drop-shadow-[0_12px_26px_rgba(0,0,0,0.22)]"
                  />
                </div>
                <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/58">
                  Private pitch presentation
                </p>
              </div>

              <Button
                variant="secondary"
                size="compact"
                className="shrink-0 border-white/14 bg-white/8 text-white hover:border-white/20 hover:bg-white/12"
                onClick={handleLock}
              >
                Lock
              </Button>
            </div>

            <div className="relative min-h-0 flex-1 p-2.5 sm:p-3.5">
              <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0a121d] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-[1.6rem]">
                <iframe
                  src={CANVA_EMBED_SRC}
                  title="Fau&Land Film pitch presentation"
                  loading="eager"
                  allow="fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08111b] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(112,143,216,0.24),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(214,176,109,0.2),transparent_24%),linear-gradient(180deg,#08111b_0%,#09131f_54%,#071019_100%)]" />
        <div className="absolute left-[5%] top-[10%] h-44 w-44 rounded-full bg-[#7ba3ff]/12 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute bottom-[8%] right-[2%] h-52 w-52 rounded-full bg-[#d7b068]/12 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <section className="relative z-[1] flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        <div className="relative w-full max-w-[30rem] overflow-hidden rounded-[2rem] border border-white/14 bg-[rgba(11,16,25,0.72)] shadow-[0_34px_100px_rgba(0,0,0,0.4)] backdrop-blur-[28px]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04)_26%,rgba(255,255,255,0)_56%)]" />

          <div className="relative px-5 py-6 sm:px-7 sm:py-8">
            <div className="mx-auto flex w-[10.4rem] max-w-full justify-center sm:w-[11.8rem]">
              <BrandLogo
                variant="full"
                priority
                className="brightness-[1.92] contrast-[1.08] saturate-[1.04] drop-shadow-[0_14px_30px_rgba(0,0,0,0.24)]"
              />
            </div>

            <div className="mt-7 space-y-3 text-center sm:mt-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/56">
                Private access
              </p>
              <h1 className="font-display text-[clamp(2rem,7vw,3rem)] leading-[0.96] tracking-[-0.055em] text-white">
                Unlock the pitch deck
              </h1>
              <p className="mx-auto max-w-[24rem] text-[0.95rem] leading-7 text-white/68 sm:text-base">
                Enter the password to open the embedded Fau&amp;Land Film presentation in a fullscreen-style viewer.
              </p>
            </div>

            <form className="mt-7 space-y-4 sm:mt-8" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/54">
                  Password
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
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className={cn(
                    "w-full rounded-[1.1rem] border bg-[rgba(255,255,255,0.04)] px-4 py-3.5 text-[0.98rem] font-medium tracking-[-0.02em] text-white outline-none transition placeholder:text-white/28",
                    errorMessage
                      ? "border-[#ff7f7f]/58 focus:border-[#ff9a9a]"
                      : "border-white/12 focus:border-white/26",
                  )}
                />
              </label>

              {errorMessage ? (
                <p className="rounded-[1rem] border border-[#ff8a8a]/22 bg-[#ff8a8a]/10 px-3.5 py-2.5 text-sm text-[#ffd4d4]">
                  {errorMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                fullWidth
                className="justify-center rounded-[1.15rem] bg-[linear-gradient(135deg,#d7b068,#f0cb86)] text-[#111111] shadow-[0_20px_36px_rgba(215,176,104,0.24)] hover:brightness-[1.02]"
              >
                Open presentation
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
