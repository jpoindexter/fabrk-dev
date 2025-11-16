import type { Meta, StoryObj } from "@storybook/nextjs";
import { PricingComparison } from "./pricing-comparison";

const meta: Meta<typeof PricingComparison> = {
  title: "Marketing/PricingComparison",
  component: PricingComparison,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PricingComparison>;

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month" as const,
    description: "Perfect for getting started",
    cta: "Start Free",
  },
  {
    id: "starter",
    name: "Starter",
    price: 29,
    interval: "month" as const,
    description: "For growing teams",
    popular: true,
    cta: "Start Trial",
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    interval: "month" as const,
    description: "For professional teams",
    cta: "Start Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom" as const,
    description: "For large organizations",
    cta: "Contact Sales",
  },
];

const features = [
  {
    name: "Users",
    category: "Core Features",
    plans: { free: 1, starter: 5, pro: 25, enterprise: "Unlimited" },
  },
  {
    name: "Projects",
    category: "Core Features",
    plans: { free: 3, starter: 10, pro: 50, enterprise: "Unlimited" },
  },
  {
    name: "Storage",
    category: "Core Features",
    plans: { free: "1 GB", starter: "10 GB", pro: "100 GB", enterprise: "Unlimited" },
  },
  {
    name: "Email Support",
    category: "Support",
    plans: { free: false, starter: true, pro: true, enterprise: true },
  },
  {
    name: "Priority Support",
    category: "Support",
    plans: { free: false, starter: false, pro: true, enterprise: true },
  },
  {
    name: "Phone Support",
    category: "Support",
    plans: { free: false, starter: false, pro: false, enterprise: true },
  },
  {
    name: "Advanced Analytics",
    category: "Analytics",
    plans: { free: false, starter: true, pro: true, enterprise: true },
  },
  {
    name: "Custom Reports",
    category: "Analytics",
    plans: { free: false, starter: false, pro: true, enterprise: true },
  },
  {
    name: "API Access",
    category: "Integrations",
    plans: { free: false, starter: true, pro: true, enterprise: true },
  },
  {
    name: "Webhooks",
    category: "Integrations",
    plans: { free: false, starter: false, pro: true, enterprise: true },
  },
  {
    name: "SSO",
    category: "Security",
    plans: { free: false, starter: false, pro: false, enterprise: true },
  },
  {
    name: "Audit Logs",
    category: "Security",
    plans: { free: false, starter: false, pro: true, enterprise: true },
  },
];

export const Default: Story = {
  args: {
    plans,
    features,
  },
};

export const WithoutCategories: Story = {
  args: {
    plans,
    features,
    showCategories: false,
  },
};

export const SaaSPricing: Story = {
  args: {
    plans: [
      {
        id: "hobby",
        name: "Hobby",
        price: 0,
        interval: "month" as const,
        description: "For personal projects",
        cta: "Get Started",
      },
      {
        id: "pro",
        name: "Pro",
        price: 49,
        interval: "month" as const,
        description: "For professionals",
        popular: true,
        cta: "Start 14-day Trial",
      },
      {
        id: "team",
        name: "Team",
        price: 199,
        interval: "month" as const,
        description: "For teams",
        cta: "Start 14-day Trial",
      },
    ],
    features: [
      {
        name: "API Requests",
        plans: { hobby: "10K/month", pro: "100K/month", team: "1M/month" },
      },
      {
        name: "Team Members",
        plans: { hobby: 1, pro: 3, team: 10 },
      },
      {
        name: "99.9% Uptime SLA",
        plans: { hobby: false, pro: true, team: true },
      },
      {
        name: "Custom Domain",
        plans: { hobby: false, pro: true, team: true },
      },
      {
        name: "Advanced Security",
        plans: { hobby: false, pro: false, team: true },
      },
    ],
    showCategories: false,
  },
};

export const WithActions: Story = {
  args: {
    plans: plans.map((plan) => ({
      ...plan,
      onSelect: () => alert(`Selected ${plan.name} plan`),
    })),
    features,
  },
};
