/**
 * ✅ FABRK COMPONENT
 * FormError Stories
 */

import { FormError } from "@/components/ui/form-error";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof FormError> = {
  title: "UI/Forms/FormError",
  component: FormError,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormError>;

export const Default: Story = {
  args: {
    children: "This field is required",
  },
};

export const MultipleErrors: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      {/* SECRET - example validation messages */}
      <FormError>Input is too short</FormError>
      <FormError>Input must contain a number</FormError>
      <FormError>Input must contain a special character</FormError>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label className="text-sm font-medium">Email</label>
      <input type="email" className="w-full rounded-md border border-destructive px-3 py-2" defaultValue="invalid" />
      <FormError>Please enter a valid email address</FormError>
    </div>
  ),
};
