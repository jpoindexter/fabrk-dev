import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { CreditCard, LayoutGrid, Table, Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Pricing Tables - Fabrk Docs",
  description: "Display pricing plans with feature lists and Stripe checkout integration. Monthly/yearly toggle included.",
};

export default function PricingComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Pricing_Tables"
      description="Pricing components for displaying plans, features, and checkout integration."
      overview="3 pricing components: landing page pricing section, detailed pricing table, and side-by-side comparison. All include Stripe checkout integration."
      features={[
        { icon: CreditCard, title: "PricingSection", description: "Plan cards with CTAs." },
        { icon: Table, title: "PricingTable", description: "Detailed feature comparison." },
        { icon: LayoutGrid, title: "Comparison", description: "Side-by-side comparison." },
        { icon: Check, title: "Stripe", description: "Checkout integration." },
      ]}
      usage={[
        {
          title: "Pricing Section",
          description: "Landing page pricing with plan cards",
          code: `import { PricingSection } from "@/components/landing/pricing-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      {/* Other sections */}
    </main>
  );
}

// PricingSection includes:
// - Multiple pricing tiers (Free, Pro, Enterprise)
// - Monthly/Annual toggle
// - Feature lists per tier
// - CTA buttons with Stripe checkout integration
// - Highlighted "popular" tier`,
          language: "tsx",
        },
        {
          title: "Pricing Table",
          description: "Detailed feature comparison table",
          code: `import { PricingTable } from "@/components/landing/pricing-table";

export default function PricingPage() {
  return (
    <main>
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Choose Your Plan
        </h1>
        <PricingTable />
      </div>
    </main>
  );
}

// PricingTable shows detailed feature comparison
// Great for dedicated pricing pages
// Includes checkmarks/X marks for feature availability`,
          language: "tsx",
        },
        {
          title: "Stripe Checkout Integration",
          description: "Configure price IDs for checkout",
          code: `// Configure price IDs in src/config.js

export const config = {
  stripe: {
    prices: {
      starter: {
        monthly: "price_xxx",
        yearly: "price_xxx",
      },
      pro: {
        monthly: "price_xxx",
        yearly: "price_xxx",
      },
      enterprise: {
        monthly: "price_xxx",
        yearly: "price_xxx",
      },
    },
  },
};

// The checkout API route handles session creation
// POST /api/stripe/checkout
// Returns checkout URL for redirect`,
          language: "typescript",
        },
        {
          title: "Custom Pricing Card",
          description: "Build your own pricing card",
          code: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingCard({
  name,
  price,
  features,
  popular
}: {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <Card className={popular ? "border-primary" : ""}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="text-3xl font-bold">{price}</div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6">Get Started</Button>
      </CardContent>
    </Card>
  );
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Features", href: "/docs/components/features" }}
      next={{ title: "Testimonials", href: "/docs/components/testimonials" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">PricingSection</code> - Complete pricing section with plan cards</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">PricingTable</code> - Detailed pricing table with feature comparison</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">PricingComparison</code> - Side-by-side plan comparison</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/stripe-payments">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Stripe Tutorial</h3>
                <p className={docsTypography.body}>Full Stripe integration guide</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/testimonials">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Testimonials</h3>
                <p className={docsTypography.body}>Customer testimonials</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
