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
        "button-base inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[0.95rem] font-semibold transition duration-200 sm:min-h-11 sm:px-4.5 sm:py-3 sm:text-sm",
        variant === "primary" &&
          "button-primary",
        variant === "secondary" &&
          "button-secondary",
        variant === "ghost" &&
          "button-ghost",
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
