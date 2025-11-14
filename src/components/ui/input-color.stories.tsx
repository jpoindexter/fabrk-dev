/**
 * ✅ FABRK COMPONENT
 * InputColor Stories
 */

import { InputColor } from "@/components/ui/input-color";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof InputColor> = {
  title: "UI/Forms/InputColor",
  component: InputColor,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputColor>;

export const Default: Story = {
  args: {
    defaultValue: "#3b82f6",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="color" className="text-sm font-medium">
        Brand Color
      </label>
      <InputColor id="color" defaultValue="#3b82f6" />
    </div>
  ),
};

export const ThemeColors: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Primary</label>
        <InputColor defaultValue="#3b82f6" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Secondary</label>
        <InputColor defaultValue="#8b5cf6" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Accent</label>
        <InputColor defaultValue="#10b981" />
      </div>
    </div>
  ),
};
