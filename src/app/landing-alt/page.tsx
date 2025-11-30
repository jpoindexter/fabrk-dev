/**
 * ✅ FABRK COMPONENT
 * Alternative Landing Page - With Comparison Section
 *
 * This demonstrates an alternative layout that includes:
 * - The comparison section
 * - Different ordering of sections for A/B testing
 *
 * To use this as your main landing page:
 * 1. Copy this content to src/app/page.tsx
 * 2. Or rename this file to replace the default
 */

import { SiteNavigation } from "@/components/navigation";
import {
  HeroSection,
  ComparisonSection,
  FeaturesSection,
  PricingSection,
  FAQSection,
  Footer,
} from "@/components/landing";

export default function AlternativeLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavigation />
      <HeroSection />

      {/* Comparison Section - Shows competitive advantages early */}
      <ComparisonSection />

      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
