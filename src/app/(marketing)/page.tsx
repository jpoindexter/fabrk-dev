/**
 * ✅ FABRK COMPONENT
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready ✓
 */

import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';

// Lazy load the heavy playground component to improve LCP
const HeroPlaygroundFull = dynamic(
  () => import('@/components/marketing/hero-playground-full').then(mod => mod.HeroPlaygroundFull),
  {
    ssr: true,
    loading: () => (
      <section className="border-border border-t py-16">
        <div className="container mx-auto max-w-[1800px] px-12 lg:px-24">
          <div className="animate-pulse">
            <div className="mb-8 flex gap-2">
              <div className="h-9 w-32 rounded bg-muted" />
              <div className="h-9 w-32 rounded bg-muted" />
              <div className="h-9 w-32 rounded bg-muted" />
              <div className="h-9 w-32 rounded bg-muted" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-64 rounded bg-muted" />
              <div className="h-64 rounded bg-muted" />
              <div className="h-64 rounded bg-muted" />
              <div className="h-64 rounded bg-muted" />
            </div>
          </div>
        </div>
      </section>
    )
  }
);
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';
export default function HomePage() {
  return (
    <>
      {/* Hero - Updated with verified social proof */}
      <HeroSection />

      {/* Interactive Playground - Full shadcn-style with 5 tabs */}
      <HeroPlaygroundFull />

      {/* What Makes Fabrk Different - Unique features (Terminal UI, 31 Demos, AI Credits, 3 Providers) */}
      <FeaturesShowcase />

      {/* Trust Indicators - Updated with verifiable stats */}
      <StatsSection />

      {/* Target Personas - Who Fabrk is for */}
      <UseCasesSection />

      {/* Pricing - Launch price ($199) for first 100 buyers */}
      <PricingSection />

      {/* What's Included - NEW: Auth/Billing/Multi-tenancy checklist */}
      <WhatsIncludedSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final Conversion Push */}
      <FinalCTASection />

      {/* Overlays */}
      <StickyCTABar message="Launch your SaaS in days, not months" ctaText="Get Fabrk Now" />
    </>
  );
}
