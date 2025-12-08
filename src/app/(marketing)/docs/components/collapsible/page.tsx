"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CollapsiblePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ComponentShowcaseTemplate
      code="[UI.72]"
      category="Components"
      title="Collapsible"
      description="An interactive component which expands/collapses a panel."
      importCode={`import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"`}
      mainPreview={{
        preview: (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-md">
            <div className="border-border bg-card border">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between font-mono">
                  <span className="text-sm">
                    <span className="text-primary">&gt;</span> Click to expand
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="border-border border-t p-4">
                <p>This content can be collapsed and expanded.</p>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ),
        code: `const [isOpen, setIsOpen] = useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">
      Toggle
      <ChevronDown className="h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Content goes here</p>
  </CollapsibleContent>
</Collapsible>`,
      }}
      variants={[
        {
          title: "Controlled",
          description: "Control the open/closed state with useState.",
          preview: (
            <Collapsible className="border-border bg-card w-full max-w-md border">
              <CollapsibleTrigger asChild>
                <button className="border-border hover:bg-muted w-full border-b px-4 py-2 text-left">
                  <span className="text-primary">&gt;</span> Controlled Collapsible
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                <p>State controlled via props</p>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: `const [isOpen, setIsOpen] = useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>`,
        },
        {
          title: "Uncontrolled",
          description: "Let the component manage its own state.",
          preview: (
            <Collapsible className="border-border bg-card w-full max-w-md border">
              <CollapsibleTrigger asChild>
                <button className="border-border hover:bg-muted w-full border-b px-4 py-2 text-left">
                  <span className="text-primary">&gt;</span> Uncontrolled Collapsible
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                <p>State managed internally</p>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: `<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>`,
        },
        {
          title: "With Default Open",
          description: "Start in the open state.",
          preview: (
            <Collapsible defaultOpen className="border-border bg-card w-full max-w-md border">
              <CollapsibleTrigger asChild>
                <button className="border-border hover:bg-muted w-full border-b px-4 py-2 text-left">
                  <span className="text-primary">&gt;</span> Initially Open
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                <p>This starts open by default</p>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: `<Collapsible defaultOpen>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>`,
        },
        {
          title: "Disabled",
          description: "Prevent interaction with the collapsible.",
          preview: (
            <Collapsible
              disabled
              className="border-border bg-card w-full max-w-md border opacity-50"
            >
              <CollapsibleTrigger asChild>
                <button className="border-border w-full border-b px-4 py-2 text-left">
                  <span className="text-muted-foreground">&gt;</span> Disabled
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                <p>Cannot be toggled</p>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: `<Collapsible disabled>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>`,
        },
      ]}
      props={[
        {
          name: "open",
          type: "boolean",
          default: "-",
          description: "Controlled open state.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Initial open state (uncontrolled).",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          default: "-",
          description: "Callback when open state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevent opening/closing.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Render trigger as child element.",
        },
      ]}
      accessibility={[
        "Uses Radix UI Collapsible primitive with full ARIA support",
        "Trigger has proper aria-expanded and aria-controls attributes",
        "Content region properly associated with trigger",
        "Keyboard accessible with Enter and Space keys",
        "Smooth animations with data-state attributes",
        "Supports disabled state with aria-disabled",
      ]}
      previous={{ title: "Checkbox", href: "/docs/components/checkbox" }}
      next={{ title: "Combobox", href: "/docs/components/combobox" }}
    />
  );
}
