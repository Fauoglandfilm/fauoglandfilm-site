"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { CookieBanner } from "@/components/layout/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TrackingScripts } from "@/components/layout/tracking-scripts";
import { CookieConsentProvider } from "@/components/providers/cookie-consent";
import { SitePreferencesProvider } from "@/components/providers/site-preferences";
import { OrganizationStructuredData } from "@/components/seo/organization-structured-data";

const privatePortalPrefixes = ["/odysseus", "/salgscoach"] as const;

export function isPrivatePortalPath(pathname: string) {
  return privatePortalPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isPrivatePortalPath(pathname)) {
    return children;
  }

  return (
    <SitePreferencesProvider>
      <CookieConsentProvider>
        <OrganizationStructuredData />
        <TrackingScripts />
        <div className="relative min-h-screen overflow-x-clip">
          <Header />
          {children}
          <Footer />
        </div>
        <CookieBanner />
      </CookieConsentProvider>
    </SitePreferencesProvider>
  );
}
