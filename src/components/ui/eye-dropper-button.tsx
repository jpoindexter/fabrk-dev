/**
 * ✅ FABRK COMPONENT
 * EyeDropper button for picking colors from screen
 *
 * @example
 * ```tsx
 * <EyeDropperButton />
 * ```
 */

"use client";

import { Button } from "@/components/ui/button";
import { Pipette } from "lucide-react";
import * as React from "react";

export interface EyeDropperButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onColorChange: (color: string) => void;
  disabled?: boolean;
}

/**
 * EyeDropperButton component
 * Allows users to pick colors directly from their screen using the EyeDropper API
 */
export const EyeDropperButton = React.forwardRef<HTMLButtonElement, EyeDropperButtonProps>(
  ({ onColorChange, disabled, className, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false);
    const [isSupported, setIsSupported] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      setIsSupported("EyeDropper" in window);
    }, []);

    const handleEyeDropper = async () => {
      if (!("EyeDropper" in window)) {
        alert("EyeDropper API is not supported in this browser");
        return;
      }

      try {
        // @ts-ignore - EyeDropper is not in TypeScript types yet
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        onColorChange(result.sRGBHex);
      } catch (error) {
        console.error("EyeDropper failed:", error);
      }
    };

    if (!mounted || !isSupported) {
      return null;
    }

    return (
      <Button
        ref={ref}
        data-slot="eye-dropper-button"
        variant="outline"
        size="sm"
        onClick={handleEyeDropper}
        disabled={disabled}
        title="Pick color from screen"
        className={className}
        {...props}
      >
        <Pipette className="size-4" />
      </Button>
    );
  }
);
EyeDropperButton.displayName = "EyeDropperButton";
