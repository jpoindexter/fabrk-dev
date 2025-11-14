/**
 * ✅ FABRK COMPONENT
 * MultiStepForm Stories
 */

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "UI/Components/MultiStepForm",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <div>MultiStepForm Component</div>,
};

export const Example: Story = {
  render: () => <div>MultiStepForm Example</div>,
};
