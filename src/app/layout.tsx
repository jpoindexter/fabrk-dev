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
import { Suspense } from "react";
import { Providers } from "@/components/providers";
import { PostHogPageView } from "@/components/analytics/posthog-pageview";
import { CookieConsent } from "@/components/cookie-consent";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://fabrk.dev"),
  title: {
    default: "Fabrk - Build Production Apps at AI Speed",
    template: "%s | Fabrk",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
  // Add your site verification codes when ready
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="theme-color" content="oklch(95.16% 0.0242 343.23)" />
        {/* Load DaisyUI theme before hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
        {/* Google Consent Mode v2 - Must load BEFORE GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Set default consent to denied (GDPR compliant)
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              });

              // Check for existing consent
              try {
                const consent = localStorage.getItem('cookie-consent');
                if (consent) {
                  const prefs = JSON.parse(consent);
                  gtag('consent', 'update', {
                    'ad_storage': prefs.marketing ? 'granted' : 'denied',
                    'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                    'ad_personalization': prefs.marketing ? 'granted' : 'denied',
                    'analytics_storage': prefs.statistics ? 'granted' : 'denied',
                    'functionality_storage': prefs.preferences ? 'granted' : 'denied',
                    'personalization_storage': prefs.marketing ? 'granted' : 'denied'
                  });
                }
              } catch (e) {}
            `,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T47RSZPP');`,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T47RSZPP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          <Suspense>
            <PostHogPageView />
          </Suspense>
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
              <Suspense>
                {children}
              </Suspense>
            </main>
          </div>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
