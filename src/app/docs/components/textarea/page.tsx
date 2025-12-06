"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatLabel } from "@/design-system";

export default function TextareaPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.04]"
      category="Components"
      title="Textarea"
      description="A multi-line text input for longer content."
      importCode={`import { Textarea } from "@/components/ui/textarea"`}
      mainPreview={{
        preview: <Textarea placeholder="Type your message here..." />,
        code: `<Textarea placeholder="Type your message here..." />`,
      }}
      variants={[
        {
          title: "Default",
          description: "Standard multi-line text input.",
          preview: <Textarea placeholder="Write something..." />,
          code: `<Textarea placeholder="Write something..." />`,
        },
        {
          title: "With Label",
          description: "Textarea with an associated label.",
          preview: (
            <div className="grid gap-2">
              <Label htmlFor="message">{formatLabel("Message")}</Label>
              <Textarea id="message" placeholder="Type your message here" />
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="message">[MESSAGE]:</Label>
  <Textarea id="message" placeholder="Type your message here" />
</div>`,
        },
        {
          title: "Disabled",
          description: "Textarea in disabled state.",
          preview: <Textarea disabled placeholder="Disabled textarea" />,
          code: `<Textarea disabled placeholder="Disabled textarea" />`,
        },
        {
          title: "Error State",
          description: "Textarea showing an error.",
          preview: <Textarea error placeholder="Invalid content" />,
          code: `<Textarea error placeholder="Invalid content" />`,
        },
        {
          title: "With Default Value",
          description: "Textarea with pre-filled content.",
          preview: (
            <Textarea defaultValue="This is some default text that appears in the textarea when it first renders." />
          ),
          code: `<Textarea
  defaultValue="This is some default text that appears in the textarea when it first renders."
/>`,
        },
      ]}
      props={[
        {
          name: "error",
          type: "boolean",
          default: "false",
          description: "Show error styling with red border.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the textarea.",
        },
        {
          name: "rows",
          type: "number",
          description: "Number of visible text lines.",
        },
      ]}
      accessibility={[
        "Uses native <textarea> element for full keyboard support",
        "Supports aria-invalid for error states",
        "Focus visible styles for keyboard navigation",
      ]}
      previous={{ title: "Input Password", href: "/docs/components/input-password" }}
      next={{ title: "Select", href: "/docs/components/select" }}
    />
  );
}
