import type { ButtonHTMLAttributes, ReactNode } from "react";

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
  const content = variant === "icon" ? children : children ? <span>{children}</span> : null;

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
