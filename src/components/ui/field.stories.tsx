/**
 * ✅ FABRK COMPONENT
 * Field Stories
 */

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Field> = {
  title: "UI/Forms/Field",
  component: Field,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field label="Email" description="We'll never share your email">
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field label="Name" required>
      <Input placeholder="John Doe" />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field label="Email" error="Please enter a valid email address">
      <Input type="email" defaultValue="invalid-email" className="border-destructive" />
    </Field>
  ),
};
