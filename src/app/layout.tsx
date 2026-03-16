import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import Script from "next/script";

import { SitePreferencesProvider } from "@/components/providers/site-preferences";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TrackingScripts } from "@/components/layout/tracking-scripts";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/data/site-content";
import { buildMetadata, organizationSchema } from "@/lib/seo";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({
  title: "Reklamefilm og innholdsproduksjon i Oslo",
  description: siteConfig.description,
  path: "/",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0d11",
};

const preferenceBootScript = `
  (function () {
    try {
      var theme = localStorage.getItem('fauoglandfilm-theme');
      var language = localStorage.getItem('fauoglandfilm-language');
      if (theme === 'light' || theme === 'dark') {
        document.documentElement.dataset.theme = theme;
      }
      if (language === 'no' || language === 'en') {
        document.documentElement.dataset.language = language;
        document.documentElement.lang = language === 'no' ? 'nb' : 'en';
      }
    } catch (error) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" data-theme="dark" data-language="no" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${sora.variable} antialiased`}
      >
        <Script
          id="preference-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: preferenceBootScript }}
        />
        <JsonLd data={organizationSchema} />
        <TrackingScripts />
        <SitePreferencesProvider>
          <div className="relative min-h-screen overflow-x-clip">
            <Header />
            {children}
            <Footer />
          </div>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
