export const ODYSSEUS_DEVICE_ID = "mac-2";

function normalized(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

export function resolveOdysseusOwnerConfig(
  username: string | null | undefined,
  email: string | null | undefined,
) {
  const configuredEmail = normalized(email);

  return {
    username: normalized(username) || "tommy",
    email: configuredEmail,
    ready: Boolean(configuredEmail),
  };
}

export function runningOdysseusCommandScope(commandId: string) {
  return {
    id: commandId,
    deviceId: ODYSSEUS_DEVICE_ID,
    status: "running" as const,
  };
}
