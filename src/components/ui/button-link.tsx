import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

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
  const useInteractiveEffect =
    variant !== "ghost" &&
    variant !== "icon" &&
    (size ?? "default") === "default" &&
    !icon &&
    typeof children === "string";

  if (useInteractiveEffect) {
    const label = children;
    const textClassName = variant === "secondary" ? "text-[#111111]" : "text-inherit";

    return (
      <Link
        className={cn(buttonClassName({ variant, size, fullWidth, className }), "group relative overflow-hidden")}
        {...props}
      >
        <span className="relative z-[2] inline-flex translate-x-1 items-center justify-center whitespace-nowrap text-inherit transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {label}
        </span>
        <span
          className={cn(
            "absolute inset-0 z-[3] flex translate-x-12 items-center justify-center gap-2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
            textClassName,
          )}
        >
          <span>{label}</span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </span>
        <span className="absolute left-[20%] top-[40%] z-[1] h-2 w-2 scale-100 rounded-full bg-[#d2ad74] transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8]" />
      </Link>
    );
  }

  const content = variant === "icon" ? children : children ? <span>{children}</span> : null;

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
