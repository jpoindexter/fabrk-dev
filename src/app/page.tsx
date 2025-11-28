/**
 * ✅ FABRK COMPONENT
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready ✓
 */

import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesShowcase } from "@/components/home/features-showcase";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { StickyCTABar } from "@/components/landing/sticky-cta-bar";
import { ExitIntentPopup } from "@/components/landing/exit-intent-popup";
import { TerminalBackground } from "@/components/landing/terminal-background";

export default function HomePage() {
  return (
    <div className="relative isolate min-h-screen">
      <TerminalBackground />
      <Navigation />
      <HeroSection />
      <FeaturesShowcase />
      <FeaturesSection />
      <PricingSection />
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
