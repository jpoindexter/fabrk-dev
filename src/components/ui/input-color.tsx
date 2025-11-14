"use client";

/**
 * ✅ FABRK COMPONENT
 * Color input component.
 *
 * @example
 * ```tsx
 * <input-color />
 * ```
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface InputColorProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  showInput?: boolean;
  presetColors?: string[];
}

const defaultPresetColors = [
  "hsl(var(--destructive))", // red
  "hsl(var(--warning))", // orange
  "hsl(var(--warning))", // amber
  "hsl(var(--warning))", // yellow
  "hsl(var(--primary))", // lime
  "hsl(var(--success))", // green
  "hsl(var(--success))", // emerald
  "hsl(var(--primary))", // teal
  "hsl(var(--primary))", // cyan
  "hsl(var(--primary))", // sky
  "hsl(var(--info))", // blue
  "hsl(var(--primary))", // indigo
  "hsl(var(--primary))", // violet
  "hsl(var(--accent))", // purple
  "hsl(var(--accent))", // fuchsia
  "hsl(var(--accent))", // pink
  "hsl(var(--primary))", // rose
  "hsl(var(--foreground))", // black
  "hsl(var(--background))", // white
  "hsl(var(--muted-foreground))", // gray
];

const InputColor = React.forwardRef<HTMLInputElement, InputColorProps>(
  (
    {
      value: controlledValue,
      defaultValue = "var(--color-black)",
      onValueChange,
      showInput = true,
      presetColors = defaultPresetColors,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const [inputValue, setInputValue] = React.useState("");

    const value = controlledValue ?? uncontrolledValue;

    React.useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleColorChange = (newValue: string) => {
      if (disabled) return;

      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      setInputValue(newValue);
      onValueChange?.(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Validate hex color
      if (/^#[0-9A-F]{6}$/i.test(newValue)) {
        handleColorChange(newValue);
      }
    };

    const handleInputBlur = () => {
      // Validate and format on blur
      let formattedValue = inputValue;

      if (!formattedValue.startsWith("#")) {
        formattedValue = `#${formattedValue}`;
      }

      if (/^#[0-9A-F]{6}$/i.test(formattedValue)) {
        handleColorChange(formattedValue);
      } else {
        setInputValue(value); // Reset to valid value
      }
    };

    return (
      <div data-slot="input-color" className={cn("flex items-center gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              style={{ "--color": value } as React.CSSProperties}
              className={cn(
                "h-10 w-10 border bg-[color:var(--color)] p-1",
                disabled && "cursor-not-allowed opacity-50"
              )}
              aria-label="Choose color"
            >
              <span className="sr-only">Current color: {value}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <div className={`${tokens.spacing.space.y[3]}`}>
              <div className={`grid grid-cols-5 ${tokens.spacing.gap[2]}`}>
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    style={{ "--preset-color": color } as React.CSSProperties}
                    className={cn(
                      "h-8 w-8 rounded-md border bg-[color:var(--preset-color)] transition-all",
                      value === color
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-muted hover:border-primary"
                    )}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
              <div className={`${tokens.spacing.space.y[2]}`}>
                <label className={`"text-sm" font-medium`}>Custom Color</label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className={`${tokens.sizes.input.md} w-full cursor-pointer rounded-md`}
                  disabled={disabled}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {showInput && (
          <Input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="var(--color-black)"
            disabled={disabled}
            className="w-32 font-mono"
            {...props}
          />
        )}
      </div>
    );
  }
);
InputColor.displayName = "InputColor";

export { InputColor };
