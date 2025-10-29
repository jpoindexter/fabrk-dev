/**
 * Data transformation utilities for API versions
 */

import { ApiVersion } from "./versioning-types";

/**
 * Handle version compatibility
 */
export function handleVersionCompatibility(
  data: unknown,
  fromVersion: ApiVersion,
  toVersion: ApiVersion
): unknown {
  // If versions are the same, no transformation needed
  if (fromVersion === toVersion) {
    return data;
  }

  // Handle transformations between versions
  return transformDataForVersion(data, toVersion);
}

/**
 * Transform data structure for specific version
 */
function transformDataForVersion(data: unknown, version: ApiVersion): unknown {
  switch (version) {
    case ApiVersion.V1:
      // Transform to V1 format (simpler structure)
      if (Array.isArray(data)) {
        return data.map((item) => transformItemToV1(item));
      }
      return transformItemToV1(data);

    case ApiVersion.V2:
      // Transform to V2 format (enhanced structure)
      if (Array.isArray(data)) {
        return data.map((item) => transformItemToV2(item));
      }
      return transformItemToV2(data);

    default:
      return data;
  }
}

/**
 * Transform item to V1 format
 */
function transformItemToV1(item: unknown): unknown {
  if (!item || typeof item !== "object") return item;

  const itemObj = item as any;

  // Remove V2-only fields
  const { metadata: _metadata, relations: _relations, ...v1Item } = itemObj;

  // Transform nested objects
  if (v1Item.user) {
    v1Item.user = {
      id: v1Item.user.id,
      name: v1Item.user.name,
      email: v1Item.user.email,
    };
  }

  return v1Item;
}

/**
 * Transform item to V2 format
 */
function transformItemToV2(item: unknown): unknown {
  if (!item || typeof item !== "object") return item;

  const itemObj = item as any;

  // Add V2 enhancements
  return {
    ...itemObj,
    metadata: itemObj.metadata || {
      createdAt: itemObj.createdAt || new Date().toISOString(),
      updatedAt: itemObj.updatedAt || new Date().toISOString(),
    },
    relations: itemObj.relations || {},
  };
}
