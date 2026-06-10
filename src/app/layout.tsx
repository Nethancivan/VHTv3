import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI's Collection",
  description: "Generative Art from Human Imagination"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
