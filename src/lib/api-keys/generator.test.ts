/**
 * API Key Generator Unit Tests
 * Tests cryptographically secure API key generation and validation
 */

import { describe, it, expect } from "vitest";
import { generateApiKey, isValidApiKeyFormat } from "./generator";
import { verifyApiKey } from "./hasher";

describe("API Key Generator", () => {
  describe("generateApiKey", () => {
    it("should generate a valid API key with live prefix", () => {
      const result = generateApiKey("live");

      expect(result.key).toContain("sk_live_");
      expect(result.key.length).toBeGreaterThan(50);
      expect(result.prefix).toBe(result.key.substring(0, 12));
      expect(result.hash).toHaveLength(64); // SHA-256 hash
    });

    it("should generate a valid API key with test prefix", () => {
      const result = generateApiKey("test");

      expect(result.key).toContain("sk_test_");
      expect(result.key.length).toBeGreaterThan(50);
      expect(result.prefix).toBe(result.key.substring(0, 12));
      expect(result.hash).toHaveLength(64);
    });

    it("should default to live environment", () => {
      const result = generateApiKey();

      expect(result.key).toContain("sk_live_");
    });

    it("should generate unique keys on each call", () => {
      const keys = new Set<string>();

      for (let i = 0; i < 100; i++) {
        const result = generateApiKey();
        keys.add(result.key);
      }

      // All 100 keys should be unique
      expect(keys.size).toBe(100);
    });

    it("should generate keys with valid base64url characters", () => {
      const result = generateApiKey();
      const keyBody = result.key.substring(8); // Remove "sk_live_" or "sk_test_"

      // Base64url pattern: A-Z, a-z, 0-9, -, _
      const base64urlPattern = /^[A-Za-z0-9_-]+$/;
      expect(base64urlPattern.test(keyBody)).toBe(true);
    });

    it("should not contain padding characters (=)", () => {
      for (let i = 0; i < 50; i++) {
        const result = generateApiKey();
        expect(result.key).not.toContain("=");
      }
    });

    it("should generate keys with correct prefix length (12 chars)", () => {
      const resultLive = generateApiKey("live");
      const resultTest = generateApiKey("test");

      expect(resultLive.prefix).toHaveLength(12);
      expect(resultTest.prefix).toHaveLength(12);
      expect(resultLive.prefix).toBe("sk_live_" + resultLive.key.substring(8, 12));
      expect(resultTest.prefix).toBe("sk_test_" + resultTest.key.substring(8, 12));
    });

    it("should generate hash that verifies the key", () => {
      const result = generateApiKey();

      // The hash should verify the key
      expect(verifyApiKey(result.key, result.hash)).toBe(true);
    });

    it("should generate different hashes for different keys", () => {
      const result1 = generateApiKey();
      const result2 = generateApiKey();

      expect(result1.hash).not.toBe(result2.hash);
    });

    it("should generate cryptographically random keys", () => {
      const keys = Array.from({ length: 100 }, () => generateApiKey().key);

      // Check character distribution
      const allChars = keys.join("");
      const charCounts: Record<string, number> = {};

      for (const char of allChars) {
        charCounts[char] = (charCounts[char] || 0) + 1;
      }

      // Should have good distribution of characters
      const uniqueChars = Object.keys(charCounts).length;
      expect(uniqueChars).toBeGreaterThan(40); // Should use many different chars
    });

    it("should generate keys with 256 bits of entropy (32 bytes)", () => {
      const result = generateApiKey();
      const keyBody = result.key.substring(8); // Remove prefix

      // 32 bytes = 43 base64 characters (rounded up)
      // Base64url encoding: 32 bytes → ~43 chars
      expect(keyBody.length).toBeGreaterThanOrEqual(42);
      expect(keyBody.length).toBeLessThanOrEqual(44);
    });
  });

  describe("isValidApiKeyFormat", () => {
    it("should validate a correctly formatted live key", () => {
      const result = generateApiKey("live");
      expect(isValidApiKeyFormat(result.key)).toBe(true);
    });

    it("should validate a correctly formatted test key", () => {
      const result = generateApiKey("test");
      expect(isValidApiKeyFormat(result.key)).toBe(true);
    });

    it("should reject key without correct prefix", () => {
      expect(isValidApiKeyFormat("invalid_prefix_abc123")).toBe(false);
      expect(isValidApiKeyFormat("api_key_abc123")).toBe(false);
      expect(isValidApiKeyFormat("sk_abc123")).toBe(false); // Missing live/test
    });

    it("should reject key that is too short", () => {
      expect(isValidApiKeyFormat("sk_live_short")).toBe(false);
      expect(isValidApiKeyFormat("sk_test_abc123")).toBe(false);
    });

    it("should reject key with invalid characters", () => {
      const invalidKey = "sk_live_" + "a".repeat(42) + "!@#$%";
      expect(isValidApiKeyFormat(invalidKey)).toBe(false);
    });

    it("should reject key with spaces", () => {
      const keyWithSpace = "sk_live_" + "a".repeat(20) + " " + "b".repeat(20);
      expect(isValidApiKeyFormat(keyWithSpace)).toBe(false);
    });

    it("should reject key with padding characters", () => {
      const keyWithPadding = "sk_live_" + "a".repeat(40) + "==";
      expect(isValidApiKeyFormat(keyWithPadding)).toBe(false);
    });

    it("should accept key with hyphens and underscores (base64url)", () => {
      const validKey = "sk_live_" + "a".repeat(20) + "-_" + "b".repeat(20);
      expect(isValidApiKeyFormat(validKey)).toBe(true);
    });

    it("should reject empty string", () => {
      expect(isValidApiKeyFormat("")).toBe(false);
    });

    it("should validate minimum key length (50 chars)", () => {
      // 50 chars = 8 (prefix) + 42 (base64url for 32 bytes)
      const minValidKey = "sk_live_" + "a".repeat(42);
      expect(isValidApiKeyFormat(minValidKey)).toBe(true);

      const tooShort = "sk_live_" + "a".repeat(41);
      expect(isValidApiKeyFormat(tooShort)).toBe(false);
    });

    it("should accept longer keys (future-proof)", () => {
      const longKey = "sk_live_" + "a".repeat(100);
      expect(isValidApiKeyFormat(longKey)).toBe(true);
    });

    it("should be case-sensitive for prefix", () => {
      const uppercasePrefix = "SK_LIVE_" + "a".repeat(42);
      expect(isValidApiKeyFormat(uppercasePrefix)).toBe(false);

      const mixedCasePrefix = "Sk_Live_" + "a".repeat(42);
      expect(isValidApiKeyFormat(mixedCasePrefix)).toBe(false);
    });

    it("should allow both uppercase and lowercase in key body", () => {
      const mixedCaseBody = "sk_live_" + "AaBbCcDd" + "a".repeat(34);
      expect(isValidApiKeyFormat(mixedCaseBody)).toBe(true);
    });

    it("should validate all generated keys", () => {
      for (let i = 0; i < 50; i++) {
        const liveKey = generateApiKey("live");
        const testKey = generateApiKey("test");

        expect(isValidApiKeyFormat(liveKey.key)).toBe(true);
        expect(isValidApiKeyFormat(testKey.key)).toBe(true);
      }
    });
  });

  describe("Key Format Edge Cases", () => {
    it("should handle extra whitespace (reject)", () => {
      const keyWithWhitespace = " sk_live_" + "a".repeat(42);
      expect(isValidApiKeyFormat(keyWithWhitespace)).toBe(false);

      const keyWithTrailingSpace = "sk_live_" + "a".repeat(42) + " ";
      expect(isValidApiKeyFormat(keyWithTrailingSpace)).toBe(false);
    });

    it("should reject key with newlines", () => {
      const keyWithNewline = "sk_live_" + "a".repeat(20) + "\n" + "b".repeat(20);
      expect(isValidApiKeyFormat(keyWithNewline)).toBe(false);
    });

    it("should reject key with tabs", () => {
      const keyWithTab = "sk_live_" + "a".repeat(20) + "\t" + "b".repeat(20);
      expect(isValidApiKeyFormat(keyWithTab)).toBe(false);
    });

    it("should handle Unicode characters (reject)", () => {
      const keyWithUnicode = "sk_live_" + "a".repeat(20) + "😀" + "b".repeat(20);
      expect(isValidApiKeyFormat(keyWithUnicode)).toBe(false);
    });

    it("should validate exact character set for body", () => {
      // Valid: A-Z, a-z, 0-9, -, _
      const allValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
      const keyWithAllValid = "sk_live_" + allValidChars.repeat(2);
      expect(isValidApiKeyFormat(keyWithAllValid)).toBe(true);

      // Invalid characters
      const invalidChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "/"];
      for (const char of invalidChars) {
        const keyWithInvalid = "sk_live_" + "a".repeat(40) + char + "b";
        expect(isValidApiKeyFormat(keyWithInvalid)).toBe(false);
      }
    });
  });

  describe("Key Security Properties", () => {
    it("should have high entropy (randomness)", () => {
      const keys = Array.from({ length: 100 }, () => generateApiKey().key);

      // No duplicate keys
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(100);

      // Check for patterns (no repeating sequences)
      for (const key of keys) {
        const keyBody = key.substring(8);

        // Should not have long repeating patterns
        const hasLongRepeat = /(.{3,})\1{2,}/.test(keyBody);
        expect(hasLongRepeat).toBe(false);
      }
    });

    it("should not be predictable from prefix", () => {
      const keys = Array.from({ length: 100 }, () => generateApiKey("live"));
      const prefixes = keys.map((k) => k.prefix);
      const fullKeys = keys.map((k) => k.key);

      // Same prefix format should not lead to predictable keys
      const uniquePrefixes = new Set(prefixes);
      const uniqueFullKeys = new Set(fullKeys);

      expect(uniqueFullKeys.size).toBe(100); // All unique
      expect(uniquePrefixes.size).toBeGreaterThan(90); // Prefixes mostly unique
    });

    it("should maintain entropy across multiple generations", () => {
      const batch1 = Array.from({ length: 50 }, () => generateApiKey());
      const batch2 = Array.from({ length: 50 }, () => generateApiKey());

      const allKeys = [...batch1, ...batch2].map((k) => k.key);
      const uniqueKeys = new Set(allKeys);

      // All keys should be unique
      expect(uniqueKeys.size).toBe(100);
    });
  });
});
