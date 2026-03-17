import { appEnv, hasSanityConfig, readRequiredEnv } from "@/lib/env";

export const apiVersion = appEnv.sanityApiVersion;
export const dataset = appEnv.sanityDataset ?? "production";
export const projectId = appEnv.sanityProjectId ?? "";
export const studioTitle = "Fau&Land Film Studio";

export function assertSanityProjectId() {
  return readRequiredEnv(projectId, "NEXT_PUBLIC_SANITY_PROJECT_ID");
}

export function assertSanityDataset() {
  return readRequiredEnv(dataset, "NEXT_PUBLIC_SANITY_DATASET");
}

export function isSanityEnabled() {
  return hasSanityConfig();
}
