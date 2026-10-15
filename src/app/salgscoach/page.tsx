import type { PostgrestError } from "@supabase/supabase-js";

import { signOutSalgscoachAction } from "@/lib/salgscoach/actions";
import { requireSalgscoachUser } from "@/lib/salgscoach/access";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CallSummary = {
  id: string;
  analyzed_at: string;
  call_type: string;
  duration_seconds: number;
  north_star_score: number;
  score_band: string | null;
  source: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDuration(seconds: number) {
  const minutes = Math.max(0, Math.round(Number(seconds || 0) / 60));
  return `${minutes} min`;
}

function cloudMessage(error: PostgrestError | null) {
  if (!error) return null;
  return "Skyhistorikken er ikke aktivert ennå. Samtalene i desktopappen forblir lagret lokalt.";
}

export default async function SalgscoachPage() {
  const { supabase, user } = await requireSalgscoachUser();
  const { data, error } = await supabase
    .from("calls")
    .select(
      "id, analyzed_at, call_type, duration_seconds, north_star_score, score_band, source",
    )
    .eq("user_id", user.id)
    .order("analyzed_at", { ascending: false })
    .limit(20);
  const calls = (data ?? []) as CallSummary[];
  const average = calls.length
    ? calls.reduce((sum, call) => sum + Number(call.north_star_score || 0), 0) /
      calls.length
    : null;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9aa5ff]">
            Samtaleoversikt
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.9] tracking-[-0.065em]">
            Salgscoach
          </h1>
          <p className="mt-4 text-white/55">Innlogget som {user.email}</p>
        </div>
        <form action={signOutSalgscoachAction}>
          <button className="rounded-full border border-white/15 px-5 py-3 text-sm">
            Logg ut
          </button>
        </form>
      </header>

      {cloudMessage(error) ? (
        <div className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5 text-amber-100">
          {cloudMessage(error)}
        </div>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Antall vist</p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{calls.length}</p>
        </article>
        <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Snitt av viste</p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            {average === null ? "–" : `${average.toFixed(1)}/10`}
          </p>
        </article>
        <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Opptak</p>
          <p className="mt-3 text-xl font-semibold">Desktopappen</p>
          <p className="mt-2 text-sm leading-6 text-white/50">Wispr med nett · lokal mikrofon uten nett</p>
        </article>
      </section>

      <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Historikk
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Siste samtaler</h2>
          </div>
          <p className="text-sm text-white/45">Opptil 20 nyeste · kun din konto</p>
        </div>

        <div className="mt-5 divide-y divide-white/10">
          {calls.length ? (
            calls.map((call) => (
              <article
                className="grid gap-2 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                key={call.id}
              >
                <div>
                  <p className="font-medium">{call.call_type || "Salgssamtale"}</p>
                  <p className="mt-1 text-sm text-white/45">
                    {formatDate(call.analyzed_at)} · {formatDuration(call.duration_seconds)}
                  </p>
                </div>
                <span className="text-sm text-white/55">{call.source}</span>
                <strong className="text-xl">{Number(call.north_star_score).toFixed(1)}/10</strong>
              </article>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-lg font-medium">Ingen synkroniserte samtaler ennå</p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/50">
                Ingenting flyttes automatisk fra Mac-en. Historikken vises her først når sikker skysynk er aktivert og kontrollert.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
