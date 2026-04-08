import "server-only";

import { siteConfig } from "@/data/site-content";

type ResendConfig = {
  apiKey: string | null;
  fromEmail: string;
  toEmail: string;
};

function readOptionalEnv(value: string | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : null;
}

export function getResendConfig(): ResendConfig {
  const apiKey = readOptionalEnv(process.env.RESEND_API_KEY);
  const fromEmail = readOptionalEnv(process.env.RESEND_FROM_EMAIL) ?? `Fau&Land Film <${siteConfig.email}>`;
  const toEmail = readOptionalEnv(process.env.CONTACT_TO_EMAIL) ?? siteConfig.email;

  return {
    apiKey,
    fromEmail,
    toEmail,
  };
}

export function hasResendServerConfig() {
  return Boolean(getResendConfig().apiKey);
}
