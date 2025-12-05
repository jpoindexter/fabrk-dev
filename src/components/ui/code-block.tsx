"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
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
      className="not-prose group relative"
      role="region"
      aria-label={`Code example in ${language}`}
    >
      {/* Copy button - appears on hover */}
      <button
        onClick={handleCopy}
        className={cn(
          "text-muted-foreground hover:text-foreground absolute top-2 right-2 z-10 p-2 text-xs opacity-0 transition-opacity group-hover:opacity-100",
          mode.font
        )}
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
      >
        {copied ? (
          <Check className="text-success h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <div className={cn("bg-card", mode.radius)}>
        <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} m-0 overflow-auto p-4 text-xs leading-relaxed`}
              style={{
                ...style,
              }}
              tabIndex={0}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
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
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
