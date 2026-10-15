import "server-only";

import { resolveOdysseusOwnerConfig } from "./contracts";

export { ODYSSEUS_DEVICE_ID } from "./contracts";

export function getOdysseusOwnerConfig() {
  return resolveOdysseusOwnerConfig(
    process.env.ODYSSEUS_OWNER_USERNAME,
    process.env.ODYSSEUS_OWNER_EMAIL,
  );
}

export function isOdysseusOwnerEmail(email: string | null | undefined) {
  const owner = getOdysseusOwnerConfig();
  return owner.ready && String(email ?? "").trim().toLowerCase() === owner.email;
}

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
