/**
 * ✅ FABRK COMPONENT
 * code-generator component
 *
 * @example
 * ```tsx
 * <code-generator />
 * ```
 */

/**
 * Code Generator Component
 * AI-powered code generation with streaming output
 */

"use client";

import { cn } from "@/lib/utils";
import { Code2, Copy, Download, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Card } from "./card";
import { Textarea } from "./textarea";
import { toast } from "sonner";

export interface CodeGeneratorProps extends React.HTMLAttributes<HTMLDivElement> {
  onGenerate?: (prompt: string) => Promise<string>;
  placeholder?: string;
  defaultPrompt?: string;
  language?: string;
  streaming?: boolean;
}

const CodeGenerator = React.forwardRef<HTMLDivElement, CodeGeneratorProps>(
  (
    {
      className,
      onGenerate,
      placeholder = "Describe the code you want to generate...",
      defaultPrompt,
      language = "typescript",
      streaming = false,
      ...props
    },
    ref
  ) => {
    const [prompt, setPrompt] = React.useState(defaultPrompt || "");
    const [generatedCode, setGeneratedCode] = React.useState("");
    const [isGenerating, setIsGenerating] = React.useState(false);

    const handleGenerate = async () => {
      if (!prompt.trim() || !onGenerate) return;

      setIsGenerating(true);
      try {
        if (streaming) {
          // Simulate streaming for demo
          setGeneratedCode("");
          const fullCode = await onGenerate(prompt);
          for (let i = 0; i <= fullCode.length; i += 10) {
            setGeneratedCode(fullCode.slice(0, i));
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          setGeneratedCode(fullCode);
        } else {
          const code = await onGenerate(prompt);
          setGeneratedCode(code);
        }
      } catch {
        toast.error("Failed to generate code. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    };

    const handleCopy = () => {
      navigator.clipboard.writeText(generatedCode);
      toast.success("Code copied to clipboard");
    };

    const handleDownload = () => {
      const blob = new Blob([generatedCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `generated-code.${language}`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div
        data-slot="code-generator"
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      >
        <div className={"space-y-2"}>
          <Textarea
            placeholder={placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-24 resize-none"
          />
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating || !onGenerate}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className={`"h-4 w-4" mr-2 animate-spin`} />
                Generating...
              </>
            ) : (
              <>
                <Code2 className={`"h-4 w-4" mr-2`} />
                Generate Code
              </>
            )}
          </Button>
        </div>

        {generatedCode && (
          <Card className={"p-6"}>
            <div className="mb-2 flex items-center justify-between">
              <span className={`"text-sm" font-medium text-muted-foreground`}>Generated Code</span>
              <div className={"flex gap-2"}>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="size-8">
                  <Copy className="size-4" />
                  <span className="sr-only">Copy code</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDownload} className="size-8">
                  <Download className="size-4" />
                  <span className="sr-only">Download code</span>
                </Button>
              </div>
            </div>
            <pre
              className={`overflow-x-auto rounded-none border border-border bg-card `}
            >
              <code className={`language-${language}`}>{generatedCode}</code>
            </pre>
          </Card>
        )}
      </div>
    );
  }
);
CodeGenerator.displayName = "CodeGenerator";

export { CodeGenerator };
