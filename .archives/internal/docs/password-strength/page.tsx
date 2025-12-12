"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function PasswordStrengthPage() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [password4, setPassword4] = useState("");

  return (
    <ComponentShowcaseTemplate
      code="[UI.40]"
      category="Components"
      title="Password Strength"
      description="An input field with real-time password strength indicator and requirement validation."
      importCode={`import { PasswordStrength } from "@/components/ui/password-strength"`}
      mainPreview={{
        preview: (
          <div className="max-w-md space-y-2">
            <Label className="font-mono text-xs text-muted-foreground">
              [PASSWORD]
            </Label>
            <PasswordStrength
              value={password1}
              onChange={setPassword1}
              placeholder="Enter a strong password"
            />
          </div>
        ),
        code: `const [password, setPassword] = useState("");

<PasswordStrength
  value={password}
  onChange={setPassword}
  placeholder="Enter a strong password"
/>`,
      }}
      variants={[
        {
          title: "Without Requirements",
          description: "Show only strength meter without requirement list",
          preview: (
            <div className="max-w-md space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [PASSWORD]
              </Label>
              <PasswordStrength
                value={password2}
                onChange={setPassword2}
                showRequirements={false}
                placeholder="Password without requirements"
              />
            </div>
          ),
          code: `<PasswordStrength
  value={password}
  onChange={setPassword}
  showRequirements={false}
/>`,
        },
        {
          title: "Without Strength Meter",
          description: "Show only requirements without strength indicator",
          preview: (
            <div className="max-w-md space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [PASSWORD]
              </Label>
              <PasswordStrength
                value={password3}
                onChange={setPassword3}
                showStrength={false}
                placeholder="Password without strength meter"
              />
            </div>
          ),
          code: `<PasswordStrength
  value={password}
  onChange={setPassword}
  showStrength={false}
/>`,
        },
        {
          title: "Custom Requirements",
          description: "Password with custom validation requirements",
          preview: (
            <div className="max-w-md space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [PASSWORD]
              </Label>
              <PasswordStrength
                value={password4}
                onChange={setPassword4}
                minLength={12}
                requireSymbols={false}
                placeholder="Minimum 12 characters"
              />
            </div>
          ),
          code: `<PasswordStrength
  value={password}
  onChange={setPassword}
  minLength={12}
  requireSymbols={false}
/>`,
        },
        {
          title: "Custom Labels",
          description: "Password strength with custom strength labels",
          preview: (
            <div className="max-w-md space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [PASSWORD]
              </Label>
              <PasswordStrength
                value={password1}
                onChange={setPassword1}
                strengthLabels={{
                  weak: "Too Weak",
                  fair: "Could be Better",
                  good: "Decent",
                  strong: "Great!",
                  veryStrong: "Excellent!",
                }}
                placeholder="Enter password"
              />
            </div>
          ),
          code: `<PasswordStrength
  value={password}
  onChange={setPassword}
  strengthLabels={{
    weak: "Too Weak",
    fair: "Could be Better",
    good: "Decent",
    strong: "Great!",
    veryStrong: "Excellent!"
  }}
/>`,
        },
        {
          title: "Disabled State",
          description: "Disabled password strength input",
          preview: (
            <div className="max-w-md space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [PASSWORD]
              </Label>
              <PasswordStrength
                value="ExamplePass123!"
                disabled
                placeholder="Disabled input"
              />
            </div>
          ),
          code: `<PasswordStrength
  value="ExamplePass123!"
  disabled
/>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          default: "undefined",
          description: "Controlled value of the password input",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          default: "undefined",
          description: "Callback fired when password value changes",
        },
        {
          name: "showStrength",
          type: "boolean",
          default: "true",
          description: "Display password strength indicator and label",
        },
        {
          name: "showRequirements",
          type: "boolean",
          default: "true",
          description: "Display password requirement checklist on focus",
        },
        {
          name: "minLength",
          type: "number",
          default: "8",
          description: "Minimum required password length",
        },
        {
          name: "requireUppercase",
          type: "boolean",
          default: "true",
          description: "Require at least one uppercase letter",
        },
        {
          name: "requireLowercase",
          type: "boolean",
          default: "true",
          description: "Require at least one lowercase letter",
        },
        {
          name: "requireNumbers",
          type: "boolean",
          default: "true",
          description: "Require at least one number",
        },
        {
          name: "requireSymbols",
          type: "boolean",
          default: "true",
          description: "Require at least one special character",
        },
        {
          name: "strengthLabels",
          type: "{ weak, fair, good, strong, veryStrong }",
          default: '{ weak: "Weak", ... }',
          description: "Custom labels for strength levels",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the password input",
        },
        {
          name: "aria-label",
          type: "string",
          default: '"Password"',
          description: "Accessible label for the password input",
        },
      ]}
      accessibility={[
        "Uses native input with type='password' for secure entry",
        "Toggle button with aria-label for show/hide password",
        "Strength indicator uses aria-live='polite' for screen readers",
        "Requirements list uses aria-label and proper ARIA attributes",
        "Focus state triggers requirement visibility for better UX",
        "Check/X icons in requirements list are marked aria-hidden",
        "Input has aria-describedby linking to requirements/strength info",
      ]}
      previous={{ title: "Pagination", href: "/docs/components/pagination" }}
      next={{ title: "Popover", href: "/docs/components/popover" }}
    />
  );
}
