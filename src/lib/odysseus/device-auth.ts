import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

function digest(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

export function authenticateOdysseusDevice(request: Request) {
  const expectedHex = String(process.env.ODYSSEUS_DEVICE_TOKEN_SHA256 ?? "")
    .trim()
    .toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(expectedHex)) {
    return false;
  }

  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+([^\s]+)$/i.exec(header);
  if (!match) {
    return false;
  }

  const provided = digest(match[1]);
  const expected = Buffer.from(expectedHex, "hex");
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}
