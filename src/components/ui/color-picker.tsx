"use client";

import * as React from "react";
import { HexColorPicker } from "react-colorful";
import { Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorPickerProps {
  color?: string;
  onChange?: (color: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showPresets?: boolean;
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
  "#F43F5E",
];

export function ColorPicker({
  color = "#000000",
  onChange,
  placeholder = "Pick a color",
  disabled = false,
  className,
  showPresets = true,
}: ColorPickerProps) {
  const [localColor, setLocalColor] = React.useState(color);

  React.useEffect(() => {
    setLocalColor(color);
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor);
    onChange?.(newColor);
  };

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
              className="h-4 w-4 rounded-brutal border-2 border-brutal"
              style={{ backgroundColor: localColor }}
            />
            <Paintbrush className="h-4 w-4" />
            <span className="flex-1 truncate">{localColor || placeholder}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue="picker" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="picker" className="flex-1">
              Picker
            </TabsTrigger>
            <TabsTrigger value="input" className="flex-1">
              Input
            </TabsTrigger>
          </TabsList>

          <TabsContent value="picker" className="space-y-4 mt-0">
            <HexColorPicker color={localColor} onChange={handleColorChange} />
            {showPresets && (
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground">
                  Presets
                </p>
                <div className="grid grid-cols-10 gap-2">
                  {defaultPresets.map((presetColor) => (
                    <button
                      key={presetColor}
                      className={cn(
                        "h-6 w-6 rounded-brutal border-2 cursor-pointer hover:scale-110 transition-transform",
                        presetColor === localColor
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-brutal"
                      )}
                      style={{ backgroundColor: presetColor }}
                      onClick={() => handleColorChange(presetColor)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="input" className="space-y-4 mt-0">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">HEX</label>
              <Input
                value={localColor}
                onChange={(e) => handleColorChange(e.target.value)}
                placeholder="#000000"
                maxLength={7}
              />
            </div>
            <div
              className="h-24 rounded-brutal border-2 border-brutal"
              style={{ backgroundColor: localColor }}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
