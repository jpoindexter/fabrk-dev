/**
 * ✅ FABRK STORYBOOK
 * Invite Form Stories - Comprehensive examples
 * - Single and multiple email modes
 * - Role selection scenarios
 * - Optional features (message, permissions, expiration)
 * - Validation and loading states
 */

import type { Meta, StoryObj } from "@storybook/nextjs";
import { InviteForm } from "./invite-form";

const meta: Meta<typeof InviteForm> = {
  title: "Components/Forms/InviteForm",
  component: InviteForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InviteForm>;

const mockSubmit = async (data: unknown) => {
  console.log("Invite data:", data);
  await new Promise((resolve) => setTimeout(resolve, 1500));
};

export const Default: Story = {
  args: {
    onSubmit: mockSubmit,
  },
};

export const MultipleEmails: Story = {
  args: {
    allowMultiple: true,
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Allows adding multiple email addresses as chips. Press Enter or comma to add each email.",
      },
    },
  },
};

export const WithCustomMessage: Story = {
  args: {
    allowMultiple: true,
    showMessage: true,
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Include an optional custom message with the invitation.",
      },
    },
  },
};

export const WithRoleSelection: Story = {
  args: {
    roles: [
      { value: "owner", label: "Owner" },
      { value: "admin", label: "Administrator" },
      { value: "editor", label: "Editor" },
      { value: "viewer", label: "Viewer" },
      { value: "guest", label: "Guest" },
    ],
    defaultRole: "editor",
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Custom role options with different default selection.",
      },
    },
  },
};

export const WithPermissions: Story = {
  args: {
    allowMultiple: true,
    showPermissions: true,
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Granular permission checkboxes for fine-tuned access control.",
      },
    },
  },
};

export const WithExpiration: Story = {
  args: {
    allowMultiple: true,
    showExpiration: true,
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Set an expiration date for the invitation link.",
      },
    },
  },
};

export const FullFeatured: Story = {
  args: {
    allowMultiple: true,
    showMessage: true,
    showPermissions: true,
    showExpiration: true,
    roles: [
      { value: "owner", label: "Owner" },
      { value: "admin", label: "Administrator" },
      { value: "member", label: "Member" },
      { value: "guest", label: "Guest" },
    ],
    defaultRole: "member",
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "All features enabled: multiple emails, custom message, permissions, and expiration.",
      },
    },
  },
};

export const MinimalForm: Story = {
  args: {
    allowMultiple: false,
    showMessage: false,
    showPermissions: false,
    showExpiration: false,
    roles: [
      { value: "member", label: "Member" },
      { value: "viewer", label: "Viewer" },
    ],
    defaultRole: "member",
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal configuration with only email and role fields.",
      },
    },
  },
};

export const ValidationError: Story = {
  args: {
    onSubmit: async () => {
      throw new Error("Invalid invitation token");
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays validation errors from the submission handler.",
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    allowMultiple: true,
    onSubmit: async (data) => {
      console.log("Sending invites:", data);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Shows loading state during submission (5 second delay for demo).",
      },
    },
  },
};

export const SuccessFeedback: Story = {
  args: {
    allowMultiple: true,
    showMessage: true,
    onSubmit: async (data) => {
      console.log("Invites sent successfully:", data);
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Displays success banner after successful submission.",
      },
    },
  },
};

export const CustomRolesList: Story = {
  args: {
    allowMultiple: true,
    roles: [
      { value: "superadmin", label: "Super Administrator" },
      { value: "moderator", label: "Moderator" },
      { value: "contributor", label: "Contributor" },
      { value: "subscriber", label: "Subscriber" },
    ],
    defaultRole: "contributor",
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Custom role definitions for specific use cases.",
      },
    },
  },
};

export const EmailOnlyMode: Story = {
  args: {
    allowMultiple: false,
    showMessage: false,
    showPermissions: false,
    showExpiration: false,
    roles: [{ value: "default", label: "Default User" }],
    defaultRole: "default",
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Simplest form with only email input (role is hidden when only one option).",
      },
    },
  },
};

export const TeamInvite: Story = {
  args: {
    allowMultiple: true,
    showMessage: true,
    roles: [
      { value: "team_lead", label: "Team Lead" },
      { value: "developer", label: "Developer" },
      { value: "designer", label: "Designer" },
      { value: "qa", label: "QA Engineer" },
    ],
    defaultRole: "developer",
    onSubmit: async (data) => {
      console.log("Team invite:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Successfully invited ${data.emails.length} team member(s) as ${data.role}!`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Example configuration for team member invitations with role-based access.",
      },
    },
  },
};

export const ProjectCollaborator: Story = {
  args: {
    allowMultiple: false,
    showMessage: true,
    showExpiration: true,
    roles: [
      { value: "owner", label: "Project Owner" },
      { value: "collaborator", label: "Collaborator" },
      { value: "reviewer", label: "Reviewer" },
    ],
    defaultRole: "collaborator",
    onSubmit: mockSubmit,
  },
  parameters: {
    docs: {
      description: {
        story: "Configuration for inviting external collaborators with time-limited access.",
      },
    },
  },
};

export const BetaTester: Story = {
  args: {
    allowMultiple: true,
    showMessage: true,
    showExpiration: true,
    roles: [
      { value: "beta_tester", label: "Beta Tester" },
      { value: "alpha_tester", label: "Alpha Tester" },
    ],
    defaultRole: "beta_tester",
    onSubmit: async (data) => {
      console.log("Beta tester invite:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Send beta testing invitations with expiration dates.",
      },
    },
  },
};
