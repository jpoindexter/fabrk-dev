"use client";

import * as React from "react";
import Sketch from "@uiw/react-color-sketch";
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

// Sketch picker default presets
const defaultPresets = [
  "#D0021B",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90D9",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
];

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

  React.useEffect(() => {
    setLocalColor(color);
  }, [color]);

  const handleColorChange = (newColor: { hex: string }) => {
    setLocalColor(newColor.hex);
    onChange?.(newColor.hex);
  };

  // Shared Sketch picker component
  const SketchPicker = ({ width = 218 }: { width?: number }) => (
    <Sketch
      color={localColor}
      onChange={handleColorChange}
      presetColors={showPresets ? presets : []}
      disableAlpha
      style={{
        width,
        boxShadow: "none",
        border: "none",
        background: "transparent",
      }}
    />
  );

  // Inline variant - always visible, no popover
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "inline-block rounded-[4px] bg-white p-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
          className
        )}
      >
        <SketchPicker />
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
              "h-[28px] w-[28px] cursor-pointer rounded-[3px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            style={{ backgroundColor: localColor }}
            aria-label={`Color: ${localColor}`}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-auto rounded-[4px] border-none bg-white p-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
          align="start"
        >
          <SketchPicker />
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
            className={cn("h-8 gap-1.5 px-2", className)}
            disabled={disabled}
          >
            <div
              className="h-4 w-4 rounded-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
              style={{ backgroundColor: localColor }}
            />
            <span className="font-mono text-xs">
              {localColor.replace("#", "").toUpperCase()}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto rounded-[4px] border-none bg-white p-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
          align="start"
        >
          <SketchPicker width={200} />
        </PopoverContent>
      </Popover>
    );
  }

  // Default variant - full Sketch-style picker in popover
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
              className="h-4 w-4 rounded-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
              style={{ backgroundColor: localColor }}
            />
            <Paintbrush className="h-4 w-4" />
            <span className="flex-1 truncate font-mono text-xs">
              {localColor?.toUpperCase() || placeholder}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto rounded-[4px] border-none bg-white p-0 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
        align="start"
      >
        <SketchPicker />
      </PopoverContent>
    </Popover>
  );
}
