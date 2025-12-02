"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { PromptBuilder, PromptTemplate } from "@/components/ui/prompt-builder";
import { toast } from "sonner";

export default function PromptBuilderPage() {
  const sampleTemplates: PromptTemplate[] = [
    {
      id: "1",
      name: "Code Review",
      category: "Development",
      content: "Review the following code for {{language}} and provide feedback on:\n- Code quality\n- Performance\n- Security\n\nCode: {{code}}",
      variables: [
        { id: "v1", name: "language", value: "", type: "text" },
        { id: "v2", name: "code", value: "", type: "text" },
      ],
    },
    {
      id: "2",
      name: "Blog Post",
      category: "Content",
      content: "Write a {{tone}} blog post about {{topic}} that is approximately {{length}} words long.\n\nTarget audience: {{audience}}",
      variables: [
        { id: "v1", name: "tone", value: "professional", type: "select", options: ["professional", "casual", "technical"] },
        { id: "v2", name: "topic", value: "", type: "text" },
        { id: "v3", name: "length", value: "500", type: "text" },
        { id: "v4", name: "audience", value: "", type: "text" },
      ],
    },
    {
      id: "3",
      name: "Email Template",
      category: "Communication",
      content: "Draft a {{formality}} email to {{recipient}} about {{subject}}.\n\nKey points to include:\n{{points}}",
      variables: [
        { id: "v1", name: "formality", value: "formal", type: "select", options: ["formal", "casual", "friendly"] },
        { id: "v2", name: "recipient", value: "", type: "text" },
        { id: "v3", name: "subject", value: "", type: "text" },
        { id: "v4", name: "points", value: "", type: "text" },
      ],
    },
  ];

  const handleBuild = async (prompt: string) => {
    toast.success("Prompt built successfully!");
    console.log("Built prompt:", prompt);
  };

  const handleSave = async (template: PromptTemplate) => {
    toast.success(`Template "${template.name}" saved!`);
    console.log("Saved template:", template);
  };

  const handleCopy = async (prompt: string) => {
    await navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.107]"
      category="Components"
      title="Prompt Builder"
      description="Interactive prompt builder for AI applications with template management and variable substitution."
      importCode={`import { PromptBuilder } from "@/components/ui/prompt-builder"`}
      mainPreview={{
        preview: (
          <PromptBuilder
            placeholder="Enter your AI prompt here. Use {{variableName}} for variables."
            onBuild={handleBuild}
            onCopyPrompt={handleCopy}
          />
        ),
        code: `<PromptBuilder
  placeholder="Enter your AI prompt here. Use {{variableName}} for variables."
  onBuild={async (prompt) => {
    await sendToAI(prompt);
  }}
  onCopyPrompt={async (prompt) => {
    await navigator.clipboard.writeText(prompt);
  }}
/>`,
      }}
      variants={[
        {
          title: "With Templates",
          description: "Pre-built templates for common use cases with categorization.",
          preview: (
            <PromptBuilder
              templates={sampleTemplates}
              showTemplates
              onBuild={handleBuild}
              onCopyPrompt={handleCopy}
            />
          ),
          code: `const templates = [
  {
    id: "1",
    name: "Code Review",
    category: "Development",
    content: "Review the following code for {{language}}...",
    variables: [
      { id: "v1", name: "language", value: "", type: "text" },
      { id: "v2", name: "code", value: "", type: "text" },
    ],
  },
];

<PromptBuilder
  templates={templates}
  showTemplates
  onBuild={handleBuild}
  onCopyPrompt={handleCopy}
/>`,
        },
        {
          title: "With Save Template",
          description: "Allow users to save their custom prompts as reusable templates.",
          preview: (
            <PromptBuilder
              templates={sampleTemplates}
              showTemplates
              onBuild={handleBuild}
              onSaveTemplate={handleSave}
              onCopyPrompt={handleCopy}
            />
          ),
          code: `<PromptBuilder
  templates={templates}
  showTemplates
  onBuild={handleBuild}
  onSaveTemplate={async (template) => {
    await saveTemplate(template);
  }}
  onCopyPrompt={handleCopy}
/>`,
        },
        {
          title: "Default Template",
          description: "Start with a pre-selected template loaded.",
          preview: (
            <PromptBuilder
              templates={sampleTemplates}
              defaultTemplate={sampleTemplates[1]}
              showTemplates
              onBuild={handleBuild}
              onCopyPrompt={handleCopy}
            />
          ),
          code: `<PromptBuilder
  templates={templates}
  defaultTemplate={templates[1]}
  showTemplates
  onBuild={handleBuild}
  onCopyPrompt={handleCopy}
/>`,
        },
        {
          title: "Limited Variables",
          description: "Restrict the maximum number of variables users can add.",
          preview: (
            <PromptBuilder
              maxVariables={5}
              showVariables
              onBuild={handleBuild}
              onCopyPrompt={handleCopy}
            />
          ),
          code: `<PromptBuilder
  maxVariables={5}
  showVariables
  onBuild={handleBuild}
  onCopyPrompt={handleCopy}
/>`,
        },
        {
          title: "Preview Only",
          description: "Hide variables tab, showing only editor and preview.",
          preview: (
            <PromptBuilder
              showVariables={false}
              showPreview
              onBuild={handleBuild}
              onCopyPrompt={handleCopy}
            />
          ),
          code: `<PromptBuilder
  showVariables={false}
  showPreview
  onBuild={handleBuild}
  onCopyPrompt={handleCopy}
/>`,
        },
        {
          title: "With All Features",
          description: "Prompt builder with templates, save functionality, and variable management.",
          preview: (
            <PromptBuilder
              templates={sampleTemplates}
              showTemplates
              showVariables
              showPreview
              onBuild={handleBuild}
              onSaveTemplate={handleSave}
              onCopyPrompt={handleCopy}
            />
          ),
          code: `<PromptBuilder
  templates={templates}
  showTemplates
  showVariables
  showPreview
  onBuild={handleBuild}
  onSaveTemplate={handleSave}
  onCopyPrompt={handleCopy}
/>`,
        },
      ]}
      props={[
        {
          name: "templates",
          type: "PromptTemplate[]",
          default: "[]",
          description: "Array of pre-built prompt templates with variables.",
        },
        {
          name: "onBuild",
          type: "(prompt: string) => Promise<void>",
          default: "undefined",
          description: "Callback fired when Build Prompt button is clicked with processed prompt.",
        },
        {
          name: "onSaveTemplate",
          type: "(template: PromptTemplate) => Promise<void>",
          default: "undefined",
          description: "Callback to save current prompt as a new template. Shows save UI when defined.",
        },
        {
          name: "onCopyPrompt",
          type: "(prompt: string) => Promise<void>",
          default: "undefined",
          description: "Callback fired when Copy Prompt button is clicked.",
        },
        {
          name: "defaultTemplate",
          type: "PromptTemplate",
          default: "undefined",
          description: "Pre-load a specific template on component mount.",
        },
        {
          name: "showTemplates",
          type: "boolean",
          default: "true",
          description: "Show template selector dropdown in editor tab.",
        },
        {
          name: "showVariables",
          type: "boolean",
          default: "true",
          description: "Show variables tab for managing prompt variables.",
        },
        {
          name: "showPreview",
          type: "boolean",
          default: "true",
          description: "Show preview tab with processed prompt output.",
        },
        {
          name: "maxVariables",
          type: "number",
          default: "10",
          description: "Maximum number of variables users can add.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Enter your prompt here. Use {{variableName}} for variables."',
          description: "Placeholder text for the prompt content textarea.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container.",
        },
      ]}
      accessibility={[
        "Tab navigation between Editor, Variables, and Preview sections",
        "Extract Variables button automatically detects {{variable}} syntax",
        "Variable inputs support keyboard navigation and editing",
        "Remove variable buttons include descriptive aria-labels",
        "Template selector shows category badges for better organization",
        "Copy and Build buttons provide visual feedback on click",
      ]}
      previous={{ title: "Pricing", href: "/docs/components/pricing" }}
      next={{ title: "Progress", href: "/docs/components/progress" }}
    />
  );
}
