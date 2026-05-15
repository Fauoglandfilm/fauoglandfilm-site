import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildTimesheetExportModel,
  calculateTimesheetEntry,
  calculateTimesheetTotals,
  formatPeriodLabel,
} from "./timesheet";

test("calculateTimesheetEntry multiplies hours and rate then adds supplement", () => {
  assert.equal(
    calculateTimesheetEntry({
      work_date: "2026-06-01",
      hours: 8,
      rate: 650,
      supplement: 250,
      note: "",
    }).lineTotal,
    5450,
  );
});

test("calculateTimesheetTotals sums hours and amounts", () => {
  const totals = calculateTimesheetTotals([
    { work_date: "2026-06-01", hours: 8, rate: 650, supplement: 0, note: "" },
    { work_date: "2026-06-02", hours: 6.5, rate: 650, supplement: 500, note: "" },
  ]);

  assert.equal(totals.totalHours, 14.5);
  assert.equal(totals.totalAmount, 9925);
});

test("formatPeriodLabel handles missing dates", () => {
  assert.equal(formatPeriodLabel(null, null), "Ikke satt");
  assert.equal(formatPeriodLabel("2026-06-01", "2026-06-03"), "01.06.2026 - 03.06.2026");
});

test("buildTimesheetExportModel includes disclaimer", () => {
  const model = buildTimesheetExportModel({
    freelancerName: "Ada Foto",
    employerName: "Fau&Land Film",
    projectName: "Kortfilm",
    role: "Fotograf",
    periodStart: "2026-06-01",
    periodEnd: "2026-06-01",
    entries: [{ work_date: "2026-06-01", hours: 8, rate: 650, supplement: 0, note: "Dag" }],
  });

  assert.equal(model.totalAmount, 5200);
  assert.match(model.disclaimer, /ikke en automatisk juridisk lønnsgaranti/i);
});
