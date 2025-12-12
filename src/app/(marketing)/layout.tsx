/**
 * Marketing Layout
 * Layout for all public-facing marketing pages (Home, Pricing, About, etc.)
 * Includes SiteNavigation, Footer, and minimal cookie consent banner.
 */

import { SiteNavigation } from '@/components/navigation';
import { Footer } from '@/components/shared/footer';
import { MinimalCookieBanner } from '@/components/cookie-consent/minimal-banner';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MinimalCookieBanner />
      <SiteNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
