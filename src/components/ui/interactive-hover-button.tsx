import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

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
  const content = (
    <span className="relative z-[1] inline-flex items-center justify-center gap-2 whitespace-nowrap text-inherit">
      <span>{text}</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-[2px]" />
    </span>
  );

  const resolvedClassName = cn(
    baseClassName,
    "[--button-bg-current:rgba(255,255,255,0.1)] [--button-border-current:rgba(255,255,255,0.18)] [--button-text-current:#ffffff] [--button-glow-opacity:0.22] backdrop-blur-[16px] hover:[--button-bg-current:rgba(255,255,255,0.14)] hover:[--button-border-current:rgba(255,255,255,0.26)] hover:[--button-text-current:#ffffff] active:[--button-bg-current:rgba(255,255,255,0.11)] active:[--button-border-current:rgba(255,255,255,0.22)] active:[--button-text-current:#ffffff]",
    className,
  );

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
