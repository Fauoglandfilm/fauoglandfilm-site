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
  "group relative inline-flex min-h-12 min-w-[11rem] items-center justify-center overflow-hidden rounded-full border px-5 py-3 text-center text-sm font-semibold tracking-[-0.01em] shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition duration-300";

const InteractiveHoverButton = React.forwardRef<
  HTMLAnchorElement,
  InteractiveHoverButtonProps
>(({ text = "Button", href = "#", external = false, className, ...props }, ref) => {
  const content = (
    <>
      <span className="relative z-[2] inline-flex translate-x-1 items-center justify-center whitespace-nowrap text-inherit transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <span className="absolute inset-0 z-[3] flex translate-x-12 items-center justify-center gap-2 whitespace-nowrap text-[#111111] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </span>
      <span className="absolute left-[20%] top-[40%] z-[1] h-2 w-2 scale-100 rounded-full bg-[#d2ad74] transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8]" />
    </>
  );

  const resolvedClassName = cn(
    baseClassName,
    "border-white/18 bg-white/10 text-white backdrop-blur-[18px] hover:border-white/24 hover:bg-white/12",
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
