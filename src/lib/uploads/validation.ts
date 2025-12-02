/**
 * Production-Grade File Upload Validation
 * Implements magic byte checking, executable detection, and comprehensive security measures
 *
 * Security Features:
 * - Magic byte validation (file signature verification)
 * - File size limits (configurable per type)
 * - Filename sanitization (path traversal prevention)
 * - MIME type validation
 * - Executable file detection
 * - Double extension detection
 * - Malicious pattern detection
 */

/**
 * Magic Bytes (File Signatures)
 * First bytes of file that identify its true type
 */
export const MAGIC_BYTES: Record<string, number[]> = {
  // Images
  "image/png": [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/gif": [0x47, 0x49, 0x46, 0x38], // GIF8
  "image/webp": [0x52, 0x49, 0x46, 0x46], // RIFF (WebP container)
  "image/bmp": [0x42, 0x4d], // BM
  "image/tiff": [0x49, 0x49, 0x2a, 0x00], // II*\0 (little-endian)
  "image/svg+xml": [0x3c, 0x73, 0x76, 0x67], // <svg

  // Documents
  "application/pdf": [0x25, 0x50, 0x44, 0x46], // %PDF
  "application/zip": [0x50, 0x4b, 0x03, 0x04], // PK..
  "application/x-rar-compressed": [0x52, 0x61, 0x72, 0x21], // Rar!
  "application/x-7z-compressed": [0x37, 0x7a, 0xbc, 0xaf], // 7z

  // Office Documents (DOCX, XLSX, PPTX are ZIP-based)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [0x50, 0x4b, 0x03, 0x04],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [0x50, 0x4b, 0x03, 0x04],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [0x50, 0x4b, 0x03, 0x04],

  // Text
  "text/plain": [], // No magic bytes for plain text

  // Audio
  "audio/mpeg": [0x49, 0x44, 0x33], // ID3 (MP3)
  "audio/wav": [0x52, 0x49, 0x46, 0x46], // RIFF

  // Video
  "video/mp4": [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ....ftyp
  "video/webm": [0x1a, 0x45, 0xdf, 0xa3], // WebM
};

/**
 * Executable file signatures (to block)
 */
const EXECUTABLE_SIGNATURES: number[][] = [
  [0x4d, 0x5a], // MZ (Windows EXE, DLL)
  [0x7f, 0x45, 0x4c, 0x46], // ELF (Linux executables)
  [0xca, 0xfe, 0xba, 0xbe], // Mach-O (macOS executables)
  [0xfe, 0xed, 0xfa, 0xce], // Mach-O (macOS 32-bit)
  [0xfe, 0xed, 0xfa, 0xcf], // Mach-O (macOS 64-bit)
  [0x23, 0x21], // #! (Shell scripts)
  [0x3c, 0x3f, 0x70, 0x68, 0x70], // <?php (PHP scripts)
];

/**
 * File type configurations
 */
export interface FileTypeConfig {
  mimeTypes: string[];
  extensions: string[];
  maxSize: number; // in bytes
  description: string;
}

export const FILE_TYPE_CONFIGS: Record<string, FileTypeConfig> = {
  image: {
    mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"],
    extensions: ["jpg", "jpeg", "png", "gif", "webp", "bmp"],
    maxSize: 10 * 1024 * 1024, // 10MB
    description: "Image files",
  },
  avatar: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    extensions: ["jpg", "jpeg", "png", "webp"],
    maxSize: 5 * 1024 * 1024, // 5MB
    description: "Avatar images",
  },
  document: {
    mimeTypes: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ],
    extensions: ["pdf", "docx", "xlsx", "txt"],
    maxSize: 25 * 1024 * 1024, // 25MB
    description: "Document files",
  },
  video: {
    mimeTypes: ["video/mp4", "video/webm"],
    extensions: ["mp4", "webm"],
    maxSize: 100 * 1024 * 1024, // 100MB
    description: "Video files",
  },
  audio: {
    mimeTypes: ["audio/mpeg", "audio/wav"],
    extensions: ["mp3", "wav"],
    maxSize: 50 * 1024 * 1024, // 50MB
    description: "Audio files",
  },
};

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  details?: {
    fileType?: string;
    size?: number;
    sanitizedFilename?: string;
  };
}

/**
 * Check if buffer starts with magic bytes
 */
function matchesMagicBytes(buffer: Buffer, magicBytes: number[]): boolean {
  if (magicBytes.length === 0) {
    // No magic bytes defined (e.g., text files)
    return true;
  }

  if (buffer.length < magicBytes.length) {
    return false;
  }

  for (let i = 0; i < magicBytes.length; i++) {
    if (buffer[i] !== magicBytes[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Validate file type using magic bytes
 */
export function validateFileType(buffer: Buffer, mimeType: string): ValidationResult {
  const magicBytes = MAGIC_BYTES[mimeType];

  if (!magicBytes) {
    return {
      valid: false,
      error: `Unsupported file type: ${mimeType}`,
    };
  }

  if (!matchesMagicBytes(buffer, magicBytes)) {
    return {
      valid: false,
      error: `File content does not match declared type ${mimeType}. Possible file type mismatch or tampering.`,
    };
  }

  return { valid: true };
}

/**
 * Detect if file is an executable
 */
export function detectExecutable(buffer: Buffer): boolean {
  if (buffer.length < 2) {
    return false;
  }

  return EXECUTABLE_SIGNATURES.some((signature) => matchesMagicBytes(buffer, signature));
}

/**
 * Sanitize filename to prevent path traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove any path components
  filename = filename.replace(/^.*[\\\/]/, "");

  // Remove null bytes
  filename = filename.replace(/\0/g, "");

  // Remove path traversal patterns
  filename = filename.replace(/\.\./g, "");
  filename = filename.replace(/[\\\/]/g, "");

  // Remove potentially dangerous characters
  filename = filename.replace(/[<>:"|?*]/g, "");

  // Replace spaces and special characters with underscores
  filename = filename.replace(/[^\w\s.-]/g, "_");

  // Collapse multiple dots
  filename = filename.replace(/\.{2,}/g, ".");

  // Trim dots and spaces from start/end
  filename = filename.replace(/^[.\s]+|[.\s]+$/g, "");

  // Limit length (filesystem limits)
  const maxLength = 255;
  if (filename.length > maxLength) {
    const ext = filename.split(".").pop() || "";
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
    filename = nameWithoutExt.substring(0, maxLength - ext.length - 1) + "." + ext;
  }

  // Ensure filename is not empty
  if (!filename || filename.length === 0) {
    filename = "file";
  }

  return filename;
}

/**
 * Validate file extension against allowed types
 */
function validateExtension(filename: string, allowedExtensions: string[]): ValidationResult {
  const parts = filename.toLowerCase().split(".");

  // Check for double extensions (e.g., file.php.jpg)
  if (parts.length > 2) {
    return {
      valid: false,
      error: "File cannot have multiple extensions. This may indicate a file type obfuscation attempt.",
    };
  }

  const ext = parts.pop();

  if (!ext) {
    return {
      valid: false,
      error: "File must have an extension",
    };
  }

  if (!allowedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `File extension .${ext} not allowed. Allowed: ${allowedExtensions.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Validate file size
 */
function validateFileSize(size: number, maxSize: number): ValidationResult {
  if (size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(2);
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  if (size === 0) {
    return {
      valid: false,
      error: "File is empty",
    };
  }

  return { valid: true };
}

/**
 * Detect potential malicious patterns in file content
 */
function detectMaliciousPatterns(buffer: Buffer, mimeType: string): ValidationResult {
  // For text-based files, check for malicious scripts
  if (mimeType.startsWith("text/") || mimeType.includes("xml") || mimeType.includes("svg")) {
    const content = buffer.toString("utf-8", 0, Math.min(buffer.length, 1024 * 10)); // Check first 10KB

    // Check for script tags
    if (/<script[^>]*>/i.test(content)) {
      return {
        valid: false,
        error: "File contains potentially malicious script tags",
      };
    }

    // Check for event handlers
    if (/on\w+\s*=/i.test(content)) {
      return {
        valid: false,
        error: "File contains potentially malicious event handlers",
      };
    }

    // Check for javascript: protocol
    if (/javascript:/i.test(content)) {
      return {
        valid: false,
        error: "File contains potentially malicious JavaScript protocol",
      };
    }
  }

  return { valid: true };
}

/**
 * Comprehensive file upload validation
 */
export async function validateUpload(
  file: File | { buffer: Buffer; name: string; type: string; size: number },
  config: {
    allowedTypes?: FileTypeConfig;
    maxSize?: number;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): Promise<ValidationResult> {
  // Extract file data
  let buffer: Buffer;
  let filename: string;
  let mimeType: string;
  let size: number;

  if (file instanceof File) {
    buffer = Buffer.from(await file.arrayBuffer());
    filename = file.name;
    mimeType = file.type;
    size = file.size;
  } else {
    buffer = file.buffer;
    filename = file.name;
    mimeType = file.type;
    size = file.size;
  }

  // 1. Sanitize filename
  const sanitizedFilename = sanitizeFilename(filename);

  // 2. Check for executable files
  if (detectExecutable(buffer)) {
    return {
      valid: false,
      error: "Executable files are not allowed for security reasons",
    };
  }

  // 3. Validate file size
  const maxSize = config.maxSize || config.allowedTypes?.maxSize || 10 * 1024 * 1024;
  const sizeValidation = validateFileSize(size, maxSize);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  // 4. Validate MIME type
  const allowedMimeTypes = config.allowedMimeTypes || config.allowedTypes?.mimeTypes || [];
  if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(mimeType)) {
    return {
      valid: false,
      error: `MIME type ${mimeType} not allowed. Allowed: ${allowedMimeTypes.join(", ")}`,
    };
  }

  // 5. Validate extension
  const allowedExtensions = config.allowedExtensions || config.allowedTypes?.extensions || [];
  if (allowedExtensions.length > 0) {
    const extValidation = validateExtension(filename, allowedExtensions);
    if (!extValidation.valid) {
      return extValidation;
    }
  }

  // 6. Validate file type using magic bytes
  if (MAGIC_BYTES[mimeType]) {
    const magicByteValidation = validateFileType(buffer, mimeType);
    if (!magicByteValidation.valid) {
      return magicByteValidation;
    }
  }

  // 7. Detect malicious patterns
  const maliciousPatternValidation = detectMaliciousPatterns(buffer, mimeType);
  if (!maliciousPatternValidation.valid) {
    return maliciousPatternValidation;
  }

  // All validations passed
  return {
    valid: true,
    details: {
      fileType: mimeType,
      size,
      sanitizedFilename,
    },
  };
}

/**
 * Validate multiple files
 */
export async function validateMultipleUploads(
  files: (File | { buffer: Buffer; name: string; type: string; size: number })[],
  config: {
    allowedTypes?: FileTypeConfig;
    maxSize?: number;
    maxFiles?: number;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): Promise<ValidationResult> {
  // Check max files
  if (config.maxFiles && files.length > config.maxFiles) {
    return {
      valid: false,
      error: `Too many files. Maximum: ${config.maxFiles}`,
    };
  }

  // Validate each file
  for (let i = 0; i < files.length; i++) {
    const result = await validateUpload(files[i], config);
    if (!result.valid) {
      return {
        valid: false,
        error: `File ${i + 1}: ${result.error}`,
      };
    }
  }

  return { valid: true };
}

/**
 * Get file type from buffer (magic byte detection)
 */
export function detectFileType(buffer: Buffer): string | null {
  for (const [mimeType, magicBytes] of Object.entries(MAGIC_BYTES)) {
    if (matchesMagicBytes(buffer, magicBytes)) {
      return mimeType;
    }
  }
  return null;
}

/**
 * Validate image dimensions (requires sharp)
 */
export async function validateImageDimensions(
  buffer: Buffer,
  options: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
  }
): Promise<ValidationResult> {
  try {
    const sharpModule = await import("sharp");
    const sharp = sharpModule.default || sharpModule;
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      return {
        valid: false,
        error: "Could not determine image dimensions",
      };
    }

    if (options.minWidth && metadata.width < options.minWidth) {
      return {
        valid: false,
        error: `Image width too small. Minimum: ${options.minWidth}px`,
      };
    }

    if (options.minHeight && metadata.height < options.minHeight) {
      return {
        valid: false,
        error: `Image height too small. Minimum: ${options.minHeight}px`,
      };
    }

    if (options.maxWidth && metadata.width > options.maxWidth) {
      return {
        valid: false,
        error: `Image width too large. Maximum: ${options.maxWidth}px`,
      };
    }

    if (options.maxHeight && metadata.height > options.maxHeight) {
      return {
        valid: false,
        error: `Image height too large. Maximum: ${options.maxHeight}px`,
      };
    }

    return { valid: true };
  } catch {
    return {
      valid: false,
      error: "Failed to validate image dimensions",
    };
  }
}
