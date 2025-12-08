"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  SettingsLayout,
  SettingsSection,
  SettingsRow,
  SettingsCard,
  SettingsDivider,
} from "@/components/ui/settings-layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { User, Shield, CreditCard, Bell } from "lucide-react";

export default function SettingsLayoutPage() {
  const navItems = [
    { id: "account", label: "Account", icon: <User className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" />, badge: 1 },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.103]"
      category="Layout"
      title="Settings Layout"
      description="A settings page layout with sidebar navigation and organized sections. Includes row, card, and divider components for building settings UIs."
      importCode={`import {
  SettingsLayout,
  SettingsSection,
  SettingsRow,
  SettingsCard,
} from "@/components/ui/settings-layout"`}
      mainPreview={{
        preview: (
          <div className="border-border h-[500px] overflow-auto border">
            <SettingsLayout
              navItems={navItems}
              activeItem="account"
              title="Settings"
              description="Manage your account preferences"
            >
              <SettingsSection
                title="Profile Information"
                description="Update your personal details"
              >
                <SettingsRow label="Display Name" description="Your public display name">
                  <Input defaultValue="John Doe" className="w-48" />
                </SettingsRow>
                <SettingsDivider />
                <SettingsRow label="Email Notifications" description="Receive email updates">
                  <Switch />
                </SettingsRow>
              </SettingsSection>
            </SettingsLayout>
          </div>
        ),
        code: `<SettingsLayout
  navItems={navItems}
  activeItem="account"
  title="Settings"
  description="Manage your account preferences"
>
  <SettingsSection
    title="Profile Information"
    description="Update your personal details"
  >
    <SettingsRow label="Display Name" description="Your public display name">
      <Input defaultValue="John Doe" className="w-48" />
    </SettingsRow>
    <SettingsDivider />
    <SettingsRow label="Email Notifications" description="Receive email updates">
      <Switch />
    </SettingsRow>
  </SettingsSection>
</SettingsLayout>`,
      }}
      variants={[
        {
          title: "Danger Zone Card",
          description: "Settings card with destructive styling.",
          preview: (
            <div className="max-w-2xl p-4">
              <SettingsCard
                title="Delete Account"
                description="Permanently delete your account and all data"
                danger={true}
                footer={<Button variant="destructive">&gt; DELETE_ACCOUNT</Button>}
              >
                <p className="text-muted-foreground text-xs">
                  This action cannot be undone. All your data will be permanently removed.
                </p>
              </SettingsCard>
            </div>
          ),
          code: `<SettingsCard
  title="Delete Account"
  description="Permanently delete your account"
  danger={true}
  footer={<Button variant="destructive">> DELETE_ACCOUNT</Button>}
>
  <p>This action cannot be undone.</p>
</SettingsCard>`,
        },
      ]}
      props={[
        {
          name: "navItems",
          type: "SettingsNavItem[]",
          required: true,
          description: "Navigation items for sidebar.",
        },
        { name: "activeItem", type: "string", description: "Currently active nav item ID." },
        { name: "title", type: "string", description: "Page title." },
        { name: "description", type: "string", description: "Page description." },
        { name: "children", type: "ReactNode", required: true, description: "Settings content." },
        { name: "onNavItemClick", type: "(item) => void", description: "Nav item click handler." },
        {
          name: "maxWidth",
          type: '"sm" | "md" | "lg" | "xl" | "full"',
          default: '"xl"',
          description: "Max width of layout.",
        },
      ]}
      accessibility={[
        "Semantic navigation structure",
        "Keyboard navigable sidebar",
        "Focus states for form controls",
        "Responsive mobile layout",
      ]}
      previous={{ title: "Separator", href: "/docs/components/separator" }}
      next={{ title: "Stack", href: "/docs/components/stack" }}
    />
  );
}
