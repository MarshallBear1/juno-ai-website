import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juno - Your Caring Health Companion",
  description: "Juno is an AI health companion for people living with chronic disease. Track symptoms, detect flares early, and learn how to pace yourself.",
  keywords: ["chronic illness", "health companion", "symptom tracker", "chronic disease", "AI health", "ME/CFS", "fibromyalgia", "long covid"],
  authors: [{ name: "Juno Health" }],
  openGraph: {
    title: "Juno - Your Caring Health Companion",
    description: "Finally, someone who understands. Juno helps you manage chronic illness with compassion and intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
