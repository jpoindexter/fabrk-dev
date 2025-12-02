/**
 * DocsPreview - Live component preview with code
 * Critical for component showcase pages (shadcn/ui style)
 */

"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { docsTypography } from "../typography";
import { cn } from "@/lib/utils";

interface DocsPreviewProps {
  /** Preview title */
  title: string;
  /** Preview description (optional) */
  description?: string;
  /** Live component to render */
  preview: React.ReactNode;
  /** Code string to display */
  code: string;
  /** Code language */
  language?: string;
  /** Hex code like "01", "0A" - defaults to "00" */
  hexCode?: string;
  /** Optional className */
  className?: string;
}

export function DocsPreview({
  title,
  description,
  preview,
  code,
  language = "tsx",
  hexCode = "00",
  className,
}: DocsPreviewProps) {
  const [copied, setCopied] = useState(false);
  const headerTitle = title.toUpperCase().replace(/\s+/g, '_');

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("border border-border rounded-none bg-card", className)}>
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          [ [0x{hexCode}] {headerTitle} ]
        </span>
        {description && (
          <p className={`mt-1 ${docsTypography.caption}`}>{description}</p>
        )}
      </div>

      {/* Live Preview */}
      <div className="terminal-preview bg-background p-6 flex items-center justify-center min-h-[120px]">
        <div className="w-full flex items-center justify-center">
          {preview}
        </div>
      </div>

      {/* Code Block */}
      <div className="border-t border-border relative p-4">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-6 top-6 h-8 px-2 z-10"
          onClick={copyToClipboard}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
        <CodeBlock code={code} language={language} />
      </div>
    </div>
  );
}
