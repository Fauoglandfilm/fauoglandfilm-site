import assert from "node:assert/strict";
import test from "node:test";
import { authorizedKulturarenaMember, kulturarenaConnection, kulturarenaMembers, resolveKulturarenaLogin } from "./access";

const owner = { user_id: "11111111-1111-4111-8111-111111111111", email: "owner@example.test", username: "tommy.kulturarena", role: "owner" };
const colleague = { user_id: "22222222-2222-4222-8222-222222222222", email: "colleague@example.test", username: "colleague", role: "editor" };
const env = { KULTURARENA_USERS: JSON.stringify([owner, colleague]), ODYSSEUS_OWNER_EMAIL: "film-owner@example.test" };

test("two distinct Kulturarena users log in with their own email or alias", () => {
  const members = kulturarenaMembers(env);
  assert.equal(members.length, 2);
  assert.equal(resolveKulturarenaLogin(" TOMMY.KULTURARENA ", members)?.user_id, owner.user_id);
  assert.equal(resolveKulturarenaLogin("COLLEAGUE@EXAMPLE.TEST", members)?.user_id, colleague.user_id);
  assert.equal(resolveKulturarenaLogin("colleague", members)?.role, "editor");
  assert.equal(resolveKulturarenaLogin("unknown@example.test", members), null);
});

test("valid provider identity must match both the exact configured ID and email", () => {
  const members = kulturarenaMembers(env);
  assert.equal(authorizedKulturarenaMember({ id: colleague.user_id, email: colleague.email }, members)?.role, "editor");
  for (const user of [null, { id: owner.user_id, email: colleague.email }, { id: "33333333-3333-4333-8333-333333333333", email: colleague.email }, { id: colleague.user_id, email: "film-owner@example.test" }]) {
    assert.equal(authorizedKulturarenaMember(user, members), null);
  }
  assert.equal(authorizedKulturarenaMember({ id: colleague.user_id, email: colleague.email }, kulturarenaMembers({ KULTURARENA_USERS: JSON.stringify([owner]) })), null);
});

test("malformed, duplicate, foreign and password-bearing membership fails closed", () => {
  for (const value of ["broken", "{}", JSON.stringify([owner, owner]), JSON.stringify([owner, { ...colleague, username: owner.email }]), JSON.stringify([{ ...owner, user_id: "not-an-id" }]), JSON.stringify([{ ...owner, email: env.ODYSSEUS_OWNER_EMAIL }]), JSON.stringify([{ ...owner, password: "forbidden-in-configuration" }]), JSON.stringify([{ ...owner, role: "admin" }])]) {
    assert.deepEqual(kulturarenaMembers({ ...env, KULTURARENA_USERS: value }), []);
  }
  assert.deepEqual(kulturarenaMembers({}), []);
});

test("a legacy explicit owner remains supported without widening membership", () => {
  const members = kulturarenaMembers({ KULTURARENA_USER_ID: owner.user_id, KULTURARENA_LOGIN_EMAIL: owner.email });
  assert.equal(members.length, 1);
  assert.equal(members[0].user_id, owner.user_id);
  assert.equal(resolveKulturarenaLogin(colleague.email, members), null);
});

test("Kulturarena requires a separate HTTPS database and never uses another product's keys", () => {
  const own = { KULTURARENA_SUPABASE_URL: "https://culture.example.test", KULTURARENA_SUPABASE_ANON_KEY: "synthetic-publishable-key" };
  assert.deepEqual(kulturarenaConnection(own), { url: own.KULTURARENA_SUPABASE_URL, key: own.KULTURARENA_SUPABASE_ANON_KEY });
  assert.equal(kulturarenaConnection({ NEXT_PUBLIC_SUPABASE_URL: "https://film.example.test", NEXT_PUBLIC_SUPABASE_ANON_KEY: "film-key" }), null);
  for (const raw of ["http://culture.example.test", "https://user:secret@culture.example.test", "https://culture.example.test/path", "https://culture.example.test?x=1", "invalid"]) {
    assert.equal(kulturarenaConnection({ ...own, KULTURARENA_SUPABASE_URL: raw }), null);
  }
  assert.equal(kulturarenaConnection({ ...own, NEXT_PUBLIC_SUPABASE_URL: own.KULTURARENA_SUPABASE_URL }), null);
  assert.equal(kulturarenaConnection({ ...own, SALGSCOACH_SUPABASE_URL: own.KULTURARENA_SUPABASE_URL }), null);
});
