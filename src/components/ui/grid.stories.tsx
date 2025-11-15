/**
 * ✅ FABRK COMPONENT
 * Grid Stories - Comprehensive grid layouts
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Design tokens only ✓
 */

import { Grid } from "@/components/ui/grid";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Grid> = {
  title: "UI/Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Default grid
export const Default: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-muted/50 p-6">
          <h3 className="font-medium">Item {i + 1}</h3>
          <p className="mt-2 text-sm text-muted-foreground">Grid item content</p>
        </div>
      ))}
    </Grid>
  ),
};

// Responsive columns
export const ResponsiveColumns: Story = {
  render: () => (
    <Grid cols={{ default: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-muted/50 p-6">
          <h3 className="font-medium">Item {i + 1}</h3>
          <p className="mt-2 text-sm text-muted-foreground">Responsive grid</p>
        </div>
      ))}
    </Grid>
  ),
};

// Feature cards
export const FeatureCards: Story = {
  render: () => (
    <Grid cols={{ default: 1, md: 2, lg: 3 }} gap={6}>
      {[
        { title: "Fast", desc: "Lightning-fast performance" },
        { title: "Secure", desc: "Enterprise-grade security" },
        { title: "Scalable", desc: "Grows with your needs" },
        { title: "Reliable", desc: "99.9% uptime guarantee" },
        { title: "Support", desc: "24/7 customer support" },
        { title: "Analytics", desc: "Real-time insights" },
      ].map((feature, i) => (
        <div key={i} className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="mt-2 text-muted-foreground">{feature.desc}</p>
        </div>
      ))}
    </Grid>
  ),
};

// Product grid
export const ProductGrid: Story = {
  render: () => (
    <Grid cols={{ default: 1, sm: 2, lg: 4 }} gap={4}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border">
          <div className="aspect-square bg-muted" />
          <div className="p-4">
            <h3 className="font-medium">Product {i + 1}</h3>
            <p className="mt-1 text-sm text-muted-foreground">$99.00</p>
          </div>
        </div>
      ))}
    </Grid>
  ),
};
