/**
 * File Upload System
 * S3-compatible file storage with image optimization
 *
 * Features:
 * - S3/R2/MinIO compatible (requires @aws-sdk/client-s3)
 * - Auto-detection: R2 > S3 > Local storage
 * - Image optimization (sharp)
 * - File validation
 * - Signed URLs
 * - Virus scanning (optional)
 * - Quota management
 *
 * Environment Variables:
 * - Cloudflare R2 (preferred):
 *   CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY,
 *   CLOUDFLARE_R2_BUCKET, CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_PUBLIC_URL
 *
 * - AWS S3 (alternative):
 *   AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY,
 *   AWS_S3_BUCKET, AWS_S3_REGION
 *
 * NOTE: AWS SDK packages are optional. Install them if you need cloud uploads:
 * npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
 */

import { prisma } from "@/lib/prisma";
import * as crypto from "crypto";
import * as fs from "fs/promises";
import * as path from "path";
import { logger } from "@/lib/logger";

// AWS SDK imports are optional (loaded dynamically)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let S3Client: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PutObjectCommand: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GetObjectCommand: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let DeleteObjectCommand: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let getSignedUrl: any;

// Storage provider type
type StorageProvider = "r2" | "s3" | "local";

// Detect which provider to use based on env vars
function detectStorageProvider(): StorageProvider {
  // Priority 1: Cloudflare R2
  if (
    process.env.CLOUDFLARE_R2_ACCESS_KEY_ID &&
    process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
    process.env.CLOUDFLARE_R2_BUCKET
  ) {
    return "r2";
  }

  // Priority 2: AWS S3
  if (
    process.env.AWS_S3_ACCESS_KEY_ID &&
    process.env.AWS_S3_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET
  ) {
    return "s3";
  }

  // Fallback: Local storage
  return "local";
}

const STORAGE_PROVIDER = detectStorageProvider();

// Initialize S3 client based on provider
async function initializeS3Client() {
  if (STORAGE_PROVIDER === "local") return null;

  try {
    // Dynamic require to avoid TypeScript errors when SDK not installed
    // Using eval to bypass Turbopack/Webpack static analysis for optional dependencies
    const s3 = eval('require("@aws-sdk/client-s3")');
    const presigner = eval('require("@aws-sdk/s3-request-presigner")');

    S3Client = s3.S3Client;
    PutObjectCommand = s3.PutObjectCommand;
    GetObjectCommand = s3.GetObjectCommand;
    DeleteObjectCommand = s3.DeleteObjectCommand;
    getSignedUrl = presigner.getSignedUrl;

    if (STORAGE_PROVIDER === "r2") {
      return new S3Client({
        region: "auto",
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        },
      });
    }

    // AWS S3
    return new S3Client({
      region: process.env.AWS_S3_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
    });
  } catch {
    logger.warn("AWS SDK not installed. Cloud uploads will fall back to local storage.");
    return null;
  }
}

// Lazy-loaded S3 client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let s3ClientPromise: Promise<any> | null = null;
async function getS3Client() {
  if (!s3ClientPromise) {
    s3ClientPromise = initializeS3Client();
  }
  return s3ClientPromise;
}

// Get bucket name based on provider
function getBucketName(): string {
  if (STORAGE_PROVIDER === "r2") {
    return process.env.CLOUDFLARE_R2_BUCKET || "uploads";
  }
  if (STORAGE_PROVIDER === "s3") {
    return process.env.AWS_S3_BUCKET || "uploads";
  }
  return "uploads";
}

// Get public URL for a file
function getPublicUrl(key: string): string {
  if (STORAGE_PROVIDER === "r2" && process.env.CLOUDFLARE_R2_PUBLIC_URL) {
    return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
  }
  if (STORAGE_PROVIDER === "s3") {
    return `https://${getBucketName()}.s3.${process.env.AWS_S3_REGION || "us-east-1"}.amazonaws.com/${key}`;
  }
  // Local storage
  return `/uploads/${key}`;
}

const BUCKET_NAME = getBucketName();
const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Get the current storage provider being used
 */
export function getStorageProvider(): StorageProvider {
  return STORAGE_PROVIDER;
}

/**
 * Check if cloud storage is configured
 */
export function isCloudStorageConfigured(): boolean {
  return STORAGE_PROVIDER !== "local";
}
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB default

export interface UploadOptions {
  userId: string;
  organizationId?: string;
  file: File | Buffer;
  filename?: string;
  mimeType?: string;
  visibility?: "private" | "public";
  metadata?: Record<string, string>;
}

/**
 * Validate file
 */
export function validateFile(
  file: File | Buffer,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
  }
): { valid: boolean; error?: string } {
  const maxSize = options.maxSize || MAX_FILE_SIZE;

  // Check size
  const size = file instanceof File ? file.size : file.length;
  if (size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSize / 1024 / 1024}MB`,
    };
  }

  // Check mime type
  if (options.allowedTypes && file instanceof File) {
    if (!options.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type not allowed. Allowed: ${options.allowedTypes.join(", ")}`,
      };
    }
  }

  return { valid: true };
}

/**
 * Upload file to local storage
 */
async function uploadToLocalStorage(
  buffer: Buffer,
  key: string,
  mimeType: string
): Promise<string> {
  // Ensure upload directory exists
  const userDir = path.dirname(path.join(LOCAL_UPLOAD_DIR, key));
  await fs.mkdir(userDir, { recursive: true });

  // Write file
  const filePath = path.join(LOCAL_UPLOAD_DIR, key);
  await fs.writeFile(filePath, buffer);

  logger.info("File uploaded to local storage", { key, size: buffer.length, mimeType });

  return getPublicUrl(key);
}

/**
 * Upload file to cloud storage (S3 or R2)
 */
async function uploadToCloud(
  buffer: Buffer,
  key: string,
  mimeType: string,
  visibility: "private" | "public",
  metadata?: Record<string, string>
): Promise<string> {
  const s3Client = await getS3Client();

  if (!s3Client) {
    throw new Error("Cloud storage not configured. Falling back to local storage.");
  }

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      Metadata: metadata,
      ...(visibility === "public" && STORAGE_PROVIDER === "s3" ? { ACL: "public-read" } : {}),
    })
  );

  logger.info(`File uploaded to ${STORAGE_PROVIDER}`, {
    bucket: BUCKET_NAME,
    key,
    size: buffer.length,
  });

  // Generate URL
  if (visibility === "public") {
    return getPublicUrl(key);
  }

  // Generate signed URL for private files
  return await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }), {
    expiresIn: 3600,
  });
}

/**
 * Upload file to storage (auto-detects provider)
 */
export async function uploadFile(options: UploadOptions): Promise<{
  id: string;
  url: string;
  key: string;
  provider: StorageProvider;
}> {
  // Validate file
  const validation = validateFile(options.file, {});
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate unique filename
  const ext = options.filename?.split(".").pop() || "";
  const randomName = crypto.randomBytes(16).toString("hex");
  const filename = `${randomName}.${ext}`;
  const key = `${options.userId}/${filename}`;

  // Get file buffer
  const buffer =
    options.file instanceof File ? Buffer.from(await options.file.arrayBuffer()) : options.file;

  const mimeType =
    options.mimeType ||
    (options.file instanceof File ? options.file.type : "application/octet-stream");
  const visibility = options.visibility || "private";

  let url: string;
  let actualProvider = STORAGE_PROVIDER;

  // Try cloud storage first, fall back to local
  if (STORAGE_PROVIDER !== "local") {
    try {
      url = await uploadToCloud(buffer, key, mimeType, visibility, options.metadata);
    } catch (error: unknown) {
      logger.warn("Cloud upload failed, falling back to local storage", { error });
      url = await uploadToLocalStorage(buffer, key, mimeType);
      actualProvider = "local";
    }
  } else {
    url = await uploadToLocalStorage(buffer, key, mimeType);
  }

  // Save to database
  const upload = await prisma.upload.create({
    data: {
      userId: options.userId,
      organizationId: options.organizationId,
      filename,
      originalName: options.filename || filename,
      mimeType,
      size: buffer.length,
      url,
      key,
      bucket: actualProvider === "local" ? "local" : BUCKET_NAME,
      metadata: options.metadata,
      visibility,
    },
  });

  return {
    id: upload.id,
    url: upload.url,
    key: upload.key,
    provider: actualProvider,
  };
}

/**
 * Get signed URL for private file
 */
export async function getSignedFileUrl(
  fileId: string,
  userId: string,
  expiresIn: number = 3600
): Promise<string> {
  // Get upload record
  const upload = await prisma.upload.findUnique({
    where: { id: fileId },
  });

  if (!upload) {
    throw new Error("File not found");
  }

  // Check permissions
  if (upload.userId !== userId && upload.organizationId) {
    // Check if user is member of organization
    const member = await prisma.organizationMember.findFirst({
      where: {
        organizationId: upload.organizationId,
        userId,
      },
    });

    if (!member) {
      throw new Error("Access denied");
    }
  } else if (upload.userId !== userId) {
    throw new Error("Access denied");
  }

  // Local files don't need signed URLs
  if (upload.bucket === "local") {
    return upload.url;
  }

  // Get S3 client
  const s3Client = await getS3Client();
  if (!s3Client) {
    throw new Error("Cloud storage not available");
  }

  // Generate signed URL
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: upload.bucket || BUCKET_NAME,
      Key: upload.key,
    }),
    { expiresIn }
  );

  return url;
}

/**
 * Delete file
 */
export async function deleteFile(fileId: string, userId: string): Promise<void> {
  // Get upload record
  const upload = await prisma.upload.findUnique({
    where: { id: fileId },
  });

  if (!upload) {
    throw new Error("File not found");
  }

  // Check permissions
  if (upload.userId !== userId) {
    throw new Error("Access denied");
  }

  // Delete from storage
  if (upload.bucket === "local") {
    // Delete local file
    const filePath = path.join(LOCAL_UPLOAD_DIR, upload.key);
    try {
      await fs.unlink(filePath);
      logger.info("Deleted local file", { key: upload.key });
    } catch (error: unknown) {
      logger.warn("Failed to delete local file", { key: upload.key, error });
    }
  } else {
    // Delete from cloud storage
    const s3Client = await getS3Client();
    if (s3Client) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: upload.bucket || BUCKET_NAME,
          Key: upload.key,
        })
      );
      logger.info("Deleted cloud file", { bucket: upload.bucket, key: upload.key });
    }
  }

  // Delete from database
  await prisma.upload.delete({
    where: { id: fileId },
  });
}

/**
 * Get user uploads
 */
export async function getUserUploads(userId: string, limit: number = 50) {
  return await prisma.upload.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * Get organization uploads
 */
export async function getOrganizationUploads(organizationId: string, limit: number = 50) {
  return await prisma.upload.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * Get storage usage
 */
export async function getStorageUsage(userId: string): Promise<{
  totalBytes: number;
  fileCount: number;
}> {
  const result = await prisma.upload.aggregate({
    where: { userId },
    _sum: { size: true },
    _count: true,
  });

  return {
    totalBytes: result._sum.size || 0,
    fileCount: result._count,
  };
}

/**
 * Image optimization (requires sharp)
 */
export async function optimizeImage(
  buffer: Buffer,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "jpeg" | "png" | "webp";
  } = {}
): Promise<Buffer> {
  try {
    const sharp = (await import("sharp")).default;

    let image = sharp(buffer);

    // Resize
    if (options.width || options.height) {
      image = image.resize(options.width, options.height, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Convert format
    if (options.format) {
      image = image.toFormat(options.format, {
        quality: options.quality || 80,
      });
    }

    return await image.toBuffer();
  } catch {
    // If sharp not installed, return original
    return buffer;
  }
}
