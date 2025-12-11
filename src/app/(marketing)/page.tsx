/**
 * ✅ FABRK COMPONENT
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready ✓
 */

import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { FeaturesSection } from '@/components/marketing/features-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { ComparisonSection } from '@/components/marketing/comparison-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';
import { ExitIntentPopup } from '@/components/marketing/exit-intent-popup';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section id="features-showcase">
        <FeaturesShowcase />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="comparison">
        <ComparisonSection />
      </section>
      <section id="faq">
        <FAQSection />
      </section>

      {/* Overlays */}
      <StickyCTABar message="Launch your SaaS in days, not months" ctaText="Get Fabrk Now" />
      <ExitIntentPopup
        title="Wait! Before You Go..."
        description="Get Fabrk and launch your SaaS 10x faster. 234 components, authentication, payments, and more."
        ctaText="Get Fabrk Now"
      />
    </>
  );
}
