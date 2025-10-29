/**
 * Type definitions for API versioning system
 */

export enum ApiVersion {
  V1 = "v1",
  V2 = "v2",
}

export interface ApiVersionConfig {
  version: ApiVersion;
  deprecated?: boolean;
  deprecationDate?: Date;
  sunsetDate?: Date;
  supportedFeatures: string[];
}

export const DEFAULT_API_VERSION = ApiVersion.V1;
export const LATEST_API_VERSION = ApiVersion.V2;
