/**
 * ✅ FABRK COMPONENT
 * ComparisonTable Stories - Feature comparison tables for pricing/plans
 *
 * @see ComparisonTable component documentation
 */

import { ComparisonTable } from "@/components/ui/comparison-table";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ComparisonTable> = {
  title: "UI/Data Display/ComparisonTable",
  component: ComparisonTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComparisonTable>;

/**
 * Default comparison table
 */
export const Default: Story = {
  args: {
    features: ["Feature A", "Feature B", "Feature C"],
    plans: [
      { name: "Basic", features: [true, false, false] },
      { name: "Pro", features: [true, true, false] },
      { name: "Enterprise", features: [true, true, true] },
    ],
  },
};

/**
 * Pricing tiers
 */
export const PricingTiers: Story = {
  args: {
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "Team collaboration",
      "API access",
    ],
    plans: [
      {
        name: "Free",
        features: [false, false, false, false, false, false],
      },
      {
        name: "Starter",
        features: [true, false, false, false, false, false],
      },
      {
        name: "Professional",
        features: [true, true, true, true, false, false],
      },
      {
        name: "Enterprise",
        features: [true, true, true, true, true, true],
      },
    ],
  },
};

/**
 * Software comparison
 */
export const SoftwareComparison: Story = {
  args: {
    features: [
      "Cloud storage",
      "Real-time sync",
      "Version control",
      "Offline access",
      "Mobile apps",
      "Desktop apps",
      "24/7 support",
      "Custom branding",
    ],
    plans: [
      {
        name: "Basic",
        features: [true, true, false, false, true, false, false, false],
      },
      {
        name: "Business",
        features: [true, true, true, true, true, true, true, false],
      },
      {
        name: "Enterprise",
        features: [true, true, true, true, true, true, true, true],
      },
    ],
  },
};

/**
 * Hosting plans
 */
export const HostingPlans: Story = {
  args: {
    features: [
      "SSD Storage",
      "Bandwidth",
      "Email accounts",
      "Free SSL",
      "Daily backups",
      "CDN",
      "DDoS protection",
      "Dedicated IP",
    ],
    plans: [
      {
        name: "Shared",
        features: [true, true, true, true, false, false, false, false],
      },
      {
        name: "VPS",
        features: [true, true, true, true, true, true, false, false],
      },
      {
        name: "Dedicated",
        features: [true, true, true, true, true, true, true, true],
      },
    ],
  },
};

/**
 * Subscription features
 */
export const SubscriptionFeatures: Story = {
  args: {
    features: [
      "Users",
      "Storage",
      "Projects",
      "Support",
      "Analytics",
      "Integrations",
      "Custom workflows",
      "White-label",
    ],
    plans: [
      {
        name: "Solo",
        features: [true, true, true, false, false, false, false, false],
      },
      {
        name: "Team",
        features: [true, true, true, true, true, true, false, false],
      },
      {
        name: "Agency",
        features: [true, true, true, true, true, true, true, true],
      },
    ],
  },
};

/**
 * Product editions
 */
export const ProductEditions: Story = {
  args: {
    features: [
      "Core features",
      "Advanced reporting",
      "API access",
      "SSO integration",
      "Audit logs",
      "Custom roles",
      "Dedicated support",
      "SLA guarantee",
    ],
    plans: [
      {
        name: "Community",
        features: [true, false, false, false, false, false, false, false],
      },
      {
        name: "Professional",
        features: [true, true, true, false, false, false, false, false],
      },
      {
        name: "Enterprise",
        features: [true, true, true, true, true, true, true, true],
      },
    ],
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};

/**
 * Error state
 */
export const Error: Story = {
  args: {
    error: true,
  },
};

/**
 * Two plans
 */
export const TwoPlans: Story = {
  args: {
    features: [
      "Users",
      "Storage",
      "Support",
      "Analytics",
      "API access",
    ],
    plans: [
      {
        name: "Basic",
        features: [true, true, false, false, false],
      },
      {
        name: "Premium",
        features: [true, true, true, true, true],
      },
    ],
  },
};

/**
 * Many features
 */
export const ManyFeatures: Story = {
  args: {
    features: [
      "Unlimited projects",
      "Cloud storage",
      "Real-time collaboration",
      "Version control",
      "Advanced analytics",
      "Custom reports",
      "API access",
      "Webhooks",
      "SSO",
      "SAML",
      "Audit logs",
      "Custom roles",
      "Priority support",
      "Dedicated manager",
      "SLA",
    ],
    plans: [
      {
        name: "Starter",
        features: [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        name: "Professional",
        features: [true, true, true, true, true, true, true, true, false, false, false, false, true, false, false],
      },
      {
        name: "Enterprise",
        features: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      },
    ],
  },
};

/**
 * With pricing
 */
export const WithPricing: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div></div>
        <div className="text-center">
          <h3 className="mb-2 text-lg font-bold">Free</h3>
          <p className="mb-4 text-3xl font-bold">$0</p>
          <Button variant="outline" className="w-full">Start Free</Button>
        </div>
        <div className="text-center">
          <h3 className="mb-2 text-lg font-bold">Pro</h3>
          <p className="mb-4 text-3xl font-bold">$29</p>
          <Button className="w-full">Get Started</Button>
        </div>
        <div className="text-center">
          <h3 className="mb-2 text-lg font-bold">Enterprise</h3>
          <p className="mb-4 text-3xl font-bold">Custom</p>
          <Button variant="outline" className="w-full">Contact Sales</Button>
        </div>
      </div>
      <ComparisonTable
        features={[
          "Projects",
          "Storage",
          "Team members",
          "Support",
          "Analytics",
          "Custom domain",
        ]}
        plans={[
          { name: "Free", features: [true, true, false, false, false, false] },
          { name: "Pro", features: [true, true, true, true, true, false] },
          { name: "Enterprise", features: [true, true, true, true, true, true] },
        ]}
      />
    </div>
  ),
};

/**
 * With descriptions
 */
export const WithDescriptions: Story = {
  render: () => (
    <div className="w-full max-w-5xl space-y-4">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground">Select the perfect plan for your needs</p>
      </div>
      <ComparisonTable
        features={[
          "Users",
          "Storage",
          "Projects",
          "Support",
          "Analytics",
          "Integrations",
        ]}
        plans={[
          { name: "Starter", features: [true, true, true, false, false, false] },
          { name: "Business", features: [true, true, true, true, true, false] },
          { name: "Enterprise", features: [true, true, true, true, true, true] },
        ]}
      />
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
        <p>Perfect for individuals</p>
        <p>Great for small teams</p>
        <p>Built for large organizations</p>
      </div>
    </div>
  ),
};

/**
 * SaaS pricing
 */
export const SaaSPricing: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground">Choose the plan that's right for you</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div></div>
        {["Free", "Starter", "Professional", "Enterprise"].map((plan) => (
          <div key={plan} className="rounded-lg border bg-card p-6 text-center">
            <h3 className="mb-2 text-xl font-bold">{plan}</h3>
            <p className="mb-4 text-3xl font-bold">
              {plan === "Free" ? "$0" : plan === "Starter" ? "$19" : plan === "Professional" ? "$49" : "Custom"}
            </p>
            <Button className="w-full" variant={plan === "Professional" ? "default" : "outline"}>
              {plan === "Enterprise" ? "Contact Sales" : "Get Started"}
            </Button>
          </div>
        ))}
      </div>

      <ComparisonTable
        features={[
          "Team members",
          "Projects",
          "Storage (GB)",
          "API calls/month",
          "Support",
          "Analytics",
          "Custom domain",
          "White-label",
          "SSO",
          "SLA",
        ]}
        plans={[
          {
            name: "Free",
            features: [false, true, true, false, false, false, false, false, false, false],
          },
          {
            name: "Starter",
            features: [true, true, true, true, true, false, false, false, false, false],
          },
          {
            name: "Professional",
            features: [true, true, true, true, true, true, true, false, false, false],
          },
          {
            name: "Enterprise",
            features: [true, true, true, true, true, true, true, true, true, true],
          },
        ]}
      />
    </div>
  ),
};
