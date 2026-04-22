"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  label: string;
  pendingLabel?: string;
  className?: string;
};

export function SubmitButton({
  label,
  pendingLabel = "Lagrer …",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className} aria-disabled={pending} disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}
