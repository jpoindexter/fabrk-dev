/**
 * ✅ FABRK COMPONENT
 * InputGroup Stories
 */

import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof InputGroup> = {
  title: "UI/Forms/InputGroup",
  component: InputGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const WithPrefix: Story = {
  render: () => (
    <InputGroup prefix="https://">
      <Input placeholder="example.com" />
    </InputGroup>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <InputGroup suffix=".com">
      <Input placeholder="example" />
    </InputGroup>
  ),
};

export const WithBoth: Story = {
  render: () => (
    <InputGroup prefix="$" suffix="USD">
      <Input type="number" placeholder="0.00" />
    </InputGroup>
  ),
};

export const Email: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <label className="text-sm font-medium">Email</label>
      <InputGroup suffix="@company.com">
        <Input placeholder="username" />
      </InputGroup>
    </div>
  ),
};
