import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForSanityImage(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}
