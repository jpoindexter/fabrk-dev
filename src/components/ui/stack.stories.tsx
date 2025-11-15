/**
 * ✅ FABRK COMPONENT
 * Stack Stories - Comprehensive stack layouts
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Design tokens only ✓
 */

import { Stack } from "@/components/ui/stack";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Stack> = {
  title: "UI/Layout/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stack>;

// Vertical stack
export const Vertical: Story = {
  render: () => (
    <Stack spacing={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-[300px] rounded-lg border bg-muted/50 p-4">
          Item {i + 1}
        </div>
      ))}
    </Stack>
  ),
};

// Horizontal stack
export const Horizontal: Story = {
  render: () => (
    <Stack direction="horizontal" spacing={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-muted/50 p-4">
          Item {i + 1}
        </div>
      ))}
    </Stack>
  ),
};

// Different spacings
export const Spacings: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Small spacing (2)</p>
        <Stack spacing={2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[250px] rounded-lg border bg-muted/50 p-3">
              Item {i + 1}
            </div>
          ))}
        </Stack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Medium spacing (4)</p>
        <Stack spacing={4}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[250px] rounded-lg border bg-muted/50 p-3">
              Item {i + 1}
            </div>
          ))}
        </Stack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Large spacing (8)</p>
        <Stack spacing={8}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[250px] rounded-lg border bg-muted/50 p-3">
              Item {i + 1}
            </div>
          ))}
        </Stack>
      </div>
    </div>
  ),
};

// Form layout
export const FormLayout: Story = {
  render: () => (
    <div className="w-[400px]">
      <Stack spacing={4}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <textarea
            className="w-full rounded-md border px-3 py-2"
            rows={4}
            placeholder="Your message"
          />
        </div>
        <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground">
          Submit
        </button>
      </Stack>
    </div>
  ),
};
