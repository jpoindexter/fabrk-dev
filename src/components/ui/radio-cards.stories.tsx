/**
 * ✅ FABRK COMPONENT
 * RadioCards Stories
 */

import { RadioCards } from "@/components/ui/radio-cards";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof RadioCards> = {
  title: "UI/Forms/RadioCards",
  component: RadioCards,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioCards>;

export const Default: Story = {
  args: {
    options: [
      { value: "basic", label: "Basic", description: "$9/month" },
      { value: "pro", label: "Pro", description: "$29/month" },
      { value: "enterprise", label: "Enterprise", description: "$99/month" },
    ],
    defaultValue: "pro",
  },
};

export const Plans: Story = {
  render: () => (
    <div className="w-[500px]">
      <h3 className="mb-4 text-lg font-semibold">Choose your plan</h3>
      <RadioCards
        options={[
          { value: "starter", label: "Starter", description: "Perfect for individuals" },
          { value: "team", label: "Team", description: "Great for small teams" },
          { value: "business", label: "Business", description: "For larger organizations" },
        ]}
        defaultValue="team"
      />
    </div>
  ),
};
