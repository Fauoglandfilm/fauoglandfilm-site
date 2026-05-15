import { NextResponse, type NextRequest } from "next/server";

import { requireCurrentUserContext } from "@/lib/frilanseren/queries";
import { buildTimesheetExportModel } from "@/lib/frilanseren/timesheet";
import { createServerComponentClient } from "@/lib/supabase/serverClient";

type TimesheetEntryRow = {
  work_date: string;
  hours: number | string;
  rate: number | string;
  supplement: number | string;
  note: string | null;
};

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const context = await requireCurrentUserContext();
  const { id } = await params;
  const supabase = await createServerComponentClient();

  const { data: timesheet, error } = await supabase
    .from("timesheets")
    .select("*, timesheet_entries(*)")
    .eq("id", id)
    .eq("owner_user_id", context.userId)
    .maybeSingle();

  if (error || !timesheet) {
    return new NextResponse("Timeliste ikke funnet.", { status: 404 });
  }

  const entries = ((timesheet.timesheet_entries ?? []) as TimesheetEntryRow[])
    .map((entry) => ({
      work_date: entry.work_date,
      hours: Number(entry.hours),
      rate: Number(entry.rate),
      supplement: Number(entry.supplement),
      note: entry.note ?? "",
    }))
    .sort((left, right) => left.work_date.localeCompare(right.work_date));

  const model = buildTimesheetExportModel({
    freelancerName: context.userMeta?.full_name ?? context.email,
    employerName: timesheet.employer_name,
    projectName: timesheet.project_name,
    role: timesheet.role_label,
    periodStart: timesheet.period_start,
    periodEnd: timesheet.period_end,
    entries,
  });

  const rows = model.entries
    .map(
      (entry) => `
        <tr>
          <td>${escapeHtml(entry.work_date)}</td>
          <td>${escapeHtml(entry.hours)}</td>
          <td>${escapeHtml(entry.rate)}</td>
          <td>${escapeHtml(entry.supplement)}</td>
          <td>${escapeHtml(entry.lineTotal)}</td>
          <td>${escapeHtml(entry.note)}</td>
        </tr>
      `,
    )
    .join("");

  const html = `<!doctype html>
    <html lang="nb">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(model.title)}</title>
        <style>
          body { color: #111; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 40px; }
          h1 { font-size: 30px; letter-spacing: 0; margin: 0 0 8px; }
          p { line-height: 1.5; }
          table { border-collapse: collapse; margin-top: 24px; width: 100%; }
          th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
          th { font-size: 12px; text-transform: uppercase; }
          .total { font-size: 18px; font-weight: 700; margin-top: 24px; }
          .disclaimer { color: #555; font-size: 13px; margin-top: 32px; }
          @media print { body { margin: 20mm; } }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(model.title)}</h1>
        <p>${escapeHtml(model.freelancerName)} · ${escapeHtml(model.employerName)} · ${escapeHtml(model.periodLabel)}</p>
        <p>Rolle: ${escapeHtml(model.role)}</p>
        <table>
          <thead>
            <tr><th>Dato</th><th>Timer</th><th>Sats</th><th>Tillegg</th><th>Sum</th><th>Notat</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p class="total">Totalt: ${escapeHtml(model.totalHours)} timer · ${escapeHtml(model.totalAmount)} kr</p>
        <p class="disclaimer">${escapeHtml(model.disclaimer)}</p>
      </body>
    </html>`;

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
