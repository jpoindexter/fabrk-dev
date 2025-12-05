/**
 * ✅ FABRK COMPONENT
 * Lightbox component for full-screen image/video viewing.
 *
 * @example
 * ```tsx
 * <Lightbox
 *   items={[{ type: 'image', src: '/image.jpg', alt: 'Image' }]}
 *   currentIndex={0}
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export interface LightboxItem {
  id?: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  thumbnail?: string;
}

export interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
  showThumbnails?: boolean;
  enableZoom?: boolean;
  className?: string;
}

export function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  showThumbnails = false,
  enableZoom = true,
  className,
}: LightboxProps) {
  const [mounted, setMounted] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const currentItem = items[currentIndex];
  const hasMultipleItems = items.length > 1;

  // Handle mounting for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when lightbox is open
  React.useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Reset zoom when item changes
  React.useEffect(() => {
    setZoomLevel(1);
    setIsImageLoaded(false);
  }, [currentIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasMultipleItems && currentIndex > 0) {
            onNavigate?.(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (hasMultipleItems && currentIndex < items.length - 1) {
            onNavigate?.(currentIndex + 1);
          }
          break;
        case "+":
        case "=":
          if (enableZoom) {
            setZoomLevel((prev) => Math.min(prev + 0.25, 3));
          }
          break;
        case "-":
        case "_":
          if (enableZoom) {
            setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length, hasMultipleItems, enableZoom, onClose, onNavigate]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate?.(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate?.(currentIndex + 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleThumbnailClick = (index: number) => {
    onNavigate?.(index);
  };

  if (!isOpen || !mounted) return null;

  const lightboxContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox"
      className={cn(
        "bg-foreground/95 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm",
        "animate-in fade-in duration-200",
        className
      )}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="border-border bg-card text-foreground hover:bg-muted absolute top-4 right-4 z-50 border"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Navigation buttons */}
      {hasMultipleItems && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "border-border bg-card text-foreground hover:bg-muted absolute top-1/2 left-4 z-50 -translate-y-1/2 border",
              currentIndex === 0 && "cursor-not-allowed opacity-50"
            )}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "border-border bg-card text-foreground hover:bg-muted absolute top-1/2 right-4 z-50 -translate-y-1/2 border",
              currentIndex === items.length - 1 && "cursor-not-allowed opacity-50"
            )}
            onClick={handleNext}
            disabled={currentIndex === items.length - 1}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Zoom controls */}
      {enableZoom && currentItem.type === "image" && (
        <div className="absolute top-20 right-4 z-50 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="border-border bg-card text-foreground hover:bg-muted border"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="border-border bg-card text-foreground hover:bg-muted border"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Image counter */}
      {hasMultipleItems && (
        <div
          className={cn(
            "border-border bg-card text-foreground absolute top-4 left-1/2 z-50 -translate-x-1/2 border px-4 py-1 text-sm font-semibold",
            mode.radius
          )}
        >
          {currentIndex + 1} / {items.length}
        </div>
      )}

      {/* Main content */}
      <div className="relative flex h-full w-full items-center justify-center p-16">
        {currentItem.type === "image" ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            ref={imageRef}
            src={currentItem.src}
            alt={currentItem.alt || ""}
            className={cn(
              "max-h-full max-w-full object-contain transition-all duration-300",
              !isImageLoaded && "opacity-0"
            )}
            style={{
              transform: `scale(${zoomLevel})`,
              cursor: zoomLevel > 1 ? "grab" : "default",
            }}
            onLoad={() => setIsImageLoaded(true)}
            draggable={false}
          />
        ) : (
          <video
            ref={videoRef}
            src={currentItem.src}
            controls
            autoPlay
            className="max-h-full max-w-full"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Caption */}
      {currentItem.caption && (
        <div className="bg-foreground/80 absolute right-0 bottom-0 left-0 z-50 px-6 py-4 text-center backdrop-blur-sm">
          <p className="text-foreground text-sm">{currentItem.caption}</p>
        </div>
      )}

      {/* Thumbnail strip */}
      {showThumbnails && hasMultipleItems && (
        <div className="bg-foreground/80 absolute right-0 bottom-0 left-0 z-50 flex justify-center gap-2 p-4 backdrop-blur-sm">
          <div className="flex gap-2 overflow-x-auto">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "h-16 w-16 flex-shrink-0 overflow-hidden border-2 transition-all",
                  mode.radius,
                  index === currentIndex
                    ? "border-foreground ring-primary ring-offset-background ring-2 ring-offset-2"
                    : "border-foreground/50 opacity-60 hover:opacity-100"
                )}
                aria-label={`View image ${index + 1}`}
              >
                {item.type === "image" ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.thumbnail || item.src}
                    alt={item.alt || `Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video src={item.src} className="h-full w-full object-cover" muted />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(lightboxContent, document.body);
}
