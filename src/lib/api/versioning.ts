/**
 * API Versioning System
 * Handles API version negotiation and routing
 */

// Re-export types and constants
export type { ApiVersionConfig } from "./versioning-types";

export { ApiVersion, DEFAULT_API_VERSION, LATEST_API_VERSION } from "./versioning-types";

// Re-export configuration utilities
export { API_VERSIONS, getVersionConfig, isFeatureSupported } from "./versioning-config";

// Re-export parsing utilities
export {
  extractVersionFromAcceptHeader,
  extractVersionFromPath,
  getApiVersion,
  resolveApiVersion,
} from "./versioning-parser";

// Re-export response utilities
export {
  addVersionHeaders,
  createVersionedResponse,
  validateApiVersion,
} from "./versioning-response";

// Re-export transformation utilities
export { handleVersionCompatibility } from "./versioning-transform";
