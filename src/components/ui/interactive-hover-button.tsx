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
  "group relative inline-flex min-h-12 min-w-[11rem] items-center justify-center rounded-full border px-5 py-3 text-center text-sm font-semibold tracking-[-0.01em] shadow-[0_14px_34px_rgba(0,0,0,0.14)] transition-[transform,border-color,background-color,color,box-shadow] duration-200";

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
    "border-white/18 bg-white/10 text-white backdrop-blur-[16px] hover:-translate-y-px hover:border-white/24 hover:bg-white/[0.13] hover:shadow-[0_18px_42px_rgba(0,0,0,0.18)] active:translate-y-0",
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
