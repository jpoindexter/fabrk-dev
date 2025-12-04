/**
 * ✅ FABRK COMPONENT
 * Features Page - Dedicated feature deep-dive
 * Production-ready ✓
 *
 * Uses MarketingPageTemplate for consistent structure
 */

"use client";

import { MarketingPageTemplate } from "@/components/templates/marketing-page-template";
import { FeaturesHero } from "./components/features-hero";
import { StatsSection } from "./components/stats-section";
import { CategoryNavigation } from "./components/category-navigation";
import { FeatureCategoryCard } from "./components/feature-category-card";
import { TechStackSection } from "./components/tech-stack-section";
import { QualitySection } from "./components/quality-section";
import { FeaturesCTA } from "./components/features-cta";
import { FEATURE_CATEGORIES } from "./components/feature-data";

function FeatureCategoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="space-y-24 lg:space-y-32">
          {FEATURE_CATEGORIES.map((category, index) => (
            <FeatureCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <MarketingPageTemplate
      hero={<FeaturesHero />}
      sections={[
        { id: "stats", component: <StatsSection /> },
        { id: "category-nav", component: <CategoryNavigation /> },
        { id: "feature-categories", component: <FeatureCategoriesSection /> },
        { id: "tech-stack", component: <TechStackSection /> },
        { id: "quality", component: <QualitySection /> },
      ]}
      cta={<FeaturesCTA />}
    />
  );
}
