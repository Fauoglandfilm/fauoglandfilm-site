import { MarketplaceShell } from "@/components/frilanseren/marketplace-shell";
import { TimesheetForm } from "@/components/frilanseren/timesheet-form";
import { getCurrentUserContext } from "@/lib/frilanseren/queries";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Timeliste",
  description: "Lag enkel timeliste for filmoppdrag i Filmlanseren.",
  path: "/frilanseren/timeliste",
});

export default async function TimesheetPage() {
  const context = await getCurrentUserContext();

  return (
    <MarketplaceShell
      title="Timeliste"
      description="Lag en enkel timeliste med timer, satser, tillegg og utskriftsgrunnlag."
    >
      {!context ? (
        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)]/55 p-4 text-sm leading-6 text-[var(--muted-2)]">
          Du kan se skjemaet her, men må logge inn for å lagre timelisten på kontoen din.
        </div>
      ) : null}
      <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)]/82 p-5">
        <TimesheetForm />
      </div>
    </MarketplaceShell>
  );
}
