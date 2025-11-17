import type { Meta, StoryObj } from "@storybook/nextjs";
import { ColorPicker } from "./color-picker";
import { useState } from "react";

const meta: Meta<typeof ColorPicker> = {
  title: "UI/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState<string>("#000000");
    return (
      <div className="w-[300px]">
        <ColorPicker color={color} onChange={setColor} />
      </div>
    );
  },
};

export const WithPreselectedColor: Story = {
  render: () => {
    const [color, setColor] = useState<string>("#3B82F6");
    return (
      <div className="w-[300px]">
        <ColorPicker color={color} onChange={setColor} />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [color, setColor] = useState<string>("#000000");
    return (
      <div className="w-[300px]">
        <ColorPicker
          color={color}
          onChange={setColor}
          placeholder="Select brand color"
        />
      </div>
    );
  },
};

export const WithoutPresets: Story = {
  render: () => {
    const [color, setColor] = useState<string>("#000000");
    return (
      <div className="w-[300px]">
        <ColorPicker color={color} onChange={setColor} showPresets={false} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [color, setColor] = useState<string>("#3B82F6");
    return (
      <div className="w-[300px]">
        <ColorPicker color={color} onChange={setColor} disabled />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [primaryColor, setPrimaryColor] = useState<string>("#3B82F6");
    const [secondaryColor, setSecondaryColor] = useState<string>("#8B5CF6");
    return (
      <div className="w-[500px] space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Primary Brand Color
          </label>
          <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Secondary Brand Color
          </label>
          <ColorPicker color={secondaryColor} onChange={setSecondaryColor} />
        </div>
        {(primaryColor || secondaryColor) && (
          <div className="rounded-md border bg-card p-4 space-y-4">
            <div>
              <p className="text-sm font-semibold">Primary Color</p>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="h-8 w-8 rounded-md border"
                  style={{ backgroundColor: primaryColor }}
                />
                <p className="text-sm text-muted-foreground">{primaryColor}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Secondary Color</p>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="h-8 w-8 rounded-md border"
                  style={{ backgroundColor: secondaryColor }}
                />
                <p className="text-sm text-muted-foreground">
                  {secondaryColor}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const ThemeBuilder: Story = {
  render: () => {
    const [background, setBackground] = useState<string>("#FFFFFF");
    const [foreground, setForeground] = useState<string>("#000000");
    const [accent, setAccent] = useState<string>("#3B82F6");
    const [destructive, setDestructive] = useState<string>("#EF4444");

    return (
      <div className="w-[700px] space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Background
            </label>
            <ColorPicker color={background} onChange={setBackground} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Foreground
            </label>
            <ColorPicker color={foreground} onChange={setForeground} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Accent</label>
            <ColorPicker color={accent} onChange={setAccent} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Destructive
            </label>
            <ColorPicker color={destructive} onChange={setDestructive} />
          </div>
        </div>

        <div
          className="rounded-md border p-6 space-y-4"
          style={{
            backgroundColor: background,
            color: foreground,
            borderColor: accent,
          }}
        >
          <h3 className="text-lg font-semibold">Theme Preview</h3>
          <p className="text-sm">
            This is a preview of your custom theme configuration.
          </p>
          <div className="flex gap-2">
            <div
              className="px-4 py-2 rounded-md border font-semibold"
              style={{ backgroundColor: accent, color: background }}
            >
              Accent Button
            </div>
            <div
              className="px-4 py-2 rounded-md border font-semibold"
              style={{ backgroundColor: destructive, color: background }}
            >
              Destructive Button
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ColorPalette: Story = {
  render: () => {
    const [colors, setColors] = useState<string[]>([
      "#EF4444",
      "#F97316",
      "#F59E0B",
      "#84CC16",
      "#3B82F6",
    ]);

    const updateColor = (index: number, newColor: string) => {
      const newColors = [...colors];
      newColors[index] = newColor;
      setColors(newColors);
    };

    return (
      <div className="w-[600px] space-y-6">
        <h3 className="text-lg font-semibold">Color Palette Builder</h3>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((color, index) => (
            <div key={index} className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Color {index + 1}
              </label>
              <ColorPicker
                color={color}
                onChange={(newColor) => updateColor(index, newColor)}
              />
            </div>
          ))}
        </div>
        <div className="rounded-md border bg-card p-4">
          <p className="text-sm font-semibold mb-2">Palette Preview</p>
          <div className="flex gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="h-16 flex-1 rounded-md border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};
