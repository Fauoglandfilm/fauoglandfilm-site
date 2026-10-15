import assert from "node:assert/strict";
import test from "node:test";
import { createHash, randomBytes } from "node:crypto";
import { DEVICE, seal, tokenMatches, unseal } from "./crypto";

test("Kulturarena and Fau&Land device credentials reject each other", () => {
  const culture=randomBytes(32).toString("base64url"),film=randomBytes(32).toString("base64url");
  const hash=(s:string)=>createHash("sha256").update(s).digest("hex");
  assert.equal(tokenMatches(`Bearer ${culture}`,hash(culture)),true);
  assert.equal(tokenMatches(`Bearer ${film}`,hash(culture)),false);
  assert.equal(tokenMatches(`Bearer ${culture}`,hash(film)),false);
  assert.equal(tokenMatches(null,hash(culture)),false);
});
test("private application data is encrypted and bound to tenant, device and purpose", () => {
  const key=randomBytes(32).toString("base64url"),data={contact_email:"person@example.test",draft:"private synthetic draft"};
  const wrapped=seal(data,"snapshot",key);
  assert.ok(!JSON.stringify(wrapped).includes(data.contact_email));
  assert.ok(!JSON.stringify(wrapped).includes(data.draft));
  assert.deepEqual(unseal(wrapped,"snapshot",key),data);
  assert.throws(()=>unseal({...wrapped,tenant_id:"fauland" as "kulturarena"},"snapshot",key));
  assert.throws(()=>unseal(wrapped,"command:other",key));
  assert.throws(()=>unseal(wrapped,"snapshot",randomBytes(32).toString("base64url")));
  assert.equal(DEVICE,"kulturarena-mac-2");
});
test("a command result cannot be transplanted to another command", () => {
  const key=randomBytes(32).toString("base64url");
  const wrapped=seal({revision:5},"result:command-one",key);
  assert.throws(()=>unseal(wrapped,"result:command-two",key));
  const tampered={...wrapped,ciphertext:(wrapped.ciphertext.startsWith("A")?"B":"A")+wrapped.ciphertext.slice(1)};
  assert.throws(()=>unseal(tampered,"result:command-one",key));
});
