/**
 * ✅ FABRK PAGE
 * Dedicated Pricing Page - Terminal console style
 * Production-ready ✓
 */
import { Metadata } from 'next';
import { MarketingPageHeader } from '@/components/marketing/marketing-header';
import { PricingSection } from '@/components/marketing/pricing-section';
import { FAQSection } from '@/components/marketing/faq-section';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'One-time purchase. Unlimited projects. Get lifetime access to the Fabrk Next.js SaaS boilerplate with all features, updates, and support included.',
  openGraph: {
    title: 'Pricing | Fabrk',
    description:
      'One-time purchase. Lifetime updates. Get the complete Next.js SaaS starter kit.',
    type: 'website',
    url: `${baseUrl}/pricing`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Fabrk',
    description: 'One-time purchase. Lifetime updates. No subscriptions.',
  },
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <>
      <MarketingPageHeader
        code="0x00"
        badge="COMMERCIAL LICENSE"
        title="Simple Transparent Pricing"
        description="One time payment. Lifetime updates. No subscriptions."
      />
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
    </>
  );
}
