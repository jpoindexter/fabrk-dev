"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { MarkdownViewer } from "@/components/ui/markdown-viewer";

export default function MarkdownViewerPage() {
  const sampleMarkdown = `# Sample Document

This is a **markdown viewer** component.

## Features

- Renders markdown content safely
- Supports *italic* and **bold** text
- Handles [links](https://example.com)
- Code blocks and inline \`code\`

## Security

All content is sanitized with DOMPurify to prevent XSS attacks.`;

  const codeExample = `## Code Example

\`\`\`typescript
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`

Inline code: \`const x = 42;\``;

  const listExample = `## Lists

### Unordered
- First item
- Second item
- Third item

### Ordered
1. Step one
2. Step two
3. Step three`;

  return (
    <ComponentShowcaseTemplate
      code="[UI.106]"
      category="Components"
      title="Markdown Viewer"
      description="Safe markdown renderer with XSS protection and theme-responsive styling."
      importCode={`import { MarkdownViewer } from "@/components/ui/markdown-viewer"`}
      mainPreview={{
        preview: <MarkdownViewer content={sampleMarkdown} />,
        code: `const markdown = \`# Sample Document

This is a **markdown viewer** component.

## Features
- Renders markdown content safely
- Supports *italic* and **bold** text
\`;

<MarkdownViewer content={markdown} />`,
      }}
      variants={[
        {
          title: "Code Blocks",
          description: "Renders code blocks with syntax highlighting and inline code.",
          preview: <MarkdownViewer content={codeExample} />,
          code: `const markdown = \`## Code Example

\\\`\\\`\\\`typescript
function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`;
}
\\\`\\\`\\\`

Inline code: \\\`const x = 42;\\\`\`;

<MarkdownViewer content={markdown} />`,
        },
        {
          title: "Lists",
          description: "Supports both ordered and unordered lists.",
          preview: <MarkdownViewer content={listExample} />,
          code: `const markdown = \`## Lists

### Unordered
- First item
- Second item

### Ordered
1. Step one
2. Step two\`;

<MarkdownViewer content={markdown} />`,
        },
        {
          title: "Loading State",
          description: "Display skeleton placeholders while content is being fetched.",
          preview: <MarkdownViewer loading />,
          code: `<MarkdownViewer loading />`,
        },
        {
          title: "Error State",
          description: "Show error message when content fails to load.",
          preview: <MarkdownViewer error />,
          code: `<MarkdownViewer error />`,
        },
        {
          title: "Empty Content",
          description: "Handles empty or undefined content gracefully.",
          preview: <MarkdownViewer content="" />,
          code: `<MarkdownViewer content="" />`,
        },
        {
          title: "Terminal Style",
          description: "Markdown viewer with terminal-style wrapper.",
          preview: (
            <div className="rounded-none border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">document.md</span>
              </div>
              <div className="p-4">
                <MarkdownViewer content={sampleMarkdown} />
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
    <span className="font-mono text-xs text-muted-foreground">document.md</span>
  </div>
  <div className="p-4">
    <MarkdownViewer content={markdown} />
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "content",
          type: "string",
          default: '""',
          description: "Markdown content to render. All HTML is sanitized for security.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Show skeleton loading state instead of content.",
        },
        {
          name: "error",
          type: "boolean",
          default: "false",
          description: "Display error message when content fails to load.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container.",
        },
      ]}
      accessibility={[
        "Uses semantic article role for proper document structure",
        "All rendered HTML is sanitized with DOMPurify to prevent XSS attacks",
        "Links automatically include target='_blank' and rel='noopener noreferrer'",
        "Loading state uses animate-pulse for visual feedback",
        "Proper heading hierarchy maintained in rendered output",
        "Theme-responsive with dark mode support via prose-invert",
      ]}
      previous={{ title: "Markdown Editor", href: "/docs/components/markdown-editor" }}
      next={{ title: "Multi Select", href: "/docs/components/multi-select" }}
    />
  );
}
