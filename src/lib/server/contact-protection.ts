import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const CONTACT_RATE_LIMIT_MAX = 5;
const CONTACT_RATE_LIMIT_WINDOW_MS = 10_000;
const CONTACT_RATE_LIMIT_WINDOW = "10 s";
const CONTACT_RATE_LIMIT_PREFIX = "contact";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const CONTACT_TURNSTILE_ACTION = "contact";

type ContactRateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

type TurnstileVerificationResult =
  | {
      success: true;
      skipped?: boolean;
    }
  | {
      success: false;
      reason:
        | "missing-token"
        | "verification-unavailable"
        | "invalid-token"
        | "unexpected-action"
        | "unexpected-hostname";
      details?: string[];
    };

type TurnstileVerifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type GlobalContactProtection = typeof globalThis & {
  __contactRateLimitStore?: Map<string, number[]>;
  __contactRatelimit?: Ratelimit | null;
};

function getEnv(name: string) {
  const value = process.env[name];

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

function getRateLimitStore() {
  const globalState = globalThis as GlobalContactProtection;

  globalState.__contactRateLimitStore ??= new Map<string, number[]>();

  return globalState.__contactRateLimitStore;
}

function getContactRatelimit() {
  const globalState = globalThis as GlobalContactProtection;

  if (globalState.__contactRatelimit !== undefined) {
    return globalState.__contactRatelimit;
  }

  const url = getEnv("UPSTASH_REDIS_REST_URL");
  const token = getEnv("UPSTASH_REDIS_REST_TOKEN");

  if (!url || !token) {
    globalState.__contactRatelimit = null;
    return globalState.__contactRatelimit;
  }

  const redis = new Redis({ url, token });

  globalState.__contactRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(CONTACT_RATE_LIMIT_MAX, CONTACT_RATE_LIMIT_WINDOW),
    prefix: CONTACT_RATE_LIMIT_PREFIX,
    analytics: true,
  });

  return globalState.__contactRatelimit;
}

function limitContactRequestInMemory(key: string): ContactRateLimitResult {
  const store = getRateLimitStore();
  const now = Date.now();
  const windowStart = now - CONTACT_RATE_LIMIT_WINDOW_MS;
  const activeTimestamps = (store.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

  if (activeTimestamps.length >= CONTACT_RATE_LIMIT_MAX) {
    store.set(key, activeTimestamps);

    return {
      success: false,
      limit: CONTACT_RATE_LIMIT_MAX,
      remaining: 0,
      reset: activeTimestamps[0] + CONTACT_RATE_LIMIT_WINDOW_MS,
    };
  }

  activeTimestamps.push(now);
  store.set(key, activeTimestamps);

  return {
    success: true,
    limit: CONTACT_RATE_LIMIT_MAX,
    remaining: Math.max(0, CONTACT_RATE_LIMIT_MAX - activeTimestamps.length),
    reset: activeTimestamps[0] + CONTACT_RATE_LIMIT_WINDOW_MS,
  };
}

function isTurnstileEnabled() {
  return Boolean(getEnv("TURNSTILE_SECRET_KEY") && getEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY"));
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(",");

    if (firstIp?.trim()) {
      return firstIp.trim();
    }
  }

  const directIp =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-vercel-forwarded-for");

  if (directIp?.trim()) {
    return directIp.trim();
  }

  return "unknown";
}

export async function limitContactRequest(request: Request): Promise<ContactRateLimitResult> {
  const key = `${CONTACT_RATE_LIMIT_PREFIX}:${getClientIp(request)}`;
  const ratelimit = getContactRatelimit();

  if (!ratelimit) {
    return limitContactRequestInMemory(key);
  }

  try {
    const result = await ratelimit.limit(key);

    void result.pending?.catch(() => undefined);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error("[contact] ratelimit unavailable, using in-memory fallback", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return limitContactRequestInMemory(key);
  }
}

export async function verifyContactTurnstileToken(
  token: string,
  ipAddress?: string,
): Promise<TurnstileVerificationResult> {
  if (!isTurnstileEnabled()) {
    return { success: true, skipped: true };
  }

  const secretKey = getEnv("TURNSTILE_SECRET_KEY");

  if (!secretKey || token.trim().length === 0) {
    return {
      success: false,
      reason: "missing-token",
    };
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token.trim(),
    });

    if (ipAddress && ipAddress !== "unknown") {
      body.set("remoteip", ipAddress);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        reason: "verification-unavailable",
      };
    }

    const result = (await response.json()) as TurnstileVerifyResponse;

    if (!result.success) {
      return {
        success: false,
        reason: "invalid-token",
        details: result["error-codes"],
      };
    }

    if (result.action && result.action !== CONTACT_TURNSTILE_ACTION) {
      return {
        success: false,
        reason: "unexpected-action",
        details: [result.action],
      };
    }

    const expectedHostname = getEnv("TURNSTILE_EXPECTED_HOSTNAME");

    if (expectedHostname && result.hostname && result.hostname !== expectedHostname) {
      return {
        success: false,
        reason: "unexpected-hostname",
        details: [result.hostname],
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[contact] turnstile verification failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return {
      success: false,
      reason: "verification-unavailable",
    };
  }
}
