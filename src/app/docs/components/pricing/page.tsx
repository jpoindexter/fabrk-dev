import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Pricing Tables - Fabrk Docs",
  description: "Display pricing plans with feature lists and Stripe checkout integration. Monthly/yearly toggle included.",
};

export default function PricingComponentsPage() {
  return (
    <div className="space-y-16">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x60] COMPONENTS ] PRICING</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">PRICING_TABLES</h1>
        <p className="font-mono text-sm text-muted-foreground mt-2">
          &gt; Pricing components for displaying plans, features, and checkout integration.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold mb-3">AVAILABLE_COMPONENTS</h2>
          <ul className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">PricingSection</code> - Complete pricing section with plan cards</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">PricingTable</code> - Detailed pricing table with feature comparison</li>
            <li>└─ <code className="bg-muted px-1 font-mono text-xs">PricingComparison</code> - Side-by-side plan comparison</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">IMPORT_EXAMPLES</h2>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// Pricing section for landing pages
import { PricingSection } from "@/components/landing/pricing-section";

// Detailed pricing table
import { PricingTable } from "@/components/landing/pricing-table";

// Marketing comparison component
import { PricingComparison } from "@/components/marketing/pricing-comparison";`} />
        </div>
      </div>

      <div className="space-y-16">
        <h2 className="font-mono text-lg font-bold text-primary">USAGE_EXAMPLES</h2>

        <div className="space-y-3">
          <h3 className="font-mono text-base font-semibold">PRICING_SECTION</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { PricingSection } from "@/components/landing/pricing-section";

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
// - Highlighted "popular" tier`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-base font-semibold">PRICING_TABLE</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { PricingTable } from "@/components/landing/pricing-table";

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
// Includes checkmarks/X marks for feature availability`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-base font-semibold">PRICING_COMPARISON</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { PricingComparison } from "@/components/marketing/pricing-comparison";

export default function PricingPage() {
  return (
    <main>
      <PricingSection />
      <PricingComparison />
    </main>
  );
}

// Side-by-side comparison of all features
// Helps users choose the right plan
// Scrollable on mobile devices`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-base font-semibold">STRIPE_CHECKOUT_INTEGRATION</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// The pricing components integrate with Stripe checkout
// Configure price IDs in src/config.js

// config.js
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
// Returns checkout URL for redirect`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-base font-semibold">CUSTOM_PRICING_CARD</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Button className="w-full mt-6">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
