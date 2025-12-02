"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { useState } from "react";

export default function MarkdownEditorPage() {
  const [content1, setContent1] = useState("# Hello World\n\nStart typing in **markdown**...");
  const [content2, setContent2] = useState("## Features\n\n- Bold text with **double asterisks**\n- Italic text with *single asterisks*\n- Links like [this](https://example.com)\n- Code blocks with ```backticks```");
  const [content3, setContent3] = useState("");
  const [content4, setContent4] = useState("This is **preview-only** mode.\n\nThe editor is hidden.");

  return (
    <ComponentShowcaseTemplate
      code="[UI.105]"
      category="Components"
      title="Markdown Editor"
      description="Live markdown editor with side-by-side preview, toolbar, and theme-responsive styling."
      importCode={`import { MarkdownEditor } from "@/components/ui/markdown-editor"`}
      mainPreview={{
        preview: (
          <MarkdownEditor
            value={content1}
            onChange={setContent1}
            minHeight={300}
          />
        ),
        code: `const [content, setContent] = useState("# Hello World\\n\\nStart typing in **markdown**...");

<MarkdownEditor
  value={content}
  onChange={setContent}
  minHeight={300}
/>`,
      }}
      variants={[
        {
          title: "With Preview",
          description: "Side-by-side editor and live preview with toggle button.",
          preview: (
            <MarkdownEditor
              value={content2}
              onChange={setContent2}
              minHeight={250}
            />
          ),
          code: `<MarkdownEditor
  value={content}
  onChange={setContent}
  minHeight={250}
/>`,
        },
        {
          title: "Editor Only",
          description: "Show only the markdown editor without preview pane.",
          preview: (
            <MarkdownEditor
              value={content3}
              onChange={setContent3}
              editorOnly
              placeholder="Write your markdown here..."
              minHeight={200}
            />
          ),
          code: `<MarkdownEditor
  value={content}
  onChange={setContent}
  editorOnly
  placeholder="Write your markdown here..."
  minHeight={200}
/>`,
        },
        {
          title: "Preview Only",
          description: "Display only the rendered markdown without the editor.",
          preview: (
            <MarkdownEditor
              value={content4}
              onChange={setContent4}
              previewOnly
              minHeight={150}
            />
          ),
          code: `<MarkdownEditor
  value={content}
  onChange={setContent}
  previewOnly
  minHeight={150}
/>`,
        },
        {
          title: "Disabled State",
          description: "Disabled editor for read-only scenarios.",
          preview: (
            <MarkdownEditor
              value="This editor is **disabled**.\n\nYou cannot edit this content."
              onChange={() => {}}
              disabled
              minHeight={150}
            />
          ),
          code: `<MarkdownEditor
  value={content}
  onChange={handleChange}
  disabled
  minHeight={150}
/>`,
        },
        {
          title: "Custom Height",
          description: "Adjust the minimum height of the editor panes.",
          preview: (
            <MarkdownEditor
              value="# Compact Editor\n\nSmaller height for inline editing scenarios."
              onChange={() => {}}
              minHeight={150}
            />
          ),
          code: `<MarkdownEditor
  value={content}
  onChange={setContent}
  minHeight={150}
/>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          default: '""',
          description: "Current markdown content of the editor.",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          default: "undefined",
          description: "Callback fired when the markdown content changes.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Start writing in markdown..."',
          description: "Placeholder text shown when editor is empty.",
        },
        {
          name: "minHeight",
          type: "number",
          default: "400",
          description: "Minimum height of the editor and preview panes in pixels.",
        },
        {
          name: "editorOnly",
          type: "boolean",
          default: "false",
          description: "Show only the editor without the preview pane.",
        },
        {
          name: "previewOnly",
          type: "boolean",
          default: "false",
          description: "Show only the rendered preview without the editor.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable editing functionality for read-only display.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container.",
        },
      ]}
      accessibility={[
        "Toolbar buttons have descriptive title attributes for screen readers",
        "Editor textarea supports full keyboard navigation and text selection",
        "Preview toggle button clearly indicates current state (Show/Hide Preview)",
        "Generated HTML is sanitized with DOMPurify to prevent XSS attacks",
        "Semantic HTML structure with proper heading hierarchy in preview",
        "Focus management maintains cursor position after toolbar actions",
      ]}
      previous={{ title: "Loading", href: "/docs/components/loading" }}
      next={{ title: "Markdown Viewer", href: "/docs/components/markdown-viewer" }}
    />
  );
}
