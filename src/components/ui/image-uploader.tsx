/**
 * ✅ FABRK COMPONENT
 * Image uploader with drag-and-drop, preview, and validation.
 *
 * @example
 * ```tsx
 * <ImageUploader
 *   value={files}
 *   onChange={setFiles}
 *   maxFiles={5}
 *   maxSize={5 * 1024 * 1024}
 *   showPreview
 * />
 * ```
 */

"use client";

import * as React from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/design-system/utils";
import { Button } from "@/components/ui/button";

export interface ImageUploaderProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // bytes
  accept?: string;
  disabled?: boolean;
  showPreview?: boolean;
  onUpload?: (files: File[]) => Promise<void>;
  className?: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

export function ImageUploader({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = "image/jpeg,image/png,image/gif,image/webp",
  disabled = false,
  showPreview = true,
  onUpload,
  className,
}: ImageUploaderProps) {
  const [files, setFiles] = React.useState<FileWithPreview[]>(value);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Sync internal state with external value
  React.useEffect(() => {
    setFiles(value);
  }, [value]);

  // Generate preview URLs
  React.useEffect(() => {
    files.forEach((file) => {
      if (!file.preview && file.type.startsWith("image/")) {
        (file as FileWithPreview).preview = URL.createObjectURL(file);
      }
    });

    // Cleanup preview URLs on unmount
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File "${file.name}" exceeds max size of ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    if (!accept.split(",").some((type) => file.type.match(type.trim()))) {
      return `File "${file.name}" has invalid type. Allowed: ${accept}`;
    }
    return null;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    const filesArray = Array.from(newFiles);
    const remainingSlots = maxFiles - files.length;

    if (filesArray.length > remainingSlots) {
      setError(`Maximum ${maxFiles} files allowed. You can add ${remainingSlots} more.`);
      return;
    }

    // Validate all files
    for (const file of filesArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setError(null);
    const updatedFiles = [...files, ...filesArray];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
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

  const handleRemove = (index: number) => {
    const file = files[index];
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
    setError(null);
  };

  const handleUpload = async () => {
    if (!onUpload || files.length === 0) return;

    setUploading(true);
    try {
      await onUpload(files);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-brutal border-2 border-dashed border-brutal bg-muted/20 px-6 py-8 transition-all cursor-pointer",
          isDragging && "border-primary bg-primary/10 scale-[1.02]",
          error && "border-destructive bg-destructive/10",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:border-primary hover:bg-primary/5 hover:scale-[1.01]"
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload images"
        aria-disabled={disabled}
      >
        <Upload className={cn(
          "mb-4 h-10 w-10 transition-colors",
          isDragging ? "text-primary" : "text-muted-foreground"
        )} />
        <p className="mb-2 text-sm font-bold text-foreground">
          {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
        </p>
        <p className="text-xs text-muted-foreground">
          {accept.split(",").map(t => t.split("/")[1]).join(", ").toUpperCase()}
          {" "}(max {(maxSize / 1024 / 1024).toFixed(0)}MB each)
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {files.length}/{maxFiles} files uploaded
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          disabled={disabled}
          aria-label="File input"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-brutal border-2 border-destructive bg-destructive/10 px-4 py-3">
          <p className="text-sm font-bold text-destructive">{error}</p>
        </div>
      )}

      {/* Preview Grid */}
      {showPreview && files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-brutal border-2 border-brutal bg-muted shadow-brutal"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
              )}

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                disabled={disabled}
                className={cn(
                  "absolute right-2 top-2 rounded-brutal border-2 border-brutal bg-destructive p-1 text-destructive-foreground shadow-brutal opacity-0 transition-all",
                  "group-hover:opacity-100 hover:scale-110 active:scale-95",
                  disabled && "cursor-not-allowed opacity-50"
                )}
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>

              {/* File Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-overlay px-2 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="truncate text-xs font-bold text-white">
                  {file.name}
                </p>
                <p className="text-xs text-white/80">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {onUpload && files.length > 0 && (
        <Button
          onClick={handleUpload}
          disabled={disabled || uploading}
          loading={uploading}
          loadingText="Uploading..."
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload {files.length} {files.length === 1 ? "file" : "files"}
        </Button>
      )}
    </div>
  );
}
