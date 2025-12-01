"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { InputColor } from "@/components/ui/input-color";
import { useState } from "react";

export default function InputColorPage() {
  const [color1, setColor1] = useState("hsl(var(--primary))");
  const [color2, setColor2] = useState("#8b5cf6");
  const [color3, setColor3] = useState("hsl(var(--destructive))");

  return (
    <ComponentShowcaseTemplate
      code="[UI.42]"
      category="Components"
      title="Input Color"
      description="Color picker input with preset colors, custom color selection, and text input support."
      importCode={`import { InputColor } from "@/components/ui/input-color"`}
      mainPreview={{
        preview: <InputColor value={color1} onValueChange={setColor1} />,
        code: `const [color, setColor] = useState("hsl(var(--primary))");

<InputColor value={color} onValueChange={setColor} />`,
      }}
      variants={[
        {
          title: "Controlled",
          description: "Fully controlled color input with state.",
          preview: (
            <div className="space-y-2">
              <InputColor value={color2} onValueChange={setColor2} />
              <div className="font-mono text-xs text-muted-foreground">
                Current: {color2}
              </div>
            </div>
          ),
          code: `const [color, setColor] = useState("#8b5cf6");

<InputColor value={color} onValueChange={setColor} />`,
        },
        {
          title: "Without Text Input",
          description: "Color picker button only, no text input field.",
          preview: <InputColor value={color3} onValueChange={setColor3} showInput={false} />,
          code: `<InputColor
  value={color}
  onValueChange={setColor}
  showInput={false}
/>`,
        },
        {
          title: "Uncontrolled with Default",
          description: "Uncontrolled input with default value.",
          preview: <InputColor defaultValue="hsl(var(--success))" />,
          code: `<InputColor defaultValue="hsl(var(--success))" />`,
        },
        {
          title: "Disabled",
          description: "Disabled color input.",
          preview: <InputColor value="hsl(var(--warning))" disabled />,
          code: `<InputColor value="hsl(var(--warning))" disabled />`,
        },
        {
          title: "Custom Preset Colors",
          description: "Define custom preset color palette.",
          preview: (
            <InputColor
              defaultValue="#ff0000"
              presetColors={[
                "#ff0000",
                "#ff7700",
                "#ffdd00",
                "#00ff00",
                "#0000ff",
                "#8b00ff",
              ]}
            />
          ),
          code: `<InputColor
  defaultValue="#ff0000"
  presetColors={[
    "#ff0000",
    "#ff7700",
    "#ffdd00",
    "#00ff00",
    "#0000ff",
    "#8b00ff",
  ]}
/>`,
        },
        {
          title: "Design Token Colors",
          description: "Using CSS design tokens as preset colors.",
          preview: (
            <div className="space-y-3 rounded-none border border-border bg-card p-4 font-mono text-sm">
              <div className="flex items-center gap-2 border-b border-border pb-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="text-xs text-muted-foreground">preset-colors.ts</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-muted-foreground">
                  <span className="text-primary">const</span> presets{" "}
                  <span className="text-primary">=</span> [
                </div>
                <div className="pl-4 text-success">"hsl(var(--primary))",</div>
                <div className="pl-4 text-destructive">"hsl(var(--destructive))",</div>
                <div className="pl-4 text-warning">"hsl(var(--warning))",</div>
                <div className="pl-4 text-muted-foreground">"hsl(var(--success))",</div>
                <div className="text-muted-foreground">];</div>
              </div>
            </div>
          ),
          code: `const presetColors = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--warning))",
  "hsl(var(--success))",
  "hsl(var(--foreground))",
  "hsl(var(--background))",
];

<InputColor presetColors={presetColors} />`,
        },
        {
          title: "Integration Example",
          description: "Color input in a form field.",
          preview: (
            <div className="space-y-2">
              <label className="text-sm font-semibold">Brand Color</label>
              <InputColor defaultValue="hsl(var(--primary))" />
              <p className="text-xs text-muted-foreground">
                Choose your brand's primary color.
              </p>
            </div>
          ),
          code: `<div className="space-y-2">
  <label className="text-sm font-semibold">Brand Color</label>
  <InputColor defaultValue="hsl(var(--primary))" />
  <p className="text-xs text-muted-foreground">
    Choose your brand's primary color.
  </p>
</div>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          default: "-",
          description: "Controlled value (hex color or CSS variable).",
        },
        {
          name: "defaultValue",
          type: "string",
          default: '"var(--color-black)"',
          description: "Default uncontrolled value.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          default: "-",
          description: "Callback when color changes.",
        },
        {
          name: "showInput",
          type: "boolean",
          default: "true",
          description: "Show text input field alongside color button.",
        },
        {
          name: "presetColors",
          type: "string[]",
          default: "[design tokens]",
          description: "Array of preset colors to display.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the color input.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes.",
        },
      ]}
      accessibility={[
        "Color button has aria-label describing its purpose",
        "Current color value announced to screen readers via sr-only span",
        "Preset color buttons have descriptive aria-labels",
        "Keyboard navigation supported via Tab and Enter/Space",
        "Disabled state prevents interaction and shows visual feedback",
        "Text input validates hex colors on blur",
        "Popover can be closed with Escape key",
      ]}
      previous={{ title: "Image Dropzone", href: "/docs/components/image-dropzone" }}
      next={{ title: "Input Group", href: "/docs/components/input-group" }}
    />
  );
}
