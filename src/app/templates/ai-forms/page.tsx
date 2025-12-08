"use client";

/**
 * AI Form Generator Page
 * Prompt-to-Form: Generate React Hook Form + Zod forms from natural language
 */

import { useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import { ChatInterface, FormPreview, CodeViewer } from "@/components/ai";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import type { GeneratedForm } from "@/lib/ai/schemas";

export default function AIFormsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null);

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to generate form");
      }

      setGeneratedForm(data.form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-6 py-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={cn("bg-primary/10 p-2", mode.radius)}>
            <Sparkles className="text-primary size-6" />
          </div>
          <div>
            <h1 className={cn("text-2xl font-bold", mode.font)}>AI Form Generator</h1>
            <p className={cn("text-muted-foreground text-sm", mode.font)}>
              Generate React Hook Form + Zod code from natural language
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader code="0x00" title="FORM_PROMPT" />
        <CardContent padding="lg">
          <p className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
            &gt; Describe the form you want to create. Be specific about fields, validation, and
            purpose.
          </p>

          <ChatInterface
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="> e.g., Contact form with name, email, phone, subject dropdown, and message textarea..."
          />

          {/* Example Prompts */}
          <div className="mt-4 space-y-2">
            <p className={cn("text-muted-foreground text-xs", mode.font)}>[EXAMPLES]:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Contact form with name, email, and message",
                "User registration with email, password, and confirm password",
                "Newsletter signup with email and interests dropdown",
                "Bug report form with severity, category, and description",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => handleSubmit(example)}
                  disabled={isLoading}
                  className={cn(
                    "border-border bg-muted/50 hover:bg-muted border px-3 py-1 text-xs transition-colors disabled:opacity-50",
                    mode.radius,
                    mode.font
                  )}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className={mode.radius}>
          <AlertCircle className="size-4" />
          <AlertDescription className={cn("text-xs", mode.font)}>[ERROR] {error}</AlertDescription>
        </Alert>
      )}

      {/* Results Section */}
      {generatedForm && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Live Preview */}
          <FormPreview form={generatedForm} />

          {/* Generated Code */}
          <CodeViewer form={generatedForm} />
        </div>
      )}

      {/* Empty State */}
      {!generatedForm && !isLoading && !error && (
        <Card>
          <CardContent padding="lg">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="text-muted-foreground/50 mb-4 size-12" />
              <h3 className={cn("text-lg font-semibold", mode.font)}>No form generated yet</h3>
              <p className={cn("text-muted-foreground max-w-md text-sm", mode.font)}>
                Enter a description above to generate a form. The AI will create both a live preview
                and copyable React Hook Form + Zod code.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
