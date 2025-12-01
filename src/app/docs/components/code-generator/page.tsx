"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { CodeGenerator } from "@/components/ui/code-generator";
import { useState } from "react";

export default function CodeGeneratorPage() {
  const [code1] = useState("");
  const [code2] = useState("");
  const [code3] = useState("");

  const mockGenerate = async (prompt: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `// Generated from: "${prompt}"\n\nfunction example() {\n  console.log("Hello World");\n  return true;\n}`;
  };

  const mockStreamingGenerate = async (prompt: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `// Generated from: "${prompt}"\n\nfunction streamingExample() {\n  const data = fetch('/api/data');\n  return data;\n}`;
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.103]"
      category="Components"
      title="Code Generator"
      description="AI-powered code generation component with streaming output and syntax highlighting."
      importCode={`import { CodeGenerator } from "@/components/ui/code-generator"`}
      mainPreview={{
        preview: (
          <CodeGenerator
            onGenerate={mockGenerate}
            placeholder="Describe the code you want to generate..."
          />
        ),
        code: `<CodeGenerator
  onGenerate={async (prompt) => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
    return response.text();
  }}
  placeholder="Describe the code you want to generate..."
/>`,
      }}
      variants={[
        {
          title: "With Streaming",
          description: "Enable streaming mode for real-time code generation display.",
          preview: (
            <CodeGenerator
              onGenerate={mockStreamingGenerate}
              streaming
              placeholder="Describe your code..."
            />
          ),
          code: `<CodeGenerator
  onGenerate={generateCode}
  streaming
  placeholder="Describe your code..."
/>`,
        },
        {
          title: "Custom Language",
          description: "Specify the programming language for syntax highlighting and file extension.",
          preview: (
            <CodeGenerator
              onGenerate={mockGenerate}
              language="python"
              placeholder="Describe Python code to generate..."
            />
          ),
          code: `<CodeGenerator
  onGenerate={generateCode}
  language="python"
  placeholder="Describe Python code to generate..."
/>`,
        },
        {
          title: "Default Prompt",
          description: "Pre-populate the prompt field with a default value.",
          preview: (
            <CodeGenerator
              onGenerate={mockGenerate}
              defaultPrompt="Create a function that validates email addresses"
            />
          ),
          code: `<CodeGenerator
  onGenerate={generateCode}
  defaultPrompt="Create a function that validates email addresses"
/>`,
        },
        {
          title: "Terminal Style",
          description: "Code generator with terminal-style output formatting.",
          preview: (
            <div className="rounded-none border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">code-generator.tsx</span>
              </div>
              <div className="p-4">
                <CodeGenerator
                  onGenerate={mockGenerate}
                  placeholder="Enter AI prompt here..."
                />
              </div>
            </div>
          ),
          code: `<div className="rounded-none border border-border bg-card">
  <div className="flex items-center gap-2 border-b border-border px-4 py-2">
    <div className="flex gap-1.5">
      <div className="size-2 rounded-full bg-destructive/50" />
      <div className="size-2 rounded-full bg-warning/50" />
      <div className="size-2 rounded-full bg-success/50" />
    </div>
    <span className="font-mono text-xs text-muted-foreground">code-generator.tsx</span>
  </div>
  <div className="p-4">
    <CodeGenerator
      onGenerate={generateCode}
      placeholder="Enter AI prompt here..."
    />
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "onGenerate",
          type: "(prompt: string) => Promise<string>",
          default: "undefined",
          description: "Async callback that generates code from the prompt. Should return the generated code as a string.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Describe the code you want to generate..."',
          description: "Placeholder text for the prompt input area.",
        },
        {
          name: "defaultPrompt",
          type: "string",
          default: "undefined",
          description: "Initial prompt value to pre-populate the input.",
        },
        {
          name: "language",
          type: "string",
          default: '"typescript"',
          description: "Programming language for syntax highlighting and file download extension.",
        },
        {
          name: "streaming",
          type: "boolean",
          default: "false",
          description: "Enable streaming mode to display code generation in real-time.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes to apply to the container.",
        },
      ]}
      accessibility={[
        "Textarea has proper focus management and keyboard navigation",
        "Generate button is disabled when prompt is empty or generation is in progress",
        "Copy and download buttons include screen reader labels",
        "Loading state shows spinner and 'Generating...' text",
        "Generated code is displayed in semantic <pre><code> elements",
      ]}
      previous={{ title: "Checkbox", href: "/docs/components/checkbox" }}
      next={{ title: "Combobox", href: "/docs/components/combobox" }}
    />
  );
}
