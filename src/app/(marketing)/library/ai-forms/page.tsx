/**
 * AI Form Generator Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Sparkles, Send } from 'lucide-react';
import { generateZodCode, generateComponentCode } from '@/components/ai';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import type { GeneratedForm } from '@/lib/ai/schemas';
import { LibraryNavigation } from '@/components/library';

// Static demo form data - shows what AI would generate
const demoForm: GeneratedForm = {
  name: 'ContactForm',
  description: 'A simple contact form',
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@example.com',
      required: true,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Describe your needs or question',
      required: true,
    },
  ],
  submitLabel: 'Send Message',
};

const examplePrompts = [
  'Contact form with name, email, and message',
  'User registration with email, password, and confirm password',
  'Newsletter signup with email and interests dropdown',
  'Bug report form with severity, category, and description',
];

// The template code - the actual AI Form Generator component
const templateCode = `"use client";

import { useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import { ChatInterface, CodeViewer } from "@/components/ai";
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
        <CardHeader code="0x00" title="FORM PROMPT" />
        <CardContent padding="lg">
          <p className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
            &gt; Describe the form you want to create. Be specific about fields,
            validation, and purpose.
          </p>

          <ChatInterface
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="> e.g., Contact form with name, email, phone, subject dropdown..."
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
          <AlertDescription className={cn("text-xs", mode.font)}>
            [ERROR] {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Results Section */}
      {generatedForm && (
        <div className="grid gap-6 lg:grid-cols-2">
          <FormPreview form={generatedForm} />
          <CodeViewer form={generatedForm} />
        </div>
      )}

      {/* Empty State */}
      {!generatedForm && !isLoading && !error && (
        <Card>
          <CardContent padding="lg">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="text-muted-foreground/50 mb-4 size-12" />
              <h3 className={cn("text-lg font-semibold", mode.font)}>
                No form generated yet
              </h3>
              <p className={cn("text-muted-foreground max-w-md text-sm", mode.font)}>
                Enter a description above to generate a form. The AI will create
                both a live preview and copyable React Hook Form + Zod code.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}`;

function AIFormGeneratorPreview() {
  return (
    <div className="bg-background/50 p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={cn('bg-primary/10 p-2', mode.radius)}>
            <Sparkles className="text-primary size-6" />
          </div>
          <div>
            <h1 className={cn('text-2xl font-bold', mode.font)}>AI Form Generator</h1>
            <p className={cn('text-muted-foreground text-sm', mode.font)}>
              Generate React Hook Form + Zod code from natural language
            </p>
          </div>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader code="0x00" title="FORM PROMPT" />
          <CardContent padding="lg">
            <p className={cn('text-muted-foreground mb-4 text-xs', mode.font)}>
              &gt; Describe the form you want to create. Be specific about fields, validation, and
              purpose.
            </p>

            {/* Static Chat Interface */}
            <div className={cn('border-border bg-card border', mode.radius)}>
              {/* Terminal Header */}
              <div className="border-border bg-muted/50 border-b px-4 py-2">
                <span className={cn('text-muted-foreground text-xs', mode.font)}>
                  [ [0x00] PROMPT INPUT ]
                </span>
              </div>

              {/* Input Area */}
              <div className="relative p-4">
                <Textarea
                  defaultValue="Contact form with name, email, and message"
                  disabled
                  className={cn(
                    'text-foreground min-h-[80px] resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 disabled:cursor-default disabled:opacity-100',
                    mode.font,
                    mode.radius
                  )}
                  rows={3}
                />

                {/* Submit Button */}
                <div className="mt-4 flex items-center justify-between">
                  <span className={cn('text-muted-foreground text-xs', mode.font)}>
                    Press Enter to submit, Shift+Enter for new line
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    disabled
                    className={cn('text-xs', mode.radius, mode.font)}
                  >
                    <Send className="mr-2 size-4" />
                    &gt; GENERATE
                  </Button>
                </div>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="mt-4 space-y-2">
              <p className={cn('text-muted-foreground text-xs', mode.font)}>[EXAMPLES]:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example) => (
                  <button
                    key={example}
                    disabled
                    className={cn(
                      'border-border bg-muted/50 cursor-default border px-3 py-1 text-xs opacity-70',
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

        {/* Results Section - Tabbed interface */}
        <Tabs defaultValue="preview" className="w-full">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x01" title="GENERATED OUTPUT" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="schema"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [SCHEMA]
                </TabsTrigger>
                <TabsTrigger
                  value="component"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [COMPONENT]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader code="0x02" title="FORM PREVIEW" />
              <div className="p-6">
                <div className="mb-4">
                  <h3 className={cn('text-lg font-semibold', mode.font)}>{demoForm.name}</h3>
                  <p className={cn('text-muted-foreground text-xs', mode.font)}>
                    {demoForm.description}
                  </p>
                </div>
                <form className="space-y-4">
                  {demoForm.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className={cn('text-xs', mode.font)}>
                        [{field.label.toUpperCase()}]:
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          placeholder={field.placeholder}
                          className={cn('text-sm', mode.radius, mode.font)}
                          rows={4}
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className={cn(
                            'border-border bg-background w-full border px-3 py-2 text-sm',
                            mode.radius,
                            mode.font
                          )}
                        />
                      )}
                    </div>
                  ))}
                  <Button type="button" className={cn('w-full text-xs', mode.radius, mode.font)}>
                    &gt; {demoForm.submitLabel.toUpperCase()}
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>

          {/* Schema Tab Content */}
          <TabsContent value="schema" className="mt-6">
            <Card>
              <CardHeader code="0x02" title="ZOD SCHEMA" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock
                  code={generateZodCode(demoForm)}
                  language="typescript"
                  maxHeight="500px"
                />
              </div>
            </Card>
          </TabsContent>

          {/* Component Tab Content */}
          <TabsContent value="component" className="mt-6">
            <Card>
              <CardHeader code="0x02" title="REACT COMPONENT" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock
                  code={generateComponentCode(demoForm)}
                  language="tsx"
                  maxHeight="500px"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function AIFormGeneratorTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Navigation */}
        <LibraryNavigation
          templateName="AI Form Generator"
          category="Patterns"
          categoryHref="/library/patterns"
        />

        {/* Header */}
        <TemplatePageHeader
          badge="AI FORM GENERATOR"
          title="AI Form Generator"
          description="Generate React Hook Form + Zod code from natural language prompts"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <AIFormGeneratorPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">api/ai/</span>
                  <span className="text-foreground">generate-form/route.ts</span>
                  <span className="text-muted-foreground ml-4">← AI endpoint</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(tools)/</span>
                  <span className="text-foreground">ai-forms/page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-muted-foreground">ai/</span>
                  <span className="text-foreground">chat-interface.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-muted-foreground">ai/</span>
                  <span className="text-foreground">form-preview.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-muted-foreground">ai/</span>
                  <span className="text-foreground">code-viewer.tsx</span>
                </div>
                <div>
                  <span className="text-primary">lib/</span>
                  <span className="text-muted-foreground">ai/</span>
                  <span className="text-foreground">schemas.ts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> Natural language to form generation
              </div>
              <div>
                <span className="text-success">&gt;</span> React Hook Form + Zod schema output
              </div>
              <div>
                <span className="text-success">&gt;</span> Live form preview with all field types
              </div>
              <div>
                <span className="text-success">&gt;</span> Copyable schema and component code
              </div>
              <div>
                <span className="text-success">&gt;</span> Supports text, email, password, select,
                textarea, checkbox, radio
              </div>
              <div>
                <span className="text-success">&gt;</span> Multi-provider AI support (OpenAI,
                Google, Ollama)
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-styled chat interface
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
