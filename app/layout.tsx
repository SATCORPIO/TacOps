import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SATCORP COMMAND — Tactical Operations Dashboard",
  description: "Private Global Operations Command Interface",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
