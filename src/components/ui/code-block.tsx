"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div
      className="not-prose my-6 border border-border overflow-hidden bg-card"
      role="region"
      aria-label={`Code example in ${language}`}
    >
      <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="rounded-none font-mono text-xs h-7"
          aria-label={copied ? "Code copied" : "Copy code to clipboard"}
        >
          {copied ? (
            <>
              <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden="true" />
              COPIED
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3" aria-hidden="true" />
              &gt; COPY
            </>
          )}
        </Button>
      </div>
      <div className="bg-zinc-950">
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
