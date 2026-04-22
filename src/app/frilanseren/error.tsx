"use client";

import { useEffect } from "react";

type FrilanserenErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FrilanserenError({ error, reset }: FrilanserenErrorProps) {
  useEffect(() => {
    // Log the technical error to the server/console so ops has a signal.
    // Keep the user-facing message safe and non-leaky.
    console.error("[frilanseren/error-boundary]", {
      message: error?.message,
      digest: error?.digest,
      stack: error?.stack,
    });
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-10">
      <div className="space-y-3">
        <span className="eyebrow">Midlertidig feil</span>
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[0.96] tracking-[-0.055em] text-[color:var(--foreground)]">
          Vi fikk ikke lastet denne siden
        </h1>
        <p className="text-[1rem] leading-7 text-[var(--muted-2)]">
          Noe gikk galt da vi prøvde å åpne Frilanseren akkurat nå. Prøv på nytt om et øyeblikk, eller
          gå tilbake til forsiden.
        </p>
        {error?.digest ? (
          <p className="text-xs text-[var(--muted)]">Feilkode: {error.digest}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="button-base button-size-default button-primary"
        >
          <span className="button-label-base">Prøv igjen</span>
        </button>
        <a
          href="/frilanseren"
          className="button-base button-size-default button-ghost"
        >
          <span className="button-label-base">Tilbake til Frilanseren</span>
        </a>
        <a
          href="/"
          className="text-sm text-[var(--muted-2)] underline underline-offset-4"
        >
          Til forsiden
        </a>
      </div>
    </div>
  );
}
