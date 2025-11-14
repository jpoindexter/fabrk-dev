/**
 * ✅ FABRK COMPONENT
 * InputOTP Stories
 */

import { InputOTP } from "@/components/ui/input-otp";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof InputOTP> = {
  title: "UI/Forms/InputOTP",
  component: InputOTP,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  args: {
    length: 6,
  },
};

export const FourDigit: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Enter 4-digit code</label>
      <InputOTP length={4} />
    </div>
  ),
};

export const SixDigit: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Enter verification code</label>
      <InputOTP length={6} />
      <p className="text-xs text-muted-foreground">Check your email for the 6-digit code</p>
    </div>
  ),
};
