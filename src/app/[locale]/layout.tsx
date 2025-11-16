import { Providers } from "@/components/providers";
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params before accessing properties (Next.js 15+)
  const { locale } = await params;

  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
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
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
