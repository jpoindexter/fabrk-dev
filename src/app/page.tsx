/**
 * ✅ FABRK COMPONENT
 * Home Page - ShipFast-inspired high-converting landing page
 * Production-ready ✓
 */

import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { TechStack } from "@/components/landing/tech-stack";
import { FeaturesSection } from "@/components/landing/features-section";
import { StatsSection } from "@/components/landing/stats-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { StickyCTABar } from "@/components/landing/sticky-cta-bar";
import { ExitIntentPopup } from "@/components/landing/exit-intent-popup";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TechStack />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <ComparisonSection />
      <FAQSection />
      <Footer />
      <StickyCTABar
        message="Launch your SaaS in days, not months"
        ctaText="Get Fabrk Now"
      />
      <ExitIntentPopup
        title="Wait! Before You Go..."
        description="Get Fabrk and launch your SaaS 10x faster. 100 components, authentication, payments, and more."
        ctaText="Get Fabrk Now"
      />
    </div>
  );
}
