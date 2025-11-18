/**
 * ✅ FABRK COMPONENT
 * Syntax-highlighted code display with copy button.
 *
 * @example
 * ```tsx
 * <CodeBlock language="typescript" code={codeString} />
 * ```
 */

"use client";

import * as React from "react";
import { Check, Copy, Code } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  maxHeight?: number;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  maxHeight = 400,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) {
      console.error("Failed to copy code:", err);
    }
  };

  const lines = code.split("\n");

  // Simple syntax highlighting for common tokens
  const highlightSyntax = (line: string): React.ReactNode => {
    // Keywords
    const keywords = /\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|interface|type|enum)\b/g;
    // Strings
    const strings = /(".*?"|'.*?'|`.*?`)/g;
    // Comments
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/g;
    // Numbers
    const numbers = /\b(\d+)\b/g;

    let result = line;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // This is a simple highlighting implementation
    // For production, consider using a library like Prism.js or highlight.js
    const segments = [
      { regex: comments, className: "text-muted-foreground italic" },
      { regex: strings, className: "text-primary" },
      { regex: keywords, className: "text-accent font-bold" },
      { regex: numbers, className: "text-accent" },
    ];

    // Split the line into segments and apply highlighting
    const highlighted = line
      .replace(keywords, '<span class="text-accent font-bold">$1</span>')
      .replace(strings, '<span class="text-primary">$1</span>')
      .replace(comments, '<span class="text-muted-foreground italic">$1</span>')
      .replace(numbers, '<span class="text-accent">$1</span>');

    // Sanitize HTML to prevent XSS attacks
    const sanitized = DOMPurify.sanitize(highlighted, {
      ALLOWED_TAGS: ['span'],
      ALLOWED_ATTR: ['class'],
    });

    return <span dangerouslySetInnerHTML={{ __html: sanitized }} />;
  };

  return (
    <div className={cn("rounded-brutal border-2 border-brutal overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between bg-accent/10 border-b-2 border-brutal px-4 py-2">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          {filename && <span className="text-sm font-bold text-foreground">{filename}</span>}
          <Badge variant="secondary" className="text-xs font-medium">
            {language}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 text-xs"
        >
          {copied ? (
            <>
              <Check className="mr-1 h-3 w-3 text-primary" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <div
        className="overflow-auto bg-card p-4 font-mono text-sm"
        style={{ maxHeight }}
      >
        <div className="relative">
          {lines.map((line, index) => (
            <div
              key={index}
              className="flex hover:bg-accent/5 -mx-4 px-4"
            >
              {showLineNumbers && (
                <span className="select-none text-muted-foreground mr-4 text-right w-8 flex-shrink-0">
                  {index + 1}
                </span>
              )}
              <span className="flex-1 text-foreground whitespace-pre">
                {line || " "}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
