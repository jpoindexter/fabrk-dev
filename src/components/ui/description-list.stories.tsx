/**
 * ✅ FABRK COMPONENT
 * DescriptionList Stories
 */

import { DescriptionList } from "@/components/ui/description-list";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof DescriptionList> = {
  title: "UI/Data Display/DescriptionList",
  component: DescriptionList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {
  args: {
    items: [
      { term: "Name", description: "John Doe" },
      { term: "Email", description: "john@example.com" },
      { term: "Role", description: "Administrator" },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    items: [
      { term: "Status", description: "Active" },
      { term: "Member since", description: "January 2024" },
      { term: "Last login", description: "2 hours ago" },
    ],
  },
};

export const UserProfile: Story = {
  render: () => (
    <div className="w-[500px] rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Profile Information</h3>
      <DescriptionList
        items={[
          { term: "Full Name", description: "John Doe" },
          { term: "Email Address", description: "john.doe@example.com" },
          { term: "Phone Number", description: "+1 (555) 123-4567" },
          { term: "Location", description: "San Francisco, CA" },
          { term: "Job Title", description: "Senior Software Engineer" },
          { term: "Department", description: "Engineering" },
        ]}
      />
    </div>
  ),
};
