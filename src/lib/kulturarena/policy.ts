export const KULTURARENA_ROOT = "/kulturarena";
export const KULTURARENA_USERNAME = "tommy.kulturarena";

export function isKulturarenaPath(path: string | null | undefined) {
  return path === KULTURARENA_ROOT || Boolean(path?.startsWith(`${KULTURARENA_ROOT}/`));
}

const reads = new Set(["state", "health", "system", "file/knowledge", "file/guide", "file/companies", "file/events", "file/tasks", "file/workbook"]);
const writes = new Set(["company-create", "company-edit", "task-create", "task-edit", "event-create", "task", "event", "stage", "note", "draft-create"]);

export function allowedBridgePath(method: string, parts: string[]) {
  if (parts.some((p) => !/^[a-z-]+$/.test(p))) return null;
  const path = parts.join("/");
  return (method === "GET" ? reads : method === "POST" ? writes : new Set()).has(path) ? path : null;
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function isKulturarenaIdentity(user: { id: string; email?: string } | null, expectedId?: string, expectedEmail?: string) {
  return Boolean(user && expectedId && expectedEmail && user.id === expectedId && user.email?.toLowerCase() === expectedEmail.trim().toLowerCase());
}

export class BodyTooLarge extends Error {}

export async function readLimitedBody(request: Request, maximum: number) {
  if (Number(request.headers.get("content-length") || 0) > maximum) throw new BodyTooLarge();
  if (!request.body) return "";
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let length = 0;
  let result = "";
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    length += part.value.byteLength;
    if (length > maximum) {
      await reader.cancel();
      throw new BodyTooLarge();
    }
    result += decoder.decode(part.value, { stream: true });
  }
  return result + decoder.decode();
}
