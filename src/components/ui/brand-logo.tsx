import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "full",
  className,
  priority = false,
}: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/media/logos/brand/brand-logo-mark.png"
        alt="Fau&Land Film logo"
        width={5000}
        height={2817}
        priority={priority}
        className={cn("h-auto w-full", className)}
      />
    );
  }

  return (
    <Image
      src="/media/logos/brand/brand-logo-full.png"
      alt="Fau&Land Film"
      width={5000}
      height={1225}
      priority={priority}
      className={cn("h-auto w-full", className)}
    />
  );
}
