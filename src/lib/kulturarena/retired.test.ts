import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { KULTURARENA_WORKSPACE, retiredPortal } from "./retired";
test("retired endpoints reject payloads without redirecting credentials", async () => {
 const response = retiredPortal();
 assert.equal(response.status, 410);
 assert.equal(response.headers.get("location"), null);
 assert.equal(response.headers.get("cache-control"), "no-store");
 assert.equal((await response.json()).workspace, KULTURARENA_WORKSPACE);
});
test("all Kulturarena runtime routes are disconnected from the old database and command bridge", () => {
 const root = path.resolve("src/app/kulturarena");
 const walk = (p:string):string[] => readdirSync(p,{withFileTypes:true}).flatMap(x => x.isDirectory()?walk(path.join(p,x.name)):[path.join(p,x.name)]);
 for (const f of walk(root)) {
  const source = readFileSync(f,"utf8");
  assert.doesNotMatch(source,/kulturarena\/(server|crypto|dashboard-source)|supabase|loadKulturarenaState|claim_command/,f);
 }
});
