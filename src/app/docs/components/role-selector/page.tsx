"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { RoleSelector, Role, DEFAULT_ROLES } from "@/components/ui/role-selector";
import { useState } from "react";
import { Crown, Shield, User, Eye, Code, Palette } from "lucide-react";
import { toast } from "sonner";

export default function RoleSelectorPage() {
  const [selectedRole1, setSelectedRole1] = useState<string | string[]>("member");
  const [selectedRole2, setSelectedRole2] = useState<string | string[]>("admin");
  const [selectedRoles, setSelectedRoles] = useState<string | string[]>(["admin", "member"]);

  const customRoles: Role[] = [
    {
      id: "developer",
      name: "Developer",
      description: "Full code access and deployment permissions",
      icon: Code,
      permissions: ["Write code", "Deploy", "Access databases", "View logs"],
    },
    {
      id: "designer",
      name: "Designer",
      description: "Design and UI/UX access",
      icon: Palette,
      permissions: ["Edit designs", "View prototypes", "Access assets"],
    },
  ];

  const handleChange = (value: string | string[]) => {
    toast.success(`Role changed to: ${Array.isArray(value) ? value.join(", ") : value}`);
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.108]"
      category="Components"
      title="Role Selector"
      description="Visual role selector with permission display and optional confirmation dialog."
      importCode={`import { RoleSelector, DEFAULT_ROLES } from "@/components/ui/role-selector"`}
      mainPreview={{
        preview: (
          <RoleSelector
            roles={DEFAULT_ROLES}
            value={selectedRole1}
            onChange={setSelectedRole1}
            showPermissions
          />
        ),
        code: `const [selectedRole, setSelectedRole] = useState("member");

<RoleSelector
  roles={DEFAULT_ROLES}
  value={selectedRole}
  onChange={setSelectedRole}
  showPermissions
/>`,
      }}
      variants={[
        {
          title: "Cards Variant",
          description: "Default card-based layout in a responsive grid.",
          preview: (
            <RoleSelector
              roles={DEFAULT_ROLES}
              value={selectedRole1}
              onChange={setSelectedRole1}
              variant="cards"
              showPermissions
            />
          ),
          code: `<RoleSelector
  roles={DEFAULT_ROLES}
  value={selectedRole}
  onChange={setSelectedRole}
  variant="cards"
  showPermissions
/>`,
        },
        {
          title: "List Variant",
          description: "Vertical list layout for compact display.",
          preview: (
            <RoleSelector
              roles={DEFAULT_ROLES}
              value={selectedRole2}
              onChange={setSelectedRole2}
              variant="list"
              showPermissions
            />
          ),
          code: `<RoleSelector
  roles={DEFAULT_ROLES}
  value={selectedRole}
  onChange={setSelectedRole}
  variant="list"
  showPermissions
/>`,
        },
        {
          title: "Multi-Select",
          description: "Allow selection of multiple roles simultaneously.",
          preview: (
            <RoleSelector
              roles={DEFAULT_ROLES}
              value={selectedRoles}
              onChange={setSelectedRoles}
              multiSelect
              showPermissions
            />
          ),
          code: `const [roles, setRoles] = useState(["admin", "member"]);

<RoleSelector
  roles={DEFAULT_ROLES}
  value={roles}
  onChange={setRoles}
  multiSelect
  showPermissions
/>`,
        },
        {
          title: "With Confirmation",
          description: "Show confirmation dialog before changing roles.",
          preview: (
            <RoleSelector
              roles={DEFAULT_ROLES}
              value={selectedRole1}
              onChange={handleChange}
              showConfirmation
              showPermissions
            />
          ),
          code: `<RoleSelector
  roles={DEFAULT_ROLES}
  value={selectedRole}
  onChange={handleChange}
  showConfirmation
  showPermissions
/>`,
        },
        {
          title: "Current Role Badge",
          description: "Highlight the user's current role with a badge.",
          preview: (
            <RoleSelector
              roles={DEFAULT_ROLES}
              value={selectedRole1}
              onChange={setSelectedRole1}
              currentRole="member"
              variant="list"
              showPermissions
            />
          ),
          code: `<RoleSelector
  roles={DEFAULT_ROLES}
  value={selectedRole}
  onChange={setSelectedRole}
  currentRole="member"
  variant="list"
  showPermissions
/>`,
        },
        {
          title: "Custom Roles",
          description: "Define custom roles with unique icons and permissions.",
          preview: (
            <RoleSelector
              roles={customRoles}
              value="developer"
              onChange={handleChange}
              showPermissions
            />
          ),
          code: `const customRoles: Role[] = [
  {
    id: "developer",
    name: "Developer",
    description: "Full code access and deployment permissions",
    icon: Code,
    permissions: ["Write code", "Deploy", "Access databases"],
  },
  {
    id: "designer",
    name: "Designer",
    description: "Design and UI/UX access",
    icon: Palette,
    permissions: ["Edit designs", "View prototypes"],
  },
];

<RoleSelector
  roles={customRoles}
  value="developer"
  onChange={handleChange}
  showPermissions
/>`,
        },
        {
          title: "Without Permissions",
          description: "Hide permission badges for a cleaner look.",
          preview: (
            <RoleSelector
              roles={DEFAULT_ROLES}
              value={selectedRole1}
              onChange={setSelectedRole1}
              showPermissions={false}
            />
          ),
          code: `<RoleSelector
  roles={DEFAULT_ROLES}
  value={selectedRole}
  onChange={setSelectedRole}
  showPermissions={false}
/>`,
        },
        {
          title: "Disabled Roles",
          description: "Disable specific roles to prevent selection.",
          preview: (
            <RoleSelector
              roles={DEFAULT_ROLES.map((role) =>
                role.id === "owner" ? { ...role, disabled: true } : role
              )}
              value={selectedRole1}
              onChange={setSelectedRole1}
              variant="list"
              showPermissions
            />
          ),
          code: `const rolesWithDisabled = DEFAULT_ROLES.map((role) =>
  role.id === "owner" ? { ...role, disabled: true } : role
);

<RoleSelector
  roles={rolesWithDisabled}
  value={selectedRole}
  onChange={setSelectedRole}
  variant="list"
  showPermissions
/>`,
        },
      ]}
      props={[
        {
          name: "roles",
          type: "Role[]",
          default: "DEFAULT_ROLES",
          description: "Array of role objects with id, name, description, icon, and permissions.",
        },
        {
          name: "value",
          type: "string | string[]",
          default: "undefined",
          description: "Currently selected role(s). String for single, array for multi-select.",
        },
        {
          name: "onChange",
          type: "(value: string | string[]) => void",
          default: "undefined",
          description: "Callback fired when selection changes.",
        },
        {
          name: "multiSelect",
          type: "boolean",
          default: "false",
          description: "Allow multiple role selection.",
        },
        {
          name: "showPermissions",
          type: "boolean",
          default: "false",
          description: "Display permission badges for each role.",
        },
        {
          name: "showConfirmation",
          type: "boolean",
          default: "false",
          description: "Show confirmation dialog before changing roles.",
        },
        {
          name: "currentRole",
          type: "string",
          default: "undefined",
          description: "Highlight this role as the user's current role with a badge.",
        },
        {
          name: "variant",
          type: '"cards" | "list"',
          default: '"cards"',
          description: "Layout variant: card grid or vertical list.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container.",
        },
      ]}
      accessibility={[
        "Keyboard navigation supported with Enter/Space to select roles",
        "Selected roles show checkmark icon with high contrast",
        "Disabled roles have reduced opacity and cursor-not-allowed",
        "Confirmation dialog uses AlertDialog with proper focus management",
        "Role icons are decorative with descriptive text labels",
        "Permission badges use semantic HTML with neutral variant styling",
      ]}
      previous={{ title: "Progress", href: "/docs/components/progress" }}
      next={{ title: "Select", href: "/docs/components/select" }}
    />
  );
}
