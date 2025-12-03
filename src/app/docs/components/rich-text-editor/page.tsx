"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function RichTextEditorPage() {
  const [content1, setContent1] = useState("<p>Start typing...</p>");
  const [content2, setContent2] = useState("<p>Minimal editor with basic formatting</p>");
  const [content3, _setContent3] = useState("<p>This is read-only content that cannot be edited.</p>");

  return (
    <ComponentShowcaseTemplate
      code="[UI.43]"
      category="Components"
      title="Rich Text Editor"
      description="A WYSIWYG rich text editor with formatting toolbar and HTML output."
      importCode={`import { RichTextEditor } from "@/components/ui/rich-text-editor"`}
      mainPreview={{
        preview: (
          <div className="space-y-2">
            <Label className="font-mono text-xs text-muted-foreground">
              [EDITOR]
            </Label>
            <RichTextEditor
              value={content1}
              onChange={setContent1}
              placeholder="Start typing..."
            />
          </div>
        ),
        code: `const [content, setContent] = useState("");

<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Start typing..."
/>`,
      }}
      variants={[
        {
          title: "Minimal Toolbar",
          description: "Editor with simplified formatting options",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [MINIMAL_EDITOR]
              </Label>
              <RichTextEditor
                value={content2}
                onChange={setContent2}
                toolbar="minimal"
                placeholder="Basic formatting only"
              />
            </div>
          ),
          code: `<RichTextEditor
  value={content}
  onChange={setContent}
  toolbar="minimal"
/>`,
        },
        {
          title: "Read-Only",
          description: "Display-only editor without editing capability",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [READ_ONLY]
              </Label>
              <RichTextEditor
                value={content3}
                readOnly
              />
            </div>
          ),
          code: `<RichTextEditor
  value={content}
  readOnly
/>`,
        },
        {
          title: "Custom Height",
          description: "Editor with custom min/max height constraints",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [CUSTOM_HEIGHT]
              </Label>
              <RichTextEditor
                value="<p>This editor has a smaller min-height for compact spaces.</p>"
                onChange={() => {}}
                minHeight="100px"
                maxHeight="300px"
              />
            </div>
          ),
          code: `<RichTextEditor
  value={content}
  onChange={setContent}
  minHeight="100px"
  maxHeight="300px"
/>`,
        },
        {
          title: "Full Toolbar",
          description: "Editor with complete formatting toolbar",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [FULL_TOOLBAR]
              </Label>
              <RichTextEditor
                value="<h2>Full Featured Editor</h2><p>All formatting options available.</p>"
                onChange={() => {}}
                toolbar="full"
              />
            </div>
          ),
          code: `<RichTextEditor
  value={content}
  onChange={setContent}
  toolbar="full"
/>`,
        },
        {
          title: "Terminal Style",
          description: "Editor with terminal-themed container",
          preview: (
            <RichTextEditor
              value="<p><strong>Terminal-styled</strong> rich text editor</p>"
              onChange={() => {}}
            />
          ),
          code: `<RichTextEditor
  value={content}
  onChange={setContent}
/>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          default: '""',
          description: "HTML content of the editor",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          default: "undefined",
          description: "Callback fired when content changes (receives HTML)",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Start typing..."',
          description: "Placeholder text when editor is empty",
        },
        {
          name: "readOnly",
          type: "boolean",
          default: "false",
          description: "Disable editing and hide toolbar",
        },
        {
          name: "minHeight",
          type: "string",
          default: '"200px"',
          description: "Minimum height of the editor area",
        },
        {
          name: "maxHeight",
          type: "string",
          default: '"600px"',
          description: "Maximum height before scrolling",
        },
        {
          name: "toolbar",
          type: '"full" | "minimal" | "custom"',
          default: '"full"',
          description: "Toolbar configuration preset",
        },
        {
          name: "customTools",
          type: "ToolbarButton[]",
          default: "undefined",
          description: "Custom toolbar buttons (requires toolbar='custom')",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container",
        },
      ]}
      accessibility={[
        "Uses contentEditable with role='textbox' and aria-multiline",
        "Toolbar buttons have aria-label for each formatting action",
        "Active formatting states reflected in button styling",
        "Keyboard shortcuts work for common formatting (Ctrl+B, etc.)",
        "Focus management ensures editor regains focus after toolbar use",
        "Link dialog uses proper Dialog component with ARIA attributes",
        "Read-only mode uses aria-readonly attribute",
      ]}
      previous={{ title: "Rating", href: "/docs/components/rating" }}
      next={{ title: "Select", href: "/docs/components/select" }}
    />
  );
}
