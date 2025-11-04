import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning className={`dark ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {/* Enhanced skip links for keyboard navigation */}
          <div className="skip-links">
            <a
              href="#main-content"
              className="skip-link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-6 focus:py-3 focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Skip to main content
            </a>
            <a
              href="#navigation"
              className="skip-link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-50 focus:rounded-md focus:bg-primary focus:px-6 focus:py-3 focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Skip to navigation
            </a>
            <a
              href="#footer"
              className="skip-link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-36 focus:z-50 focus:rounded-md focus:bg-primary focus:px-6 focus:py-3 focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Skip to footer
            </a>
          </div>
          <div className="relative flex min-h-screen flex-col bg-background">
            <main id="main-content" className="flex-1 bg-background">
              {children}
            </main>

            {/* Footer with Legal Links */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
