"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { ColorPicker } from "@/components/ui/color-picker";
import { useState } from "react";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#8b5cf6");

  return (
    <ComponentShowcaseTemplate
      code="[UI.56]"
      category="Components"
      title="Color Picker"
      description="A color selection component with visual picker, presets, and HEX input."
      importCode={`import { ColorPicker } from "@/components/ui/color-picker"`}
      mainPreview={{
        preview: (
          <ColorPicker
            color={color}
            onChange={setColor}
            className="w-full max-w-sm"
          />
        ),
        code: `const [color, setColor] = useState("#8b5cf6");

<ColorPicker
  color={color}
  onChange={setColor}
/>`,
      }}
      variants={[
        {
          title: "Default",
          description: "Color picker with visual picker and presets.",
          preview: (
            <ColorPicker
              color={color}
              onChange={setColor}
              className="w-full max-w-sm"
            />
          ),
          code: `const [color, setColor] = useState("#8b5cf6");

<ColorPicker
  color={color}
  onChange={setColor}
/>`,
        },
        {
          title: "With Custom Placeholder",
          description: "Customize the button placeholder text.",
          preview: (
            <ColorPicker
              placeholder="Choose your brand color"
              className="w-full max-w-sm"
            />
          ),
          code: `<ColorPicker
  placeholder="Choose your brand color"
/>`,
        },
        {
          title: "Without Presets",
          description: "Hide the preset color swatches.",
          preview: (
            <ColorPicker
              showPresets={false}
              className="w-full max-w-sm"
            />
          ),
          code: `<ColorPicker
  showPresets={false}
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled state prevents interaction.",
          preview: (
            <ColorPicker
              color="#6366f1"
              disabled
              className="w-full max-w-sm"
            />
          ),
          code: `<ColorPicker
  color="#6366f1"
  disabled
/>`,
        },
        {
          title: "Controlled State",
          description: "Programmatically control the color value.",
          preview: (
            <div className="space-y-4 w-full max-w-sm">
              <ColorPicker color={color} onChange={setColor} />
              <div className="rounded-none border border-border bg-card font-mono text-xs">
                <div className="border-b border-border px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-destructive/50" />
                    <div className="size-2 rounded-full bg-warning/50" />
                    <div className="size-2 rounded-full bg-success/50" />
                  </div>
                  <span className="text-muted-foreground">state.tsx</span>
                </div>
                <div className="p-3 space-y-2">
                  <div>
                    <span className="text-muted-foreground">[CURRENT]:</span>{" "}
                    <span className="text-primary">{color}</span>
                  </div>
                  <div
                    className="h-12 rounded-md border border-border"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            </div>
          ),
          code: `const [color, setColor] = useState("#8b5cf6");

<ColorPicker
  color={color}
  onChange={setColor}
/>

<div style={{ backgroundColor: color }}>
  Preview: {color}
</div>`,
        },
        {
          title: "Picker Tab",
          description: "Visual color picker with gradient selector.",
          preview: (
            <div className="rounded-none border border-border bg-card font-mono text-xs">
              <div className="border-b border-border px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="text-muted-foreground">picker.mode</span>
              </div>
              <div className="p-3 space-y-1 text-muted-foreground">
                <div>
                  <span className="text-success">&gt;</span> Visual gradient selector
                </div>
                <div>
                  <span className="text-success">&gt;</span> Click to pick any color
                </div>
                <div>
                  <span className="text-success">&gt;</span> 18 preset color swatches
                </div>
              </div>
            </div>
          ),
          code: `// Picker tab provides:
// - Visual gradient color selector
// - Hue slider for full spectrum
// - 18 preset color swatches (optional)

<ColorPicker showPresets={true} />`,
        },
        {
          title: "Input Tab",
          description: "Manual HEX color code input with preview.",
          preview: (
            <div className="rounded-none border border-border bg-card font-mono text-xs">
              <div className="border-b border-border px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="text-muted-foreground">input.mode</span>
              </div>
              <div className="p-3 space-y-1 text-muted-foreground">
                <div>
                  <span className="text-success">&gt;</span> Direct HEX input (#000000)
                </div>
                <div>
                  <span className="text-success">&gt;</span> Live color preview
                </div>
                <div>
                  <span className="text-success">&gt;</span> Validates HEX format
                </div>
              </div>
            </div>
          ),
          code: `// Input tab provides:
// - Direct HEX code input field
// - Large preview of current color
// - Format validation (max 7 chars)

<ColorPicker placeholder="Enter HEX code" />`,
        },
        {
          title: "Brand Colors",
          description: "Use for selecting brand or theme colors.",
          preview: (
            <div className="space-y-3 w-full max-w-sm">
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [PRIMARY]:
                </label>
                <ColorPicker color="#8b5cf6" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [SECONDARY]:
                </label>
                <ColorPicker color="#ec4899" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [ACCENT]:
                </label>
                <ColorPicker color="#06b6d4" />
              </div>
            </div>
          ),
          code: `<div className="space-y-3">
  <div>
    <label>Primary</label>
    <ColorPicker color={primary} onChange={setPrimary} />
  </div>
  <div>
    <label>Secondary</label>
    <ColorPicker color={secondary} onChange={setSecondary} />
  </div>
  <div>
    <label>Accent</label>
    <ColorPicker color={accent} onChange={setAccent} />
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "color",
          type: "string",
          default: '"black"',
          description: "The current color value (HEX format).",
        },
        {
          name: "onChange",
          type: "(color: string) => void",
          default: "undefined",
          description: "Callback when color changes.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick a color"',
          description: "Placeholder text for the trigger button.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the color picker.",
        },
        {
          name: "showPresets",
          type: "boolean",
          default: "true",
          description: "Show preset color swatches in picker tab.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the trigger button.",
        },
      ]}
      accessibility={[
        "Trigger button is keyboard accessible (Tab to focus)",
        "Color preview swatch shows selected color visually",
        "Popover can be dismissed with Escape key",
        "Tab navigation between picker/input tabs",
        "Input field supports direct keyboard entry",
        "Preset buttons are keyboard navigable",
        "Focus management returns to trigger on close",
      ]}
      previous={{ title: "Command", href: "/docs/components/command" }}
      next={{ title: "Combobox", href: "/docs/components/combobox" }}
    />
  );
}
