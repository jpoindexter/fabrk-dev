/**
 * ✅ FABRK STORYBOOK
 * Image Uploader component stories with all variations
 */

import type { Meta, StoryObj } from "@storybook/react";
import { ImageUploader } from "./image-uploader";
import React from "react";

const meta: Meta<typeof ImageUploader> = {
  title: "UI/ImageUploader",
  component: ImageUploader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Image uploader with drag-and-drop, preview, and validation. Supports multiple files with size and type validation.",
      },
    },
  },
  argTypes: {
    maxFiles: {
      control: { type: "number", min: 1, max: 20 },
      description: "Maximum number of files allowed",
    },
    maxSize: {
      control: { type: "number" },
      description: "Maximum file size in bytes",
    },
    accept: {
      control: "text",
      description: "Comma-separated MIME types",
    },
    disabled: {
      control: "boolean",
      description: "Disable the uploader",
    },
    showPreview: {
      control: "boolean",
      description: "Show image previews",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

// Default story - single file
export const Default: Story = {
  args: {
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

// Multiple files
export const MultipleFiles: Story = {
  args: {
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

// Without preview
export const WithoutPreview: Story = {
  args: {
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    showPreview: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

// Large file limit
export const LargeFiles: Story = {
  args: {
    maxFiles: 3,
    maxSize: 10 * 1024 * 1024, // 10MB
    showPreview: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

// Small file limit
export const SmallFiles: Story = {
  args: {
    maxFiles: 5,
    maxSize: 1 * 1024 * 1024, // 1MB
    showPreview: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

// Specific file types (PNG only)
export const PNGOnly: Story = {
  args: {
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    accept: "image/png",
    showPreview: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

// Disabled state
export const Disabled: Story = {
  args: {
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

// With upload handler
export const WithUploadHandler: Story = {
  args: {
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
    onUpload: async (files) => {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Uploaded files:", files);
      alert(`Successfully uploaded ${files.length} file(s)!`);
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

// Grid layout (many files)
export const GridLayout: Story = {
  args: {
    maxFiles: 12,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[1000px]">
        <Story />
      </div>
    ),
  ],
};

// Controlled component example
export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-[800px] space-y-4">
        <ImageUploader
          value={files}
          onChange={setFiles}
          maxFiles={5}
          maxSize={5 * 1024 * 1024}
          showPreview
        />
        <div className="rounded-md border border-border bg-card p-4">
          <p className="mb-2 text-sm font-semibold">Current files:</p>
          {files.length === 0 ? (
            <p className="text-sm text-muted-foreground">No files selected</p>
          ) : (
            <ul className="space-y-1">
              {files.map((file, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
};

// With existing images (simulated)
export const WithExistingImages: Story = {
  render: () => {
    // Create mock File objects with data URLs
    const createMockImageFile = (name: string, size: number): File => {
      const blob = new Blob(["mock image data"], { type: "image/jpeg" });
      const file = new File([blob], name, { type: "image/jpeg" });
      Object.defineProperty(file, "size", { value: size });
      return file;
    };

    const initialFiles = [
      createMockImageFile("existing-image-1.jpg", 256000),
      createMockImageFile("existing-image-2.jpg", 384000),
    ];

    const [files, setFiles] = React.useState<File[]>(initialFiles);

    return (
      <div className="w-[800px]">
        <ImageUploader
          value={files}
          onChange={setFiles}
          maxFiles={5}
          maxSize={5 * 1024 * 1024}
          showPreview
        />
      </div>
    );
  },
};

// With upload progress simulation
export const WithProgress: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [uploading, setUploading] = React.useState(false);

    const handleUpload = async (uploadFiles: File[]) => {
      setUploading(true);
      // Simulate upload with progress
      for (let i = 0; i < 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      setUploading(false);
      alert(`Successfully uploaded ${uploadFiles.length} file(s)!`);
    };

    return (
      <div className="w-[800px]">
        <ImageUploader
          value={files}
          onChange={setFiles}
          maxFiles={5}
          maxSize={5 * 1024 * 1024}
          showPreview
          onUpload={handleUpload}
          disabled={uploading}
        />
      </div>
    );
  },
};

// Max files error state
export const MaxFilesError: Story = {
  render: () => {
    const createMockImageFile = (name: string): File => {
      const blob = new Blob(["mock"], { type: "image/jpeg" });
      return new File([blob], name, { type: "image/jpeg" });
    };

    const initialFiles = [
      createMockImageFile("image-1.jpg"),
      createMockImageFile("image-2.jpg"),
      createMockImageFile("image-3.jpg"),
    ];

    const [files, setFiles] = React.useState<File[]>(initialFiles);

    return (
      <div className="w-[800px] space-y-4">
        <div className="rounded-md border border-border bg-muted/20 p-4">
          <p className="text-sm font-semibold text-foreground">
            Instructions: Try to upload more than 3 files to see the error state
          </p>
        </div>
        <ImageUploader
          value={files}
          onChange={setFiles}
          maxFiles={3}
          maxSize={5 * 1024 * 1024}
          showPreview
        />
      </div>
    );
  },
};

// File type validation error
export const FileTypeError: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    return (
      <div className="w-[800px] space-y-4">
        <div className="rounded-md border border-border bg-muted/20 p-4">
          <p className="text-sm font-semibold text-foreground">
            Instructions: Try to upload a non-PNG file to see the validation error
          </p>
        </div>
        <ImageUploader
          value={files}
          onChange={setFiles}
          maxFiles={5}
          maxSize={5 * 1024 * 1024}
          accept="image/png"
          showPreview
        />
      </div>
    );
  },
};

// Compact single file
export const CompactSingle: Story = {
  args: {
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2MB
    showPreview: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

// With all features
export const Complete: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);

    const handleUpload = async (uploadFiles: File[]) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Uploaded:", uploadFiles);
      alert(`Uploaded ${uploadFiles.length} file(s) successfully!`);
      // Clear files after successful upload
      setFiles([]);
    };

    return (
      <div className="w-[900px] space-y-4">
        <div className="rounded-md border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Upload Product Images</h2>
          <ImageUploader
            value={files}
            onChange={setFiles}
            maxFiles={8}
            maxSize={5 * 1024 * 1024}
            showPreview
            onUpload={handleUpload}
          />
        </div>

        <div className="rounded-md border border-border bg-muted/20 p-4">
          <h3 className="mb-2 text-sm font-semibold">Debug Info:</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>Files selected: {files.length}</li>
            <li>Total size: {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB</li>
            <li>Remaining slots: {8 - files.length}</li>
          </ul>
        </div>
      </div>
    );
  },
};
