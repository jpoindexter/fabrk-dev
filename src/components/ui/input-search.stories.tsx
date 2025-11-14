/**
 * ✅ FABRK COMPONENT
 * InputSearch Stories
 */

import { InputSearch } from "@/components/ui/input-search";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof InputSearch> = {
  title: "UI/Forms/InputSearch",
  component: InputSearch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputSearch>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <label htmlFor="search" className="text-sm font-medium">
        Search
      </label>
      <InputSearch id="search" placeholder="Search products, articles, or users..." />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <InputSearch className="h-8" placeholder="Small" />
      <InputSearch placeholder="Default" />
      <InputSearch className="h-12" placeholder="Large" />
    </div>
  ),
};
