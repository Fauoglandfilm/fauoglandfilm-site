import type { TimesheetEntryInput, TimesheetExportModel } from "./market-types";

export const TIMESHEET_DISCLAIMER =
  "Denne PDF-en er en timeliste og et arbeidsunderlag. Den er ikke en automatisk juridisk lønnsgaranti eller full tariffberegning.";

function roundMoney(value: number) {
  return Math.round(value);
}

function formatNorwegianDate(value: string) {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export function calculateTimesheetEntry(entry: TimesheetEntryInput) {
  const lineTotal = roundMoney(entry.hours * entry.rate + entry.supplement);

  return {
    ...entry,
    lineTotal,
  };
}

export function calculateTimesheetTotals(entries: TimesheetEntryInput[]) {
  const calculated = entries.map(calculateTimesheetEntry);

  return {
    entries: calculated,
    totalHours: Number(calculated.reduce((sum, entry) => sum + entry.hours, 0).toFixed(2)),
    totalAmount: calculated.reduce((sum, entry) => sum + entry.lineTotal, 0),
  };
}

export function formatPeriodLabel(periodStart: string | null | undefined, periodEnd: string | null | undefined) {
  if (!periodStart && !periodEnd) {
    return "Ikke satt";
  }

  if (periodStart && periodEnd) {
    return `${formatNorwegianDate(periodStart)} - ${formatNorwegianDate(periodEnd)}`;
  }

  return formatNorwegianDate(periodStart ?? periodEnd ?? "");
}

export function buildTimesheetExportModel(input: {
  freelancerName: string;
  employerName: string;
  projectName: string;
  role: string;
  periodStart?: string | null;
  periodEnd?: string | null;
  entries: TimesheetEntryInput[];
}): TimesheetExportModel {
  const totals = calculateTimesheetTotals(input.entries);

  return {
    title: `Timeliste - ${input.projectName}`,
    freelancerName: input.freelancerName,
    employerName: input.employerName,
    projectName: input.projectName,
    role: input.role,
    periodLabel: formatPeriodLabel(input.periodStart, input.periodEnd),
    entries: totals.entries,
    totalHours: totals.totalHours,
    totalAmount: totals.totalAmount,
    disclaimer: TIMESHEET_DISCLAIMER,
  };
}
