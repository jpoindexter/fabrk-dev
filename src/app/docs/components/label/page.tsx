"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { formatLabel } from "@/design-system";

export default function LabelPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.44]"
      category="Components"
      title="Label"
      description="Accessible label component for form inputs with required indicator and error state support."
      importCode={`import { Label } from "@/components/ui/label"`}
      mainPreview={{
        preview: (
          <div className="space-y-2">
            <Label htmlFor="email">{formatLabel("Email Address")}</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        ),
        code: `<Label htmlFor="email">{formatLabel("Email Address")}</Label>
<Input id="email" type="email" placeholder="you@example.com" />`,
      }}
      variants={[
        {
          title: "Required Field",
          description: "Label with required indicator asterisk.",
          preview: (
            <div className="space-y-2">
              <Label htmlFor="username" required>
                {formatLabel("Username")}
              </Label>
              <Input id="username" placeholder="Enter username" />
            </div>
          ),
          code: `<Label htmlFor="username" required>
  {formatLabel("Username")}
</Label>
<Input id="username" placeholder="Enter username" />`,
        },
        {
          title: "Error State",
          description: "Label styled for error state.",
          preview: (
            <div className="space-y-2">
              <Label htmlFor="password" required error>
                {formatLabel("Password")}
              </Label>
              <Input id="password" type="password" placeholder="Enter password" error />
              <p className="text-destructive text-xs">Password must be at least 12 characters</p>
            </div>
          ),
          code: `<Label htmlFor="password" required error>
  {formatLabel("Password")}
</Label>
<Input
  id="password"
  type="password"
  error
/>
<p className="text-xs text-destructive">
  Password must be at least 12 characters
</p>`,
        },
        {
          title: "With Checkbox",
          description: "Label properly associated with checkbox.",
          preview: (
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">{formatLabel("Accept terms and conditions")}</Label>
            </div>
          ),
          code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">{formatLabel("Accept terms and conditions")}</Label>
</div>`,
        },
        {
          title: "With Switch",
          description: "Label for toggle switch control.",
          preview: (
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">{formatLabel("Email Notifications")}</Label>
              <Switch id="notifications" />
            </div>
          ),
          code: `<div className="flex items-center justify-between">
  <Label htmlFor="notifications">{formatLabel("Email Notifications")}</Label>
  <Switch id="notifications" />
</div>`,
        },
        {
          title: "Disabled State",
          description: "Label with disabled peer input.",
          preview: (
            <div className="space-y-2">
              <Label htmlFor="disabled">{formatLabel("Disabled Field")}</Label>
              <Input id="disabled" placeholder="Cannot edit" disabled />
            </div>
          ),
          code: `<Label htmlFor="disabled">{formatLabel("Disabled Field")}</Label>
<Input id="disabled" placeholder="Cannot edit" disabled />`,
        },
        {
          title: "Typography Styles",
          description: "Label following design system typography tokens.",
          preview: (
            <div className="space-y-4 p-4 font-mono text-sm">
              <div className="border-border flex items-center border-b pb-2">
                <span className="text-muted-foreground text-xs">
                  [ TYPOGRAPHY ] label-typography.css
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-muted-foreground">
                  <span className="text-primary">font-size</span>: 14px
                </div>
                <div className="text-muted-foreground">
                  <span className="text-primary">font-weight</span>: 600 (semibold)
                </div>
                <div className="text-muted-foreground">
                  <span className="text-primary">line-height</span>: 1.4
                </div>
                <div className="text-muted-foreground">
                  <span className="text-primary">letter-spacing</span>: normal
                </div>
              </div>
            </div>
          ),
          code: `// Label uses design system typography tokens
// From componentTypography.label

text-[14px]          // Font size
font-semibold        // Font weight 600
leading-[1.4]        // Line height
tracking-normal      // Letter spacing`,
        },
        {
          title: "UX Heuristic - Error Prevention",
          description: "Required indicator prevents user errors.",
          preview: (
            <div className="space-y-4 p-4 font-mono text-sm">
              <div className="border-border flex items-center border-b pb-2">
                <span className="text-muted-foreground text-xs">
                  [ UX_HEURISTIC ] ux-heuristic-5.md
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="text-primary font-semibold">[HEURISTIC #5]:</div>
                <div className="text-muted-foreground pl-4">Error Prevention</div>
                <div className="text-success mt-2 font-semibold">[IMPLEMENTATION]:</div>
                <div className="text-muted-foreground pl-4">
                  Show required indicator (*) to prevent submission errors
                </div>
              </div>
            </div>
          ),
          code: `// UX Heuristic #5: Error Prevention
// Show required indicator to prevent form submission errors

<Label htmlFor="field" required>
  Field Name
</Label>

// Renders: Field Name *
// User knows field is required before submission`,
        },
      ]}
      props={[
        {
          name: "htmlFor",
          type: "string",
          default: "-",
          description: "Associates label with input element by ID.",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Shows required indicator asterisk (*).",
        },
        {
          name: "error",
          type: "boolean",
          default: "false",
          description: "Applies error styling (text-destructive).",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes.",
        },
      ]}
      accessibility={[
        "Uses native <label> element for full accessibility support",
        "htmlFor properly associates label with input via ID",
        "Required indicator (*) has aria-label for screen readers",
        "Error state changes text color with proper contrast",
        "Peer-disabled styles reduce opacity for disabled inputs",
        "Transition animations respect prefers-reduced-motion",
        "Font size and weight meet WCAG readability standards",
      ]}
      previous={{ title: "Input Search", href: "/docs/components/input-search" }}
      next={{ title: "Loading", href: "/docs/components/loading" }}
    />
  );
}
