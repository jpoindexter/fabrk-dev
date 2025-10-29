/**
 * Response utilities for API versioning
 */

import { NextResponse } from "next/server";
import { getVersionConfig } from "./versioning-config";
import { ApiVersion, LATEST_API_VERSION } from "./versioning-types";

/**
 * Add version headers to response
 */
export function addVersionHeaders(response: NextResponse, version: ApiVersion): NextResponse {
  const config = getVersionConfig(version);

  response.headers.set("X-API-Version", version);
  response.headers.set("X-API-Latest-Version", LATEST_API_VERSION);

  if (config.deprecated) {
    response.headers.set("X-API-Deprecated", "true");
    if (config.deprecationDate) {
      response.headers.set("X-API-Deprecation-Date", config.deprecationDate.toISOString());
    }
    if (config.sunsetDate) {
      response.headers.set("X-API-Sunset-Date", config.sunsetDate.toISOString());
    }
  }

  // Add supported features
  response.headers.set("X-API-Supported-Features", config.supportedFeatures.join(","));

  return response;
}

/**
 * Create versioned API response
 */
export function createVersionedResponse(
  data: unknown,
  version: ApiVersion,
  status: number = 200
): NextResponse {
  const response = NextResponse.json(
    {
      data,
      meta: {
        version,
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );

  return addVersionHeaders(response, version);
}

/**
 * Version validation middleware
 */
export function validateApiVersion(version: ApiVersion): boolean {
  const config = getVersionConfig(version);

  // Check if version exists
  if (!config) {
    return false;
  }

  // Check if version is past sunset date
  if (config.sunsetDate && new Date() > config.sunsetDate) {
    return false;
  }

  return true;
}
