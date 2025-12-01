"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Separator } from "@/components/ui/separator";

export default function SeparatorPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.78]"
      category="Components"
      title="Separator"
      description="Visually or semantically separates content."
      importCode={`import { Separator } from "@/components/ui/separator"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-md space-y-4">
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">&gt;</span> Content above
            </div>
            <Separator />
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">&gt;</span> Content below
            </div>
          </div>
        ),
        code: `<div>
  <div>Content above</div>
  <Separator />
  <div>Content below</div>
</div>`,
      }}
      variants={[
        {
          title: "Horizontal (Default)",
          description: "Default horizontal separator line.",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="font-mono text-sm text-muted-foreground">Section 1</div>
              <Separator />
              <div className="font-mono text-sm text-muted-foreground">Section 2</div>
            </div>
          ),
          code: `<Separator />`,
        },
        {
          title: "Vertical",
          description: "Vertical separator for inline content.",
          preview: (
            <div className="flex h-12 items-center gap-4">
              <div className="font-mono text-sm text-muted-foreground">Left</div>
              <Separator orientation="vertical" />
              <div className="font-mono text-sm text-muted-foreground">Middle</div>
              <Separator orientation="vertical" />
              <div className="font-mono text-sm text-muted-foreground">Right</div>
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <div>Left</div>
  <Separator orientation="vertical" />
  <div>Right</div>
</div>`,
        },
        {
          title: "Decorative",
          description: "Visual separator without semantic meaning (default).",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="font-mono text-sm text-muted-foreground">Visual separation only</div>
              <Separator decorative />
              <div className="font-mono text-sm text-muted-foreground">Not announced by screen readers</div>
            </div>
          ),
          code: `<Separator decorative />`,
        },
        {
          title: "Semantic",
          description: "Separator with semantic role for screen readers.",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="font-mono text-sm text-muted-foreground">Section 1</div>
              <Separator decorative={false} />
              <div className="font-mono text-sm text-muted-foreground">Section 2 (announced by screen readers)</div>
            </div>
          ),
          code: `<Separator decorative={false} />`,
        },
        {
          title: "In List",
          description: "Separator between list items.",
          preview: (
            <div className="w-full max-w-md rounded-none border border-border bg-card">
              <div className="p-4 font-mono text-sm text-muted-foreground">
                <span className="text-primary">&gt;</span> Item 1
              </div>
              <Separator />
              <div className="p-4 font-mono text-sm text-muted-foreground">
                <span className="text-primary">&gt;</span> Item 2
              </div>
              <Separator />
              <div className="p-4 font-mono text-sm text-muted-foreground">
                <span className="text-primary">&gt;</span> Item 3
              </div>
            </div>
          ),
          code: `<div>
  <div>Item 1</div>
  <Separator />
  <div>Item 2</div>
  <Separator />
  <div>Item 3</div>
</div>`,
        },
        {
          title: "Custom Color",
          description: "Separator with custom styling.",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="font-mono text-sm text-muted-foreground">Above</div>
              <Separator className="bg-primary" />
              <div className="font-mono text-sm text-muted-foreground">Below</div>
            </div>
          ),
          code: `<Separator className="bg-primary" />`,
        },
        {
          title: "Thicker Line",
          description: "Separator with increased height.",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="font-mono text-sm text-muted-foreground">Above</div>
              <Separator className="h-[2px]" />
              <div className="font-mono text-sm text-muted-foreground">Below</div>
            </div>
          ),
          code: `<Separator className="h-[2px]" />`,
        },
        {
          title: "With Text",
          description: "Separator with centered text label.",
          preview: (
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center font-mono text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
            </div>
          ),
          code: `<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <Separator />
  </div>
  <div className="relative flex justify-center text-xs">
    <span className="bg-background px-2">Or</span>
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Direction of the separator.",
        },
        {
          name: "decorative",
          type: "boolean",
          default: "true",
          description: "If true, role is 'none'. If false, role is 'separator' with aria-orientation.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes for custom styling.",
        },
      ]}
      accessibility={[
        "Uses proper ARIA roles based on decorative prop",
        "Decorative separators have role='none' (not announced by screen readers)",
        "Semantic separators have role='separator' with aria-orientation",
        "Horizontal separators: h-[1px] w-full",
        "Vertical separators: h-full w-[1px]",
        "Background uses design token (bg-border) for theme support",
      ]}
      previous={{ title: "Select", href: "/docs/components/select" }}
      next={{ title: "Sheet", href: "/docs/components/sheet" }}
    />
  );
}
