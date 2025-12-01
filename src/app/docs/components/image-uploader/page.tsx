"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { ImageUploader } from "@/components/ui/image-uploader";
import { useState } from "react";

export default function ImageUploaderPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [singleFile, setSingleFile] = useState<File[]>([]);

  const handleUpload = async (filesToUpload: File[]) => {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Uploaded files:", filesToUpload);
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.87]"
      category="Components"
      title="Image Uploader"
      description="Drag-and-drop image uploader with preview, validation, and progress tracking."
      importCode={`import { ImageUploader } from "@/components/ui/image-uploader"`}
      mainPreview={{
        preview: (
          <div className="max-w-2xl rounded-none border border-border bg-card p-4 font-mono">
            <ImageUploader
              value={files}
              onChange={setFiles}
              maxFiles={5}
              maxSize={5 * 1024 * 1024}
              showPreview
            />
          </div>
        ),
        code: `const [files, setFiles] = useState<File[]>([]);

<ImageUploader
  value={files}
  onChange={setFiles}
  maxFiles={5}
  maxSize={5 * 1024 * 1024}
  showPreview
/>`,
      }}
      variants={[
        {
          title: "Single Image Upload",
          description: "Upload a single image with preview.",
          preview: (
            <div className="max-w-2xl rounded-none border border-border bg-card p-4 font-mono">
              <ImageUploader
                value={singleFile}
                onChange={setSingleFile}
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
                showPreview
              />
            </div>
          ),
          code: `<ImageUploader
  value={singleFile}
  onChange={setSingleFile}
  maxFiles={1}
  maxSize={5 * 1024 * 1024}
  showPreview
/>`,
        },
        {
          title: "Multiple Images",
          description: "Upload up to 10 images with grid preview.",
          preview: (
            <div className="max-w-2xl rounded-none border border-border bg-card p-4 font-mono">
              <ImageUploader
                value={[]}
                onChange={() => {}}
                maxFiles={10}
                maxSize={10 * 1024 * 1024}
                showPreview
              />
            </div>
          ),
          code: `<ImageUploader
  value={files}
  onChange={setFiles}
  maxFiles={10}
  maxSize={10 * 1024 * 1024}
  showPreview
/>`,
        },
        {
          title: "With Upload Handler",
          description: "Image uploader with server upload functionality.",
          preview: (
            <div className="max-w-2xl rounded-none border border-border bg-card p-4 font-mono">
              <ImageUploader
                value={[]}
                onChange={() => {}}
                onUpload={handleUpload}
                maxFiles={3}
                showPreview
              />
            </div>
          ),
          code: `const handleUpload = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  await fetch('/api/upload', { method: 'POST', body: formData });
};

<ImageUploader
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={3}
  showPreview
/>`,
        },
        {
          title: "Custom File Types",
          description: "Accept specific image formats.",
          preview: (
            <div className="max-w-2xl rounded-none border border-border bg-card p-4 font-mono">
              <ImageUploader
                value={[]}
                onChange={() => {}}
                accept="image/png,image/webp"
                maxFiles={5}
                showPreview
              />
            </div>
          ),
          code: `<ImageUploader
  value={files}
  onChange={setFiles}
  accept="image/png,image/webp"
  maxFiles={5}
  showPreview
/>`,
        },
        {
          title: "Without Preview",
          description: "Upload images without showing preview grid.",
          preview: (
            <div className="max-w-2xl rounded-none border border-border bg-card p-4 font-mono">
              <ImageUploader
                value={[]}
                onChange={() => {}}
                maxFiles={5}
                showPreview={false}
              />
            </div>
          ),
          code: `<ImageUploader
  value={files}
  onChange={setFiles}
  maxFiles={5}
  showPreview={false}
/>`,
        },
        {
          title: "Disabled State",
          description: "Uploader in disabled state.",
          preview: (
            <div className="max-w-2xl rounded-none border border-border bg-card p-4 font-mono">
              <ImageUploader
                value={[]}
                onChange={() => {}}
                disabled
                showPreview
              />
            </div>
          ),
          code: `<ImageUploader
  value={files}
  onChange={setFiles}
  disabled
  showPreview
/>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "File[]",
          default: "[]",
          description: "Array of selected files.",
        },
        {
          name: "onChange",
          type: "(files: File[]) => void",
          description: "Callback fired when files are selected or removed.",
        },
        {
          name: "maxFiles",
          type: "number",
          default: "5",
          description: "Maximum number of files allowed.",
        },
        {
          name: "maxSize",
          type: "number",
          default: "5242880",
          description: "Maximum file size in bytes (default 5MB).",
        },
        {
          name: "accept",
          type: "string",
          default: '"image/jpeg,image/png,image/gif,image/webp"',
          description: "Accepted file MIME types.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the uploader.",
        },
        {
          name: "showPreview",
          type: "boolean",
          default: "true",
          description: "Show preview grid of selected images.",
        },
        {
          name: "onUpload",
          type: "(files: File[]) => Promise<void>",
          description: "Optional async upload handler.",
        },
        {
          name: "multiple",
          type: "boolean",
          description: "Allow multiple file selection (auto-set based on maxFiles).",
        },
        {
          name: "uploading",
          type: "boolean",
          description: "External uploading state.",
        },
        {
          name: "progress",
          type: "number",
          description: "Upload progress percentage (0-100).",
        },
        {
          name: "error",
          type: "string",
          description: "Error message to display.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      accessibility={[
        "Drag-and-drop zone is keyboard accessible",
        "File input supports native keyboard interaction",
        "ARIA labels describe the upload functionality",
        "Remove buttons have descriptive labels for each file",
        "Error messages are associated with the input",
        "Focus visible styles for all interactive elements",
        "Preview images have alt text from file names",
      ]}
      previous={{ title: "Input Search", href: "/docs/components/input-search" }}
      next={{ title: "KPI Card", href: "/docs/components/kpi-card" }}
    />
  );
}
