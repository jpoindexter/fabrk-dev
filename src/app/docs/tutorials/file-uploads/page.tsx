import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "File Uploads - Fabrk Docs",
  description: "Implement file uploads with drag-and-drop. Validation, progress indicators, and cloud storage integration.",
};

export default function FileUploadsTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">File Uploads</h1>
        <p className="text-lg text-muted-foreground">
          Implement secure file uploads with dropzone components, validation, and cloud storage integration.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">What's Included</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Drag-and-drop file upload components</li>
            <li>Image upload with preview and cropping</li>
            <li>File validation (size, type, count)</li>
            <li>Progress indicators and error handling</li>
            <li>Multiple file upload support</li>
            <li>Cloud storage integration ready</li>
          </ul>
        </CardContent>
      </Card>

      {/* Basic Dropzone */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Dropzone Component</h2>
        <div>
          <p className="text-muted-foreground">
            Create a reusable dropzone component with drag-and-drop support:
          </p>
        </div>
        <CodeBlock language="tsx" code={`// src/components/ui/dropzone.tsx

"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFilesAccepted: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;  // in bytes
  acceptedTypes?: Record<string, string[]>;
  disabled?: boolean;
  className?: string;
}

export function Dropzone({
  onFilesAccepted,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024,  // 5MB default
  acceptedTypes = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
  disabled = false,
  className,
}: DropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(\`File too large. Max size: \${maxSize / 1024 / 1024}MB\`);
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Invalid file type");
        } else {
          setError(rejection.errors[0]?.message || "Upload failed");
        }
        return;
      }

      setFiles(acceptedFiles);
      onFilesAccepted(acceptedFiles);
    },
    [maxSize, onFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedTypes,
    disabled,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesAccepted(newFiles);
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-primary">Drop files here...</p>
        ) : (
          <div>
            <p className="text-foreground font-medium">
              Drag & drop files here
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Max {maxSize / 1024 / 1024}MB per file
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-2">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate max-w-[200px]">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`} />
      </div>

      {/* Image Uploader */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Image Uploader with Preview</h2>
        <div>
          <p className="text-muted-foreground">
            Specialized image upload component with instant preview:
          </p>
        </div>
        <CodeBlock language="tsx" code={`// src/components/ui/image-uploader.tsx

"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  currentImage?: string;
  maxSize?: number;
  aspectRatio?: "square" | "video" | "banner";
  className?: string;
}

export function ImageUploader({
  onImageChange,
  currentImage,
  maxSize = 2 * 1024 * 1024,  // 2MB
  aspectRatio = "square",
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(
    currentImage || null
  );
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onImageChange(file);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    onDropRejected: (rejections) => {
      const rejection = rejections[0];
      if (rejection.errors[0]?.code === "file-too-large") {
        setError(\`Max size: \${maxSize / 1024 / 1024}MB\`);
      } else {
        setError("Invalid image file");
      }
    },
  });

  const removeImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    banner: "aspect-[3/1]",
  };

  return (
    <div className={className}>
      {preview ? (
        <div className={cn("relative rounded-lg overflow-hidden", aspectClasses[aspectRatio])}>
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors",
            aspectClasses[aspectRatio],
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="text-center p-4">
            <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {isDragActive ? "Drop image here" : "Click or drag image"}
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
}`} />
      </div>

      {/* Upload API Route */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Upload API Route</h2>
        <div>
          <p className="text-muted-foreground">
            Create an API route to handle file uploads with validation:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Allowed MIME types
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];

// Max file size (5MB)
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, PDF" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Convert to buffer for processing
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = \`\${session.user.id}-\${timestamp}.\${extension}\`;

    // TODO: Upload to cloud storage (S3, Cloudflare R2, etc.)
    // Example with S3:
    // await s3.upload({
    //   Bucket: process.env.AWS_BUCKET,
    //   Key: \`uploads/\${filename}\`,
    //   Body: buffer,
    //   ContentType: file.type,
    // });

    // For now, return success with file info
    return NextResponse.json({
      success: true,
      file: {
        name: filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        // url: \`https://cdn.example.com/uploads/\${filename}\`,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

// Configure for larger uploads
export const config = {
  api: {
    bodyParser: false,
  },
};`} />
      </div>

      {/* Client-Side Upload */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Client-Side Upload Handler</h2>
        <div>
          <p className="text-muted-foreground">
            Handle the upload in your component with progress tracking:
          </p>
        </div>
        <CodeBlock language="tsx" code={`"use client";

import { useState } from "react";
import { Dropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";

export function FileUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await response.json();
        setResult(data);
        setProgress(((i + 1) / files.length) * 100);
      }

      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Dropzone
        onFilesAccepted={setFiles}
        maxFiles={5}
        maxSize={5 * 1024 * 1024}
        acceptedTypes={{
          "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
          "application/pdf": [".pdf"],
        }}
        disabled={uploading}
      />

      {uploading && (
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: \`\${progress}%\` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {result && (
        <p className="text-sm text-success">
          Uploaded: {result.file.originalName}
        </p>
      )}

      <Button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="w-full"
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>
    </div>
  );
}`} />
      </div>

      {/* Validation Options */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Validation Options</h2>
        <div>
          <p className="text-muted-foreground">
            Common validation configurations for different use cases:
          </p>
        </div>
        <CodeBlock language="tsx" code={`// Profile Avatar
<ImageUploader
  maxSize={2 * 1024 * 1024}  // 2MB
  aspectRatio="square"
  onImageChange={handleAvatarChange}
/>

// Document Upload
<Dropzone
  maxFiles={10}
  maxSize={10 * 1024 * 1024}  // 10MB
  acceptedTypes={{
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  }}
  onFilesAccepted={handleDocuments}
/>

// Image Gallery
<Dropzone
  maxFiles={20}
  maxSize={5 * 1024 * 1024}  // 5MB
  acceptedTypes={{
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  }}
  onFilesAccepted={handleGalleryImages}
/>

// Video Upload
<Dropzone
  maxFiles={1}
  maxSize={100 * 1024 * 1024}  // 100MB
  acceptedTypes={{
    "video/*": [".mp4", ".webm", ".mov"],
  }}
  onFilesAccepted={handleVideo}
/>`} />
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dependencies</h2>
        <div>
          <p className="text-muted-foreground">
            Install the required packages:
          </p>
        </div>
        <CodeBlock language="bash" code={`npm install react-dropzone`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/api-routes">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">API Routes</h3>
                <p className="text-sm text-muted-foreground">
                  Learn more about building API endpoints
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/protected-pages">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Protected Pages</h3>
                <p className="text-sm text-muted-foreground">
                  Protect upload routes with authentication
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
