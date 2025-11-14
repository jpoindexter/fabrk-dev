/**
 * ✅ FABRK COMPONENT
 * Cropper Stories
 */

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "UI/Components/Cropper",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <div>Cropper Component</div>,
};

export const Example: Story = {
  render: () => <div>Cropper Example</div>,
};
