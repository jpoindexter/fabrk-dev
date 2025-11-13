import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RoleSelector, DEFAULT_ROLES, type Role } from "./role-selector";
import { Crown, Shield, User, Eye, Pencil, MessageSquare } from "lucide-react";

const meta = {
  title: "UI/RoleSelector",
  component: RoleSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["cards", "list"],
      description: "Display variant for role selector",
    },
    multiSelect: {
      control: "boolean",
      description: "Allow multiple role selection",
    },
    showPermissions: {
      control: "boolean",
      description: "Display permission badges",
    },
    showConfirmation: {
      control: "boolean",
      description: "Show confirmation dialog before role change",
    },
  },
} satisfies Meta<typeof RoleSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "member",
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const MultiSelect: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: ["admin", "member"],
    multiSelect: true,
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const CardVariant: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "admin",
    variant: "cards",
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const ListVariant: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "member",
    variant: "list",
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const WithPermissionsDisplayed: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "owner",
    showPermissions: true,
    variant: "cards",
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const WithoutPermissions: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "admin",
    showPermissions: false,
    variant: "cards",
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const CurrentRoleHighlighted: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "member",
    currentRole: "member",
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const DisabledRoles: Story = {
  args: {
    roles: DEFAULT_ROLES.map((role) =>
      role.id === "owner" ? { ...role, disabled: true } : role
    ),
    value: "admin",
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const WithConfirmationDialog: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "member",
    showConfirmation: true,
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

const CUSTOM_ROLES: Role[] = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Ultimate control with system configuration access",
    icon: Crown,
    permissions: [
      "System config",
      "User management",
      "Billing",
      "Audit logs",
      "API access",
    ],
  },
  {
    id: "moderator",
    name: "Moderator",
    description: "Content moderation and community management",
    icon: Shield,
    permissions: [
      "Delete content",
      "Ban users",
      "Edit posts",
      "View reports",
    ],
  },
  {
    id: "contributor",
    name: "Contributor",
    description: "Create and publish content with review",
    icon: Pencil,
    permissions: ["Create content", "Request approval", "View analytics"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to content and analytics",
    icon: Eye,
    permissions: ["View content", "Export reports"],
  },
];

export const CustomRoleDefinitions: Story = {
  args: {
    roles: CUSTOM_ROLES,
    value: "moderator",
    showPermissions: true,
  },
  render: (args) => (
    <div className="w-[900px]">
      <RoleSelector {...args} />
    </div>
  ),
};

export const TeamRoles: Story = {
  args: {
    roles: DEFAULT_ROLES,
    value: "admin",
    currentRole: "owner",
    showPermissions: true,
    variant: "cards",
  },
  render: (args) => (
    <div className="w-[900px]">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black">Team Member Roles</h2>
          <p className="text-sm text-muted-foreground">
            Select a role for the new team member
          </p>
        </div>
        <RoleSelector {...args} />
      </div>
    </div>
  ),
};

const PROJECT_ROLES: Role[] = [
  {
    id: "editor",
    name: "Editor",
    description: "Full edit access to project files and settings",
    icon: Pencil,
    permissions: [
      "Edit files",
      "Manage settings",
      "Invite members",
      "Delete content",
    ],
  },
  {
    id: "commenter",
    name: "Commenter",
    description: "Add comments and suggestions to content",
    icon: MessageSquare,
    permissions: ["Add comments", "Suggest edits", "View files"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "View project content without editing",
    icon: Eye,
    permissions: ["View files", "Download content"],
  },
];

export const ProjectRoles: Story = {
  args: {
    roles: PROJECT_ROLES,
    value: "editor",
    showPermissions: true,
    variant: "list",
  },
  render: (args) => (
    <div className="w-[600px]">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black">Project Access</h2>
          <p className="text-sm text-muted-foreground">
            Choose the access level for this collaborator
          </p>
        </div>
        <RoleSelector {...args} />
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  args: {
    roles: DEFAULT_ROLES,
    showPermissions: true,
    showConfirmation: true,
  },
  render: function InteractiveRoleSelector(args) {
    const [selectedRole, setSelectedRole] = React.useState<string>("member");
    const [currentRole] = React.useState<string>("member");

    return (
      <div className="w-[900px]">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black">Role Management</h2>
            <p className="text-sm text-muted-foreground">
              Current role: <span className="font-bold">{currentRole}</span> •
              Selected: <span className="font-bold">{selectedRole}</span>
            </p>
          </div>
          <RoleSelector
            {...args}
            value={selectedRole}
            currentRole={currentRole}
            onChange={(value) => setSelectedRole(value as string)}
          />
        </div>
      </div>
    );
  },
};

export const MultiSelectInteractive: Story = {
  args: {
    roles: DEFAULT_ROLES,
    multiSelect: true,
    showPermissions: true,
  },
  render: function MultiSelectRoleSelector(args) {
    const [selectedRoles, setSelectedRoles] = React.useState<string[]>([
      "admin",
      "member",
    ]);

    return (
      <div className="w-[900px]">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black">Multi-Role Selection</h2>
            <p className="text-sm text-muted-foreground">
              Selected roles: {selectedRoles.join(", ") || "None"}
            </p>
          </div>
          <RoleSelector
            {...args}
            value={selectedRoles}
            onChange={(value) => setSelectedRoles(value as string[])}
          />
        </div>
      </div>
    );
  },
};
