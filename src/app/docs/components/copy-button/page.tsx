"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { CopyButton } from "@/components/ui/copy-button";

export default function CopyButtonPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.32]"
      category="Components"
      title="Copy Button"
      description="A button that copies text to the clipboard with visual feedback."
      importCode={`import { CopyButton } from "@/components/ui/copy-button"`}
      mainPreview={{
        preview: (
          <div className="flex items-center gap-2">
            <code className="bg-muted px-2 py-1 rounded text-sm">npm install fabrk</code>
            <CopyButton value="npm install fabrk" />
          </div>
        ),
        code: `<div className="flex items-center gap-2">
  <code className="bg-muted px-2 py-1 rounded text-sm">npm install fabrk</code>
  <CopyButton value="npm install fabrk" />
</div>`,
      }}
      variants={[
        {
          title: "Default",
          description: "Small ghost button variant.",
          preview: <CopyButton value="Hello, World!" />,
          code: `<CopyButton value="Hello, World!" />`,
        },
        {
          title: "Outline Variant",
          description: "Copy button with outline styling.",
          preview: <CopyButton value="Copy me" variant="outline" />,
          code: `<CopyButton value="Copy me" variant="outline" />`,
        },
        {
          title: "Secondary Variant",
          description: "Copy button with secondary styling.",
          preview: <CopyButton value="Copy me" variant="secondary" />,
          code: `<CopyButton value="Copy me" variant="secondary" />`,
        },
        {
          title: "With Code Block",
          description: "Common pattern with inline code.",
          preview: (
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
              <code className="text-sm font-mono flex-1">const x = 42;</code>
              <CopyButton value="const x = 42;" />
            </div>
          ),
          code: `<div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
  <code className="text-sm font-mono flex-1">const x = 42;</code>
  <CopyButton value="const x = 42;" />
</div>`,
        },
        {
          title: "Copy URL",
          description: "Copy a URL to share.",
          preview: (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground truncate max-w-48">
                https://fabrk.dev/docs/components
              </span>
              <CopyButton value="https://fabrk.dev/docs/components" />
            </div>
          ),
          code: `<div className="flex items-center gap-2">
  <span className="text-sm text-muted-foreground">
    https://fabrk.dev/docs/components
  </span>
  <CopyButton value="https://fabrk.dev/docs/components" />
</div>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          required: true,
          description: "The text to copy to clipboard.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg" | "icon"',
          default: '"sm"',
          description: "Button size.",
        },
        {
          name: "variant",
          type: '"default" | "ghost" | "outline" | "secondary"',
          default: '"ghost"',
          description: "Button variant.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      accessibility={[
        "Dynamic aria-label updates to 'Copied' after clicking",
        "Uses native clipboard API for reliable copying",
        "Visual checkmark feedback indicates success",
        "Built on accessible Button component",
      ]}
      previous={{ title: "Image Dropzone", href: "/docs/components/image-dropzone" }}
      next={{ title: "Overview", href: "/docs/components/overview" }}
    />
  );
}
