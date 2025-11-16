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

export interface LightboxItem {
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
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm",
        "animate-in fade-in duration-200",
        className
      )}
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-50 border-2 border-white bg-white text-black hover:bg-white/90"
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
              "absolute left-4 top-1/2 z-50 -translate-y-1/2 border-2 border-white bg-white text-black hover:bg-white/90",
              currentIndex === 0 && "opacity-50 cursor-not-allowed"
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
              "absolute right-4 top-1/2 z-50 -translate-y-1/2 border-2 border-white bg-white text-black hover:bg-white/90",
              currentIndex === items.length - 1 && "opacity-50 cursor-not-allowed"
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
        <div className="absolute right-4 top-20 z-50 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="border-2 border-white bg-white text-black hover:bg-white/90"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="border-2 border-white bg-white text-black hover:bg-white/90"
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
        <div className="absolute left-1/2 top-4 z-50 -translate-x-1/2 rounded-md border-2 border-white bg-white px-3 py-1 text-sm font-semibold text-black">
          {currentIndex + 1} / {items.length}
        </div>
      )}

      {/* Main content */}
      <div className="relative flex h-full w-full items-center justify-center p-16">
        {currentItem.type === "image" ? (
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
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/80 px-6 py-4 text-center backdrop-blur-sm">
          <p className="text-sm text-white">{currentItem.caption}</p>
        </div>
      )}

      {/* Thumbnail strip */}
      {showThumbnails && hasMultipleItems && (
        <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center gap-2 bg-black/80 p-4 backdrop-blur-sm">
          <div className="flex gap-2 overflow-x-auto">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                  index === currentIndex
                    ? "border-white ring-2 ring-white ring-offset-2 ring-offset-black"
                    : "border-white/50 opacity-60 hover:opacity-100"
                )}
                aria-label={`View image ${index + 1}`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.thumbnail || item.src}
                    alt={item.alt || `Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="h-full w-full object-cover"
                    muted
                  />
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
