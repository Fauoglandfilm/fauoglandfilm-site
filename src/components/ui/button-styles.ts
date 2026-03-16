import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "default" | "compact" | "icon";

type ButtonClassNameOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type SegmentedControlShellOptions = {
  className?: string;
};

type SegmentedControlOptionOptions = {
  active?: boolean;
  compact?: boolean;
  iconOnly?: boolean;
  className?: string;
};

export function buttonClassName({
  variant = "primary",
  size,
  fullWidth = false,
  className,
}: ButtonClassNameOptions) {
  const resolvedSize = size ?? (variant === "icon" ? "icon" : "default");

  return cn(
    "button-base",
    resolvedSize === "default" && "button-size-default",
    resolvedSize === "compact" && "button-size-compact",
    resolvedSize === "icon" && "button-size-icon",
    variant === "primary" && "button-primary",
    variant === "secondary" && "button-secondary",
    variant === "ghost" && "button-ghost",
    variant === "icon" && "button-icon",
    fullWidth && "w-full",
    className,
  );
}

export function segmentedControlShellClassName({ className }: SegmentedControlShellOptions) {
  return cn("control-shell", className);
}

export function segmentedControlOptionClassName({
  active = false,
  compact = false,
  iconOnly = false,
  className,
}: SegmentedControlOptionOptions) {
  return cn(
    "control-option",
    compact ? "control-option-compact" : "control-option-default",
    iconOnly && "control-option-icon-only",
    active ? "control-option-active" : "control-option-idle",
    className,
  );
}
