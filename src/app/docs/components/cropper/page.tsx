"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Cropper } from "@/components/ui/cropper";
import { useState } from "react";

export default function CropperPage() {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const sampleImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop";

  const handleCrop = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setCroppedImage(url);
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.38]"
      category="Media"
      title="Cropper"
      description="An interactive image cropping component with zoom, rotation, and aspect ratio controls."
      importCode={`import { Cropper } from "@/components/ui/cropper"`}
      mainPreview={{
        preview: (
          <div className="space-y-4">
            <Cropper
              image={sampleImage}
              onCrop={handleCrop}
            />
            {croppedImage && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Cropped Result:</p>
                <img
                  src={croppedImage}
                  alt="Cropped result"
                  className="max-w-xs rounded-lg border"
                />
              </div>
            )}
          </div>
        ),
        code: `const [croppedImage, setCroppedImage] = useState<string | null>(null);

const handleCrop = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  setCroppedImage(url);
};

<Cropper
  image="https://example.com/image.jpg"
  onCrop={handleCrop}
/>`,
      }}
      variants={[
        {
          title: "Square Crop (1:1)",
          description: "Cropper with 1:1 aspect ratio for square images.",
          preview: (
            <Cropper
              image={sampleImage}
              aspectRatio={1}
              onCrop={handleCrop}
            />
          ),
          code: `<Cropper
  image={sampleImage}
  aspectRatio={1}
  onCrop={handleCrop}
/>`,
        },
        {
          title: "Portrait (3:4)",
          description: "Cropper with 3:4 aspect ratio for portrait images.",
          preview: (
            <Cropper
              image={sampleImage}
              aspectRatio={3 / 4}
              onCrop={handleCrop}
            />
          ),
          code: `<Cropper
  image={sampleImage}
  aspectRatio={3 / 4}
  onCrop={handleCrop}
/>`,
        },
        {
          title: "Landscape (16:9)",
          description: "Cropper with 16:9 aspect ratio for landscape images.",
          preview: (
            <Cropper
              image={sampleImage}
              aspectRatio={16 / 9}
              onCrop={handleCrop}
            />
          ),
          code: `<Cropper
  image={sampleImage}
  aspectRatio={16 / 9}
  onCrop={handleCrop}
/>`,
        },
        {
          title: "Round Crop",
          description: "Cropper with circular crop shape for profile pictures.",
          preview: (
            <Cropper
              image={sampleImage}
              cropShape="round"
              aspectRatio={1}
              onCrop={handleCrop}
            />
          ),
          code: `<Cropper
  image={sampleImage}
  cropShape="round"
  aspectRatio={1}
  onCrop={handleCrop}
/>`,
        },
        {
          title: "Custom Zoom Range",
          description: "Cropper with custom minimum and maximum zoom levels.",
          preview: (
            <Cropper
              image={sampleImage}
              minZoom={0.5}
              maxZoom={5}
              onCrop={handleCrop}
            />
          ),
          code: `<Cropper
  image={sampleImage}
  minZoom={0.5}
  maxZoom={5}
  onCrop={handleCrop}
/>`,
        },
        {
          title: "Without Grid",
          description: "Cropper without the rule-of-thirds grid overlay.",
          preview: (
            <Cropper
              image={sampleImage}
              showGrid={false}
              onCrop={handleCrop}
            />
          ),
          code: `<Cropper
  image={sampleImage}
  showGrid={false}
  onCrop={handleCrop}
/>`,
        },
      ]}
      props={[
        {
          name: "image",
          type: "string | File",
          description: "The image to crop - can be a URL or File object.",
          required: true,
        },
        {
          name: "onCrop",
          type: "(croppedImage: Blob) => void",
          description: "Callback fired when crop is confirmed.",
        },
        {
          name: "aspectRatio",
          type: "number",
          description: "Aspect ratio for the crop area (e.g., 16/9, 1, 4/3).",
        },
        {
          name: "minZoom",
          type: "number",
          default: "1",
          description: "Minimum zoom level.",
        },
        {
          name: "maxZoom",
          type: "number",
          default: "3",
          description: "Maximum zoom level.",
        },
        {
          name: "cropShape",
          type: '"rect" | "round"',
          default: '"rect"',
          description: "Shape of the crop area.",
        },
        {
          name: "showGrid",
          type: "boolean",
          default: "true",
          description: "Whether to show the rule-of-thirds grid.",
        },
        {
          name: "aria-label",
          type: "string",
          default: '"Image cropper"',
          description: "Accessible label for the cropper region.",
        },
      ]}
      usageExamples={[
        {
          title: "With File Upload",
          description: "Combine cropper with file upload for image editing.",
          code: `import { Cropper } from "@/components/ui/cropper";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ImageUploadWithCrop() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCrop = async (blob: Blob) => {
    setCroppedBlob(blob);
    // Upload cropped image
    const formData = new FormData();
    formData.append("image", blob, "cropped.jpg");
    await fetch("/api/upload", { method: "POST", body: formData });
  };

  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && (
        <Cropper
          image={selectedFile}
          onCrop={handleCrop}
          aspectRatio={1}
          cropShape="round"
        />
      )}
    </div>
  );
}`,
        },
        {
          title: "Profile Picture Cropper",
          description: "Common use case for circular profile picture cropping.",
          code: `export function ProfilePictureCropper({ onSave }: { onSave: (blob: Blob) => void }) {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      {image && (
        <Cropper
          image={image}
          aspectRatio={1}
          cropShape="round"
          onCrop={onSave}
          aria-label="Profile picture cropper"
        />
      )}
    </div>
  );
}`,
        },
      ]}
      accessibility={[
        "Keyboard navigation for all controls",
        "Zoom and rotation sliders are keyboard accessible",
        "Drag functionality works with keyboard arrow keys",
        "Descriptive ARIA labels for all interactive elements",
        "Focus visible styles for all focusable elements",
        "Screen reader announcements for zoom and rotation changes",
      ]}
      previous={{ title: "Toast", href: "/docs/components/toast" }}
      next={{ title: "Overview", href: "/docs/components/overview" }}
    />
  );
}
