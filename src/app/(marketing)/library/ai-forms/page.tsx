/**
 * AI Form Generator Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
"use client";

import { Sparkles, Send } from "lucide-react";
import { FormPreview, CodeViewer } from "@/components/ai";
import { Card, CardHeader, CardContent, TemplatePageHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
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

const examplePrompts = [
  "Contact form with name, email, and message",
  "User registration with email, password, and confirm password",
  "Newsletter signup with email and interests dropdown",
  "Bug report form with severity, category, and description",
];

// The template code - a complete standalone contact form component
const templateCode = `"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

// =============================================================================
// ZOD SCHEMA
// =============================================================================
const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// =============================================================================
// CONTACT FORM COMPONENT
// =============================================================================
export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className={cn(mode.font, "text-xs")}>
          [FULL_NAME]: <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
          placeholder="Enter your name"
          className={cn(mode.radius, mode.font, "text-xs")}
        />
        {errors.fullName && (
          <p className="text-destructive text-xs">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className={cn(mode.font, "text-xs")}>
          [EMAIL_ADDRESS]: <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          className={cn(mode.radius, mode.font, "text-xs")}
        />
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className={cn(mode.font, "text-xs")}>
          [MESSAGE]: <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Describe your needs or question"
          rows={4}
          className={cn(mode.radius, mode.font, "text-xs")}
        />
        {errors.message && (
          <p className="text-destructive text-xs">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(mode.radius, mode.font, "w-full text-xs")}
      >
        {isSubmitting ? "> SENDING..." : "> SEND_MESSAGE"}
      </Button>
    </form>
  );
}`;

function AIFormGeneratorPreview() {
  return (
    <div className="bg-background/50 p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
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
    </div>
  );
}

export default function AIFormGeneratorTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="AI_FORM_GENERATOR"
          title="AI Form Generator"
          description="Generate React Hook Form + Zod code from natural language prompts"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  "h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0",
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
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
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <AIFormGeneratorPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, "space-y-1 text-xs")}>
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
            <div className={cn(mode.font, "space-y-2 text-xs")}>
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
