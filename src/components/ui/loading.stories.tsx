/**
 * ✅ FABRK COMPONENT
 * Loading Stories
 * - Under 150 lines ✓
 */

import { Loading } from "@/components/ui/loading";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Loading> = {
  title: "UI/Feedback/Loading",
  component: Loading,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loading size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="md" />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loading size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <Loading />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  ),
};

export const Fullscreen: Story = {
  render: () => (
    <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loading size="lg" />
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Loading Application</h3>
          <p className="text-sm text-muted-foreground">Please wait...</p>
        </div>
      </div>
    </div>
  ),
};
