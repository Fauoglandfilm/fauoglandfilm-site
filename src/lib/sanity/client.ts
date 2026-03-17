import { createClient } from "next-sanity";

import { appEnv } from "@/lib/env";
import { apiVersion, dataset, isSanityEnabled, projectId } from "@/lib/sanity/env";

export const sanityClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "production",
  apiVersion,
  useCdn: true,
  token: appEnv.sanityReadToken,
  perspective: "published",
});

type SanityFetchOptions<TParams extends Record<string, unknown>> = {
  query: string;
  params?: TParams;
  tags?: string[];
  revalidate?: number;
};

export async function sanityFetch<TResult, TParams extends Record<string, unknown> = Record<string, never>>({
  query,
  params,
  tags = [],
  revalidate = 300,
}: SanityFetchOptions<TParams>): Promise<TResult | null> {
  if (!isSanityEnabled()) {
    return null;
  }

  try {
    return await sanityClient.fetch<TResult>(query, params ?? ({} as TParams), {
      next: {
        revalidate,
        tags,
      },
    });
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    return null;
  }
}
