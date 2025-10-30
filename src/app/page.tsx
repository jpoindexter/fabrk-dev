/**
 * ✅ FABRK COMPONENT
 * Home Page - Modern landing page
 * Production-ready ✓
 */

"use client";

import { LpNavbar1 } from "@/components/home/lp-navbar-1";
import { HeroSection7 } from "@/components/home/hero-section-7";
import { FeatureSection9 } from "@/components/home/feature-section-9";
import { FeatureSection3 } from "@/components/home/feature-section-3";
import { TestimonialsSection5 } from "@/components/home/testimonials-section-5";
import { PricingSection4 } from "@/components/home/pricing-section-4";
import { FaqSection1 } from "@/components/home/faq-section-1";
import { Footer2 } from "@/components/home/footer-2";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <LpNavbar1 />
      <HeroSection7 />
      <FeatureSection9 />
      <FeatureSection3 />
      <TestimonialsSection5 />
      <PricingSection4 />
      <FaqSection1 />
      <Footer2 />
    </div>
  );
}
