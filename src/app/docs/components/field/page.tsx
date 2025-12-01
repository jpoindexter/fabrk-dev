"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

export default function FieldPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.39]"
      category="Components"
      title="Field"
      description="A flexible form field wrapper with label, description, and error support for building complex forms."
      importCode={`import {
  Field,
  FieldContent,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"`}
      mainPreview={{
        preview: (
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <FieldControl>
              <Input id="email" type="email" placeholder="you@example.com" />
            </FieldControl>
          </Field>
        ),
        code: `<Field>
  <FieldLabel htmlFor="email">Email Address</FieldLabel>
  <FieldControl>
    <Input id="email" type="email" placeholder="you@example.com" />
  </FieldControl>
</Field>`,
      }}
      variants={[
        {
          title: "With Description",
          description: "Field with helper text below the input.",
          preview: (
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <FieldControl>
                <Input id="username" placeholder="Enter username" />
              </FieldControl>
              <FieldDescription>
                Choose a unique username (3-20 characters).
              </FieldDescription>
            </Field>
          ),
          code: `<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <FieldControl>
    <Input id="username" placeholder="Enter username" />
  </FieldControl>
  <FieldDescription>
    Choose a unique username (3-20 characters).
  </FieldDescription>
</Field>`,
        },
        {
          title: "With Error",
          description: "Field displaying validation error message.",
          preview: (
            <Field data-invalid="true">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldControl>
                <Input id="password" type="password" aria-invalid="true" />
              </FieldControl>
              <FieldError>Password must be at least 12 characters.</FieldError>
            </Field>
          ),
          code: `<Field data-invalid="true">
  <FieldLabel htmlFor="password">Password</FieldLabel>
  <FieldControl>
    <Input id="password" type="password" aria-invalid="true" />
  </FieldControl>
  <FieldError>Password must be at least 12 characters.</FieldError>
</Field>`,
        },
        {
          title: "Horizontal Orientation",
          description: "Field with label and input side by side.",
          preview: (
            <Field orientation="horizontal">
              <FieldLabel htmlFor="newsletter">Newsletter</FieldLabel>
              <FieldControl>
                <Switch id="newsletter" />
              </FieldControl>
            </Field>
          ),
          code: `<Field orientation="horizontal">
  <FieldLabel htmlFor="newsletter">Newsletter</FieldLabel>
  <FieldControl>
    <Switch id="newsletter" />
  </FieldControl>
</Field>`,
        },
        {
          title: "Field Group",
          description: "Multiple related fields grouped together.",
          preview: (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="first">First Name</FieldLabel>
                <FieldControl>
                  <Input id="first" placeholder="John" />
                </FieldControl>
              </Field>
              <Field>
                <FieldLabel htmlFor="last">Last Name</FieldLabel>
                <FieldControl>
                  <Input id="last" placeholder="Doe" />
                </FieldControl>
              </Field>
            </FieldGroup>
          ),
          code: `<FieldGroup>
  <Field>
    <FieldLabel htmlFor="first">First Name</FieldLabel>
    <FieldControl>
      <Input id="first" placeholder="John" />
    </FieldControl>
  </Field>
  <Field>
    <FieldLabel htmlFor="last">Last Name</FieldLabel>
    <FieldControl>
      <Input id="last" placeholder="Doe" />
    </FieldControl>
  </Field>
</FieldGroup>`,
        },
        {
          title: "Field Set with Legend",
          description: "Semantic grouping with fieldset and legend.",
          preview: (
            <FieldSet>
              <FieldLegend>Notification Preferences</FieldLegend>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="email-notif">Email Notifications</FieldLabel>
                <FieldControl>
                  <Checkbox id="email-notif" />
                </FieldControl>
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="sms-notif">SMS Notifications</FieldLabel>
                <FieldControl>
                  <Checkbox id="sms-notif" />
                </FieldControl>
              </Field>
            </FieldSet>
          ),
          code: `<FieldSet>
  <FieldLegend>Notification Preferences</FieldLegend>
  <Field orientation="horizontal">
    <FieldLabel htmlFor="email-notif">Email Notifications</FieldLabel>
    <FieldControl>
      <Checkbox id="email-notif" />
    </FieldControl>
  </Field>
  <Field orientation="horizontal">
    <FieldLabel htmlFor="sms-notif">SMS Notifications</FieldLabel>
    <FieldControl>
      <Checkbox id="sms-notif" />
    </FieldControl>
  </Field>
</FieldSet>`,
        },
        {
          title: "Field Separator",
          description: "Visual separator between field groups.",
          preview: (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="account">Account Name</FieldLabel>
                <FieldControl>
                  <Input id="account" placeholder="My Account" />
                </FieldControl>
              </Field>
              <FieldSeparator>Security Settings</FieldSeparator>
              <Field>
                <FieldLabel htmlFor="2fa">Two-Factor Auth</FieldLabel>
                <FieldControl>
                  <Switch id="2fa" />
                </FieldControl>
              </Field>
            </FieldGroup>
          ),
          code: `<FieldGroup>
  <Field>
    <FieldLabel htmlFor="account">Account Name</FieldLabel>
    <FieldControl>
      <Input id="account" placeholder="My Account" />
    </FieldControl>
  </Field>
  <FieldSeparator>Security Settings</FieldSeparator>
  <Field>
    <FieldLabel htmlFor="2fa">Two-Factor Auth</FieldLabel>
    <FieldControl>
      <Switch id="2fa" />
    </FieldControl>
  </Field>
</FieldGroup>`,
        },
        {
          title: "With Field Title",
          description: "Alternative to label using FieldTitle for non-labelable elements.",
          preview: (
            <Field>
              <FieldTitle>Preferred Theme</FieldTitle>
              <FieldControl>
                <RadioGroup defaultValue="light">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="light" id="light" />
                    <FieldLabel htmlFor="light">Light</FieldLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <FieldLabel htmlFor="dark">Dark</FieldLabel>
                  </div>
                </RadioGroup>
              </FieldControl>
            </Field>
          ),
          code: `<Field>
  <FieldTitle>Preferred Theme</FieldTitle>
  <FieldControl>
    <RadioGroup defaultValue="light">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="light" id="light" />
        <FieldLabel htmlFor="light">Light</FieldLabel>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="dark" id="dark" />
        <FieldLabel htmlFor="dark">Dark</FieldLabel>
      </div>
    </RadioGroup>
  </FieldControl>
</Field>`,
        },
        {
          title: "Multiple Errors",
          description: "Field displaying multiple validation errors.",
          preview: (
            <Field data-invalid="true">
              <FieldLabel htmlFor="bio">Biography</FieldLabel>
              <FieldControl>
                <Input id="bio" aria-invalid="true" />
              </FieldControl>
              <FieldError
                errors={[
                  { message: "Bio must be at least 50 characters." },
                  { message: "Bio cannot contain special characters." },
                ]}
              />
            </Field>
          ),
          code: `<Field data-invalid="true">
  <FieldLabel htmlFor="bio">Biography</FieldLabel>
  <FieldControl>
    <Input id="bio" aria-invalid="true" />
  </FieldControl>
  <FieldError
    errors={[
      { message: "Bio must be at least 50 characters." },
      { message: "Bio cannot contain special characters." },
    ]}
  />
</Field>`,
        },
      ]}
      props={[
        {
          name: "orientation",
          type: '"vertical" | "horizontal" | "responsive"',
          default: '"vertical"',
          description: "Layout direction of label and input.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes.",
        },
      ]}
      accessibility={[
        "Uses semantic fieldset and legend for grouping related fields",
        "FieldLabel properly associates with form controls via htmlFor",
        "FieldError uses role=alert for screen reader announcements",
        "data-invalid attribute indicates error state",
        "FieldDescription provides additional context for inputs",
        "Supports disabled state with visual feedback",
      ]}
      previous={{ title: "FAQ", href: "/docs/components/faq" }}
      next={{ title: "Features", href: "/docs/components/features" }}
    />
  );
}
