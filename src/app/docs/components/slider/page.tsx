"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function SliderPage() {
  const [value1, setValue1] = useState([50]);
  const [value2, setValue2] = useState([25, 75]);
  const [value3, setValue3] = useState([30]);
  const [value4, setValue4] = useState([0]);

  return (
    <ComponentShowcaseTemplate
      code="[UI.44]"
      category="Components"
      title="Slider"
      description="A range slider component for selecting numeric values, built with Radix UI."
      importCode={`import { Slider } from "@/components/ui/slider"`}
      mainPreview={{
        preview: (
          <div className="max-w-md space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-mono text-xs text-muted-foreground">
                [VALUE]
              </Label>
              <span className="font-mono text-xs text-primary">
                {value1[0]}
              </span>
            </div>
            <Slider
              value={value1}
              onValueChange={setValue1}
              max={100}
              step={1}
            />
          </div>
        ),
        code: `const [value, setValue] = useState([50]);

<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>`,
      }}
      variants={[
        {
          title: "Range Slider",
          description: "Slider with two handles for selecting a range",
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-mono text-xs text-muted-foreground">
                  [RANGE]
                </Label>
                <span className="font-mono text-xs text-primary">
                  {value2[0]} - {value2[1]}
                </span>
              </div>
              <Slider
                value={value2}
                onValueChange={setValue2}
                max={100}
                step={1}
              />
            </div>
          ),
          code: `const [value, setValue] = useState([25, 75]);

<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>`,
        },
        {
          title: "With Step",
          description: "Slider with custom step increments",
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-mono text-xs text-muted-foreground">
                  [STEP: 10]
                </Label>
                <span className="font-mono text-xs text-primary">
                  {value3[0]}
                </span>
              </div>
              <Slider
                value={value3}
                onValueChange={setValue3}
                max={100}
                step={10}
              />
            </div>
          ),
          code: `<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={10}
/>`,
        },
        {
          title: "Custom Range",
          description: "Slider with custom min and max values",
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-mono text-xs text-muted-foreground">
                  [RANGE: -50 to 50]
                </Label>
                <span className="font-mono text-xs text-primary">
                  {value4[0]}
                </span>
              </div>
              <Slider
                value={value4}
                onValueChange={setValue4}
                min={-50}
                max={50}
                step={1}
              />
            </div>
          ),
          code: `<Slider
  value={value}
  onValueChange={setValue}
  min={-50}
  max={50}
  step={1}
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled slider that cannot be interacted with",
          preview: (
            <div className="max-w-md space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [DISABLED]
              </Label>
              <Slider value={[60]} disabled max={100} step={1} />
            </div>
          ),
          code: `<Slider value={[60]} disabled max={100} step={1} />`,
        },
        {
          title: "Volume Control",
          description: "Slider styled as a volume control",
          preview: (
            <div className="max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-mono text-xs text-muted-foreground">
                  [VOLUME]
                </Label>
                <span className="font-mono text-xs text-primary">
                  {value1[0]}%
                </span>
              </div>
              <Slider
                value={value1}
                onValueChange={setValue1}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          ),
          code: `<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>`,
        },
        {
          title: "Terminal Style",
          description: "Slider with terminal-themed container",
          preview: (
            <div className="space-y-4">
              <div className="font-mono text-xs text-muted-foreground">
                [CONFIGURATION]:
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    THRESHOLD:
                  </span>
                  <span className="font-mono text-xs text-primary">
                    &gt; {value1[0]}%
                  </span>
                </div>
                <Slider
                  value={value1}
                  onValueChange={setValue1}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          ),
          code: `<div className="space-y-4">
  <div className="font-mono text-xs text-muted-foreground">
    [CONFIGURATION]:
  </div>
  <Slider value={value} onValueChange={setValue} max={100} />
</div>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "number[]",
          default: "[0]",
          description: "Controlled value array (single value or range)",
        },
        {
          name: "defaultValue",
          type: "number[]",
          default: "undefined",
          description: "Default value for uncontrolled usage",
        },
        {
          name: "onValueChange",
          type: "(value: number[]) => void",
          default: "undefined",
          description: "Callback fired when value changes",
        },
        {
          name: "min",
          type: "number",
          default: "0",
          description: "Minimum value of the slider",
        },
        {
          name: "max",
          type: "number",
          default: "100",
          description: "Maximum value of the slider",
        },
        {
          name: "step",
          type: "number",
          default: "1",
          description: "Step increment for slider movement",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable slider interaction",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Orientation of the slider",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container",
        },
      ]}
      accessibility={[
        "Uses Radix UI Slider primitive for full accessibility",
        "Keyboard support with Arrow keys for value adjustment",
        "Home/End keys jump to min/max values",
        "Proper ARIA attributes (role='slider', aria-valuemin, etc.)",
        "Focus visible styles for keyboard navigation",
        "Touch-friendly with touch-none and select-none classes",
        "Disabled state properly communicated to assistive tech",
      ]}
      previous={{ title: "Skeleton", href: "/docs/components/skeleton" }}
      next={{ title: "Sparkline", href: "/docs/components/sparkline" }}
    />
  );
}
