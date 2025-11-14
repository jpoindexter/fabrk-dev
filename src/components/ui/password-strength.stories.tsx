/**
 * ✅ FABRK COMPONENT
 * PasswordStrength Stories
 */

import { PasswordStrength } from "@/components/ui/password-strength";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof PasswordStrength> = {
  title: "UI/Forms/PasswordStrength",
  component: PasswordStrength,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PasswordStrength>;

export const Weak: Story = { args: { value: "pass" } };
export const Medium: Story = { args: { value: "Pass1234" } };
export const Strong: Story = { args: { value: "Pass1234!@#$" } };

export const WithInput: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label className="text-sm font-medium">Create Password</label>
      <input type="password" className="w-full rounded-md border px-3 py-2" placeholder="Enter password" />
      <PasswordStrength value="Pass1234" />
    </div>
  ),
};
