/**
 * ✅ FABRK COMPONENT
 * PriceDisplay Stories
 */

import { PriceDisplay } from "@/components/ui/price-display";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof PriceDisplay> = {
  title: "UI/Data Display/PriceDisplay",
  component: PriceDisplay,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PriceDisplay>;

export const Default: Story = {
  args: {
    amount: 99.99,
    currency: "USD",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <PriceDisplay amount={9.99} currency="USD" size="sm" />
      <PriceDisplay amount={99.99} currency="USD" size="md" />
      <PriceDisplay amount={999.99} currency="USD" size="lg" />
    </div>
  ),
};

export const WithDiscount: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <PriceDisplay amount={79.99} currency="USD" />
        <span className="text-sm text-muted-foreground line-through">$99.99</span>
        <span className="text-sm font-medium text-green-600">20% off</span>
      </div>
    </div>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <div className="w-[300px] space-y-4 rounded-lg border p-6 text-center">
      <h3 className="text-lg font-semibold">Pro Plan</h3>
      <PriceDisplay amount={29.99} currency="USD" size="lg" period="/month" />
      <ul className="space-y-2 text-left text-sm">
        <li>✓ Unlimited projects</li>
        <li>✓ Advanced analytics</li>
        <li>✓ Priority support</li>
      </ul>
      <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground">Subscribe</button>
    </div>
  ),
};
