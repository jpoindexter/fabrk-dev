"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle, Info } from "lucide-react";

export default function BadgePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.11]"
      title="Badge"
      description="A versatile inline label component for displaying status, categories, or metadata with multiple style variants and sizes."
      importCode={`import { Badge } from "@/components/ui/badge";`}
      mainPreview={{
        preview: (
          <Badge>Default Badge</Badge>
        ),
        code: `<Badge>Default Badge</Badge>`,
      }}
      variants={[
        {
          title: "Variants",
          description: "All available badge style variants",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          ),
          code: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="outline">Outline</Badge>`,
        },
        {
          title: "Sizes",
          description: "Small, medium, and large badge sizes",
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          ),
          code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
        },
        {
          title: "With Icons",
          description: "Badges with icons for additional context",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">
                <Check className="h-3 w-3" />
                Approved
              </Badge>
              <Badge variant="destructive">
                <X className="h-3 w-3" />
                Rejected
              </Badge>
              <Badge variant="accent">
                <AlertCircle className="h-3 w-3" />
                Warning
              </Badge>
              <Badge variant="secondary">
                <Info className="h-3 w-3" />
                Info
              </Badge>
            </div>
          ),
          code: `<Badge variant="default">
  <Check className="h-3 w-3" />
  Approved
</Badge>
<Badge variant="destructive">
  <X className="h-3 w-3" />
  Rejected
</Badge>`,
        },
        {
          title: "Status Indicators",
          description: "Use badges to show status or state",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Active</Badge>
              <Badge variant="secondary">Pending</Badge>
              <Badge variant="accent">In Progress</Badge>
              <Badge variant="destructive">Failed</Badge>
              <Badge variant="neutral">Draft</Badge>
              <Badge variant="outline">Archived</Badge>
            </div>
          ),
          code: `<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="accent">In Progress</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="neutral">Draft</Badge>
<Badge variant="outline">Archived</Badge>`,
        },
        {
          title: "Removable Badges",
          description: "Interactive badges with remove functionality",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                React
                <X className="h-3 w-3 ml-1" />
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                TypeScript
                <X className="h-3 w-3 ml-1" />
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                Tailwind
                <X className="h-3 w-3 ml-1" />
              </Badge>
            </div>
          ),
          code: `<Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
  React
  <X className="h-3 w-3 ml-1" />
</Badge>`,
        },
        {
          title: "Size Variants Combined",
          description: "Different sizes across all variants",
          preview: (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="default" size="sm">Small</Badge>
                <Badge variant="secondary" size="sm">Small</Badge>
                <Badge variant="accent" size="sm">Small</Badge>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="default" size="md">Medium</Badge>
                <Badge variant="secondary" size="md">Medium</Badge>
                <Badge variant="accent" size="md">Medium</Badge>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="default" size="lg">Large</Badge>
                <Badge variant="secondary" size="lg">Large</Badge>
                <Badge variant="accent" size="lg">Large</Badge>
              </div>
            </div>
          ),
          code: `<Badge variant="default" size="sm">Small</Badge>
<Badge variant="secondary" size="md">Medium</Badge>
<Badge variant="accent" size="lg">Large</Badge>`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "secondary" | "accent" | "destructive" | "neutral" | "outline"',
          default: '"default"',
          description: "Visual style variant of the badge",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Size of the badge",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Use Radix UI Slot to render as a different element",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply",
        },
      ]}
      accessibility={[
        "Badges use semantic span elements by default",
        "Use descriptive text content that clearly indicates the badge's purpose",
        "When badges are interactive, ensure they have proper hover states and cursor styling",
        "Icons inside badges should be decorative - the text should convey the full meaning",
        "Minimum py-1.5 (6px) vertical padding ensures touch-friendly spacing on mobile devices",
        "Use appropriate color variants to convey meaning (destructive for errors, accent for warnings)",
      ]}
      previous={{ title: "Card", href: "/docs/components/card" }}
      next={{ title: "Avatar", href: "/docs/components/avatar" }}
    />
  );
}
