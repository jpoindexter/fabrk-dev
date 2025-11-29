import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Upload, Image, Crop, User } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Upload Components - Fabrk Docs",
  description: "File upload with drag-and-drop, image preview, cropping, and progress indicators. Cloud storage ready.",
};

export default function UploadsComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="File_Uploads"
      description="File upload components including drag-and-drop, image preview, and cropping."
      overview="4 upload components including basic file upload, image dropzone with preview, cropping controls, and avatar upload."
      features={[
        { icon: Upload, title: "FileUpload", description: "Basic file upload with button." },
        { icon: Image, title: "ImageDropzone", description: "Drag-and-drop with preview." },
        { icon: Crop, title: "Cropper", description: "Image cropping controls." },
        { icon: User, title: "Avatar", description: "Avatar with upload capability." },
      ]}
      usage={[
        {
          title: "Basic File Upload",
          description: "Simple file upload with validation",
          code: `import { FileUpload } from "@/components/ui/file-upload";

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
}`,
          language: "tsx",
        },
        {
          title: "Image Dropzone",
          description: "Drag-and-drop with image preview",
          code: `import { ImageDropzone } from "@/components/ui/image-dropzone";
import { useState } from "react";

export function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = (file: File) => {
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
        <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
      )}
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Avatar Upload",
          description: "Profile avatar with upload button",
          code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

export function AvatarUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Upload with Progress",
          description: "Show upload progress indicator",
          code: `import { FileUpload } from "@/components/ui/file-upload";
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

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      setUploading(false);
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
          <p className="text-sm text-center">Uploading... {progress}%</p>
        </div>
      )}
    </div>
  );
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Modals", href: "/docs/components/modals" }}
      next={{ title: "Navigation", href: "/docs/components/navigation" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">FileUpload</code> - Basic file upload with button</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">ImageDropzone</code> - Drag-and-drop image upload with preview</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">CropperControls</code> - Image cropping controls</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">Avatar</code> - Avatar with upload capability</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/navigation">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Navigation</h3>
                <p className={docsTypography.body}>Build site navigation</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/file-uploads">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>File Uploads Tutorial</h3>
                <p className={docsTypography.body}>Complete upload guide</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
