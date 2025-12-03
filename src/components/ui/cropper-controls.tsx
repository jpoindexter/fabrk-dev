/**
 * ✅ FABRK COMPONENT
 * Cropper Controls - Controls for image cropping
 */

"use client";

import { Button } from "./button";
import { Label } from "./label";
import { Slider } from "./slider";
import { RotateCw, ZoomIn, Undo } from "lucide-react";
import * as React from "react";

export interface CropperControlsProps {
  zoom: number;
  rotation: number;
  minZoom: number;
  maxZoom: number;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
  onReset: () => void;
  onCrop: () => void;
}

export const CropperControls = React.forwardRef<HTMLDivElement, CropperControlsProps>(
  (
    {
      zoom,
      rotation,
      minZoom,
      maxZoom,
      onZoomChange,
      onRotationChange,
      onReset,
      onCrop,
    },
    ref
  ) => {
    return (
      <div data-slot="cropper-controls" ref={ref} className="space-y-4 pt-4">
        {/* Zoom Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <ZoomIn className="h-4 w-4" />
              Zoom
            </Label>
            <span className="text-sm text-muted-foreground">{Math.round(zoom * 100)}%</span>
          </div>
          <Slider
            value={[zoom]}
            onValueChange={([value]) => onZoomChange(value)}
            min={minZoom}
            max={maxZoom}
            step={0.1}
            aria-label="Zoom level"
          />
        </div>

        {/* Rotation Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <RotateCw className="h-4 w-4" />
              Rotation
            </Label>
            <span className="text-sm text-muted-foreground">{rotation}°</span>
          </div>
          <Slider
            value={[rotation]}
            onValueChange={([value]) => onRotationChange(value)}
            min={-180}
            max={180}
            step={1}
            aria-label="Rotation angle"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={onReset} variant="outline" className="flex-1">
            <Undo className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={onCrop} className="flex-1">
            Crop Image
          </Button>
        </div>
      </div>
    );
  }
);
CropperControls.displayName = "CropperControls";
