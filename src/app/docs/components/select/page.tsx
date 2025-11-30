"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SelectPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.05]"
      category="Components"
      title="Select"
      description="A dropdown select component for choosing from a list of options."
      importCode={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}
      mainPreview={{
        preview: (
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        ),
        code: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`,
      }}
      variants={[
        {
          title: "With Label",
          description: "Select with an associated label.",
          preview: (
            <div className="grid gap-2">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework" className="w-[200px]">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="remix">Remix</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework" className="w-[200px]">
      <SelectValue placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
      <SelectItem value="astro">Astro</SelectItem>
    </SelectContent>
  </Select>
</div>`,
        },
        {
          title: "With Groups",
          description: "Select with grouped options.",
          preview: (
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="cst">Central Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Europe</SelectLabel>
                  <SelectItem value="gmt">GMT</SelectItem>
                  <SelectItem value="cet">Central European</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ),
          code: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Time</SelectItem>
      <SelectItem value="cst">Central Time</SelectItem>
      <SelectItem value="pst">Pacific Time</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">GMT</SelectItem>
      <SelectItem value="cet">Central European</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
        },
        {
          title: "Disabled",
          description: "Disabled select component.",
          preview: (
            <Select disabled>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
              </SelectContent>
            </Select>
          ),
          code: `<Select disabled>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Disabled" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>`,
        },
        {
          title: "With Disabled Item",
          description: "Select with a disabled option.",
          preview: (
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="owner" disabled>Owner (Unavailable)</SelectItem>
              </SelectContent>
            </Select>
          ),
          code: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="member">Member</SelectItem>
    <SelectItem value="owner" disabled>Owner (Unavailable)</SelectItem>
  </SelectContent>
</Select>`,
        },
      ]}
      props={[
        {
          name: "defaultValue",
          type: "string",
          description: "The value of the select when initially rendered.",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled value of the select.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Event handler called when the value changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the select.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text shown when no value is selected.",
        },
      ]}
      accessibility={[
        "Built on Radix UI Select primitive for full accessibility",
        "Keyboard navigation with Arrow keys, Enter, and Escape",
        "Type-ahead search to jump to options",
        "Screen reader announcements for selection changes",
      ]}
      previous={{ title: "Textarea", href: "/docs/components/textarea" }}
      next={{ title: "Checkbox", href: "/docs/components/checkbox" }}
    />
  );
}
