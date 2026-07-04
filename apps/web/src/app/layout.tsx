import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AzureBackground } from "@/components/azure-background";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FelixAI",
  description:
    "Desktop AI assistant with self-hosted Cognee memory. Hotkey, screen context, voice input and a knowledge graph that never forgets.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AzureBackground />
        <div className="relative z-10 w-full">{children}</div>
      </body>
    </html>
  );
}
