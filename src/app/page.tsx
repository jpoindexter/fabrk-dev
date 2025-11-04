/**
 * ✅ FABRK COMPONENT
 * Home Page - Modern landing page
 * Production-ready ✓
 */

import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { CoreBenefitsSection } from "@/components/home/core-benefits-section";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { PricingSection } from "@/components/home/pricing-section";
import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CoreBenefitsSection />
      <TechStackSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
