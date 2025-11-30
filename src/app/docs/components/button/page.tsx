"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, ArrowRight, Download, Trash2 } from "lucide-react";

export default function ButtonPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.01]"
      category="Components"
      title="Button"
      description="Displays a button or a component that looks like a button."
      importCode={`import { Button } from "@/components/ui/button"`}
      mainPreview={{
        preview: <Button>Click me</Button>,
        code: `<Button>Click me</Button>`,
      }}
      variants={[
        {
          title: "Default",
          description: "The default button style with primary colors.",
          preview: <Button variant="default">Default</Button>,
          code: `<Button variant="default">Default</Button>`,
        },
        {
          title: "Secondary",
          description: "A secondary button for less prominent actions.",
          preview: <Button variant="secondary">Secondary</Button>,
          code: `<Button variant="secondary">Secondary</Button>`,
        },
        {
          title: "Outline",
          description: "A button with an outline border.",
          preview: <Button variant="outline">Outline</Button>,
          code: `<Button variant="outline">Outline</Button>`,
        },
        {
          title: "Ghost",
          description: "A transparent button that appears on hover.",
          preview: <Button variant="ghost">Ghost</Button>,
          code: `<Button variant="ghost">Ghost</Button>`,
        },
        {
          title: "Link",
          description: "A button that looks like a text link.",
          preview: <Button variant="link">Link</Button>,
          code: `<Button variant="link">Link</Button>`,
        },
        {
          title: "Destructive",
          description: "A button for destructive actions like delete.",
          preview: <Button variant="destructive">Delete</Button>,
          code: `<Button variant="destructive">Delete</Button>`,
        },
        {
          title: "With Icon",
          description: "Button with an icon for enhanced context.",
          preview: (
            <Button>
              <Mail className="mr-2 h-4 w-4" /> Login with Email
            </Button>
          ),
          code: `<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>`,
        },
        {
          title: "Icon Only",
          description: "A compact button containing only an icon.",
          preview: (
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          ),
          code: `<Button variant="outline" size="icon">
  <Download className="h-4 w-4" />
</Button>`,
        },
        {
          title: "Loading",
          description: "Button in loading state with spinner and text.",
          preview: <Button loading>Loading...</Button>,
          code: `<Button loading>Loading...</Button>`,
        },
        {
          title: "Disabled",
          description: "A disabled button that cannot be clicked.",
          preview: <Button disabled>Disabled</Button>,
          code: `<Button disabled>Disabled</Button>`,
        },
        {
          title: "Small",
          description: "A smaller button for compact UI areas.",
          preview: <Button size="sm">Small</Button>,
          code: `<Button size="sm">Small</Button>`,
        },
        {
          title: "Large",
          description: "A larger button for prominent actions.",
          preview: <Button size="lg">Large</Button>,
          code: `<Button size="lg">Large</Button>`,
        },
        {
          title: "Extra Large",
          description: "An extra large button for CTAs.",
          preview: <Button size="xl">Extra Large</Button>,
          code: `<Button size="xl">Extra Large</Button>`,
        },
        {
          title: "Primary CTA",
          description: "High-emphasis call-to-action button.",
          preview: (
            <Button variant="primaryCta">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ),
          code: `<Button variant="primaryCta">
  Get Started <ArrowRight className="ml-2 h-4 w-4" />
</Button>`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "primaryCta" | "secondaryCta" | "ghostOnDark"',
          default: '"default"',
          description: "The visual style of the button.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg" | "xl" | "icon"',
          default: '"default"',
          description: "The size of the button.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Render as the child element instead of a button.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Show loading spinner and disable button.",
        },
        {
          name: "loadingText",
          type: "string",
          default: '"Loading..."',
          description: "Text to display when loading.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the button.",
        },
      ]}
      accessibility={[
        "Uses native <button> element for full keyboard support",
        "Supports disabled state with proper aria-disabled",
        "Loading state uses aria-busy for screen readers",
        "Focus visible styles for keyboard navigation",
        "Slot pattern allows custom elements while maintaining accessibility",
      ]}
      previous={{ title: "Overview", href: "/docs/components/overview" }}
      next={{ title: "Input", href: "/docs/components/input" }}
    />
  );
}
