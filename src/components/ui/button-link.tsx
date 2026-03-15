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
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        variant === "primary" &&
          "bg-[var(--accent)] text-[var(--bg-1)] hover:bg-[#f1d89c]",
        variant === "secondary" &&
          "border border-white/14 bg-white/[0.03] text-white hover:border-white/26 hover:bg-white/[0.06]",
        variant === "ghost" &&
          "text-white/66 hover:text-white",
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
