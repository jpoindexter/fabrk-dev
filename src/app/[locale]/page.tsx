/**
 * ✅ FABRK COMPONENT
 * Home Page - ShipFast-inspired high-converting landing page
 * Production-ready ✓
 */

import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { TechStack } from "@/components/landing/tech-stack";
import { FeaturesSection } from "@/components/landing/features-section";
import { EnterpriseFeaturesSection } from "@/components/landing/enterprise-features-section";
import { DeveloperExperienceSection } from "@/components/landing/developer-experience-section";
import { StatsSection } from "@/components/landing/stats-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TechStack />
      <FeaturesSection />
      <EnterpriseFeaturesSection />
      <DeveloperExperienceSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <ComparisonSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
