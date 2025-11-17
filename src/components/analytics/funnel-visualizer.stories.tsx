import type { Meta, StoryObj } from "@storybook/nextjs";
import { FunnelVisualizer } from "./funnel-visualizer";

const meta: Meta<typeof FunnelVisualizer> = {
  title: "Analytics/FunnelVisualizer",
  component: FunnelVisualizer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FunnelVisualizer>;

export const Default: Story = {
  args: {
    stages: [
      { name: "Visitors", value: 10000 },
      { name: "Sign Ups", value: 2500 },
      { name: "Trial Users", value: 1200 },
      { name: "Paid Users", value: 500 },
    ],
  },
};

export const EcommerceFunnel: Story = {
  args: {
    title: "E-commerce Conversion Funnel",
    description: "Track user journey from visit to purchase",
    stages: [
      { name: "Website Visitors", value: 50000 },
      { name: "Product Views", value: 15000 },
      { name: "Add to Cart", value: 5000 },
      { name: "Checkout Started", value: 2500 },
      { name: "Completed Purchase", value: 1800 },
    ],
  },
};

export const SaasFunnel: Story = {
  args: {
    title: "SaaS Signup Funnel",
    description: "From landing page to paid conversion",
    stages: [
      { name: "Landing Page", value: 100000 },
      { name: "Started Signup", value: 25000 },
      { name: "Email Verified", value: 18000 },
      { name: "Onboarding Complete", value: 12000 },
      { name: "First Action", value: 8000 },
      { name: "Upgraded to Paid", value: 2000 },
    ],
  },
};

export const HighConversion: Story = {
  args: {
    title: "Optimized Funnel",
    description: "Well-optimized conversion path",
    stages: [
      { name: "Visitors", value: 1000 },
      { name: "Engaged", value: 850 },
      { name: "Converted", value: 720 },
    ],
  },
};

export const LowConversion: Story = {
  args: {
    title: "Leaky Funnel",
    description: "Needs optimization",
    stages: [
      { name: "Visitors", value: 10000 },
      { name: "Engaged", value: 1200 },
      { name: "Converted", value: 150 },
    ],
  },
};

export const CustomColors: Story = {
  args: {
    title: "Custom Color Funnel",
    stages: [
      { name: "Awareness", value: 8000, color: "#3b82f6" },
      { name: "Interest", value: 5000, color: "#8b5cf6" },
      { name: "Desire", value: 2500, color: "#ec4899" },
      { name: "Action", value: 1000, color: "#10b981" },
    ],
  },
};
