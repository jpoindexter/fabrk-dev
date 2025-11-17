/**
 * ✅ FABRK COMPONENT
 * FileUpload Stories - Drag-and-drop file upload interface
 *
 * @see File upload component documentation
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Dropzone } from "@/components/ui/file-upload/dropzone";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { File, FileText, Image, Upload, X } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof FileUpload> = {
  title: "UI/Forms/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

/**
 * Default file upload
 */
export const Default: Story = {
  render: () => <FileUpload />,
};

/**
 * With file list display
 */
export const WithFileList: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = (newFiles: File[]) => {
      setFiles([...files, ...newFiles]);
    };

    const removeFile = (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
    };

    return (
      <div className="w-96 space-y-4">
        <Dropzone onDrop={handleDrop} className="min-h-32">
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop files here, or click to select
            </p>
          </div>
        </Dropzone>

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Files ({files.length})</p>
            <div className="space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(i)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Image upload only
 */
export const ImageUpload: Story = {
  render: () => {
    const [images, setImages] = useState<File[]>([]);

    const handleDrop = (newFiles: File[]) => {
      const imageFiles = newFiles.filter((file) => file.type.startsWith("image/"));
      setImages([...images, ...imageFiles]);
    };

    return (
      <div className="w-96 space-y-4">
        <Dropzone onDrop={handleDrop} accept="image/*" className="min-h-48">
          <div className="flex flex-col items-center justify-center gap-2">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="size-10 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm font-medium">Upload Images</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </Dropzone>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, i) => (
              <div key={i} className="relative aspect-square rounded-lg border">
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="size-full rounded-lg object-cover"
                />
                <button
                  className="absolute right-1 top-1 rounded-full bg-background/80 p-1 hover:bg-background"
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Document upload
 */
export const DocumentUpload: Story = {
  render: () => {
    const [docs, setDocs] = useState<File[]>([]);

    const handleDrop = (newFiles: File[]) => {
      setDocs([...docs, ...newFiles]);
    };

    const getFileIcon = (fileName: string) => {
      const ext = fileName.split(".").pop()?.toLowerCase();
      if (["pdf"].includes(ext || "")) return "📄";
      if (["doc", "docx"].includes(ext || "")) return "📝";
      if (["xls", "xlsx"].includes(ext || "")) return "📊";
      if (["zip", "rar"].includes(ext || "")) return "📦";
      return "📁";
    };

    return (
      <div className="w-96 space-y-4">
        <Dropzone onDrop={handleDrop} accept=".pdf,.doc,.docx,.xls,.xlsx" className="min-h-32">
          <div className="flex flex-col items-center justify-center gap-2">
            <FileText className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Upload Documents</p>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX, XLS, XLSX
            </p>
          </div>
        </Dropzone>

        {docs.length > 0 && (
          <div className="space-y-2">
            {docs.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                <span className="text-2xl">{getFileIcon(doc.name)}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDocs(docs.filter((_, idx) => idx !== i))}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Single file upload
 */
export const SingleFile: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    const handleDrop = (newFiles: File[]) => {
      if (newFiles.length > 0) {
        setFile(newFiles[0]);
      }
    };

    return (
      <div className="w-96 space-y-4">
        <Dropzone onDrop={handleDrop} multiple={false} className="min-h-32">
          <div className="flex flex-col items-center justify-center gap-2">
            <File className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Upload Single File</p>
            <p className="text-xs text-muted-foreground">
              Click or drag to upload one file
            </p>
          </div>
        </Dropzone>

        {file && (
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <File className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              <X className="size-4" />
            </Button>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Profile picture upload
 */
export const ProfilePicture: Story = {
  render: () => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const handleDrop = (newFiles: File[]) => {
      if (newFiles.length > 0 && newFiles[0].type.startsWith("image/")) {
        setAvatar(newFiles[0]);
        setPreview(URL.createObjectURL(newFiles[0]));
      }
    };

    return (
      <div className="flex flex-col items-center gap-4">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Profile preview"
              className="size-32 rounded-full object-cover"
            />
            <button
              className="absolute right-0 top-0 rounded-full bg-background p-1.5 shadow-lg"
              onClick={() => {
                setAvatar(null);
                setPreview("");
              }}
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <Dropzone
            onDrop={handleDrop}
            accept="image/*"
            multiple={false}
            className="flex size-32 items-center justify-center rounded-full border-2"
          >
            <div className="flex flex-col items-center gap-1">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="size-8 text-muted-foreground" aria-hidden="true" />
              <p className="text-xs text-muted-foreground">Upload</p>
            </div>
          </Dropzone>
        )}
        <div className="text-center">
          <p className="text-sm font-medium">Profile Picture</p>
          <p className="text-xs text-muted-foreground">
            Recommended: Square image, at least 400x400px
          </p>
        </div>
      </div>
    );
  },
};

/**
 * With upload progress
 */
export const WithProgress: Story = {
  render: () => {
    const [files, setFiles] = useState<Array<{ file: File; progress: number }>>([]);

    const handleDrop = (newFiles: File[]) => {
      const filesWithProgress = newFiles.map((file) => ({
        file,
        progress: 0,
      }));

      setFiles([...files, ...filesWithProgress]);

      // Simulate upload progress
      filesWithProgress.forEach((item, idx) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles((prev) =>
            prev.map((f, i) =>
              i === files.length + idx ? { ...f, progress } : f
            )
          );

          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 200);
      });
    };

    return (
      <div className="w-96 space-y-4">
        <Dropzone onDrop={handleDrop} className="min-h-32">
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Upload files to see progress
            </p>
          </div>
        </Dropzone>

        {files.length > 0 && (
          <div className="space-y-3">
            {files.map((item, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <File className="size-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{item.file.name}</p>
                  </div>
                  {item.progress === 100 && (
                    <Badge variant="outline" className="bg-success/10 text-success">
                      Complete
                    </Badge>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Compact upload
 */
export const Compact: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="w-80 space-y-3">
        <Dropzone onDrop={setFiles} className="min-h-20">
          <div className="flex items-center justify-center gap-2">
            <Upload className="size-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drop files or click to upload
            </p>
          </div>
        </Dropzone>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, i) => (
              <Badge key={i} variant="secondary" className="gap-1">
                {file.name}
                <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * With file type restrictions
 */
export const FileTypeRestrictions: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState("");

    const handleDrop = (newFiles: File[]) => {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const validFiles = newFiles.filter((file) => allowedTypes.includes(file.type));

      if (validFiles.length !== newFiles.length) {
        setError("Some files were rejected. Only PNG and JPG images are allowed.");
        setTimeout(() => setError(""), 3000);
      }

      if (validFiles.length > 0) {
        setFiles([...files, ...validFiles]);
      }
    };

    return (
      <div className="w-96 space-y-4">
        <Dropzone onDrop={handleDrop} accept="image/png,image/jpeg,image/jpg" className="min-h-32">
          <div className="flex flex-col items-center justify-center gap-2">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="size-8 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm font-medium">PNG or JPG only</p>
            <p className="text-xs text-muted-foreground">
              Maximum 5MB per file
            </p>
          </div>
        </Dropzone>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-2">
                <span className="text-sm">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};
