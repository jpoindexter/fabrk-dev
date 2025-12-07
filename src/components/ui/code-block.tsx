"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

interface CodeBlockProps {
  code: string;
  language?: string;
  /** Max height for scrollable content (e.g., "400px", "600px") */
  maxHeight?: string;
  /** Show line numbers (default: true) */
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  maxHeight,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add $ prompt for bash/shell commands
  const isShell = language === "bash" || language === "sh" || language === "shell";

  return (
    <div
      className="not-prose group relative w-full min-w-0 overflow-hidden"
      role="region"
      aria-label={`Code example in ${language}`}
    >
      {/* Copy button - icon only */}
      <button
        onClick={handleCopy}
        className="text-primary hover:text-primary/80 absolute top-3 right-3 z-10 transition-colors"
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <div className={cn("bg-card w-full min-w-0 overflow-hidden", mode.radius)}>
        <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} m-0 p-4 text-xs leading-relaxed`}
              style={{
                ...style,
                overflowY: maxHeight ? "auto" : "visible",
                maxWidth: "100%",
                width: "100%",
                boxSizing: "border-box",
                ...(maxHeight && { maxHeight }),
              }}
              tabIndex={0}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex whitespace-pre-wrap">
                  {/* Line number */}
                  {showLineNumbers && (
                    <span className="text-muted-foreground/50 mr-4 inline-block w-8 flex-shrink-0 text-right select-none">
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">
                    {/* Add $ prompt for shell commands */}
                    {isShell && i === 0 && <span className="text-primary mr-2 select-none">$</span>}
                    {isShell &&
                      i > 0 &&
                      tokens[i].length > 0 &&
                      tokens[i][0].content.trim() !== "" && (
                        <span className="text-primary mr-2 select-none">$</span>
                      )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
