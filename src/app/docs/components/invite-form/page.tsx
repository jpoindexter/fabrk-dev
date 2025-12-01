"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { InviteForm } from "@/components/ui/invite-form";
import { toast } from "sonner";

export default function InviteFormPage() {
  const mockSubmit = async (data: {
    emails: string[];
    role: string;
    message?: string;
    permissions?: string[];
    expiresAt?: Date;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Sent ${data.emails.length} invitation(s) as ${data.role}`);
  };

  const customRoles = [
    { value: "owner", label: "Owner" },
    { value: "admin", label: "Administrator" },
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
    { value: "viewer", label: "Viewer" },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.104]"
      category="Components"
      title="Invite Form"
      description="Team member invitation form with email validation, role selection, and optional permissions."
      importCode={`import { InviteForm } from "@/components/ui/invite-form"`}
      mainPreview={{
        preview: <InviteForm onSubmit={mockSubmit} />,
        code: `<InviteForm
  onSubmit={async (data) => {
    await sendInvitation(data);
  }}
/>`,
      }}
      variants={[
        {
          title: "Multiple Invites",
          description: "Allow multiple email addresses with chip-based input.",
          preview: <InviteForm allowMultiple onSubmit={mockSubmit} />,
          code: `<InviteForm
  allowMultiple
  onSubmit={sendInvitation}
/>`,
        },
        {
          title: "With Message",
          description: "Include an optional custom message field in the invitation.",
          preview: <InviteForm showMessage onSubmit={mockSubmit} />,
          code: `<InviteForm
  showMessage
  onSubmit={sendInvitation}
/>`,
        },
        {
          title: "With Permissions",
          description: "Show granular permission checkboxes for role customization.",
          preview: <InviteForm showPermissions onSubmit={mockSubmit} />,
          code: `<InviteForm
  showPermissions
  onSubmit={sendInvitation}
/>`,
        },
        {
          title: "With Expiration",
          description: "Add an expiration date picker for time-limited invitations.",
          preview: <InviteForm showExpiration onSubmit={mockSubmit} />,
          code: `<InviteForm
  showExpiration
  onSubmit={sendInvitation}
/>`,
        },
        {
          title: "Custom Roles",
          description: "Define custom roles with a specific default selection.",
          preview: (
            <InviteForm
              roles={customRoles}
              defaultRole="developer"
              onSubmit={mockSubmit}
            />
          ),
          code: `const customRoles = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Administrator" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "viewer", label: "Viewer" },
];

<InviteForm
  roles={customRoles}
  defaultRole="developer"
  onSubmit={sendInvitation}
/>`,
        },
        {
          title: "Full-Featured",
          description: "Complete invitation form with all features enabled.",
          preview: (
            <InviteForm
              allowMultiple
              showMessage
              showPermissions
              showExpiration
              onSubmit={mockSubmit}
            />
          ),
          code: `<InviteForm
  allowMultiple
  showMessage
  showPermissions
  showExpiration
  onSubmit={sendInvitation}
/>`,
        },
        {
          title: "Terminal Style",
          description: "Invite form with terminal-style wrapper.",
          preview: (
            <div className="rounded-none border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">team/invite</span>
              </div>
              <div className="p-4">
                <InviteForm allowMultiple showMessage onSubmit={mockSubmit} />
              </div>
            </div>
          ),
          code: `<div className="rounded-none border border-border bg-card">
  <div className="flex items-center gap-2 border-b border-border px-4 py-2">
    <div className="flex gap-1.5">
      <div className="size-2 rounded-full bg-destructive/50" />
      <div className="size-2 rounded-full bg-warning/50" />
      <div className="size-2 rounded-full bg-success/50" />
    </div>
    <span className="font-mono text-xs text-muted-foreground">team/invite</span>
  </div>
  <div className="p-4">
    <InviteForm allowMultiple showMessage onSubmit={sendInvitation} />
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "roles",
          type: "Array<{ value: string; label: string }>",
          default: '[{ value: "viewer", label: "Viewer" }, ...]',
          description: "Array of role options for the dropdown selector.",
        },
        {
          name: "defaultRole",
          type: "string",
          default: '"viewer"',
          description: "Default selected role value.",
        },
        {
          name: "allowMultiple",
          type: "boolean",
          default: "false",
          description: "Enable multiple email addresses with chip-based input.",
        },
        {
          name: "showMessage",
          type: "boolean",
          default: "false",
          description: "Show optional custom message textarea.",
        },
        {
          name: "showPermissions",
          type: "boolean",
          default: "false",
          description: "Display permission checkboxes for granular access control.",
        },
        {
          name: "showExpiration",
          type: "boolean",
          default: "false",
          description: "Show expiration date picker for time-limited invites.",
        },
        {
          name: "onSubmit",
          type: "(data: InviteData) => Promise<void>",
          default: "undefined",
          description: "Async callback fired when form is submitted with valid data.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the form container.",
        },
      ]}
      accessibility={[
        "All form fields have associated labels with htmlFor attributes",
        "Email validation provides immediate feedback with error messages",
        "Submit button is disabled during submission to prevent double-clicks",
        "Success message appears with checkmark icon after successful submission",
        "Keyboard navigation supported: Enter or comma adds emails in multi-mode",
        "Email chips have accessible remove buttons with aria-labels",
      ]}
      previous={{ title: "Input Search", href: "/docs/components/input-search" }}
      next={{ title: "Loading", href: "/docs/components/loading" }}
    />
  );
}
