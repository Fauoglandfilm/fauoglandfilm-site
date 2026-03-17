import { VideoJsonLd } from "next-seo";

import { absoluteUrl } from "@/lib/seo";

type VideoStructuredDataProps = {
  title: string;
  description: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate?: string;
};

export function VideoStructuredData({
  title,
  description,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  uploadDate,
}: VideoStructuredDataProps) {
  if (!thumbnailUrl && !embedUrl && !contentUrl) {
    return null;
  }

  const resolvedThumbnail = thumbnailUrl ?? absoluteUrl("/opengraph-image");
  const resolvedUploadDate = uploadDate ?? new Date().toISOString();

  return (
    <VideoJsonLd
      name={title}
      description={description}
      uploadDate={resolvedUploadDate}
      thumbnailUrl={resolvedThumbnail}
      {...(contentUrl ? { contentUrl } : {})}
      {...(embedUrl ? { embedUrl } : {})}
    />
  );
}
