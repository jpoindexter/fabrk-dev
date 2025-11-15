/**
 * Root Layout (For Non-Locale Routes)
 *
 * This layout provides HTML structure for routes OUTSIDE of /[locale].
 * - Locale routes (/[locale]/*): Use /[locale]/layout.tsx (with i18n)
 * - Non-locale routes (/demo, /components, etc.): Use this layout
 *
 * Next.js 16 requires ALL layouts to have <html> and <body> tags.
 */

import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://fabrk.dev"),
  title: {
    default: "Fabrk - Build Production Apps at AI Speed",
    template: "%s | Fabrk",
  },
  description:
    "A complete UI system with 169 production-ready components, design tokens, automated testing, and AI workflows. Build faster with enforced quality standards.",
  keywords: [
    "ui components",
    "design system",
    "react components",
    "nextjs",
    "typescript",
    "tailwind css",
    "ai workflows",
    "component library",
    "design tokens",
    "accessibility",
    "wcag",
    "production ready",
  ],
  authors: [{ name: "Fabrk", url: "https://fabrk.dev" }],
  creator: "Fabrk",
  publisher: "Fabrk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Fabrk - Build Production Apps at AI Speed",
    description:
      "169 production-ready components with automated quality enforcement and AI workflows",
    type: "website",
    locale: "en_US",
    url: "https://fabrk.dev",
    siteName: "Fabrk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fabrk - Build Production Apps at AI Speed",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabrk - Build Production Apps at AI Speed",
    description: "169 production-ready components with automated quality enforcement",
    images: ["/og-image.png"],
    creator: "@fabrk",
    site: "@fabrk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // TODO: Add actual verification code
    yandex: "yandex-verification-code", // TODO: Add actual verification code
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="theme-color" content="oklch(95.16% 0.0242 343.23)" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
