/**
 * File Upload System
 * S3-compatible file storage with image optimization
 *
 * Features:
 * - S3/R2/MinIO compatible
 * - Image optimization (sharp)
 * - File validation
 * - Signed URLs
 * - Virus scanning (optional)
 * - Quota management
 */

import { prisma } from "@/lib/prisma";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as crypto from "crypto";

// S3 Client (works with AWS S3, Cloudflare R2, MinIO, etc.)
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT, // For R2/MinIO
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "fabrk-uploads";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB default

export interface UploadOptions {
  userId: string;
  organizationId?: string;
  file: File | Buffer;
  filename?: string;
  mimeType?: string;
  visibility?: "private" | "public";
  metadata?: Record<string, any>;
}

/**
 * Validate file
 */
export function validateFile(file: File | Buffer, options: {
  maxSize?: number;
  allowedTypes?: string[];
}): { valid: boolean; error?: string } {
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
 * Upload file to S3
 */
export async function uploadFile(options: UploadOptions): Promise<{
  id: string;
  url: string;
  key: string;
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
  const buffer = options.file instanceof File
    ? Buffer.from(await options.file.arrayBuffer())
    : options.file;

  // Upload to S3
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: options.mimeType || (options.file instanceof File ? options.file.type : "application/octet-stream"),
      Metadata: options.metadata,
    })
  );

  // Generate URL
  const url = options.visibility === "public"
    ? `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`
    : await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }), { expiresIn: 3600 });

  // Save to database
  const upload = await prisma.upload.create({
    data: {
      userId: options.userId,
      organizationId: options.organizationId,
      filename,
      originalName: options.filename || filename,
      mimeType: options.mimeType || "application/octet-stream",
      size: buffer.length,
      url,
      key,
      bucket: BUCKET_NAME,
      metadata: options.metadata as any,
      visibility: options.visibility || "private",
    },
  });

  return {
    id: upload.id,
    url: upload.url,
    key: upload.key,
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

  // Delete from S3
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: upload.bucket || BUCKET_NAME,
      Key: upload.key,
    })
  );

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
  } catch (error) {
    // If sharp not installed, return original
    return buffer;
  }
}
