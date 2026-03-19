import "server-only";

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { siteConfig } from "@/data/site-content";

type ResendConfig = {
  apiKey: string | null;
  fromEmail: string;
  toEmail: string;
};

let cachedFallbackEnv: Record<string, string> | null = null;

function parseEnvFile(filePath: string) {
  if (!existsSync(filePath)) {
    return {};
  }

  const file = readFileSync(filePath, "utf8");

  return file.split(/\r?\n/).reduce<Record<string, string>>((acc, rawLine) => {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      return acc;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {});
}

function readFallbackEnv() {
  if (cachedFallbackEnv) {
    return cachedFallbackEnv;
  }

  const projectRoot = process.cwd();
  const fallbackPath = path.join(projectRoot, ".env.example");

  cachedFallbackEnv = parseEnvFile(fallbackPath);

  return cachedFallbackEnv;
}

function readValue(primary: string | undefined, fallbackKey: string) {
  const fallbackEnv = readFallbackEnv();
  const fallback = fallbackEnv[fallbackKey];

  if (typeof fallback === "string" && fallback.trim().length > 0) {
    return fallback.trim();
  }

  return typeof primary === "string" && primary.trim().length > 0 ? primary.trim() : null;
}

export function getResendConfig(): ResendConfig {
  const apiKey = readValue(process.env.RESEND_API_KEY, "RESEND_API_KEY");
  const fromEmail =
    readValue(process.env.RESEND_FROM_EMAIL, "RESEND_FROM_EMAIL") ??
    `Fau&Land Film <${siteConfig.email}>`;
  const toEmail =
    readValue(process.env.CONTACT_TO_EMAIL, "CONTACT_TO_EMAIL") ?? siteConfig.email;

  return {
    apiKey,
    fromEmail,
    toEmail,
  };
}

export function hasResendServerConfig() {
  return Boolean(getResendConfig().apiKey);
}
