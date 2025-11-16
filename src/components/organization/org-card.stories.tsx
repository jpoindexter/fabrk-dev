import type { Meta, StoryObj } from "@storybook/nextjs";
import { OrgCard } from "./org-card";

const meta: Meta<typeof OrgCard> = {
  title: "Organization/OrgCard",
  component: OrgCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrgCard>;

export const Default: Story = {
  args: {
    name: "Acme Corporation",
    memberCount: 12,
    plan: "Pro",
    role: "Member",
  },
};

export const Owner: Story = {
  args: {
    name: "My Startup Inc",
    memberCount: 5,
    plan: "Starter",
    role: "Owner",
  },
};

export const Active: Story = {
  args: {
    name: "Tech Solutions Ltd",
    memberCount: 25,
    plan: "Enterprise",
    role: "Admin",
    isActive: true,
  },
};

export const FreePlan: Story = {
  args: {
    name: "Small Team",
    memberCount: 3,
    plan: "Free",
    role: "Member",
  },
};

export const EnterprisePlan: Story = {
  args: {
    name: "Enterprise Corp",
    memberCount: 150,
    plan: "Enterprise",
    role: "Owner",
  },
};

export const WithActions: Story = {
  args: {
    name: "Interactive Org",
    memberCount: 8,
    plan: "Pro",
    role: "Admin",
    onSelect: () => alert("Organization selected"),
    onSettings: () => alert("Opening settings"),
    onLeave: () => alert("Leaving organization"),
  },
};

export const SingleMember: Story = {
  args: {
    name: "Solo Project",
    memberCount: 1,
    plan: "Starter",
    role: "Owner",
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <OrgCard
        name="Acme Corp"
        memberCount={12}
        plan="Pro"
        role="Owner"
        isActive={true}
      />
      <OrgCard
        name="Tech Startup"
        memberCount={5}
        plan="Starter"
        role="Admin"
      />
      <OrgCard
        name="Enterprise Inc"
        memberCount={150}
        plan="Enterprise"
        role="Member"
      />
      <OrgCard
        name="Small Team"
        memberCount={3}
        plan="Free"
        role="Member"
      />
    </div>
  ),
};
