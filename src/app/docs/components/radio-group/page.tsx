"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function RadioGroupPage() {
  const [value1, setValue1] = useState("option1");
  const [value2, setValue2] = useState("sm");
  const [value3, setValue3] = useState("card");

  return (
    <ComponentShowcaseTemplate
      code="[UI.41]"
      category="Components"
      title="Radio Group"
      description="A set of checkable buttons where only one can be checked at a time, built with Radix UI."
      importCode={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}
      mainPreview={{
        preview: (
          <RadioGroup value={value1} onValueChange={setValue1}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1" className="font-mono text-sm">
                Default Option
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2" className="font-mono text-sm">
                Alternative Option
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="r3" />
              <Label htmlFor="r3" className="font-mono text-sm">
                Another Option
              </Label>
            </div>
          </RadioGroup>
        ),
        code: `<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Default Option</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Alternative Option</Label>
  </div>
</RadioGroup>`,
      }}
      variants={[
        {
          title: "Horizontal Layout",
          description: "Radio group with horizontal arrangement",
          preview: (
            <RadioGroup
              value={value2}
              onValueChange={setValue2}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sm" id="h1" />
                <Label htmlFor="h1" className="font-mono text-xs">
                  [SMALL]
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="md" id="h2" />
                <Label htmlFor="h2" className="font-mono text-xs">
                  [MEDIUM]
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lg" id="h3" />
                <Label htmlFor="h3" className="font-mono text-xs">
                  [LARGE]
                </Label>
              </div>
            </RadioGroup>
          ),
          code: `<RadioGroup
  value={value}
  onValueChange={setValue}
  className="flex flex-row space-x-4"
>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="sm" id="h1" />
    <Label htmlFor="h1">Small</Label>
  </div>
  {/* More items... */}
</RadioGroup>`,
        },
        {
          title: "With Descriptions",
          description: "Radio group with option descriptions",
          preview: (
            <RadioGroup value={value3} onValueChange={setValue3}>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="card" id="d1" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="d1" className="font-mono text-sm font-semibold">
                    Card Payment
                  </Label>
                  <p className="font-mono text-xs text-muted-foreground">
                    Pay with credit or debit card
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="bank" id="d2" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="d2" className="font-mono text-sm font-semibold">
                    Bank Transfer
                  </Label>
                  <p className="font-mono text-xs text-muted-foreground">
                    Direct bank account transfer
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="crypto" id="d3" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="d3" className="font-mono text-sm font-semibold">
                    Cryptocurrency
                  </Label>
                  <p className="font-mono text-xs text-muted-foreground">
                    Pay with Bitcoin or Ethereum
                  </p>
                </div>
              </div>
            </RadioGroup>
          ),
          code: `<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="card" id="d1" className="mt-1" />
    <div className="space-y-1">
      <Label htmlFor="d1">Card Payment</Label>
      <p className="text-sm text-muted-foreground">
        Pay with credit or debit card
      </p>
    </div>
  </div>
  {/* More items... */}
</RadioGroup>`,
        },
        {
          title: "Disabled Options",
          description: "Radio group with some disabled options",
          preview: (
            <RadioGroup defaultValue="enabled">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enabled" id="e1" />
                <Label htmlFor="e1" className="font-mono text-sm">
                  Enabled Option
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled1" id="e2" disabled />
                <Label
                  htmlFor="e2"
                  className="font-mono text-sm text-muted-foreground"
                >
                  Disabled Option
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled2" id="e3" disabled />
                <Label
                  htmlFor="e3"
                  className="font-mono text-sm text-muted-foreground"
                >
                  Also Disabled
                </Label>
              </div>
            </RadioGroup>
          ),
          code: `<RadioGroup defaultValue="enabled">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="enabled" id="e1" />
    <Label htmlFor="e1">Enabled Option</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="disabled" id="e2" disabled />
    <Label htmlFor="e2">Disabled Option</Label>
  </div>
</RadioGroup>`,
        },
        {
          title: "Terminal Style",
          description: "Radio group with terminal-themed styling",
          preview: (
            <div className="space-y-2">
              <div className="font-mono text-xs text-muted-foreground">
                [SELECT_OPTION]:
              </div>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="t1" />
                  <Label htmlFor="t1" className="font-mono text-xs">
                    &gt; INITIALIZE_PROJECT
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="t2" />
                  <Label htmlFor="t2" className="font-mono text-xs">
                    &gt; RUN_DIAGNOSTICS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="t3" />
                  <Label htmlFor="t3" className="font-mono text-xs">
                    &gt; DEPLOY_BUILD
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ),
          code: `<div className="space-y-2">
  <div className="font-mono text-xs text-muted-foreground">
    [SELECT_OPTION]:
  </div>
  <RadioGroup defaultValue="option1">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option1" id="t1" />
      <Label htmlFor="t1" className="font-mono text-xs">
        &gt; INITIALIZE_PROJECT
      </Label>
    </div>
    {/* More items... */}
  </RadioGroup>
</div>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          default: "undefined",
          description: "The controlled value of the selected radio item",
        },
        {
          name: "defaultValue",
          type: "string",
          default: "undefined",
          description: "The default value for uncontrolled usage",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          default: "undefined",
          description: "Callback fired when the selected value changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable all radio items in the group",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Mark the radio group as required",
        },
        {
          name: "name",
          type: "string",
          default: "undefined",
          description: "Name attribute for form submission",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container",
        },
      ]}
      accessibility={[
        "Uses Radix UI Radio Group primitive for full accessibility",
        "Supports keyboard navigation with arrow keys",
        "Space key toggles selection of focused item",
        "Proper ARIA attributes (role='radiogroup', aria-checked)",
        "Label association via htmlFor ensures clickable labels",
        "Focus visible styles for keyboard navigation",
        "Disabled state properly communicated to assistive tech",
      ]}
      previous={{ title: "Progress", href: "/docs/components/progress" }}
      next={{ title: "Rating", href: "/docs/components/rating" }}
    />
  );
}
