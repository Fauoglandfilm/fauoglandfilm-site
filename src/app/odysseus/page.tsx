import type { Metadata } from "next";

import { OdysseusAutoRefresh } from "@/components/odysseus/auto-refresh";
import { enqueueOdysseusCommand, signOutOdysseusAction } from "@/lib/odysseus/actions";
import { requireOdysseusOwner } from "@/lib/odysseus/auth";
import { loadOdysseusPortalState } from "@/lib/odysseus/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata: Metadata = { title: "Odysseus kontrollrom", robots: { index: false, follow: false } };

function numberAt(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function objectAt(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function formatTime(value: string | null) {
  return value ? new Intl.DateTimeFormat("nb-NO", { dateStyle: "short", timeStyle: "medium" }).format(new Date(value)) : "Aldri";
}

const commandLabels: Record<string, string> = {
  pause_system: "Reduser serverarbeid 90 %",
  resume_system: "Start full kapasitet",
  refresh_status: "Hent fersk status",
  run_crm_sync: "Synkroniser Google Drive-CRM",
  run_sales_maintenance: "Kjør salgssjekk nå",
  stop_delivery: "Nødstopp utsendelser",
  set_daily_send_limit: "Endre daglig grense",
};

export default async function OdysseusPage() {
  await requireOdysseusOwner();
  const state = await loadOdysseusPortalState();
  const system = objectAt(state.snapshot.system);
  const crm = objectAt(state.snapshot.crm);
  const commercial = objectAt(crm.commercial);
  const counters = objectAt(crm.counters);
  const control = objectAt(state.snapshot.system_control);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <OdysseusAutoRefresh />
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7dd3fc]">Fau&Land Film · eierpanel</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.88] tracking-[-0.065em]">Odysseus er {state.online ? "på nett" : "frakoblet"}</h1>
          <p className="mt-4 text-white/55">Sist kontakt: {formatTime(state.lastSeenAt)} · oppdateres hvert 15. sekund</p>
        </div>
        <form action={signOutOdysseusAction}><button className="rounded-full border border-white/15 px-5 py-3 text-sm">Logg ut</button></form>
      </header>

      {!state.configured ? <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-100">Portaldatabasen er ikke ferdig aktivert: {state.error}</div> : null}

      <nav className="flex gap-2 overflow-x-auto pb-2 text-sm">
        {["Oversikt", "Salg", "Utkast", "Oppfølging", "CRM-synk", "System", "Innstillinger", "Hendelser"].map((label) => (
          <a key={label} href={`#${label.toLowerCase().replace("-", "")}`} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/70">{label}</a>
        ))}
      </nav>

      <section id="oversikt" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["CPU", `${numberAt(system.cpu_percent)} %`],
          ["Minne", `${numberAt(system.memory_percent)} %`],
          ["Sendt", numberAt(commercial.sent).toLocaleString("nb-NO")],
          ["Pipeline", `${numberAt(commercial.pipeline_value_nok).toLocaleString("nb-NO")} kr`],
        ].map(([label, value]) => (
          <article key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">{value}</p>
          </article>
        ))}
      </section>

      <section id="salg" className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Salg og utsendelser</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div><p className="text-sm text-white/45">Til kontroll</p><p className="mt-1 text-2xl">{numberAt(commercial.review_candidates)}</p></div>
            <div><p className="text-sm text-white/45">Godkjent</p><p className="mt-1 text-2xl">{numberAt(commercial.approved)}</p></div>
            <div><p className="text-sm text-white/45">Svar</p><p className="mt-1 text-2xl">{numberAt(commercial.responses)}</p></div>
            <div><p className="text-sm text-white/45">Møter</p><p className="mt-1 text-2xl">{numberAt(commercial.meetings)}</p></div>
            <div><p className="text-sm text-white/45">Tilbud</p><p className="mt-1 text-2xl">{numberAt(commercial.offers)}</p></div>
            <div><p className="text-sm text-white/45">Vunnet</p><p className="mt-1 text-2xl">{numberAt(commercial.won_revenue_nok).toLocaleString("nb-NO")} kr</p></div>
          </div>
          <p className="mt-6 rounded-xl bg-black/25 p-4 text-sm leading-6 text-white/55">Nettsiden kan styre kø og innstillinger, men kan ikke omgå historikk-, suppression-, cooldown-, duplikat- eller leveringsportene i Odysseus.</p>
        </article>

        <article id="system" className="rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Systemkontroll</h2>
          <p className="mt-2 text-sm text-white/50">Nå: {control.paused ? "90 % redusert" : "full kapasitet"}</p>
          <div className="mt-5 grid gap-3">
            <form action={enqueueOdysseusCommand}><input type="hidden" name="action" value="resume_system" /><button className="w-full rounded-xl bg-[#7dd3fc] px-4 py-3 font-semibold text-[#07121a]">Start full kapasitet</button></form>
            <form action={enqueueOdysseusCommand}><input type="hidden" name="action" value="pause_system" /><button className="w-full rounded-xl border border-white/15 px-4 py-3">Reduser 90 %</button></form>
            <form action={enqueueOdysseusCommand}><input type="hidden" name="action" value="stop_delivery" /><button className="w-full rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100">Nødstopp utsendelser</button></form>
          </div>
        </article>
      </section>

      <section id="crmsynk" className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">CRM og vedlikehold</h2>
          <p className="mt-2 text-sm text-white/50">Kvalifisert: {numberAt(counters.qualified)} · Research: {numberAt(counters.researched)} · Utkast: {numberAt(counters.drafts)}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <form action={enqueueOdysseusCommand}><input type="hidden" name="action" value="run_crm_sync" /><button className="rounded-xl border border-white/15 px-4 py-3">Synkroniser Drive-CRM</button></form>
            <form action={enqueueOdysseusCommand}><input type="hidden" name="action" value="run_sales_maintenance" /><button className="rounded-xl border border-white/15 px-4 py-3">Kjør salgssjekk</button></form>
            <form action={enqueueOdysseusCommand}><input type="hidden" name="action" value="refresh_status" /><button className="rounded-xl border border-white/15 px-4 py-3">Oppdater status</button></form>
          </div>
        </article>
        <article id="innstillinger" className="rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Innstillinger</h2>
          <form action={enqueueOdysseusCommand} className="mt-5 flex items-end gap-3">
            <input type="hidden" name="action" value="set_daily_send_limit" />
            <label className="flex-1 text-sm text-white/60">Daglig utsendelsesgrense<input name="daily_limit" type="number" min="1" max="50" defaultValue={10} className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white" /></label>
            <button className="rounded-xl bg-white px-4 py-3 font-semibold text-black">Lagre</button>
          </form>
        </article>
      </section>

      <section id="hendelser" className="rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.04em]">Siste kommandoer</h2>
        <div className="mt-5 divide-y divide-white/10">
          {state.commands.length ? state.commands.map((command) => (
            <div key={command.id} className="grid gap-2 py-4 text-sm sm:grid-cols-[1fr_auto_auto]">
              <span>{commandLabels[command.action] ?? command.action}</span>
              <span className="text-white/50">{command.status}</span>
              <span className="text-white/40">{formatTime(command.created_at)}</span>
            </div>
          )) : <p className="py-4 text-white/45">Ingen kommandoer ennå.</p>}
        </div>
      </section>
    </div>
  );
}
