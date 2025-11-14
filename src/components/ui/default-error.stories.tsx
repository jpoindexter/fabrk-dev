/**
 * ✅ FABRK COMPONENT
 * DefaultError Stories
 */

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "UI/Components/DefaultError",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <div>DefaultError Component</div>,
};

export const Example: Story = {
  render: () => <div>DefaultError Example</div>,
};
