import "server-only";

import { getFrilanserenAdminEmails } from "@/lib/env";

const DEFAULT_OWNER_USERNAME = "tommy";

function normalized(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

export function getOdysseusOwnerConfig() {
  const username = normalized(process.env.ODYSSEUS_OWNER_USERNAME) || DEFAULT_OWNER_USERNAME;
  const configuredEmail = normalized(process.env.ODYSSEUS_OWNER_EMAIL);
  const inheritedAdmin = getFrilanserenAdminEmails()[0] ?? "";

  return {
    username,
    email: configuredEmail || inheritedAdmin,
    ready: Boolean(configuredEmail || inheritedAdmin),
  };
}

export function isOdysseusOwnerEmail(email: string | null | undefined) {
  const owner = getOdysseusOwnerConfig();
  return owner.ready && normalized(email) === owner.email;
}

export const ODYSSEUS_DEVICE_ID = "mac-2";

export const ODYSSEUS_COMMANDS = [
  "pause_system",
  "resume_system",
  "refresh_status",
  "run_crm_sync",
  "run_sales_maintenance",
  "stop_delivery",
  "set_daily_send_limit",
] as const;

export type OdysseusCommand = (typeof ODYSSEUS_COMMANDS)[number];

export function isOdysseusCommand(value: string): value is OdysseusCommand {
  return (ODYSSEUS_COMMANDS as readonly string[]).includes(value);
}
