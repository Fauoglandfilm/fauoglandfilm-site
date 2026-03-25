import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

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
      <>
        <span className="button-label-base"><span className="button-label-dot" aria-hidden="true" /><span>{children}</span></span>
        <span className="button-label-hover" aria-hidden="true">
          <span>{children}</span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </span>
        <span className="button-hover-orb" aria-hidden="true" />
      </>
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
