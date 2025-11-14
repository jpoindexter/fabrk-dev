/**
 * ✅ FABRK COMPONENT
 * InputNumber Stories
 */

import { InputNumber } from "@/components/ui/input-number";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof InputNumber> = {
  title: "UI/Forms/InputNumber",
  component: InputNumber,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Default: Story = {
  args: {
    placeholder: "0",
  },
};

export const WithMinMax: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <label htmlFor="quantity" className="text-sm font-medium">
        Quantity
      </label>
      <InputNumber id="quantity" min={1} max={99} defaultValue={1} />
    </div>
  ),
};

export const Currency: Story = {
  render: () => (
    <div className="w-[200px] space-y-2">
      <label htmlFor="price" className="text-sm font-medium">
        Price
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
        <InputNumber id="price" className="pl-7" step={0.01} defaultValue={9.99} />
      </div>
    </div>
  ),
};
