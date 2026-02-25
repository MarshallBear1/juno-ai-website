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
  metadataBase: new URL('https://juno-chat.com'),
  title: {
    default: "Juno - AI Health Companion for Chronic Illness Support",
    template: "%s | Juno",
  },
  description: "Juno is an AI-powered health companion designed for people living with chronic illness. Track symptoms, predict flares, learn energy pacing, and connect with a caring community. Support for ME/CFS, fibromyalgia, Long COVID, and more.",
  keywords: [
    "chronic illness app",
    "chronic illness support",
    "AI health companion",
    "symptom tracker",
    "flare prediction",
    "energy pacing",
    "ME/CFS support",
    "fibromyalgia app",
    "Long COVID tracker",
    "chronic fatigue syndrome",
    "chronic pain support",
    "health companion AI",
    "Juno chronic illness",
    "Juno app",
    "chronic disease management",
  ],
  authors: [{ name: "Juno Health", url: "https://juno-chat.com" }],
  creator: "Juno Health",
  publisher: "Juno Health",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://juno-chat.com",
    siteName: "Juno",
    title: "Juno - AI Health Companion for Chronic Illness",
    description: "Finally, someone who understands. Juno helps you manage chronic illness with compassion and intelligence. Track symptoms, predict flares, and pace your energy.",
    images: [
      {
        url: "/juno-girl.png",
        width: 1200,
        height: 630,
        alt: "Juno - Your AI Health Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juno - AI Health Companion for Chronic Illness",
    description: "Finally, someone who understands. Track symptoms, predict flares, and manage your chronic illness with compassion.",
    images: ["/juno-girl.png"],
    creator: "@JunoHealth",
  },
  alternates: {
    canonical: "https://juno-chat.com",
  },
  category: "Health & Wellness",
  classification: "Health Application",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Juno",
  "description": "AI-powered health companion for people living with chronic illness. Track symptoms, predict flares, and learn energy pacing.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free to download with premium features available",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150",
    "bestRating": "5",
  },
  "author": {
    "@type": "Organization",
    "name": "Juno Health",
    "url": "https://juno-chat.com",
  },
  "keywords": "chronic illness, ME/CFS, fibromyalgia, Long COVID, symptom tracker, health companion, AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://juno-chat.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
