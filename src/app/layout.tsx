import type { Metadata } from "next";
import { ARTWORK_DNA_CODE } from "@/data/artwork-dna";
import "./globals.css";

export const metadata: Metadata = {
  title: ARTWORK_DNA_CODE.ARTWORK_IDENTITY.title,
  description: ARTWORK_DNA_CODE.MANIFESTO.statement,
  applicationName: ARTWORK_DNA_CODE.AUTHOR_IDENTITY.project,
  authors: [{ name: ARTWORK_DNA_CODE.AUTHOR_IDENTITY.author }]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
