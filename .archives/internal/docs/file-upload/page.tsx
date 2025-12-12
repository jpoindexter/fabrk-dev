"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Upload } from "lucide-react";

// Terminal-styled file upload demo for docs
function FileUploadDemo() {
  return (
    <div className="w-full max-w-md">
      <div
        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border bg-card p-6 text-center transition-colors hover:border-primary/50 cursor-pointer"
      >
        <Upload className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <p className="font-mono text-xs text-muted-foreground">
          &gt; DRAG_AND_DROP files here, or click to select
        </p>
      </div>
    </div>
  );
}

// Compact variant
function FileUploadCompactDemo() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="flex items-center justify-center gap-2 border border-dashed border-border bg-card p-4 text-center transition-colors hover:border-primary/50 cursor-pointer"
      >
        <Upload className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <span className="font-mono text-xs text-muted-foreground">
          &gt; SELECT_FILE
        </span>
      </div>
    </div>
  );
}

export default function FileUploadPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.30]"
      category="Components"
      title="File Upload"
      description="A drag-and-drop file upload component."
      importCode={`import { FileUpload } from "@/components/ui/file-upload"`}
      mainPreview={{
        preview: <FileUploadDemo />,
        code: `<FileUpload />`,
      }}
      variants={[
        {
          title: "Default",
          description: "Standard file upload with drag and drop support.",
          preview: <FileUploadDemo />,
          code: `<FileUpload />`,
        },
        {
          title: "Compact",
          description: "Smaller file upload for inline use.",
          preview: <FileUploadCompactDemo />,
          code: `<FileUpload className="p-4" />`,
        },
      ]}
      props={[
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply to the component.",
        },
      ]}
      accessibility={[
        "Uses aria-label on the dropzone for screen readers",
        "Keyboard accessible via click handler",
        "Visual feedback on drag over state",
        "Upload icon is decorative (aria-hidden)",
      ]}
      previous={{ title: "Loading", href: "/docs/components/loading" }}
      next={{ title: "Image Dropzone", href: "/docs/components/image-dropzone" }}
    />
  );
}
