"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatLabel } from "@/design-system";

export default function SwitchPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.07]"
      category="Components"
      title="Switch"
      description="A toggle switch component for boolean settings."
      importCode={`import { Switch } from "@/components/ui/switch"`}
      mainPreview={{
        preview: (
          <div className="flex items-center gap-2">
            <Switch id="notifications" />
            <Label htmlFor="notifications">{formatLabel("Enable notifications")}</Label>
          </div>
        ),
        code: `<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">[ENABLE_NOTIFICATIONS]:</Label>
</div>`,
      }}
      variants={[
        {
          title: "Default",
          description: "Standard switch toggle.",
          preview: <Switch />,
          code: `<Switch />`,
        },
        {
          title: "Checked",
          description: "Switch in checked/on state.",
          preview: <Switch defaultChecked />,
          code: `<Switch defaultChecked />`,
        },
        {
          title: "With Label",
          description: "Switch with an associated label.",
          preview: (
            <div className="flex items-center gap-2">
              <Switch id="dark-mode" />
              <Label htmlFor="dark-mode">{formatLabel("Dark mode")}</Label>
            </div>
          ),
          code: `<div className="flex items-center gap-2">
  <Switch id="dark-mode" />
  <Label htmlFor="dark-mode">[DARK_MODE]:</Label>
</div>`,
        },
        {
          title: "Disabled",
          description: "Disabled switch.",
          preview: <Switch disabled />,
          code: `<Switch disabled />`,
        },
        {
          title: "Disabled Checked",
          description: "Disabled switch in checked state.",
          preview: <Switch disabled defaultChecked />,
          code: `<Switch disabled defaultChecked />`,
        },
        {
          title: "Settings List",
          description: "Multiple switches in a settings layout.",
          preview: (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emails">{formatLabel("Email notifications")}</Label>
                <Switch id="emails" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push">{formatLabel("Push notifications")}</Label>
                <Switch id="push" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms">{formatLabel("SMS notifications")}</Label>
                <Switch id="sms" disabled />
              </div>
            </div>
          ),
          code: `<div className="grid gap-4">
  <div className="flex items-center justify-between">
    <Label htmlFor="emails">[EMAIL_NOTIFICATIONS]:</Label>
    <Switch id="emails" defaultChecked />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="push">[PUSH_NOTIFICATIONS]:</Label>
    <Switch id="push" />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="sms">[SMS_NOTIFICATIONS]:</Label>
    <Switch id="sms" disabled />
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "checked",
          type: "boolean",
          description: "Controlled checked state.",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          description: "The default checked state for uncontrolled usage.",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "Event handler called when the checked state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the switch.",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Mark the switch as required.",
        },
      ]}
      accessibility={[
        "Built on Radix UI Switch primitive for full accessibility",
        "Supports keyboard navigation with Space to toggle",
        "Uses aria-checked for screen readers",
        "Focus visible ring for keyboard navigation",
        "Thumb animation provides visual feedback",
      ]}
      previous={{ title: "Checkbox", href: "/docs/components/checkbox" }}
      next={{ title: "Card", href: "/docs/components/card" }}
    />
  );
}
