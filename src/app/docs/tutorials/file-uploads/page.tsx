import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Upload, Image, Shield, FileCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "File Uploads - Fabrk Docs",
  description: "Implement file uploads with drag-and-drop. Validation, progress indicators, and cloud storage integration.",
};

export default function FileUploadsTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Tutorials"
      title="File_Uploads"
      description="Implement secure file uploads with dropzone components, validation, and cloud storage integration."
      overview="Drag-and-drop file upload components with image preview, file validation (size, type, count), progress indicators, error handling, multiple file support, and cloud storage integration."
      features={[
        { icon: Upload, title: "Drag & Drop", description: "Dropzone components for easy uploads." },
        { icon: Image, title: "Image Preview", description: "Preview images before upload." },
        { icon: Shield, title: "Validation", description: "File size, type, and count limits." },
        { icon: FileCheck, title: "Progress", description: "Track upload progress in real-time." },
      ]}
      setup={[
        {
          title: "Install Dependencies",
          description: "Install the required packages",
          code: `npm install react-dropzone`,
          language: "bash",
        },
      ]}
      usage={[
        {
          title: "Upload API Route",
          description: "Create an API route to handle file uploads with validation",
          code: `// src/app/api/upload/route.ts

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

    return NextResponse.json({
      success: true,
      file: {
        name: filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}`,
          language: "typescript",
        },
        {
          title: "Client-Side Upload Handler",
          description: "Handle the upload in your component with progress tracking",
          code: `"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

export function FileUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setError(null);
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
  });

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
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 text-center cursor-pointer transition-colors hover:border-primary/50"
      >
        <input {...getInputProps()} />
        <p className="font-mono text-sm text-muted-foreground">
          {isDragActive ? "Drop files here..." : "Drag & drop files or click to browse"}
        </p>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="h-2 bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: \`\${progress}%\` }}
            />
          </div>
          <p className="font-mono text-sm text-muted-foreground text-center">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}

      {error && (
        <p className="font-mono text-xs text-destructive">{error}</p>
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
}`,
          language: "tsx",
        },
        {
          title: "Validation Options",
          description: "Common validation configurations for different use cases",
          code: `// Profile Avatar
<Dropzone
  maxFiles={1}
  maxSize={2 * 1024 * 1024}  // 2MB
  accept={{
    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  }}
/>

// Document Upload
<Dropzone
  maxFiles={10}
  maxSize={10 * 1024 * 1024}  // 10MB
  accept={{
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  }}
/>

// Image Gallery
<Dropzone
  maxFiles={20}
  maxSize={5 * 1024 * 1024}  // 5MB
  accept={{
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  }}
/>`,
          language: "tsx",
        },
      ]}
      previous={{ title: "API Routes", href: "/docs/tutorials/api-routes" }}
      next={{ title: "Protected Pages", href: "/docs/tutorials/protected-pages" }}
    >
      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/api-routes">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>API Routes</h3>
                <p className={docsTypography.body}>
                  Learn more about building API endpoints
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/protected-pages">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Protected Pages</h3>
                <p className={docsTypography.body}>
                  Protect upload routes with authentication
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
