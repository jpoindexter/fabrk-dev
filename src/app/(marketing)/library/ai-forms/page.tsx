"use client";

/**
 * AI Form Generator Page - Static Demo
 * Shows a pre-populated example of the AI form generation workflow
 */

import { Sparkles } from "lucide-react";
import { FormPreview, CodeViewer } from "@/components/ai";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import type { GeneratedForm } from "@/lib/ai/schemas";

// Static demo form data - shows what AI would generate
const demoForm: GeneratedForm = {
  name: "ContactForm",
  description: "A simple contact form",
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
      required: true,
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Describe your needs or question",
      required: true,
    },
  ],
  submitLabel: "Send Message",
};

export default function AIFormsPage() {
  const examplePrompts = [
    "Contact form with name, email, and message",
    "User registration with email, password, and confirm password",
    "Newsletter signup with email and interests dropdown",
    "Bug report form with severity, category, and description",
  ];

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

          {/* Static Chat Interface */}
          <div className={cn("border-border bg-card border", mode.radius)}>
            {/* Terminal Header */}
            <div className="border-border bg-muted/50 border-b px-4 py-2">
              <span className={cn("text-muted-foreground text-xs", mode.font)}>
                [ [0x00] PROMPT_INPUT ]
              </span>
            </div>

            {/* Input Area */}
            <div className="relative p-4">
              <Textarea
                defaultValue="> e.g., Contact form with name, email, phone, subject dropdown, and message textarea..."
                disabled
                className={cn(
                  "min-h-[80px] resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0",
                  mode.font,
                  mode.radius
                )}
                rows={3}
              />

              {/* Submit Button */}
              <div className="mt-4 flex items-center justify-between">
                <span className={cn("text-muted-foreground text-xs", mode.font)}>
                  Press Enter to submit, Shift+Enter for new line
                </span>
                <Button
                  type="button"
                  size="sm"
                  disabled
                  className={cn("text-xs", mode.radius, mode.font)}
                >
                  <Send className="mr-2 size-4" />
                  &gt; GENERATE
                </Button>
              </div>
            </div>
          </div>

          {/* Example Prompts */}
          <div className="mt-4 space-y-2">
            <p className={cn("text-muted-foreground text-xs", mode.font)}>[EXAMPLES]:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example) => (
                <button
                  key={example}
                  disabled
                  className={cn(
                    "border-border bg-muted/50 cursor-default border px-3 py-1 text-xs opacity-70",
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

      {/* Results Section - Always visible with demo data */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Preview */}
        <FormPreview form={demoForm} />

        {/* Generated Code */}
        <CodeViewer form={demoForm} />
      </div>
    </div>
  );
}
