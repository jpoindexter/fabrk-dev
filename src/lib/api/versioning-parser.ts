/**
 * API version extraction and parsing utilities
 */

import { NextRequest } from "next/server";
import { ApiVersion, DEFAULT_API_VERSION } from "./versioning-types";

/**
 * Extract API version from request
 */
export function getApiVersion(request: NextRequest): ApiVersion {
  // 1. Check URL path (/api/v1/..., /api/v2/...)
  const pathVersion = extractVersionFromPath(request.nextUrl.pathname);
  if (pathVersion) {
    return pathVersion;
  }

  // 2. Check Accept header (application/vnd.fabrk.v1+json)
  const acceptVersion = extractVersionFromAcceptHeader(request);
  if (acceptVersion) {
    return acceptVersion;
  }

  // 3. Check X-API-Version header
  const headerVersion = request.headers.get("X-API-Version");
  if (headerVersion && isValidApiVersion(headerVersion)) {
    return headerVersion as ApiVersion;
  }

  // 4. Check query parameter
  const queryVersion = request.nextUrl.searchParams.get("version");
  if (queryVersion && isValidApiVersion(queryVersion)) {
    return queryVersion as ApiVersion;
  }

  // 5. Default version
  return DEFAULT_API_VERSION;
}

/**
 * Extract version from URL path
 */
export function extractVersionFromPath(pathname: string): ApiVersion | null {
  const match = pathname.match(/\/api\/(v\d+)\//);
  if (match && isValidApiVersion(match[1])) {
    return match[1] as ApiVersion;
  }
  return null;
}

/**
 * Extract version from Accept header
 */
export function extractVersionFromAcceptHeader(request: NextRequest): ApiVersion | null {
  const acceptHeader = request.headers.get("accept");
  if (!acceptHeader) return null;

  const match = acceptHeader.match(/application\/vnd\.fabrk\.(v\d+)\+json/);
  if (match && isValidApiVersion(match[1])) {
    return match[1] as ApiVersion;
  }
  return null;
}

/**
 * Check if version string is valid
 */
export function isValidApiVersion(version: string): boolean {
  return Object.values(ApiVersion).includes(version as ApiVersion);
}

/**
 * Get version from any source with metadata
 */
export function resolveApiVersion(request: NextRequest): {
  version: ApiVersion;
  source: "path" | "header" | "accept" | "query" | "default";
} {
  // Check path first
  const pathVersion = extractVersionFromPath(request.nextUrl.pathname);
  if (pathVersion) {
    return { version: pathVersion, source: "path" };
  }

  // Check Accept header
  const acceptVersion = extractVersionFromAcceptHeader(request);
  if (acceptVersion) {
    return { version: acceptVersion, source: "accept" };
  }

  // Check X-API-Version header
  const headerVersion = request.headers.get("X-API-Version");
  if (headerVersion && isValidApiVersion(headerVersion)) {
    return { version: headerVersion as ApiVersion, source: "header" };
  }

  // Check query parameter
  const queryVersion = request.nextUrl.searchParams.get("version");
  if (queryVersion && isValidApiVersion(queryVersion)) {
    return { version: queryVersion as ApiVersion, source: "query" };
  }

  // Default
  return { version: DEFAULT_API_VERSION, source: "default" };
}
