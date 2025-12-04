"use client";

/**
 * ✅ FABRK COMPONENT
 * Image cropper component.
 *
 * @example
 * ```tsx
 * <cropper />
 * ```
 */

import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";
import * as React from "react";
import { CropperControls } from "./cropper-controls";

export interface CropperProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string | File;
  onCrop?: (croppedImage: Blob) => void;
  aspectRatio?: number;
  minZoom?: number;
  maxZoom?: number;
  cropShape?: "rect" | "round";
  showGrid?: boolean;
  /**
   * Accessible label for the cropper region
   * @default "Image cropper"
   */
  "aria-label"?: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Cropper = React.forwardRef<HTMLDivElement, CropperProps>(
  (
    {
      image,
      onCrop,
      aspectRatio,
      minZoom = 1,
      maxZoom = 3,
      cropShape = "rect",
      showGrid = true,
      "aria-label": ariaLabel = "Image cropper",
      className,
      ...props
    },
    ref
  ) => {
    const [imageUrl, setImageUrl] = React.useState<string>("");
    const [zoom, setZoom] = React.useState(1);
    const [rotation, setRotation] = React.useState(0);
    const [cropArea, setCropArea] = React.useState<CropArea>({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const imageRef = React.useRef<HTMLImageElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const drawCanvas = React.useCallback(() => {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      if (!canvas || !img || !img.complete) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      canvas.width = containerRect.width;
      canvas.height = containerRect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save context state
      ctx.save();

      // Move to center and apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Draw image centered
      ctx.drawImage(
        img,
        -img.naturalWidth / 2,
        -img.naturalHeight / 2,
        img.naturalWidth,
        img.naturalHeight
      );

      // Restore context
      ctx.restore();

      // Draw crop overlay
      ctx.fillStyle = "var(--overlay-dark)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clear crop area
      const cropX = (canvas.width * cropArea.x) / 100;
      const cropY = (canvas.height * cropArea.y) / 100;
      const cropWidth = (canvas.width * cropArea.width) / 100;
      const cropHeight = aspectRatio
        ? cropWidth / aspectRatio
        : (canvas.height * cropArea.height) / 100;

      ctx.save();
      if (cropShape === "round") {
        ctx.beginPath();
        ctx.arc(
          cropX + cropWidth / 2,
          cropY + cropHeight / 2,
          Math.min(cropWidth, cropHeight) / 2,
          0,
          2 * Math.PI
        );
        ctx.clip();
      }

      ctx.clearRect(cropX, cropY, cropWidth, cropHeight);

      // Redraw the visible part of the image
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.drawImage(
        img,
        -img.naturalWidth / 2,
        -img.naturalHeight / 2,
        img.naturalWidth,
        img.naturalHeight
      );
      ctx.restore();

      // Draw grid
      if (showGrid) {
        ctx.strokeStyle = "var(--overlay-light)";
        ctx.lineWidth = 1;

        // Horizontal lines
        for (let i = 1; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(cropX, cropY + (cropHeight * i) / 3);
          ctx.lineTo(cropX + cropWidth, cropY + (cropHeight * i) / 3);
          ctx.stroke();
        }

        // Vertical lines
        for (let i = 1; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(cropX + (cropWidth * i) / 3, cropY);
          ctx.lineTo(cropX + (cropWidth * i) / 3, cropY + cropHeight);
          ctx.stroke();
        }
      }

      // Draw crop border
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      if (cropShape === "round") {
        ctx.beginPath();
        ctx.arc(
          cropX + cropWidth / 2,
          cropY + cropHeight / 2,
          Math.min(cropWidth, cropHeight) / 2,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      } else {
        ctx.strokeRect(cropX, cropY, cropWidth, cropHeight);
      }
    }, [cropArea, cropShape, rotation, zoom, showGrid, aspectRatio]);

    React.useEffect(() => {
      if (typeof image === "string") {
        setImageUrl(image);
      } else if (image instanceof File) {
        const url = URL.createObjectURL(image);
        setImageUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    }, [image]);

    React.useEffect(() => {
      drawCanvas();
    }, [imageUrl, zoom, rotation, cropArea, drawCanvas]);

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - cropArea.x, y: e.clientY - cropArea.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;

      const newX = Math.max(0, Math.min(100 - cropArea.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(100 - cropArea.height, e.clientY - dragStart.y));

      setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleCrop = async () => {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      if (!canvas || !img || !onCrop) return;

      const cropCanvas = document.createElement("canvas");
      const ctx = cropCanvas.getContext("2d");
      if (!ctx) return;

      const cropX = (canvas.width * cropArea.x) / 100;
      const cropY = (canvas.height * cropArea.y) / 100;
      const cropWidth = (canvas.width * cropArea.width) / 100;
      const cropHeight = aspectRatio
        ? cropWidth / aspectRatio
        : (canvas.height * cropArea.height) / 100;

      cropCanvas.width = cropWidth;
      cropCanvas.height = cropHeight;

      ctx.save();
      ctx.translate(cropWidth / 2, cropHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      const drawX = -img.naturalWidth / 2 - cropX / zoom;
      const drawY = -img.naturalHeight / 2 - cropY / zoom;

      ctx.drawImage(img, drawX, drawY, img.naturalWidth, img.naturalHeight);
      ctx.restore();

      cropCanvas.toBlob(
        (blob) => {
          if (blob) onCrop(blob);
        },
        "image/jpeg",
        0.95
      );
    };

    return (
      <div data-slot="cropper" ref={ref} className={cn("space-y-6", className)} {...props}>
        <div
          ref={containerRef}
          className={cn(
            "border-border bg-card relative h-96 w-full overflow-hidden border",
            mode.radius
          )}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          role="img"
          aria-label={ariaLabel}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 size-full cursor-move"
            onMouseDown={handleMouseDown}
            aria-label="Drag to reposition image"
          />
          {imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Crop preview"
              className="hidden"
              onLoad={drawCanvas}
            />
          )}
        </div>

        {/* Controls */}
        <CropperControls
          zoom={zoom}
          rotation={rotation}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onReset={() => {
            setZoom(1);
            setRotation(0);
            setCropArea({ x: 0, y: 0, width: 100, height: 100 });
          }}
          onCrop={handleCrop}
        />
      </div>
    );
  }
);
Cropper.displayName = "Cropper";

export { Cropper };
