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
  /** Optional className */
  className?: string;
}

export function DocsPreview({
  title,
  description,
  preview,
  code,
  language = "tsx",
  className,
}: DocsPreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("border border-border rounded-none", className)}>
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <h3 className={`uppercase ${docsTypography.h4}`}>{title}</h3>
        {description && (
          <p className={`mt-1 ${docsTypography.caption}`}>{description}</p>
        )}
      </div>

      {/* Live Preview */}
      <div className="bg-background p-6 flex items-center justify-center min-h-[120px]">
        {preview}
      </div>

      {/* Code Block */}
      <div className="border-t border-border relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-8 px-2"
          onClick={copyToClipboard}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
        <CodeBlock code={code} language={language} />
      </div>
    </div>
  );
}
