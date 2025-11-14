/**
 * ✅ FABRK COMPONENT
 * PromptBuilder Stories
 */

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "UI/Components/PromptBuilder",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <div>PromptBuilder Component</div>,
};

export const Example: Story = {
  render: () => <div>PromptBuilder Example</div>,
};
