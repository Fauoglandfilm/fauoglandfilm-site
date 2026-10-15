import assert from "node:assert/strict";
import test from "node:test";
import { getSalgscoachSupabaseConfig } from "./config";

test("Salgscoach never falls back to the marketplace database", () => {
  assert.equal(getSalgscoachSupabaseConfig({
    NEXT_PUBLIC_SUPABASE_URL: "https://marketplace.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "marketplace-key",
  }), null);
});

test("Salgscoach accepts its dedicated HTTPS project config", () => {
  assert.deepEqual(getSalgscoachSupabaseConfig({
    SALGSCOACH_SUPABASE_URL: " https://coach.supabase.co/ ",
    SALGSCOACH_SUPABASE_ANON_KEY: " coach-key ",
  }), { url: "https://coach.supabase.co", key: "coach-key" });
});

test("incomplete or unsafe dedicated configuration fails closed", () => {
  for (const url of ["", "not a URL", "http://coach.supabase.co", "https://user:pass@coach.supabase.co", "https://coach.supabase.co/?secret=x"]) {
    assert.equal(getSalgscoachSupabaseConfig({ SALGSCOACH_SUPABASE_URL: url, SALGSCOACH_SUPABASE_ANON_KEY: "key" }), null);
  }
  assert.equal(getSalgscoachSupabaseConfig({ SALGSCOACH_SUPABASE_URL: "https://coach.supabase.co" }), null);
});
