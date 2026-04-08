"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

const INSTAGRAM_EMBED_SCRIPT_ID = "instagram-embed-script";
const INSTAGRAM_EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

function ensureInstagramEmbedScript() {
  const existingScript = document.getElementById(
    INSTAGRAM_EMBED_SCRIPT_ID,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    return existingScript;
  }

  const script = document.createElement("script");
  script.id = INSTAGRAM_EMBED_SCRIPT_ID;
  script.async = true;
  script.defer = true;
  script.src = INSTAGRAM_EMBED_SCRIPT_SRC;
  document.body.appendChild(script);

  return script;
}

export function InstagramEmbed({
  permalink,
  className,
}: {
  permalink: string;
  className?: string;
}) {
  useEffect(() => {
    const processEmbed = () => {
      window.instgrm?.Embeds?.process();
    };

    if (window.instgrm?.Embeds) {
      processEmbed();
      return;
    }

    const script = ensureInstagramEmbedScript();
    script.addEventListener("load", processEmbed);

    return () => {
      script.removeEventListener("load", processEmbed);
    };
  }, [permalink]);

  return (
    <div
      className={cn(
        "flex w-full justify-center overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]",
        className,
      )}
    >
      <div className="w-full max-w-[34rem]">
        <blockquote
          className="instagram-media m-0 w-full min-w-0 max-w-full overflow-hidden rounded-[1.4rem] border-0 bg-white"
          data-instgrm-captioned=""
          data-instgrm-permalink={permalink}
          data-instgrm-version="14"
        >
          <a href={permalink} target="_blank" rel="noreferrer noopener">
            View this post on Instagram
          </a>
        </blockquote>
      </div>
    </div>
  );
}
