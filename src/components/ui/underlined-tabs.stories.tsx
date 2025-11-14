/**
 * ✅ FABRK COMPONENT
 * UnderlinedTabs Stories
 */

import { UnderlinedTabs } from "@/components/ui/underlined-tabs";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof UnderlinedTabs> = {
  title: "UI/Navigation/UnderlinedTabs",
  component: UnderlinedTabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UnderlinedTabs>;

export const Default: Story = {
  args: {
    tabs: [
      { label: "Overview", value: "overview" },
      { label: "Analytics", value: "analytics" },
      { label: "Reports", value: "reports" },
      { label: "Settings", value: "settings" },
    ],
    defaultValue: "overview",
  },
};

export const WithContent: Story = {
  render: () => (
    <div className="w-[600px]">
      <UnderlinedTabs
        tabs={[
          { label: "Profile", value: "profile" },
          { label: "Account", value: "account" },
          { label: "Security", value: "security" },
        ]}
        defaultValue="profile"
      />
      <div className="rounded-b-lg border p-4">
        <p className="text-sm text-muted-foreground">Tab content goes here</p>
      </div>
    </div>
  ),
};
