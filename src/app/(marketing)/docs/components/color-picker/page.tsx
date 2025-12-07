"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { ColorPicker } from "@/components/ui/color-picker";
import { useState } from "react";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#8b5cf6");
  const [compactColor, setCompactColor] = useState("#22C55E");
  const [swatchColor, setSwatchColor] = useState("#3B82F6");
  const [inlineColor, setInlineColor] = useState("#EC4899");

  return (
    <ComponentShowcaseTemplate
      code="[UI.56]"
      category="Components"
      title="Color Picker"
      description="A Chrome-style color picker with multiple variants: default, compact, inline, and swatch."
      importCode={`import { ColorPicker } from "@/components/ui/color-picker"`}
      mainPreview={{
        preview: <ColorPicker color={color} onChange={setColor} className="w-full max-w-sm" />,
        code: `const [color, setColor] = useState("#8b5cf6");

<ColorPicker
  color={color}
  onChange={setColor}
/>`,
      }}
      variants={[
        {
          title: "Default",
          description: "Full-featured picker with HEX/RGB inputs and presets.",
          preview: <ColorPicker color={color} onChange={setColor} className="w-full max-w-sm" />,
          code: `<ColorPicker
  color={color}
  onChange={setColor}
/>`,
        },
        {
          title: "Compact",
          description: "Smaller trigger button with simplified popover.",
          preview: (
            <ColorPicker variant="compact" color={compactColor} onChange={setCompactColor} />
          ),
          code: `<ColorPicker
  variant="compact"
  color={color}
  onChange={setColor}
/>`,
        },
        {
          title: "Swatch",
          description: "Just a color swatch that opens the picker on click.",
          preview: (
            <div className="flex items-center gap-4">
              <ColorPicker variant="swatch" color={swatchColor} onChange={setSwatchColor} />
              <span className="text-muted-foreground font-mono text-xs">
                {swatchColor.toUpperCase()}
              </span>
            </div>
          ),
          code: `<ColorPicker
  variant="swatch"
  color={color}
  onChange={setColor}
/>`,
        },
        {
          title: "Inline",
          description: "Always visible picker - no popover, embedded directly.",
          preview: <ColorPicker variant="inline" color={inlineColor} onChange={setInlineColor} />,
          code: `<ColorPicker
  variant="inline"
  color={color}
  onChange={setColor}
/>`,
        },
        {
          title: "Without Presets",
          description: "Hide the preset color swatches.",
          preview: <ColorPicker color="#F97316" showPresets={false} className="w-full max-w-sm" />,
          code: `<ColorPicker
  color="#F97316"
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
          title: "Swatch Palette",
          description: "Multiple swatch pickers for a color palette builder.",
          preview: (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <ColorPicker variant="swatch" color="#8b5cf6" />
                <ColorPicker variant="swatch" color="#ec4899" />
                <ColorPicker variant="swatch" color="#06b6d4" />
                <ColorPicker variant="swatch" color="#22c55e" />
                <ColorPicker variant="swatch" color="#f59e0b" />
              </div>
              <div className="text-muted-foreground font-mono text-xs">
                [PALETTE]: Click any swatch to edit
              </div>
            </div>
          ),
          code: `<div className="flex gap-4">
  <ColorPicker variant="swatch" color="#8b5cf6" />
  <ColorPicker variant="swatch" color="#ec4899" />
  <ColorPicker variant="swatch" color="#06b6d4" />
  <ColorPicker variant="swatch" color="#22c55e" />
  <ColorPicker variant="swatch" color="#f59e0b" />
</div>`,
        },
        {
          title: "Disabled",
          description: "Disabled state prevents interaction.",
          preview: (
            <div className="flex items-center gap-4">
              <ColorPicker color="#6366f1" disabled className="w-48" />
              <ColorPicker variant="compact" color="#6366f1" disabled />
              <ColorPicker variant="swatch" color="#6366f1" disabled />
            </div>
          ),
          code: `<ColorPicker color="#6366f1" disabled />
<ColorPicker variant="compact" color="#6366f1" disabled />
<ColorPicker variant="swatch" color="#6366f1" disabled />`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "compact" | "inline" | "swatch"',
          default: '"default"',
          description: "Visual variant of the color picker.",
        },
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
          description: "Additional CSS classes.",
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
