"use client";

import * as React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ColorPickerVariant = "default" | "compact" | "inline" | "swatch";

interface ColorPickerProps {
  color?: string;
  onChange?: (color: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showPresets?: boolean;
  presets?: string[];
  variant?: ColorPickerVariant;
}

const defaultPresets = [
  "#000000",
  "#FFFFFF",
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#84CC16",
  "#22C55E",
  "#10B981",
  "#14B8A6",
  "#06B6D4",
  "#0EA5E9",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#D946EF",
  "#EC4899",
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export function ColorPicker({
  color = "#000000",
  onChange,
  placeholder = "Pick a color",
  disabled = false,
  className,
  showPresets = true,
  presets = defaultPresets,
  variant = "default",
}: ColorPickerProps) {
  const [localColor, setLocalColor] = React.useState(color);
  const [rgb, setRgb] = React.useState(() => hexToRgb(color) || { r: 0, g: 0, b: 0 });

  React.useEffect(() => {
    setLocalColor(color);
    const newRgb = hexToRgb(color);
    if (newRgb) setRgb(newRgb);
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor);
    const newRgb = hexToRgb(newColor);
    if (newRgb) setRgb(newRgb);
    onChange?.(newColor);
  };

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(255, numValue));
    const newRgb = { ...rgb, [channel]: clampedValue };
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setLocalColor(newHex);
    onChange?.(newHex);
  };

  // Inline variant - always visible, no popover
  if (variant === "inline") {
    return (
      <div className={cn("border border-border bg-card", className)}>
        <div className="p-3 [&_.react-colorful]:w-full [&_.react-colorful]:h-[150px] [&_.react-colorful__saturation]:rounded-none [&_.react-colorful__hue]:rounded-none [&_.react-colorful__hue]:h-[12px] [&_.react-colorful__pointer]:w-[14px] [&_.react-colorful__pointer]:h-[14px]">
          <HexColorPicker color={localColor} onChange={handleColorChange} />
        </div>
        <div className="border-t border-border p-3">
          <div className="flex gap-3">
            <div
              className="h-[72px] w-[72px] shrink-0 rounded-none border border-border"
              style={{ backgroundColor: localColor }}
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <label className="font-mono text-[10px] text-muted-foreground w-6">HEX</label>
                <HexColorInput
                  color={localColor}
                  onChange={handleColorChange}
                  prefixed
                  className="flex-1 h-6 px-2 font-mono text-xs bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-mono text-[10px] text-muted-foreground w-6">RGB</label>
                <div className="flex-1 flex gap-1">
                  <input type="number" min="0" max="255" value={rgb.r} onChange={(e) => handleRgbChange("r", e.target.value)} className="w-full h-6 px-1 font-mono text-xs text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input type="number" min="0" max="255" value={rgb.g} onChange={(e) => handleRgbChange("g", e.target.value)} className="w-full h-6 px-1 font-mono text-xs text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input type="number" min="0" max="255" value={rgb.b} onChange={(e) => handleRgbChange("b", e.target.value)} className="w-full h-6 px-1 font-mono text-xs text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPresets && (
          <div className="border-t border-border p-3">
            <div className="grid grid-cols-9 gap-1.5">
              {presets.map((presetColor, index) => (
                <button
                  key={`${presetColor}-${index}`}
                  type="button"
                  className={cn(
                    "h-5 w-5 rounded-none border cursor-pointer transition-all hover:scale-110",
                    presetColor.toUpperCase() === localColor.toUpperCase()
                      ? "border-primary ring-1 ring-primary"
                      : "border-border hover:border-foreground"
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorChange(presetColor)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Swatch variant - just a color swatch button
  if (variant === "swatch") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "h-8 w-8 rounded-none border border-border cursor-pointer transition-all hover:scale-105 hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            style={{ backgroundColor: localColor }}
            aria-label={`Color: ${localColor}`}
          />
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0 rounded-none" align="start">
          <div className="p-3 [&_.react-colorful]:w-full [&_.react-colorful]:h-[150px] [&_.react-colorful__saturation]:rounded-none [&_.react-colorful__hue]:rounded-none [&_.react-colorful__hue]:h-[12px] [&_.react-colorful__pointer]:w-[14px] [&_.react-colorful__pointer]:h-[14px]">
            <HexColorPicker color={localColor} onChange={handleColorChange} />
          </div>
          <div className="border-t border-border p-3">
            <HexColorInput
              color={localColor}
              onChange={handleColorChange}
              prefixed
              className="w-full h-8 px-2 font-mono text-sm text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {showPresets && (
            <div className="border-t border-border p-3">
              <div className="grid grid-cols-9 gap-1.5">
                {presets.map((presetColor, index) => (
                  <button
                    key={`${presetColor}-${index}`}
                    type="button"
                    className={cn(
                      "h-5 w-5 rounded-none border cursor-pointer transition-all hover:scale-110",
                      presetColor.toUpperCase() === localColor.toUpperCase()
                        ? "border-primary ring-1 ring-primary"
                        : "border-border hover:border-foreground"
                    )}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handleColorChange(presetColor)}
                  />
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  // Compact variant - smaller trigger, simplified popover
  if (variant === "compact") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 px-2 gap-1.5", className)}
            disabled={disabled}
          >
            <div
              className="h-4 w-4 rounded-none border border-border"
              style={{ backgroundColor: localColor }}
            />
            <span className="font-mono text-xs">{localColor.toUpperCase()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 rounded-none" align="start">
          <div className="p-2 [&_.react-colorful]:w-full [&_.react-colorful]:h-[120px] [&_.react-colorful__saturation]:rounded-none [&_.react-colorful__hue]:rounded-none [&_.react-colorful__hue]:h-[10px] [&_.react-colorful__pointer]:w-[12px] [&_.react-colorful__pointer]:h-[12px]">
            <HexColorPicker color={localColor} onChange={handleColorChange} />
          </div>
          <div className="border-t border-border p-2">
            <HexColorInput
              color={localColor}
              onChange={handleColorChange}
              prefixed
              className="w-full h-7 px-2 font-mono text-xs text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {showPresets && (
            <div className="border-t border-border p-2">
              <div className="grid grid-cols-9 gap-1">
                {presets.slice(0, 18).map((presetColor, index) => (
                  <button
                    key={`${presetColor}-${index}`}
                    type="button"
                    className={cn(
                      "h-4 w-4 rounded-none border cursor-pointer transition-all hover:scale-110",
                      presetColor.toUpperCase() === localColor.toUpperCase()
                        ? "border-primary ring-1 ring-primary"
                        : "border-border hover:border-foreground"
                    )}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handleColorChange(presetColor)}
                  />
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  // Default variant
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !color && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <div className="flex w-full items-center gap-2">
            <div
              className="h-4 w-4 rounded-none border border-border"
              style={{ backgroundColor: localColor }}
            />
            <Paintbrush className="h-4 w-4" />
            <span className="flex-1 truncate font-mono text-xs">
              {localColor?.toUpperCase() || placeholder}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0 rounded-none" align="start">
        <div className="space-y-0">
          <div className="p-3 [&_.react-colorful]:w-full [&_.react-colorful]:h-[150px] [&_.react-colorful__saturation]:rounded-none [&_.react-colorful__hue]:rounded-none [&_.react-colorful__hue]:h-[12px] [&_.react-colorful__pointer]:w-[14px] [&_.react-colorful__pointer]:h-[14px]">
            <HexColorPicker color={localColor} onChange={handleColorChange} />
          </div>
          <div className="border-t border-border p-3">
            <div className="flex gap-3">
              <div
                className="h-[72px] w-[72px] shrink-0 rounded-none border border-border"
                style={{ backgroundColor: localColor }}
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="font-mono text-[10px] text-muted-foreground w-6">HEX</label>
                  <HexColorInput
                    color={localColor}
                    onChange={handleColorChange}
                    prefixed
                    className="flex-1 h-6 px-2 font-mono text-xs bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="font-mono text-[10px] text-muted-foreground w-6">RGB</label>
                  <div className="flex-1 flex gap-1">
                    <input type="number" min="0" max="255" value={rgb.r} onChange={(e) => handleRgbChange("r", e.target.value)} className="w-full h-6 px-1 font-mono text-xs text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="number" min="0" max="255" value={rgb.g} onChange={(e) => handleRgbChange("g", e.target.value)} className="w-full h-6 px-1 font-mono text-xs text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="number" min="0" max="255" value={rgb.b} onChange={(e) => handleRgbChange("b", e.target.value)} className="w-full h-6 px-1 font-mono text-xs text-center bg-background border border-border rounded-none focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPresets && (
            <div className="border-t border-border p-3">
              <div className="grid grid-cols-9 gap-1.5">
                {presets.map((presetColor, index) => (
                  <button
                    key={`${presetColor}-${index}`}
                    type="button"
                    className={cn(
                      "h-5 w-5 rounded-none border cursor-pointer transition-all hover:scale-110",
                      presetColor.toUpperCase() === localColor.toUpperCase()
                        ? "border-primary ring-1 ring-primary"
                        : "border-border hover:border-foreground"
                    )}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handleColorChange(presetColor)}
                    aria-label={`Select color ${presetColor}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
