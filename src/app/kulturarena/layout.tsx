import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kulturarena · Privat salgssystem",
  robots: { index: false, follow: false, noarchive: true },
};

export default function KulturarenaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
