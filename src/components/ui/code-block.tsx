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
      {/* Copy button - always visible */}
      <button
        onClick={handleCopy}
        className={cn(
          "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground border-border absolute top-2 right-2 z-10 flex items-center gap-1.5 border px-2 py-1 text-xs transition-colors",
          mode.radius,
          mode.font
        )}
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
      >
        {copied ? (
          <>
            <Check className="text-success h-3.5 w-3.5" aria-hidden="true" />
            <span>COPIED</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>COPY</span>
          </>
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
