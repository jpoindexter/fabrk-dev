"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { ImageDropzone } from "@/components/ui/image-dropzone";

export default function ImageDropzonePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.31]"
      category="Components"
      title="Image Dropzone"
      description="A specialized dropzone for image uploads with preview and validation."
      importCode={`import { ImageDropzone } from "@/components/ui/image-dropzone"`}
      mainPreview={{
        preview: <ImageDropzone />,
        code: `<ImageDropzone />`,
      }}
      variants={[
        {
          title: "Single Image",
          description: "Upload a single image (default behavior).",
          preview: <ImageDropzone />,
          code: `<ImageDropzone />`,
        },
        {
          title: "Multiple Images",
          description: "Allow multiple image uploads.",
          preview: <ImageDropzone multiple maxFiles={5} />,
          code: `<ImageDropzone multiple maxFiles={5} />`,
        },
        {
          title: "Custom Max Size",
          description: "Limit file size to 2MB.",
          preview: <ImageDropzone maxSize={2 * 1024 * 1024} />,
          code: `<ImageDropzone maxSize={2 * 1024 * 1024} />`,
        },
        {
          title: "No Preview",
          description: "Disable image preview.",
          preview: <ImageDropzone preview={false} />,
          code: `<ImageDropzone preview={false} />`,
        },
        {
          title: "Disabled",
          description: "Disabled dropzone state.",
          preview: <ImageDropzone disabled />,
          code: `<ImageDropzone disabled />`,
        },
      ]}
      props={[
        {
          name: "onFilesChange",
          type: "(files: File[]) => void",
          description: "Callback when files are added or removed.",
        },
        {
          name: "onError",
          type: "(error: string) => void",
          description: "Callback when validation errors occur.",
        },
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          description: "Allow multiple file selection.",
        },
        {
          name: "maxFiles",
          type: "number",
          default: "1",
          description: "Maximum number of files allowed.",
        },
        {
          name: "maxSize",
          type: "number",
          default: "5242880",
          description: "Maximum file size in bytes (default 5MB).",
        },
        {
          name: "acceptedFormats",
          type: "string[]",
          default: '["image/jpeg", "image/png", "image/gif", "image/webp"]',
          description: "Accepted MIME types.",
        },
        {
          name: "preview",
          type: "boolean",
          default: "true",
          description: "Show image previews after upload.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the dropzone.",
        },
      ]}
      accessibility={[
        "Full keyboard navigation support with Enter and Space",
        "Descriptive aria-label on dropzone",
        "Remove buttons have aria-label with filename",
        "Tab index management for disabled state",
        "Visual feedback for drag-over state",
      ]}
      previous={{ title: "File Upload", href: "/docs/components/file-upload" }}
      next={{ title: "Copy Button", href: "/docs/components/copy-button" }}
    />
  );
}
