import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "File Uploads - Fabrk Docs",
  description: "Implement file uploads with drag-and-drop. Validation, progress indicators, and cloud storage integration.",
};

export default function FileUploadsTutorialPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x50] TUTORIALS ] FILE_UPLOADS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">FILE_UPLOADS</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">&gt; Implement secure file uploads with dropzone components, validation, and cloud storage integration.</p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="mb-2 font-mono text-base font-semibold">What's Included</h3>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ Drag-and-drop file upload components</div>
            <div>├─ Image upload with preview and cropping</div>
            <div>├─ File validation (size, type, count)</div>
            <div>├─ Progress indicators and error handling</div>
            <div>├─ Multiple file upload support</div>
            <div>└─ Cloud storage integration ready</div>
          </div>
        </CardContent>
      </Card>

      {/* Dependencies */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">DEPENDENCIES</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Install the required packages:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`npm install react-dropzone`} />
        </div>
      </div>

      {/* Upload API Route */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">UPLOAD_API_ROUTE</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Create an API route to handle file uploads with validation:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Client-Side Upload */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">CLIENT_SIDE_UPLOAD_HANDLER</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Handle the upload in your component with progress tracking:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`"use client";

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
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-none p-6 text-center cursor-pointer transition-colors hover:border-primary/50"
      >
        <input {...getInputProps()} />
        <p className="font-mono text-sm text-muted-foreground">
          {isDragActive ? "Drop files here..." : "Drag & drop files or click to browse"}
        </p>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-none overflow-hidden">
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
}`} />
        </div>
      </div>

      {/* Validation Options */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">VALIDATION_OPTIONS</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Common validation configurations for different use cases:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`// Profile Avatar
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
/>`} />
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/api-routes">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold">API Routes</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  Learn more about building API endpoints
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/protected-pages">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold">Protected Pages</h3>
                <p className="font-mono text-sm text-muted-foreground">
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
