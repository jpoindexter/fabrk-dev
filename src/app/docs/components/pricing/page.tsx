import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Pricing Tables - Fabrk Docs",
  description: "Display pricing plans with feature lists and Stripe checkout integration. Monthly/yearly toggle included.",
};

export default function PricingComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pricing Tables</h1>
        <p className="mt-2 text-muted-foreground">
          Pricing components for displaying plans, features, and checkout integration.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">PricingSection</code> - Complete pricing section with plan cards</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">PricingTable</code> - Detailed pricing table with feature comparison</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">PricingComparison</code> - Side-by-side plan comparison</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Import Examples</h2>
        </div>
        <CodeBlock language="typescript" code={`// Pricing section for landing pages
import { PricingSection } from "@/components/landing/pricing-section";

// Detailed pricing table
import { PricingTable } from "@/components/landing/pricing-table";

// Marketing comparison component
import { PricingComparison } from "@/components/marketing/pricing-comparison";`} />
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Usage Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Pricing Section</h3>
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Pricing Table</h3>
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Pricing Comparison</h3>
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Stripe Checkout Integration</h3>
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Custom Pricing Card</h3>
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
  );
}
