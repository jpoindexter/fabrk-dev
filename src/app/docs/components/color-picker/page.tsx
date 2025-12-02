"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { ColorPicker } from "@/components/ui/color-picker";
import { useState } from "react";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#8b5cf6");
  const [brandColors, setBrandColors] = useState({
    primary: "#8b5cf6",
    secondary: "#ec4899",
    accent: "#06b6d4",
  });

  return (
    <ComponentShowcaseTemplate
      code="[UI.56]"
      category="Components"
      title="Color Picker"
      description="A Chrome-style color picker with saturation/hue selector, HEX/RGB inputs, and preset swatches."
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
          description: "Full-featured color picker with all controls.",
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
          title: "Without Presets",
          description: "Hide the preset color swatches.",
          preview: (
            <ColorPicker
              color="#3B82F6"
              showPresets={false}
              className="w-full max-w-sm"
            />
          ),
          code: `<ColorPicker
  color="#3B82F6"
  showPresets={false}
/>`,
        },
        {
          title: "Custom Presets",
          description: "Define your own preset color palette.",
          preview: (
            <ColorPicker
              color="#FF6B6B"
              presets={[
                "#FF6B6B",
                "#4ECDC4",
                "#45B7D1",
                "#96CEB4",
                "#FFEAA7",
                "#DDA0DD",
                "#98D8C8",
                "#F7DC6F",
                "#BB8FCE",
              ]}
              className="w-full max-w-sm"
            />
          ),
          code: `<ColorPicker
  color="#FF6B6B"
  presets={[
    "#FF6B6B", "#4ECDC4", "#45B7D1",
    "#96CEB4", "#FFEAA7", "#DDA0DD",
    "#98D8C8", "#F7DC6F", "#BB8FCE",
  ]}
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
          title: "Brand Colors",
          description: "Use multiple pickers for a brand color palette.",
          preview: (
            <div className="space-y-3 w-full max-w-sm">
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [PRIMARY]:
                </label>
                <ColorPicker
                  color={brandColors.primary}
                  onChange={(c) =>
                    setBrandColors((prev) => ({ ...prev, primary: c }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [SECONDARY]:
                </label>
                <ColorPicker
                  color={brandColors.secondary}
                  onChange={(c) =>
                    setBrandColors((prev) => ({ ...prev, secondary: c }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground">
                  [ACCENT]:
                </label>
                <ColorPicker
                  color={brandColors.accent}
                  onChange={(c) =>
                    setBrandColors((prev) => ({ ...prev, accent: c }))
                  }
                />
              </div>
            </div>
          ),
          code: `const [brandColors, setBrandColors] = useState({
  primary: "#8b5cf6",
  secondary: "#ec4899",
  accent: "#06b6d4",
});

<div className="space-y-3">
  <div>
    <label>Primary</label>
    <ColorPicker
      color={brandColors.primary}
      onChange={(c) => setBrandColors(prev => ({ ...prev, primary: c }))}
    />
  </div>
  <div>
    <label>Secondary</label>
    <ColorPicker
      color={brandColors.secondary}
      onChange={(c) => setBrandColors(prev => ({ ...prev, secondary: c }))}
    />
  </div>
  <div>
    <label>Accent</label>
    <ColorPicker
      color={brandColors.accent}
      onChange={(c) => setBrandColors(prev => ({ ...prev, accent: c }))}
    />
  </div>
</div>`,
        },
        {
          title: "Live Preview",
          description: "Show the selected color in context.",
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
                  <span className="text-muted-foreground">preview.tsx</span>
                </div>
                <div className="p-3 space-y-2">
                  <div>
                    <span className="text-muted-foreground">[HEX]:</span>{" "}
                    <span className="text-primary">{color.toUpperCase()}</span>
                  </div>
                  <div
                    className="h-16 rounded-none border border-border"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            </div>
          ),
          code: `const [color, setColor] = useState("#8b5cf6");

<ColorPicker color={color} onChange={setColor} />

<div className="preview-box">
  <div>HEX: {color.toUpperCase()}</div>
  <div style={{ backgroundColor: color }} />
</div>`,
        },
      ]}
      props={[
        {
          name: "color",
          type: "string",
          default: '"#000000"',
          description: "The current color value in HEX format.",
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
          description: "Show preset color swatches.",
        },
        {
          name: "presets",
          type: "string[]",
          default: "[18 default colors]",
          description: "Custom preset colors array.",
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
        "HEX input supports direct keyboard entry",
        "RGB inputs accept numeric values with validation",
        "Preset buttons are keyboard navigable",
        "Focus management returns to trigger on close",
        "All interactive elements have proper focus indicators",
      ]}
      previous={{ title: "Command", href: "/docs/components/command" }}
      next={{ title: "Combobox", href: "/docs/components/combobox" }}
    />
  );
}
