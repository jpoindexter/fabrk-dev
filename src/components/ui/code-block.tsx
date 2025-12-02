"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";

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
      className="not-prose relative group"
      role="region"
      aria-label={`Code example in ${language}`}
    >
      {/* Copy button - appears on hover */}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 p-1.5 font-mono text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <div className="bg-zinc-900 rounded-md">
        <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-auto p-4 m-0 text-xs leading-relaxed`}
              style={{
                ...style,
                backgroundColor: "transparent",
                fontFamily:
                  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
              }}
              tabIndex={0}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {/* Add $ prompt for shell commands */}
                  {isShell && i === 0 && (
                    <span className="text-primary select-none mr-2">$</span>
                  )}
                  {isShell && i > 0 && tokens[i].length > 0 && tokens[i][0].content.trim() !== "" && (
                    <span className="text-primary select-none mr-2">$</span>
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
