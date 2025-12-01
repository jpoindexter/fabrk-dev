/**
 * FABRK COMPONENT
 * Pricing Page Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { PricingHeader } from "./components/pricing-header";
import { PricingCards } from "./components/pricing-cards";
import { ComparisonTable } from "./components/comparison-table";
import { FAQSection } from "./components/faq-section";
import { FeaturesCard } from "./components/features-card";
import { plans, faqs, comparisonFeatures } from "./components/pricing-data";

export default function PricingPageTemplate() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-12">
        {/* Header with billing toggle */}
        <PricingHeader isYearly={isYearly} onToggleBilling={setIsYearly} />

        {/* Pricing Cards */}
        <PricingCards plans={plans} isYearly={isYearly} />

        {/* Feature Comparison Table */}
        <ComparisonTable features={comparisonFeatures} />

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />

        {/* Features Card */}
        <FeaturesCard />
      </div>
    </div>
  );
}
