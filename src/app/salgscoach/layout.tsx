import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand-logo";

export const metadata: Metadata = {
  title: "B2B Salgscoach",
  description: "Privat samtaleoversikt for B2B Salgscoach.",
  robots: { index: false, follow: false },
};

export default function SalgscoachLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090d12] text-[#f7f8fb]">
      <header className="border-b border-white/10 bg-[#090d12]/92 backdrop-blur-md">
        <div className="site-container flex min-h-[5rem] items-center justify-between gap-4 py-4">
          <Link href="/salgscoach" className="flex items-center gap-4">
            <div className="w-[7.5rem] brightness-0 invert">
              <BrandLogo priority />
            </div>
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                Privat
              </p>
              <p className="font-semibold tracking-[-0.03em]">B2B Salgscoach</p>
            </div>
          </Link>
        </div>
      </header>
      <main className="site-container py-8 sm:py-12">{children}</main>
    </div>
  );
}
