/**
 * License Key Generation
 * Simple utility for generating unique license keys
 */

import { prisma } from "./prisma";

/**
 * Generate a unique license key
 * Format: XXXX-XXXX-XXXX-XXXX-XXXX
 */
export async function generateUniqueLicenseKey(): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const key = generateLicenseKey();

    // Check if key already exists
    const existing = await prisma.purchase.findUnique({
      where: { licenseKey: key },
    });

    if (!existing) {
      return key;
    }

    attempts++;
  }

  // Fallback: add timestamp to ensure uniqueness
  return `${generateLicenseKey()}-${Date.now()}`;
}

/**
 * Generate a random license key
 * Exported for backward compatibility
 */
export function generateLicenseKey(): string {
  const segments = 5;
  const segmentLength = 4;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous characters

  const key: string[] = [];

  for (let i = 0; i < segments; i++) {
    let segment = "";
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    key.push(segment);
  }

  return key.join("-");
}

/**
 * Validate license key format
 */
export function validateLicenseKeyFormat(key: string): boolean {
  // Format: XXXX-XXXX-XXXX-XXXX-XXXX
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}(-\d+)?$/;
  return pattern.test(key);
}
