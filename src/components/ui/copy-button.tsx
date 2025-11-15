"use client";
/**
 * ✅ FABRK COMPONENT
 * copy-button component
 *
 * @example
 * ```tsx
 * <CopyButton />
 * ```
 */



import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { Button } from "./button";






export interface CopyButtonProps {
  value: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "ghost" | "outline" | "secondary";
}

/**
 * CopyButton component
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, className, size = "sm", variant = "ghost" }, ref) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    return (
      <Button data-slot="copy-button"
        ref={ref}
        size={size}
        variant={variant}
        className={cn("size-7 p-0", className)}
        onClick={copyToClipboard}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </Button>
    );
  }
);
CopyButton.displayName = "CopyButton";
