"use client";

/**
 * ✅ FABRK COMPONENT
 * Image dropzone component for file uploads.
 *
 * @example
 * ```tsx
 * <image-dropzone />
 * ```
 */

import { Button } from "@/components/ui/button";
import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import * as React from "react";

export interface ImageDropzoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onError"> {
  onFilesChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFormats?: string[];
  preview?: boolean;
  disabled?: boolean;
  /**
   * Accessible label for the dropzone
   * @default "Upload images"
   */
  "aria-label"?: string;
}

const defaultAcceptedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const ImageDropzone = React.forwardRef<HTMLDivElement, ImageDropzoneProps>(
  (
    {
      onFilesChange,
      onError,
      multiple = false,
      maxFiles = 1,
      maxSize = 5 * 1024 * 1024, // 5MB
      acceptedFormats = defaultAcceptedFormats,
      preview = true,
      disabled = false,
      "aria-label": ariaLabel = "Upload images",
      className,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<string[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (!preview) return;

      const newPreviews: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });

      return () => {
        previews.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [files, preview]);

    const validateFile = (file: File): string | null => {
      if (!acceptedFormats.includes(file.type)) {
        return `File type ${file.type} not accepted`;
      }
      if (file.size > maxSize) {
        return `File size exceeds ${maxSize / 1024 / 1024}MB`;
      }
      return null;
    };

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles || disabled) return;

      const fileArray = Array.from(newFiles);
      const validFiles: File[] = [];
      const errors: string[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
        } else {
          validFiles.push(file);
        }
      });

      if (errors.length > 0) {
        onError?.(errors.join(", "));
      }

      let finalFiles = validFiles;
      if (!multiple) {
        finalFiles = validFiles.slice(0, 1);
      } else if (files.length + validFiles.length > maxFiles) {
        finalFiles = validFiles.slice(0, maxFiles - files.length);
        onError?.(`Maximum ${maxFiles} files allowed`);
      }

      const updatedFiles = multiple ? [...files, ...finalFiles] : finalFiles;
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const formatBytes = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    return (
      <div data-slot="image-dropzone" ref={ref} className={cn("w-full", className)} {...props}>
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          aria-label={ariaLabel}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={cn(
            "relative cursor-pointer rounded-lg border border-dashed p-6 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={acceptedFormats.join(",")}
            onChange={(e) => handleFiles(e.target.files)}
            disabled={disabled}
            className="sr-only"
          />

          <Upload className={`mx-auto ${tokens.sizes.avatar.lg} text-muted-foreground`} />
          <p className={`"text-sm" mt-2 font-medium`}>Drop images here or click to upload</p>
          <p className={`"text-xs" mt-1 text-muted-foreground`}>
            {acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(", ")} up to{" "}
            {maxSize / 1024 / 1024}MB
          </p>
        </div>

        {files.length > 0 && (
          <div className={`mt-4 ${tokens.spacing.space.y[2]}`}>
            {files.map((file, index) => (
              <div
                key={index}
                className={`flex items-center ${tokens.spacing.gap[3]} rounded-lg border p-3`}
              >
                {preview && previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={`Preview of ${file.name}`}
                    className={`${tokens.sizes.avatar.lg} rounded object-cover`}
                  />
                ) : (
                  <ImageIcon className={`${tokens.sizes.avatar.lg} text-muted-foreground`} aria-hidden="true" />
                )}
                <div className="min-w-0 flex-1">
                  <p className={`"text-sm" truncate font-medium`}>{file.name}</p>
                  <p className={`"text-xs" text-muted-foreground`}>{formatBytes(file.size)}</p>
                </div>
                {!disabled && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${file.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <X className="size-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
ImageDropzone.displayName = "ImageDropzone";

export { ImageDropzone };
