"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { CropperControls } from "@/components/ui/cropper-controls";
import { useState } from "react";

export default function CropperControlsPage() {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleCrop = () => {
    console.log("Crop triggered with zoom:", zoom, "rotation:", rotation);
  };

  return (
    <ComponentShowcaseTemplate
      code="[UI.86]"
      category="Components"
      title="Cropper Controls"
      description="Interactive controls for image cropping with zoom and rotation sliders."
      importCode={`import { CropperControls } from "@/components/ui/cropper-controls"`}
      mainPreview={{
        preview: (
          <div className="max-w-md rounded-none border border-border bg-card p-4 font-mono">
            <CropperControls
              zoom={zoom}
              rotation={rotation}
              minZoom={0.5}
              maxZoom={3}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onReset={handleReset}
              onCrop={handleCrop}
            />
          </div>
        ),
        code: `const [zoom, setZoom] = useState(1);
const [rotation, setRotation] = useState(0);

const handleReset = () => {
  setZoom(1);
  setRotation(0);
};

const handleCrop = () => {
  // Process cropped image
};

<CropperControls
  zoom={zoom}
  rotation={rotation}
  minZoom={0.5}
  maxZoom={3}
  onZoomChange={setZoom}
  onRotationChange={setRotation}
  onReset={handleReset}
  onCrop={handleCrop}
/>`,
      }}
      variants={[
        {
          title: "Default Controls",
          description: "Standard zoom and rotation controls with default range.",
          preview: (
            <div className="max-w-md rounded-none border border-border bg-card p-4 font-mono">
              <CropperControls
                zoom={1}
                rotation={0}
                minZoom={1}
                maxZoom={3}
                onZoomChange={() => {}}
                onRotationChange={() => {}}
                onReset={() => {}}
                onCrop={() => {}}
              />
            </div>
          ),
          code: `<CropperControls
  zoom={1}
  rotation={0}
  minZoom={1}
  maxZoom={3}
  onZoomChange={setZoom}
  onRotationChange={setRotation}
  onReset={handleReset}
  onCrop={handleCrop}
/>`,
        },
        {
          title: "Extended Zoom Range",
          description: "Controls with wider zoom range for more flexibility.",
          preview: (
            <div className="max-w-md rounded-none border border-border bg-card p-4 font-mono">
              <CropperControls
                zoom={1}
                rotation={0}
                minZoom={0.25}
                maxZoom={5}
                onZoomChange={() => {}}
                onRotationChange={() => {}}
                onReset={() => {}}
                onCrop={() => {}}
              />
            </div>
          ),
          code: `<CropperControls
  zoom={1}
  rotation={0}
  minZoom={0.25}
  maxZoom={5}
  onZoomChange={setZoom}
  onRotationChange={setRotation}
  onReset={handleReset}
  onCrop={handleCrop}
/>`,
        },
        {
          title: "With Active State",
          description: "Controls showing active zoom and rotation values.",
          preview: (
            <div className="max-w-md rounded-none border border-border bg-card p-4 font-mono">
              <CropperControls
                zoom={2.5}
                rotation={45}
                minZoom={1}
                maxZoom={3}
                onZoomChange={() => {}}
                onRotationChange={() => {}}
                onReset={() => {}}
                onCrop={() => {}}
              />
            </div>
          ),
          code: `<CropperControls
  zoom={2.5}
  rotation={45}
  minZoom={1}
  maxZoom={3}
  onZoomChange={setZoom}
  onRotationChange={setRotation}
  onReset={handleReset}
  onCrop={handleCrop}
/>`,
        },
      ]}
      props={[
        {
          name: "zoom",
          type: "number",
          description: "Current zoom level value.",
          required: true,
        },
        {
          name: "rotation",
          type: "number",
          description: "Current rotation angle in degrees.",
          required: true,
        },
        {
          name: "minZoom",
          type: "number",
          description: "Minimum allowed zoom level.",
          required: true,
        },
        {
          name: "maxZoom",
          type: "number",
          description: "Maximum allowed zoom level.",
          required: true,
        },
        {
          name: "onZoomChange",
          type: "(zoom: number) => void",
          description: "Callback fired when zoom value changes.",
          required: true,
        },
        {
          name: "onRotationChange",
          type: "(rotation: number) => void",
          description: "Callback fired when rotation value changes.",
          required: true,
        },
        {
          name: "onReset",
          type: "() => void",
          description: "Callback fired when reset button is clicked.",
          required: true,
        },
        {
          name: "onCrop",
          type: "() => void",
          description: "Callback fired when crop button is clicked.",
          required: true,
        },
      ]}
      accessibility={[
        "Zoom and rotation sliders are keyboard accessible",
        "All controls have descriptive ARIA labels",
        "Slider values are announced to screen readers",
        "Focus visible styles for keyboard navigation",
        "Reset and crop buttons support Enter and Space keys",
      ]}
      previous={{ title: "Cropper", href: "/docs/components/cropper" }}
      next={{ title: "Data Table Header", href: "/docs/components/data-table-header" }}
    />
  );
}
