/**
 * CSP Nonce Generation and Retrieval
 *
 * Generates cryptographically secure nonces for Content Security Policy
 * to eliminate 'unsafe-inline' from script-src directive.
 *
 * Security Features:
 * - 128-bit entropy (16 bytes)
 * - Base64 encoding for CSP compatibility
 * - Unique per request
 * - Retrieved via custom header
 */

import { randomBytes } from "crypto";
import { headers } from "next/headers";

/**
 * Custom header name for storing nonce
 * Prefixed with x- to indicate custom header
 */
const NONCE_HEADER = "x-nonce";

/**
 * Generate a cryptographically secure nonce
 *
 * @returns Base64-encoded random string (128-bit entropy)
 */
export function generateNonce(): string {
  return randomBytes(16).toString("base64");
}

/**
 * Retrieve the nonce for the current request
 *
 * Must be called from Server Components or Server Actions
 * Returns empty string if no nonce is available (fallback for edge cases)
 *
 * @returns Nonce string or empty string
 */
export async function getNonce(): Promise<string> {
  const headersList = await headers();
  return headersList.get(NONCE_HEADER) || "";
}

/**
 * Get the nonce header name
 * Useful for middleware and testing
 *
 * @returns Header name constant
 */
export function getNonceHeaderName(): string {
  return NONCE_HEADER;
}
