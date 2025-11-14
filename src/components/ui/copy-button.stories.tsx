/**
 * ✅ FABRK COMPONENT
 * CopyButton Stories
 * - Under 150 lines ✓
 */

import { CopyButton } from "@/components/ui/copy-button";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof CopyButton> = {
  title: "UI/Actions/CopyButton",
  component: CopyButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    value: "Hello, World!",
  },
};

export const CodeSnippet: Story = {
  render: () => (
    <div className="w-[500px]">
      <div className="relative rounded-lg border bg-muted/50 p-4">
        <code className="text-sm">npm install @fabrk/ui</code>
        <CopyButton value="npm install @fabrk/ui" className="absolute right-2 top-2" />
      </div>
    </div>
  ),
};

export const APIKey: Story = { // SECRET - story example name
  render: () => (
    <div className="w-[400px] space-y-2">
      <label className="text-sm font-medium">API Key</label>
      <div className="flex items-center gap-2">
        <code className="flex-1 rounded-md border bg-muted px-3 py-2 text-sm">
          sk-abc123def456ghi789jkl
        </code>
        <CopyButton value="sk-abc123def456ghi789jkl" />
      </div>
    </div>
  ),
};
