/**
 * ✅ FABRK COMPONENT
 * InputPassword Stories
 */

import { InputPassword } from "@/components/ui/input-password";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof InputPassword> = {
  title: "UI/Forms/InputPassword",
  component: InputPassword,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  args: {
    placeholder: "Enter password",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <InputPassword id="password" placeholder="Enter your password" />
    </div>
  ),
};

export const WithStrengthIndicator: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="new-password" className="text-sm font-medium">
        Create Password
      </label>
      <InputPassword id="new-password" placeholder="Create a strong password" />
      <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
    </div>
  ),
};
