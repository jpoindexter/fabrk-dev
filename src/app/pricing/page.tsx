/**
 * ✅ FABRK PAGE
 * Dedicated Pricing Page - Terminal console style
 * Production-ready ✓
 *
 * Uses MarketingPageTemplate for consistent structure
 */
import { Metadata } from "next";
import {
  MarketingPageTemplate,
  MarketingPageHeader,
} from "@/components/templates/marketing-page-template";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";

export const metadata: Metadata = {
  title: "Pricing - Fabrk",
  description:
    "One-time purchase. Unlimited projects. Get lifetime access to Fabrk starter kit with all features included.",
};

export default function PricingPage() {
  return (
    <MarketingPageTemplate
      hero={
        <MarketingPageHeader
          code="0x00"
          badge="COMMERCIAL_LICENSE"
          title="Simple Transparent Pricing"
          description="One time payment. Lifetime updates. No subscriptions."
        />
      }
      sections={[
        { id: "pricing", component: <PricingSection /> },
        { id: "faq", component: <FAQSection /> },
      ]}
    />
  );
}
