/**
 * ✅ FABRK COMPONENT
 * File upload component - Modular
 * Under 150 lines ✓
 *
 * @example
 * ```tsx
 * <FileUpload />
 * ```
 */

"use client";

import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";
import { Upload } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { Dropzone } from "./file-upload/dropzone";

export type FileUploadProps = React.HTMLAttributes<HTMLDivElement>;

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ className, ...props }, ref) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleDrop = (newFiles: File[]) => {
      setFiles([...files, ...newFiles]);
    };

    return (
      <div data-slot="file-upload" ref={ref} className={cn(className)} {...props}>
        <Dropzone onFilesDropped={handleDrop} className="min-h-48" aria-label="Upload files">
          <div className={`flex flex-col items-center justify-center gap-2`}>
            <Upload
              className={`"h-8 w-8" text-muted-foreground dark:text-muted-foreground`}
              aria-hidden="true"
            />
            <p className={`"text-sm" text-muted-foreground dark:text-muted-foreground`}>
              Drag and drop files here, or click to select
            </p>
          </div>
        </Dropzone>
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";
