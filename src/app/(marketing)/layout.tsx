/**
 * Marketing Layout
 * Layout for all public-facing marketing pages (Home, Pricing, About, etc.)
 * Includes SiteNavigation and Footer.
 */

import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
