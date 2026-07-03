import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FelixAI — Screen companion that remembers",
  description:
    "Desktop AI assistant with self-hosted Cognee memory. Hotkey, screen context, voice input — and a knowledge graph that never forgets.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
