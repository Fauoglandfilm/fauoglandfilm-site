import type { ReactNode } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand-logo";

export default function OdysseusLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#f4f5f7]">
      <header className="border-b border-white/10 bg-[#0b0d12]/90 backdrop-blur-md">
        <div className="site-container flex min-h-[5rem] items-center justify-between gap-4 py-4">
          <Link href="/odysseus" className="flex items-center gap-4">
            <div className="w-[8.5rem] brightness-0 invert"><BrandLogo priority /></div>
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/45">Privat kontrollrom</p>
              <p className="font-semibold tracking-[-0.03em]">Odysseus Server</p>
            </div>
          </Link>
        </div>
      </header>
      <main className="site-container py-8 sm:py-12">{children}</main>
    </div>
  );
}
