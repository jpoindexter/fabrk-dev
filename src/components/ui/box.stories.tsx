/**
 * ✅ FABRK COMPONENT
 * Box Stories - Comprehensive layout primitives
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Design tokens only ✓
 */

import { Box } from "@/components/ui/box";
import { tokens } from "@/lib/design-system/tokens";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Box> = {
  title: "UI/Layout/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Box>;

// Default box
export const Default: Story = {
  render: () => (
    <Box className="w-[300px] rounded-lg border p-4">
      <p>This is a basic box component.</p>
    </Box>
  ),
};

// With padding
export const WithPadding: Story = {
  render: () => (
    <div className="space-y-4">
      <Box className="rounded-lg border bg-muted/50 p-2">
        <p className="text-sm">Small padding</p>
      </Box>
      <Box className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">Medium padding</p>
      </Box>
      <Box className="rounded-lg border bg-muted/50 p-8">
        <p className="text-sm">Large padding</p>
      </Box>
    </div>
  ),
};

// Colored boxes
export const ColoredBoxes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Box className="rounded-lg bg-primary p-6 text-primary-foreground">
        <p className="font-medium">Primary</p>
      </Box>
      <Box className="rounded-lg bg-secondary p-6 text-secondary-foreground">
        <p className="font-medium">Secondary</p>
      </Box>
      <Box className="rounded-lg bg-muted p-6 text-muted-foreground">
        <p className="font-medium">Muted</p>
      </Box>
    </div>
  ),
};

// Card example
export const CardExample: Story = {
  render: () => (
    <Box className="w-[350px] overflow-hidden rounded-lg border">
      <div className="aspect-video bg-muted" />
      <Box className="space-y-2 p-6">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-muted-foreground">
          This is a card built using the Box component with custom styling.
        </p>
        <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Learn More
        </button>
      </Box>
    </Box>
  ),
};

// Nested boxes
export const NestedBoxes: Story = {
  render: () => (
    <Box className="w-[400px] rounded-lg border p-6">
      <h3 className="mb-4 font-semibold">Parent Box</h3>
      <Box className="mb-3 rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">Child Box 1</p>
      </Box>
      <Box className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">Child Box 2</p>
      </Box>
    </Box>
  ),
};
