import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Upload Components - Fabrk Docs",
  description: "File upload with drag-and-drop, image preview, cropping, and progress indicators. Cloud storage ready.",
};

export default function UploadsComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">File Uploads</h1>
        <p className="mt-2 text-muted-foreground">
          File upload components including drag-and-drop, image preview, and cropping.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">FileUpload</code> - Basic file upload with button</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">ImageDropzone</code> - Drag-and-drop image upload with preview</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">CropperControls</code> - Image cropping controls</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Avatar</code> - Avatar with upload capability</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Import Examples</h2>
        </div>
        <CodeBlock language="typescript" code={`// File upload component
import { FileUpload } from "@/components/ui/file-upload";

// Image dropzone with preview
import { ImageDropzone } from "@/components/ui/image-dropzone";

// Cropping controls
import { CropperControls } from "@/components/ui/cropper-controls";

// Avatar for profile images
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";`} />
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Usage Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic File Upload</h3>
          <CodeBlock language="tsx" code={`import { FileUpload } from "@/components/ui/file-upload";

export function DocumentUpload() {
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      console.log("Uploaded:", url);
    }
  };

  return (
    <FileUpload
      accept=".pdf,.doc,.docx"
      maxSize={10 * 1024 * 1024} // 10MB
      onUpload={handleUpload}
    />
  );
}`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Image Dropzone</h3>
          <CodeBlock language="tsx" code={`import { ImageDropzone } from "@/components/ui/image-dropzone";
import { useState } from "react";

export function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = (file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <ImageDropzone
        onDrop={handleDrop}
        accept="image/*"
        maxSize={5 * 1024 * 1024} // 5MB
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="max-w-xs rounded-lg"
        />
      )}
    </div>
  );
}

// ImageDropzone features:
// - Drag and drop support
// - Click to browse files
// - File type validation
// - Size limit enforcement
// - Visual feedback on drag`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Avatar Upload</h3>
          <CodeBlock language="tsx" code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useRef } from "react";

export function AvatarUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload file
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch("/api/upload/avatar", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { url } = await response.json();
      setAvatarUrl(url);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          variant="outline"
          className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
          onClick={() => inputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div>
        <p className="font-medium">Profile Photo</p>
        <p className="text-sm text-muted-foreground">
          Click the camera icon to upload
        </p>
      </div>
    </div>
  );
}`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Multiple File Upload</h3>
          <CodeBlock language="tsx" code={`import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";

export function MultipleFileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (file: File) => {
    setFiles((prev) => [...prev, file]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <FileUpload
        multiple
        onUpload={handleUpload}
        accept="image/*,.pdf"
      />

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-muted rounded"
            >
              <span className="text-sm truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Upload with Progress</h3>
          <CodeBlock language="tsx" code={`import { FileUpload } from "@/components/ui/file-upload";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export function UploadWithProgress() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    // Using XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      setUploading(false);
      if (xhr.status === 200) {
        console.log("Upload complete");
      }
    });

    xhr.open("POST", "/api/upload");
    xhr.send(formData);
  };

  return (
    <div className="space-y-4">
      <FileUpload onUpload={handleUpload} disabled={uploading} />
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
}`} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">API Route for Upload</h3>
          <CodeBlock language="typescript" code={`// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to public/uploads directory
  const filename = \`\${Date.now()}-\${file.name}\`;
  const path = join(process.cwd(), "public/uploads", filename);
  await writeFile(path, buffer);

  return NextResponse.json({
    url: \`/uploads/\${filename}\`,
    name: file.name,
    size: file.size,
  });
}`} />
        </div>
      </div>
    </div>
  );
}
