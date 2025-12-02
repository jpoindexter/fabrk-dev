/**
 * Feature Flags Unit Tests
 * Tests for feature flag system functions
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  initFeatureFlags,
  isFeatureEnabled,
  getFeatureVariant,
  getFeatureValue,
  getEnabledFlags,
  updateFeatureFlag,
  enableFeature,
  disableFeature,
  setRolloutPercentage,
  getAllFlags,
  exportFlags,
  importFlags,
  FeatureFlags,
} from "./index";

// Mock logger
vi.mock("@/lib/logger", () => ({
  logger: {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("Feature Flags", () => {
  beforeEach(() => {
    // Reset flags to default state before each test
    initFeatureFlags({
      test_flag: { enabled: true },
      disabled_flag: { enabled: false },
      rollout_flag: { enabled: true, rolloutPercentage: 50 },
      env_flag: { enabled: true, environments: ["development"] },
      user_targeted: { enabled: true, targetUsers: ["user123"] },
      role_targeted: { enabled: true, targetRoles: ["admin"] },
      variant_flag: {
        enabled: true,
        variants: { a: "variant_a", b: "variant_b" },
      },
    });
  });

  describe("isFeatureEnabled", () => {
    it("should return true for enabled flag", () => {
      expect(isFeatureEnabled("test_flag")).toBe(true);
    });

    it("should return false for disabled flag", () => {
      expect(isFeatureEnabled("disabled_flag")).toBe(false);
    });

    it("should return false for non-existent flag", () => {
      expect(isFeatureEnabled("non_existent")).toBe(false);
    });

    it("should check environment targeting", () => {
      expect(isFeatureEnabled("env_flag", { environment: "development" })).toBe(true);
      expect(isFeatureEnabled("env_flag", { environment: "production" })).toBe(false);
    });

    it("should check user targeting", () => {
      expect(isFeatureEnabled("user_targeted", { userId: "user123" })).toBe(true);
      expect(isFeatureEnabled("user_targeted", { userId: "other_user" })).toBe(false);
    });

    it("should check role targeting", () => {
      expect(isFeatureEnabled("role_targeted", { role: "admin" })).toBe(true);
      expect(isFeatureEnabled("role_targeted", { role: "user" })).toBe(false);
    });

    it("should handle rollout percentage (requires userId)", () => {
      // Without userId, rollout flags return false
      expect(isFeatureEnabled("rollout_flag")).toBe(false);

      // With userId, result depends on hash
      const result = isFeatureEnabled("rollout_flag", { userId: "test_user" });
      expect(typeof result).toBe("boolean");
    });

    it("should check expiration", () => {
      initFeatureFlags({
        expired_flag: {
          enabled: true,
          expiresAt: new Date("2020-01-01"),
        },
      });
      expect(isFeatureEnabled("expired_flag")).toBe(false);
    });
  });

  describe("getFeatureVariant", () => {
    it("should return variant for user", () => {
      const variant = getFeatureVariant("variant_flag", { userId: "test_user" });
      expect(["a", "b"]).toContain(variant);
    });

    it("should return null without userId", () => {
      expect(getFeatureVariant("variant_flag")).toBeNull();
    });

    it("should return null for disabled flag", () => {
      expect(getFeatureVariant("disabled_flag", { userId: "test_user" })).toBeNull();
    });

    it("should return null for flag without variants", () => {
      expect(getFeatureVariant("test_flag", { userId: "test_user" })).toBeNull();
    });

    it("should return consistent variant for same user", () => {
      const variant1 = getFeatureVariant("variant_flag", { userId: "user_x" });
      const variant2 = getFeatureVariant("variant_flag", { userId: "user_x" });
      expect(variant1).toBe(variant2);
    });
  });

  describe("getFeatureValue", () => {
    it("should return variant value", () => {
      const value = getFeatureValue("variant_flag", { userId: "test_user" });
      expect(["variant_a", "variant_b"]).toContain(value);
    });

    it("should return default value for disabled flag", () => {
      const value = getFeatureValue("disabled_flag", {}, "default");
      expect(value).toBe("default");
    });

    it("should return null without default", () => {
      const value = getFeatureValue("disabled_flag", {});
      expect(value).toBeNull();
    });
  });

  describe("getEnabledFlags", () => {
    it("should return list of enabled flags", () => {
      const enabled = getEnabledFlags();
      expect(enabled).toContain("test_flag");
      expect(enabled).not.toContain("disabled_flag");
    });

    it("should filter by context", () => {
      const enabled = getEnabledFlags({ environment: "development" });
      expect(enabled).toContain("env_flag");
    });
  });

  describe("updateFeatureFlag", () => {
    it("should update flag properties", () => {
      updateFeatureFlag("test_flag", { enabled: false });
      expect(isFeatureEnabled("test_flag")).toBe(false);
    });

    it("should merge with existing properties", () => {
      updateFeatureFlag("test_flag", { description: "Updated" });
      const flags = getAllFlags();
      expect(flags.test_flag.description).toBe("Updated");
      expect(flags.test_flag.enabled).toBe(true);
    });
  });

  describe("enableFeature / disableFeature", () => {
    it("should enable a flag", () => {
      disableFeature("test_flag");
      expect(isFeatureEnabled("test_flag")).toBe(false);

      enableFeature("test_flag");
      expect(isFeatureEnabled("test_flag")).toBe(true);
    });

    it("should disable a flag", () => {
      expect(isFeatureEnabled("test_flag")).toBe(true);

      disableFeature("test_flag");
      expect(isFeatureEnabled("test_flag")).toBe(false);
    });
  });

  describe("setRolloutPercentage", () => {
    it("should set rollout percentage", () => {
      setRolloutPercentage("test_flag", 75);
      const flags = getAllFlags();
      expect(flags.test_flag.rolloutPercentage).toBe(75);
    });

    it("should throw for invalid percentage", () => {
      expect(() => setRolloutPercentage("test_flag", -1)).toThrow();
      expect(() => setRolloutPercentage("test_flag", 101)).toThrow();
    });

    it("should accept boundary values", () => {
      expect(() => setRolloutPercentage("test_flag", 0)).not.toThrow();
      expect(() => setRolloutPercentage("test_flag", 100)).not.toThrow();
    });
  });

  describe("getAllFlags", () => {
    it("should return all flags", () => {
      const flags = getAllFlags();
      expect(flags).toHaveProperty("test_flag");
      expect(flags).toHaveProperty("disabled_flag");
    });

    it("should return all flag objects", () => {
      const flags = getAllFlags();
      expect(Object.keys(flags).length).toBeGreaterThan(0);
      expect(flags.test_flag.key).toBe("test_flag");
    });
  });

  describe("exportFlags / importFlags", () => {
    it("should export flags to JSON", () => {
      const json = exportFlags();
      const parsed = JSON.parse(json);
      expect(parsed).toHaveProperty("test_flag");
    });

    it("should import flags from JSON", () => {
      const customFlags = {
        imported_flag: { key: "imported_flag", enabled: true },
      };
      importFlags(JSON.stringify(customFlags));

      expect(isFeatureEnabled("imported_flag")).toBe(true);
    });

    it("should handle invalid JSON gracefully", () => {
      expect(() => importFlags("invalid json")).not.toThrow();
    });
  });

  describe("FeatureFlags constants", () => {
    it("should have predefined flag keys", () => {
      expect(FeatureFlags.NEW_DASHBOARD).toBe("new_dashboard");
      expect(FeatureFlags.AI_FEATURES).toBe("ai_features");
      expect(FeatureFlags.DARK_MODE).toBe("dark_mode");
    });
  });
});
