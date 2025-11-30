"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Simplified Pricing Demo
function PricingDemo() {
  const plans = [
    {
      name: "STARTER",
      price: "$0",
      period: "/month",
      features: ["5 Projects", "Basic Support", "1GB Storage"],
      cta: "GET_STARTED",
      popular: false,
    },
    {
      name: "PRO",
      price: "$29",
      period: "/month",
      features: ["Unlimited Projects", "Priority Support", "100GB Storage", "API Access"],
      cta: "UPGRADE_NOW",
      popular: true,
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      period: "",
      features: ["Custom Solutions", "24/7 Support", "Unlimited Storage", "SLA"],
      cta: "CONTACT_SALES",
      popular: false,
    },
  ];

  return (
    <section className="w-full border border-border bg-background p-6">
      <div className="mb-6 text-center">
        <span className="inline-block border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
          [ [0x30] PRICING ] SELECT_PLAN
        </span>
        <h2 className="mt-4 font-mono text-xl font-bold">CHOOSE_YOUR_PLAN</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border bg-card p-6 ${plan.popular ? "border-primary" : "border-border"}`}
          >
            {plan.popular && (
              <span className="mb-2 inline-block font-mono text-xs text-primary">[POPULAR]</span>
            )}
            <div className="mb-4">
              <span className="font-mono text-xs text-muted-foreground">{plan.name}</span>
              <div className="mt-1 font-mono text-2xl font-bold">
                {plan.price}<span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
            </div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full rounded-none font-mono text-xs"
              variant={plan.popular ? "default" : "outline"}
            >
              &gt; {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

// Single Pricing Card
function PricingCardDemo() {
  return (
    <div className="w-full max-w-sm border border-primary bg-card p-6">
      <span className="mb-2 inline-block font-mono text-xs text-primary">[RECOMMENDED]</span>
      <div className="mb-4">
        <span className="font-mono text-xs text-muted-foreground">LIFETIME</span>
        <div className="mt-1 font-mono text-3xl font-bold">
          $299<span className="text-sm text-muted-foreground"> one-time</span>
        </div>
      </div>
      <ul className="mb-6 space-y-2">
        <li className="flex items-center gap-2 font-mono text-xs"><Check className="h-3 w-3 text-success" />Full source code</li>
        <li className="flex items-center gap-2 font-mono text-xs"><Check className="h-3 w-3 text-success" />Lifetime updates</li>
        <li className="flex items-center gap-2 font-mono text-xs"><Check className="h-3 w-3 text-success" />Discord community</li>
        <li className="flex items-center gap-2 font-mono text-xs"><Check className="h-3 w-3 text-success" />Unlimited projects</li>
      </ul>
      <Button className="w-full rounded-none font-mono text-xs">&gt; GET_ACCESS</Button>
    </div>
  );
}

export default function PricingPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.04]"
      title="Pricing Section"
      description="Pricing tables with plan comparison, feature lists, and Stripe checkout integration."
      mainPreview={{
        preview: <PricingDemo />,
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
}`,
      }}
      variants={[
        {
          title: "Single Pricing Card",
          description: "Highlighted plan card for one-time purchase",
          preview: <PricingCardDemo />,
          code: `<Card className="border-primary">
  <CardHeader>
    <Badge>RECOMMENDED</Badge>
    <CardTitle>LIFETIME</CardTitle>
    <div className="text-3xl font-bold">$299</div>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li><Check /> Full source code</li>
      <li><Check /> Lifetime updates</li>
    </ul>
    <Button className="w-full">Get Access</Button>
  </CardContent>
</Card>`,
        },
        {
          title: "Price Toggle",
          description: "Monthly/yearly toggle for subscriptions",
          preview: (
            <div className="flex items-center justify-center gap-2 rounded-none border border-border bg-card p-2">
              <Button variant="default" size="sm" className="rounded-none font-mono text-xs">MONTHLY</Button>
              <Button variant="ghost" size="sm" className="rounded-none font-mono text-xs">YEARLY</Button>
              <span className="font-mono text-xs text-success">[-20%]</span>
            </div>
          ),
          code: `const [yearly, setYearly] = useState(false);

<div className="flex items-center gap-2">
  <Button
    variant={!yearly ? "default" : "ghost"}
    onClick={() => setYearly(false)}
  >
    Monthly
  </Button>
  <Button
    variant={yearly ? "default" : "ghost"}
    onClick={() => setYearly(true)}
  >
    Yearly
  </Button>
  {yearly && <Badge>Save 20%</Badge>}
</div>`,
        },
      ]}
      props={[
        {
          name: "plans",
          type: "{ name: string; price: string; features: string[]; popular?: boolean }[]",
          description: "Array of pricing plans to display",
        },
        {
          name: "showToggle",
          type: "boolean",
          description: "Show monthly/yearly toggle",
          default: "true",
        },
      ]}
      accessibility={[
        "Feature lists use proper list semantics",
        "Popular plan is visually distinct with border",
        "CTA buttons are clearly labeled",
        "Price information is readable by screen readers",
      ]}
      previous={{ title: "Features", href: "/docs/components/features" }}
      next={{ title: "Testimonials", href: "/docs/components/testimonials" }}
    />
  );
}
