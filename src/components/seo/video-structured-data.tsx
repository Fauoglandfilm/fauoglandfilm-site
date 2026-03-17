import { VideoJsonLd } from "next-seo";

import { absoluteUrl } from "@/lib/seo";

type VideoStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate?: string;
};

export function VideoStructuredData({
  title,
  description,
  path,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  uploadDate,
}: VideoStructuredDataProps) {
  if (!thumbnailUrl && !embedUrl && !contentUrl) {
    return null;
  }

  return (
    <VideoJsonLd
      name={title}
      description={description}
      uploadDate={uploadDate}
      thumbnailUrl={thumbnailUrl ? [thumbnailUrl] : undefined}
      contentUrl={contentUrl}
      embedUrl={embedUrl}
      potentialAction={[
        {
          "@type": "WatchAction",
          target: absoluteUrl(path),
        },
      ]}
    />
  );
}
