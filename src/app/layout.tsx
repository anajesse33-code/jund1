import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HMV Buy, Sell & Repairs — Heavy Machinery & Vehicles | Worldwide",
  description:
    "HMV buys used construction & heavy equipment worldwide — running or not — sells inspected, refurbished machines ready to work, and repairs what keeps your fleet earning. Browse inventory, sell your equipment, or book a repair.",
  keywords: [
    "buy used construction equipment",
    "sell heavy equipment",
    "equipment repairs",
    "refurbished machinery",
    "excavators",
    "dozers",
    "wheel loaders",
    "HMV",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "HMV Buy, Sell & Repairs",
    description:
      "We buy, sell & repair heavy machinery and vehicles worldwide. Running or not.",
    url: "https://hmvbuysellandrepairs.com",
    siteName: "HMV Buy, Sell & Repairs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
