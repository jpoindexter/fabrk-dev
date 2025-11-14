/**
 * ✅ FABRK COMPONENT
 * NotificationList Stories
 */

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "UI/Components/NotificationList",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <div>NotificationList Component</div>,
};

export const Example: Story = {
  render: () => <div>NotificationList Example</div>,
};
