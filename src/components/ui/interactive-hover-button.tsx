"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

import { useSitePreferences } from "@/components/providers/site-preferences";
import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps = {
  text?: string;
  href?: string;
  external?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

const baseClassName =
  "button-base button-size-default group relative inline-flex min-h-12 min-w-[11rem] items-center justify-center px-5 py-3 text-center text-sm font-semibold tracking-[-0.01em]";

const InteractiveHoverButton = React.forwardRef<
  HTMLAnchorElement,
  InteractiveHoverButtonProps
>(({ text = "Button", href = "#", external = false, className, ...props }, ref) => {
  const { theme } = useSitePreferences();
  const isDark = theme === "dark";

  // Light mode: frosted glass with dark readable text, letting the dark hero video
  // show through at low opacity — premium glass without going fully opaque.
  // Dark mode: original darker semi-transparent glass with white text.
  const themeVars = isDark
    ? "[--button-bg-current:rgba(255,255,255,0.1)] [--button-border-current:rgba(255,255,255,0.18)] [--button-text-current:#ffffff] [--button-glow-opacity:0.22] backdrop-blur-[16px] hover:[--button-bg-current:rgba(255,255,255,0.14)] hover:[--button-border-current:rgba(255,255,255,0.26)] hover:[--button-text-current:#ffffff] active:[--button-bg-current:rgba(255,255,255,0.11)] active:[--button-border-current:rgba(255,255,255,0.22)] active:[--button-text-current:#ffffff]"
    : "[--button-bg-current:rgba(255,255,255,0.78)] [--button-border-current:rgba(255,255,255,0.62)] [--button-text-current:#111111] [--button-glow-opacity:0.18] backdrop-blur-[16px] hover:[--button-bg-current:rgba(255,255,255,0.88)] hover:[--button-border-current:rgba(255,255,255,0.78)] hover:[--button-text-current:#111111] active:[--button-bg-current:rgba(255,255,255,0.68)] active:[--button-border-current:rgba(255,255,255,0.54)] active:[--button-text-current:#111111]";

  const content = (
    <span className="relative z-[1] inline-flex items-center justify-center gap-2 whitespace-nowrap text-inherit">
      <span>{text}</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-[2px]" />
    </span>
  );

  const resolvedClassName = cn(baseClassName, themeVars, className);

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        className={resolvedClassName}
        target="_blank"
        rel="noreferrer noopener"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={resolvedClassName}
      {...props}
    >
      {content}
    </Link>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
