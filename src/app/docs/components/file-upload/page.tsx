"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileUploadPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.30]"
      category="Components"
      title="File Upload"
      description="A drag-and-drop file upload component."
      importCode={`import { FileUpload } from "@/components/ui/file-upload"`}
      mainPreview={{
        preview: <FileUpload />,
        code: `<FileUpload />`,
      }}
      variants={[
        {
          title: "Default",
          description: "Standard file upload with drag and drop support.",
          preview: <FileUpload />,
          code: `<FileUpload />`,
        },
        {
          title: "Custom Height",
          description: "File upload with custom minimum height.",
          preview: <FileUpload className="min-h-64" />,
          code: `<FileUpload className="min-h-64" />`,
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
