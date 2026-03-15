import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  icon,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[0.95rem] font-semibold transition duration-200 sm:min-h-11 sm:px-4.5 sm:py-3 sm:text-sm",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        variant === "primary" &&
          "border border-black/10 bg-[#111111] text-white hover:-translate-y-0.5 hover:bg-[#242424]",
        variant === "secondary" &&
          "border border-black/12 bg-white/80 text-[#111111] hover:-translate-y-0.5 hover:border-black/20 hover:bg-white",
        variant === "ghost" &&
          "min-h-0 px-0 py-0 text-[#111111]/66 hover:text-[#111111]",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </Link>
  );
}
