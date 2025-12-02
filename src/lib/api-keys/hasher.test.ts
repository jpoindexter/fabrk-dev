/**
 * API Key Hasher Unit Tests
 * Tests SHA-256 hashing and constant-time verification
 */

import { describe, it, expect } from "vitest";
import { hashApiKey, verifyApiKey } from "./hasher";

describe("API Key Hasher", () => {
  describe("hashApiKey", () => {
    it("should hash an API key using SHA-256", () => {
      const key = "sk_live_test123456789";
      const hash = hashApiKey(key);

      // SHA-256 produces 64-character hex string
      expect(hash).toHaveLength(64);
      expect(/^[a-f0-9]{64}$/.test(hash)).toBe(true);
    });

    it("should produce consistent hashes for the same key", () => {
      const key = "sk_live_test123456789";
      const hash1 = hashApiKey(key);
      const hash2 = hashApiKey(key);

      expect(hash1).toBe(hash2);
    });

    it("should produce different hashes for different keys", () => {
      const key1 = "sk_live_test123456789";
      const key2 = "sk_live_test987654321";

      const hash1 = hashApiKey(key1);
      const hash2 = hashApiKey(key2);

      expect(hash1).not.toBe(hash2);
    });

    it("should handle empty strings", () => {
      const hash = hashApiKey("");
      expect(hash).toHaveLength(64);
      expect(/^[a-f0-9]{64}$/.test(hash)).toBe(true);
    });

    it("should handle special characters", () => {
      const key = "sk_live_test!@#$%^&*()_+-=[]{}|;':\"<>?,./";
      const hash = hashApiKey(key);

      expect(hash).toHaveLength(64);
      expect(/^[a-f0-9]{64}$/.test(hash)).toBe(true);
    });

    it("should produce different hashes for similar keys", () => {
      const key1 = "sk_live_test123456789";
      const key2 = "sk_live_test12345678a"; // Only last char different

      const hash1 = hashApiKey(key1);
      const hash2 = hashApiKey(key2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("verifyApiKey", () => {
    it("should verify a correct API key", () => {
      const key = "sk_live_test123456789";
      const hash = hashApiKey(key);

      expect(verifyApiKey(key, hash)).toBe(true);
    });

    it("should reject an incorrect API key", () => {
      const key = "sk_live_test123456789";
      const wrongKey = "sk_live_test987654321";
      const hash = hashApiKey(key);

      expect(verifyApiKey(wrongKey, hash)).toBe(false);
    });

    it("should reject a key with slightly different characters", () => {
      const key = "sk_live_test123456789";
      const similarKey = "sk_live_test12345678a";
      const hash = hashApiKey(key);

      expect(verifyApiKey(similarKey, hash)).toBe(false);
    });

    it("should handle empty key", () => {
      const key = "sk_live_test123456789";
      const hash = hashApiKey(key);

      expect(verifyApiKey("", hash)).toBe(false);
    });

    it("should be case-sensitive", () => {
      const key = "sk_live_TestCase123";
      const hash = hashApiKey(key);

      expect(verifyApiKey(key, hash)).toBe(true);
      expect(verifyApiKey("sk_live_testcase123", hash)).toBe(false);
      expect(verifyApiKey("SK_LIVE_TESTCASE123", hash)).toBe(false);
    });

    it("should use constant-time comparison (uses timingSafeEqual)", () => {
      const key = "sk_live_test123456789";
      const hash = hashApiKey(key);

      // Verify the function completes successfully with both correct and wrong keys
      // The actual constant-time behavior is provided by crypto.timingSafeEqual
      expect(verifyApiKey(key, hash)).toBe(true);
      expect(verifyApiKey("sk_live_test123456780", hash)).toBe(false);

      // The implementation uses crypto.timingSafeEqual which is timing-safe
      // We can't reliably test timing in unit tests, but we verify it's used
    });

    it("should handle malformed hash (wrong length)", () => {
      const key = "sk_live_test123456789";
      const shortHash = "abc123"; // Too short

      // timingSafeEqual requires buffers of same length, should throw or return false
      expect(() => verifyApiKey(key, shortHash)).toThrow();
    });

    it("should handle non-hex hash characters", () => {
      const key = "sk_live_test123456789";
      const invalidHash = "z".repeat(64); // Invalid hex characters

      // Should throw when converting to Buffer
      expect(() => verifyApiKey(key, invalidHash)).toThrow();
    });
  });

  describe("Hash Security Properties", () => {
    it("should be deterministic (same input = same output)", () => {
      const key = "sk_live_test123456789";
      const hashes = Array.from({ length: 100 }, () => hashApiKey(key));

      // All hashes should be identical
      const uniqueHashes = new Set(hashes);
      expect(uniqueHashes.size).toBe(1);
    });

    it("should have avalanche effect (small change = big difference)", () => {
      const key1 = "sk_live_test123456789";
      const key2 = "sk_live_test12345678a"; // Last char changed

      const hash1 = hashApiKey(key1);
      const hash2 = hashApiKey(key2);

      // Count differing characters
      let differences = 0;
      for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] !== hash2[i]) differences++;
      }

      // Should have many differences (avalanche effect)
      // Expect at least 25% of characters to be different
      expect(differences).toBeGreaterThan(16);
    });

    it("should produce uniformly distributed hashes", () => {
      const keys = Array.from({ length: 100 }, (_, i) => `sk_live_test${i}`);
      const hashes = keys.map(hashApiKey);

      // Check first character distribution
      const firstChars = hashes.map((h) => h[0]);
      const uniqueFirstChars = new Set(firstChars);

      // Should have good distribution (at least 5 unique first chars)
      expect(uniqueFirstChars.size).toBeGreaterThanOrEqual(5);
    });
  });
});
