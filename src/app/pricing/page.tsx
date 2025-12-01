/**
 * ✅ FABRK PAGE
 * Dedicated Pricing Page - Terminal console style
 * Production-ready ✓
 */
import { Metadata } from "next";
import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";

export const metadata: Metadata = {
  title: "Pricing - Fabrk",
  description:
    "One-time purchase. Unlimited projects. Get lifetime access to Fabrk starter kit with all features included.",
};

export default function PricingPage() {
  return (
 <div className=" font-mono">
      <SiteNavigation />

      <main>
        {/* Page Header */}
        <section className="border-b border-border px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">
                [ [0x00] PRICING ] COMMERCIAL_LICENSE
              </span>
            </div>
            <h1 className="mb-4 font-mono text-3xl font-bold tracking-tight lg:text-4xl">
              SIMPLE_TRANSPARENT_PRICING
            </h1>
            <p className="mx-auto max-w-2xl font-mono text-sm text-muted-foreground">
              &gt; ONE_TIME_PAYMENT. LIFETIME_UPDATES. NO_SUBSCRIPTIONS.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
