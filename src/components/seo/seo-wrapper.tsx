import type { ReactNode } from "react";

type SeoWrapperProps = {
  children?: ReactNode;
};

export function SeoWrapper({ children }: SeoWrapperProps) {
  return <>{children}</>;
}
