/**
 * ✅ FABRK COMPONENT
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready ✓
 */

import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { HowItWorksSection } from '@/components/marketing/how-it-works-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { SocialProofSection } from '@/components/marketing/social-proof-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';
import { ExitIntentPopup } from '@/components/marketing/exit-intent-popup';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Core Benefits - Auth, Billing, Multi-tenancy */}
      <FeaturesShowcase />

      {/* Trust Indicators */}
      <StatsSection />

      {/* Target Personas */}
      <UseCasesSection />

      {/* How to Get Started */}
      <HowItWorksSection />

      {/* Detailed Features Deep-Dive */}
      <FeaturesSection />

      {/* Pricing */}
      <PricingSection />

      {/* Customer Testimonials - Removed pending real testimonials */}
      {/* <SocialProofSection /> */}

      {/* FAQ */}
      <FAQSection />

      {/* Final Conversion Push */}
      <FinalCTASection />

      {/* Overlays */}
      <StickyCTABar message="Launch your SaaS in days, not months" ctaText="Get Fabrk Now" />
      <ExitIntentPopup
        title="Wait! Before You Go..."
        description="Get Fabrk and launch your SaaS 10x faster. 60+ components, authentication, payments, and more."
        ctaText="Get Fabrk Now"
      />
    </>
  );
}
