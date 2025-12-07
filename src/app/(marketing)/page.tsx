/**
 * ✅ FABRK COMPONENT
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready ✓
 */

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesShowcase } from "@/components/home/features-showcase";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { FAQSection } from "@/components/landing/faq-section";
import { StickyCTABar } from "@/components/landing/sticky-cta-bar";
import { ExitIntentPopup } from "@/components/landing/exit-intent-popup";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section id="features-showcase">
        <FeaturesShowcase />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="pricing">
        <PricingSection />
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
