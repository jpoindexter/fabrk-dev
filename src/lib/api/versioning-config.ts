/**
 * API Version configurations
 */

import { ApiVersion, ApiVersionConfig } from "./versioning-types";

export const API_VERSIONS: Record<ApiVersion, ApiVersionConfig> = {
  [ApiVersion.V1]: {
    version: ApiVersion.V1,
    deprecated: false,
    supportedFeatures: ["user-management", "file-upload", "basic-webhooks", "email-notifications"],
  },
  [ApiVersion.V2]: {
    version: ApiVersion.V2,
    deprecated: false,
    supportedFeatures: [
      "user-management",
      "file-upload",
      "advanced-webhooks",
      "email-notifications",
      "real-time-notifications",
      "bulk-operations",
      "advanced-filtering",
    ],
  },
};

/**
 * Get version configuration
 */
export function getVersionConfig(version: ApiVersion): ApiVersionConfig {
  return API_VERSIONS[version];
}

/**
 * Check if feature is supported in version
 */
export function isFeatureSupported(version: ApiVersion, feature: string): boolean {
  const config = getVersionConfig(version);
  return config.supportedFeatures.includes(feature);
}
