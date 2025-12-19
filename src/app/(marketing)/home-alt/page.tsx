/**
 * Home Alt - MakerKit-style long-form landing page
 * 16 sections for comprehensive product showcase
 */

import { HeroSection } from '@/components/marketing/hero-section';
import { HeroPlaygroundFull } from '@/components/marketing/hero-playground-full';
import { FeaturesShowcaseAlt } from '@/components/marketing/features-showcase-alt';
import { IntegrationsGrid } from '@/components/marketing/integrations-grid';
import { TechStackSection } from '@/components/marketing/tech-stack-section';
import { TestimonialsWall } from '@/components/marketing/testimonials-wall';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';
import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';

export default function HomeAltPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Interactive Playground */}
      <HeroPlaygroundFull />

      {/* 3. Features Grid (MakerKit-style) */}
      <FeaturesShowcaseAlt />

      {/* 4. Integrations */}
      <IntegrationsGrid />

      {/* 6. Tech Stack */}
      <TechStackSection />

      {/* 7. Testimonials Wall */}
      <TestimonialsWall />

      {/* 8. Stats */}
      <StatsSection />

      {/* 9. Use Cases */}
      <UseCasesSection />

      {/* 10. Pricing */}
      <PricingSection />

      {/* 12. What's Included */}
      <WhatsIncludedSection />

      {/* 13. FAQ */}
      <FAQSection />

      {/* 14. Final CTA */}
      <FinalCTASection />

      {/* 15. Sticky CTA Bar */}
      <StickyCTABar message="Launch your SaaS in days, not months" ctaText="Get Fabrk Now" />
    </>
  );
}
