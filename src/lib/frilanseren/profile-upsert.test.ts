import test from "node:test";
import assert from "node:assert/strict";

import { upsertWithOptionalColumn } from "./profile-upsert.ts";

test("upsertWithOptionalColumn succeeds without fallback when optional column exists", async () => {
  const calls: Array<Record<string, unknown>> = [];

  const result = await upsertWithOptionalColumn({
    payload: {
      user_id: "user-1",
      company_name: "Pilot",
      logo_path: null,
    },
    optionalColumn: "logo_path",
    execute: async (payload) => {
      calls.push(payload as Record<string, unknown>);
      return { error: null };
    },
  });

  assert.equal(result.fallbackUsed, false);
  assert.equal(calls.length, 1);
  assert.equal("logo_path" in calls[0], true);
});

test("upsertWithOptionalColumn retries without optional column when schema cache is stale", async () => {
  const calls: Array<Record<string, unknown>> = [];

  const result = await upsertWithOptionalColumn({
    payload: {
      user_id: "user-1",
      company_name: "Pilot",
      logo_path: null,
    },
    optionalColumn: "logo_path",
    execute: async (payload) => {
      calls.push(payload as Record<string, unknown>);

      if (calls.length === 1) {
        return {
          error: {
            code: "PGRST204",
            message: "Could not find the 'logo_path' column of 'employer_profiles' in the schema cache",
          },
        };
      }

      return { error: null };
    },
  });

  assert.equal(result.fallbackUsed, true);
  assert.equal(calls.length, 2);
  assert.equal("logo_path" in calls[0], true);
  assert.equal("logo_path" in calls[1], false);
});

test("upsertWithOptionalColumn rethrows non-schema errors", async () => {
  await assert.rejects(
    () =>
      upsertWithOptionalColumn({
        payload: {
          user_id: "user-1",
          company_name: "Pilot",
          logo_path: null,
        },
        optionalColumn: "logo_path",
        execute: async () => ({
          error: {
            code: "23505",
            message: "duplicate key value violates unique constraint",
          },
        }),
      }),
    (error: unknown) => {
      assert.equal(
        (error as { message?: string }).message,
        "duplicate key value violates unique constraint",
      );
      return true;
    },
  );
});
