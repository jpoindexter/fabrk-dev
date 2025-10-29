/**
 * Email Verification Tests
 * Tests the /api/auth/verify-email endpoint
 */

import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    verificationToken: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
    user: {
      update: vi.fn(),
    },
  },
}));

// Mock rate limiter to always allow requests
vi.mock("@/lib/rate-limit/middleware", () => ({
  withRateLimit: (handler: any) => handler,
}));

describe("/api/auth/verify-email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET - Success Cases", () => {
    it("should verify email with valid token", async () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Mock: valid token found
      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "valid-token-123",
        expires: futureDate,
      });

      // Mock: user update
      vi.mocked(prisma.user.update).mockResolvedValue({
        id: "user-123",
        email: "user@example.com",
        emailVerified: new Date(),
      } as any);

      // Mock: token deletion
      vi.mocked(prisma.verificationToken.delete).mockResolvedValue({
        identifier: "user@example.com",
        token: "valid-token-123",
        expires: futureDate,
      });

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=valid-token-123")
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Email verified successfully");

      // Verify interactions
      expect(prisma.verificationToken.findUnique).toHaveBeenCalledWith({
        where: { token: "valid-token-123" },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email: "user@example.com" },
        data: { emailVerified: expect.any(Date) },
      });
      expect(prisma.verificationToken.delete).toHaveBeenCalledWith({
        where: { token: "valid-token-123" },
      });
    });

    it("should set emailVerified to current timestamp", async () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const beforeRequest = Date.now();

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "valid-token-123",
        expires: futureDate,
      });

      vi.mocked(prisma.user.update).mockResolvedValue({
        id: "user-123",
        email: "user@example.com",
        emailVerified: new Date(),
      } as any);

      vi.mocked(prisma.verificationToken.delete).mockResolvedValue({} as any);

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=valid-token-123")
      );

      await GET(request);

      const afterRequest = Date.now();

      expect(prisma.user.update).toHaveBeenCalled();
      const updateCall = vi.mocked(prisma.user.update).mock.calls[0][0];
      const verifiedTime = (updateCall.data.emailVerified as Date).getTime();

      expect(verifiedTime).toBeGreaterThanOrEqual(beforeRequest);
      expect(verifiedTime).toBeLessThanOrEqual(afterRequest);
    });
  });

  describe("GET - Validation Errors", () => {
    it("should reject request without token parameter", async () => {
      const request = new NextRequest(new URL("http://localhost/api/auth/verify-email"));

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Token is required");

      // Should not attempt database queries
      expect(prisma.verificationToken.findUnique).not.toHaveBeenCalled();
    });

    it("should reject empty token parameter", async () => {
      const request = new NextRequest(new URL("http://localhost/api/auth/verify-email?token="));

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Token is required");
    });
  });

  describe("GET - Invalid Token", () => {
    it("should reject non-existent token", async () => {
      // Mock: token not found
      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue(null);

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=invalid-token")
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe("Invalid or expired verification token");

      // Should not attempt user update
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it("should reject already-used token", async () => {
      // Mock: token was already used (not found in database)
      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue(null);

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=used-token-123")
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe("Invalid or expired verification token");
    });
  });

  describe("GET - Expired Token", () => {
    it("should reject expired token", async () => {
      const pastDate = new Date(Date.now() - 1000); // 1 second ago

      // Mock: expired token found
      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "expired-token-123",
        expires: pastDate,
      });

      // Mock: token deletion
      vi.mocked(prisma.verificationToken.delete).mockResolvedValue({} as any);

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=expired-token-123")
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Verification token has expired");

      // Should delete expired token
      expect(prisma.verificationToken.delete).toHaveBeenCalledWith({
        where: { token: "expired-token-123" },
      });

      // Should not update user
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it("should delete expired token before returning error", async () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "old-token",
        expires: pastDate,
      });

      vi.mocked(prisma.verificationToken.delete).mockResolvedValue({} as any);

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=old-token")
      );

      await GET(request);

      // Verify delete was called
      expect(prisma.verificationToken.delete).toHaveBeenCalledWith({
        where: { token: "old-token" },
      });
    });

    it("should handle token that expires exactly now", async () => {
      const now = new Date();

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "expires-now",
        expires: now,
      });

      vi.mocked(prisma.verificationToken.delete).mockResolvedValue({} as any);

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=expires-now")
      );

      vi.mocked(prisma.user.update).mockResolvedValue({} as any);

      const response = await GET(request);

      // Token expires exactly at current time
      // Code checks: if (expires < now) - so equal means NOT expired (edge case)
      // But in practice, the Date objects are created at slightly different times
      // Real behavior: this becomes expired because new Date() is later
      expect(response.status).toBe(400);
    });
  });

  describe("GET - Database Errors", () => {
    it("should handle database connection errors", async () => {
      vi.mocked(prisma.verificationToken.findUnique).mockRejectedValue(
        new Error("Database connection failed")
      );

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=valid-token")
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });

    it("should handle user update failure", async () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "valid-token",
        expires: futureDate,
      });

      // User update fails (e.g., user was deleted)
      vi.mocked(prisma.user.update).mockRejectedValue(new Error("User not found"));

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=valid-token")
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });

    it("should handle token deletion failure after expiry check", async () => {
      const pastDate = new Date(Date.now() - 1000);

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "expired-token",
        expires: pastDate,
      });

      // Deletion fails
      vi.mocked(prisma.verificationToken.delete).mockRejectedValue(new Error("Delete failed"));

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=expired-token")
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBeDefined();
    });
  });

  describe("GET - Edge Cases", () => {
    it("should handle very long token strings", async () => {
      const longToken = "a".repeat(1000);

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue(null);

      const request = new NextRequest(
        new URL(`http://localhost/api/auth/verify-email?token=${longToken}`)
      );

      const response = await GET(request);

      // Should handle gracefully
      expect(response.status).toBe(404);
    });

    it("should handle special characters in token", async () => {
      const specialToken = "token-with-special-chars-!@#$%";

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue(null);

      const request = new NextRequest(
        new URL(`http://localhost/api/auth/verify-email?token=${encodeURIComponent(specialToken)}`)
      );

      const response = await GET(request);

      expect(prisma.verificationToken.findUnique).toHaveBeenCalledWith({
        where: { token: specialToken },
      });
    });

    it("should clean up token even if user update succeeds", async () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      vi.mocked(prisma.verificationToken.findUnique).mockResolvedValue({
        identifier: "user@example.com",
        token: "valid-token",
        expires: futureDate,
      });

      vi.mocked(prisma.user.update).mockResolvedValue({} as any);
      vi.mocked(prisma.verificationToken.delete).mockResolvedValue({} as any);

      const request = new NextRequest(
        new URL("http://localhost/api/auth/verify-email?token=valid-token")
      );

      await GET(request);

      // Token should be deleted after successful verification
      expect(prisma.verificationToken.delete).toHaveBeenCalledWith({
        where: { token: "valid-token" },
      });
    });
  });
});
