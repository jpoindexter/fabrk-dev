"use client";
/**
 * ✅ FABRK COMPONENT
 * code-block component
 *
 * @example
 * ```tsx
 * <CodeBlock />
 * ```
 */

import { RenderedToken, renderTokens, tokenize } from "@/lib/code-block-tokenizer";
import { cn } from "@/lib/design-system/utils";
import { Check, Copy, FileText } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import { Button } from "./button";

/**
 * CodeBlock component props
 */

export interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  className?: string;
  maxLines?: number;
  expandable?: boolean;
  /**
   * Accessible label for the code block
   * @default "Code block: {language}"
   */
  "aria-label"?: string;
}

/**
 * CodeBlock component
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code = "",
      language = "tsx",
      fileName,
      showLineNumbers = true,
      className,
      maxLines = 15,
      expandable = false,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    // Split into lines for line numbering
    const lines = code.split("\n");

    // Determine if we should show truncated version
    const shouldTruncate = expandable && !isExpanded && lines.length > maxLines;
    const displayLines = shouldTruncate ? lines.slice(0, maxLines) : lines;
    const displayCode = shouldTruncate ? lines.slice(0, maxLines).join("\n") : code;

    return (
      <div data-slot="code-block" ref={ref} className={cn("code-block-wrapper group", className)}>
        {fileName && (
          <div className="code-block-header">
            <div className="flex items-center gap-2">
              <FileText className="size-4" aria-hidden="true" />
              <span>{fileName}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="copy-button size-7 p-0"
              onClick={copyToClipboard}
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? (
                <Check className="size-3" aria-hidden="true" />
              ) : (
                <Copy className="size-3" aria-hidden="true" />
              )}
            </Button>
          </div>
        )}

        <div className="code-block-content relative">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "max-h-none"
                : expandable && lines.length > maxLines
                  ? "max-h-80"
                  : "max-h-none"
            }`}
          >
            <pre
              className="m-0 bg-background p-0"
              role="region"
              aria-label={ariaLabel || `Code block: ${language}`}
            >
              <code className="block">
                {showLineNumbers
                  ? lines.map((line, index) => {
                      const lineTokens = tokenize(line, language);
                      const renderedTokens = renderTokens(lineTokens);
                      return (
                        <div key={index} className="code-line">
                          <span className="line-number" aria-hidden="true">
                            {index + 1}
                          </span>
                          <span className="line-content">
                            {renderedTokens.map((token: RenderedToken) =>
                              token.type === "text" ? (
                                <span key={token.key}>{token.content}</span>
                              ) : (
                                <span key={token.key} className={token.className}>
                                  {token.content}
                                </span>
                              )
                            )}
                            {line.length === 0 && "\n"}
                          </span>
                        </div>
                      );
                    })
                  : lines.map((line, index) => {
                      const lineTokens = tokenize(line, language);
                      const renderedTokens = renderTokens(lineTokens);
                      return (
                        <div key={index} className="code-line">
                          <span className="line-content">
                            {renderedTokens.map((token: RenderedToken) =>
                              token.type === "text" ? (
                                <span key={token.key}>{token.content}</span>
                              ) : (
                                <span key={token.key} className={token.className}>
                                  {token.content}
                                </span>
                              )
                            )}
                            {line.length === 0 && "\n"}
                          </span>
                        </div>
                      );
                    })}
              </code>
            </pre>
          </div>

          {/* Gradient Overlay and Expand Button */}
          {!isExpanded && expandable && lines.length > maxLines && (
            <div className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-[hsl(var(--muted)/0.1)] via-[hsl(var(--muted)/0.05)] to-transparent">
              <div className="relative pb-2">
                <button
                  onClick={() => setIsExpanded(true)}
                  aria-label="Expand code block"
                  aria-expanded="false"
                  className="rounded-sm border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                >
                  Expand code
                </button>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          {isExpanded && expandable && (
            <div className="flex justify-center bg-[hsl(var(--muted)/0.05)] pb-1 pt-2">
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Collapse code block"
                aria-expanded="true"
                className="rounded-sm border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                Collapse code
              </button>
            </div>
          )}

          {!fileName && (
            <Button
              size="sm"
              variant="ghost"
              className="copy-button absolute right-3 top-3 z-20 size-7 p-0"
              onClick={copyToClipboard}
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? (
                <Check className="size-3" aria-hidden="true" />
              ) : (
                <Copy className="size-3" aria-hidden="true" />
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }
);
CodeBlock.displayName = "CodeBlock";
