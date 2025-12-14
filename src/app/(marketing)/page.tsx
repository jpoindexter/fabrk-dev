/**
 * ✅ FABRK COMPONENT
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready ✓
 */

import { HeroSection } from '@/components/marketing/hero-section';
import { HeroPlaygroundFull } from '@/components/marketing/hero-playground-full';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';
import { ExitIntentPopup } from '@/components/marketing/exit-intent-popup';

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
      <ExitIntentPopup
        title="Wait! Before You Go..."
        description="Get Fabrk and launch your SaaS 10x faster. 70+ components, authentication, payments, and more."
        ctaText="Get Fabrk Now"
      />
    </>
  );
}
