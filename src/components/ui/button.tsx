import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function Button({
  children,
  className,
  variant = "primary",
  size,
  fullWidth = false,
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  const content =
    variant === "icon" ? (
      children
    ) : children ? (
      <>
        <span className="button-label-base">{children}</span>
        <span className="button-label-hover" aria-hidden="true">
          <span>{children}</span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </span>
        <span className="button-hover-orb" aria-hidden="true" />
      </>
    ) : null;

  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    >
      {content}
      {icon}
    </button>
  );
}
