/**
 * ✅ FABRK COMPONENT
 * Features Page - Dedicated feature deep-dive
 * Production-ready ✓
 */

"use client";

import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";
import { FeaturesHero } from "./components/features-hero";
import { StatsSection } from "./components/stats-section";
import { CategoryNavigation } from "./components/category-navigation";
import { FeatureCategoryCard } from "./components/feature-category-card";
import { TechStackSection } from "./components/tech-stack-section";
import { QualitySection } from "./components/quality-section";
import { FeaturesCTA } from "./components/features-cta";
import { FEATURE_CATEGORIES } from "./components/feature-data";

export default function FeaturesPage() {
  return (
    <div className="font-mono">
      <SiteNavigation />

      <FeaturesHero />

      <StatsSection />

      <CategoryNavigation />

      {/* Feature Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="space-y-24 lg:space-y-32">
            {FEATURE_CATEGORIES.map((category, index) => (
              <FeatureCategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <TechStackSection />

      <QualitySection />

      <FeaturesCTA />

      <Footer />
    </div>
  );
}
