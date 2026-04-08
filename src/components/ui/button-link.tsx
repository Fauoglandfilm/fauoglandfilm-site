import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  size,
  fullWidth = false,
  icon,
  ...props
}: ButtonLinkProps) {
  const content =
    variant === "icon" ? (
      children
    ) : children ? (
      <span className="button-label-base">{children}</span>
    ) : null;

  return (
    <Link
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    >
      {content}
      {icon}
    </Link>
  );
}
