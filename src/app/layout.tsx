import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";

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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({
  title: "Videodrevet markedsføring og reklamefilm i Oslo",
  description: siteConfig.description,
  path: "/",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050a13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body
        className={`${manrope.variable} ${fraunces.variable} antialiased`}
      >
        <JsonLd data={organizationSchema} />
        <TrackingScripts />
        <div className="relative min-h-screen overflow-x-clip">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
