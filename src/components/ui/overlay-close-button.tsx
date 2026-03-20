"use client";

import type { ButtonHTMLAttributes } from "react";

import { CloseIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type OverlayCloseButtonProps = {
  label: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">;

export function OverlayCloseButton({
  label,
  className,
  type = "button",
  ...props
}: OverlayCloseButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "fixed z-[140] flex h-11 w-11 items-center justify-center rounded-full border p-0 shadow-[0_16px_34px_rgba(0,0,0,0.18)] backdrop-blur-md transition [html[data-theme='light']_&]:border-black/10 [html[data-theme='light']_&]:bg-white/96 [html[data-theme='light']_&]:text-black [html[data-theme='light']_&]:hover:bg-white [html[data-theme='dark']_&]:border-white/12 [html[data-theme='dark']_&]:bg-black/82 [html[data-theme='dark']_&]:text-white [html[data-theme='dark']_&]:hover:bg-black",
        className,
      )}
      style={{
        top: "max(env(safe-area-inset-top), 16px)",
        left: "max(env(safe-area-inset-left), 16px)",
      }}
      {...props}
    >
      <CloseIcon className="h-3 w-3 shrink-0" />
    </button>
  );
}
