"use client";
/**
 * ✅ FABRK COMPONENT
 * multi-code-block component
 *
 * @example
 * ```tsx
 * <MultiCodeBlock />
 * ```
 */

import { cn } from "@/lib/design-system/utils";
import { Check, Copy } from "lucide-react";
import * as React from "react";
import { useState } from "react";

export interface FileContent {
  name: string;
  language: string;
  code: string;
}

export interface MultiCodeBlockProps {
  files: FileContent[];
  defaultFile?: string;
  showLineNumbers?: boolean;
  className?: string;
  styleOptions?: string[];
  defaultStyle?: string;
  /**
   * Accessible label for the code tabs
   * @default "Code examples"
   */
  "aria-label"?: string;
}

/**
 * MultiCodeBlock component
 */
export const MultiCodeBlock = React.forwardRef<HTMLDivElement, MultiCodeBlockProps>(
  (
    {
      files = [],
      defaultFile,
      showLineNumbers = true,
      className,
      styleOptions = ["CSS", "CSS Modules", "Tailwind CSS"],
      defaultStyle = "CSS",
      "aria-label": ariaLabel = "Code examples",
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = useState(defaultFile || files[0]?.name || "");
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState(defaultStyle);
    const [copied, setCopied] = useState(false);

    const activeFile = files.find((f) => f.name === activeTab) || files[0];
    if (!activeFile) return null;

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(activeFile.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    // Simple syntax highlighting
    const highlightSyntax = (code: string, language: string) => {
      // For now, return the code as-is
      // You can add syntax highlighting logic here
      return code;
    };

    return (
      <div
        data-slot="multi-code-block"
        ref={ref}
        className={cn("multi-code-block mt-6 rounded-lg border", className)}
      >
        {/* Tab Header */}
        <div className="flex flex-wrap items-center justify-between border-b">
          <div className="flex" role="tablist" aria-label={ariaLabel}>
            {files.map((file) => (
              <button
                key={file.name}
                role="tab"
                aria-selected={activeTab === file.name}
                aria-controls={`code-panel-${file.name.replace(/\s+/g, "-")}`}
                id={`tab-${file.name.replace(/\s+/g, "-")}`}
                className={`px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                  activeTab === file.name
                    ? "border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab(file.name)}
              >
                {file.name}
              </button>
            ))}
          </div>

          {/* Controls on the right */}
          <div className="flex items-center gap-1 px-2 sm:gap-2 sm:px-3">
            <button
              className="p-1 text-muted-foreground transition-colors hover:text-foreground sm:p-1.5"
              onClick={copyToClipboard}
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? (
                <Check className="size-3.5 sm:size-4" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5 sm:size-4" aria-hidden="true" />
              )}
            </button>
            {styleOptions.length > 0 && (
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="h-6 w-28 rounded border border-input bg-background px-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring sm:h-7 sm:w-36 sm:px-2 sm:text-xs"
                aria-label="Select code style"
              >
                {styleOptions.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Code Content */}
        <div
          role="tabpanel"
          id={`code-panel-${activeTab.replace(/\s+/g, "-")}`}
          aria-labelledby={`tab-${activeTab.replace(/\s+/g, "-")}`}
          className="relative"
        >
          <div
            className={`overflow-hidden bg-card p-6 transition-all duration-300 ${
              isExpanded ? "max-h-none" : "max-h-80"
            }`}
          >
            <pre className="m-0 text-sm" role="region" aria-label={`Code: ${activeFile.language}`}>
              <code className={`language-${activeFile.language} text-foreground`}>
                {showLineNumbers
                  ? activeFile.code.split("\n").map((line, index) => (
                      <div key={index} className="table-row">
                        <span
                          className="table-cell select-none pr-4 text-right text-xs text-muted-foreground opacity-50"
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>
                        <span className="table-cell">
                          {highlightSyntax(line, activeFile.language)}
                        </span>
                      </div>
                    ))
                  : highlightSyntax(activeFile.code, activeFile.language)}
              </code>
            </pre>
          </div>

          {/* Gradient Overlay and Expand Button */}
          {!isExpanded && activeFile.code.split("\n").length > 12 && (
            <div className="absolute inset-x-0 bottom-0 flex h-32 items-end justify-center bg-gradient-to-t from-card to-transparent">
              <div className="relative pb-4">
                <button
                  onClick={() => setIsExpanded(true)}
                  aria-label="Expand code block"
                  aria-expanded="false"
                  className="rounded border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Expand code
                </button>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          {isExpanded && (
            <div className="flex justify-center bg-card pb-2 pt-4">
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Collapse code block"
                aria-expanded="true"
                className="rounded border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Collapse code
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);
MultiCodeBlock.displayName = "MultiCodeBlock";
