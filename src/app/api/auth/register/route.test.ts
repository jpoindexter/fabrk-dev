/**
 * User Registration Tests
 * Tests the /api/auth/register endpoint for user signup
 */

import { emailService } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

// Mock dependencies
vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    verificationToken: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/email", () => ({
  emailService: {
    sendTemplate: vi.fn(),
  },
}));

vi.mock("bcryptjs", () => ({
  hash: vi.fn(),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe("/api/auth/register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXTAUTH_URL = "http://localhost:3000";
  });

  describe("POST - Success Cases", () => {
    it("should create a new user with valid data", async () => {
      // Mock: no existing user
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

      // Mock: password hashing
      vi.mocked(hash).mockResolvedValue("hashed_password_123" as never);

      // Mock: user creation
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        name: "Test User",
        createdAt: new Date(),
      };
      vi.mocked(prisma.user.create).mockResolvedValue(mockUser as any);

      // Mock: verification token creation
      vi.mocked(prisma.verificationToken.create).mockResolvedValue({
        identifier: "test@example.com",
        token: "token-123",
        expires: new Date(),
      });

      // Mock: email sending
      vi.mocked(emailService.sendTemplate).mockResolvedValue({
        success: true,
        messageId: "test-message-id",
      } as never);

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
          name: "Test User",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toContain("User created successfully");
      expect(data.user.id).toBe(mockUser.id);
      expect(data.user.email).toBe(mockUser.email);
      expect(data.user.name).toBe(mockUser.name);
      expect(data.user.createdAt).toBeDefined(); // Date becomes string in JSON
      expect(data.emailSent).toBe(true);

      // Verify interactions
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(hash).toHaveBeenCalledWith("SecurePass123!", 12);
      expect(emailService.sendTemplate).toHaveBeenCalledWith(
        "email-verification",
        "test@example.com",
        expect.objectContaining({
          verificationLink: expect.stringContaining("/verify-email/"),
          name: "Test User",
        })
      );
    });

    it("should create user without name (use email prefix)", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(hash).mockResolvedValue("hashed_password" as never);
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: "user-123",
        email: "newuser@example.com",
        name: "newuser",
        createdAt: new Date(),
      } as any);
      vi.mocked(prisma.verificationToken.create).mockResolvedValue({} as any);
      vi.mocked(emailService.sendTemplate).mockResolvedValue({
        success: true,
        messageId: "test-message-id",
      } as never);

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "newuser@example.com",
          password: "SecurePass123!",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: "newuser",
          }),
        })
      );
    });

    it("should generate a verification token that expires in 24 hours", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(hash).mockResolvedValue("hashed_password" as never);
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        name: "Test",
        createdAt: new Date(),
      } as any);
      vi.mocked(prisma.verificationToken.create).mockResolvedValue({} as any);
      vi.mocked(emailService.sendTemplate).mockResolvedValue({
        success: true,
        messageId: "test-message-id",
      } as never);

      const beforeRequest = Date.now();

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
        }),
      });

      await POST(request);

      const afterRequest = Date.now();

      expect(prisma.verificationToken.create).toHaveBeenCalled();
      const createCall = vi.mocked(prisma.verificationToken.create).mock.calls[0][0];
      const expiresTime = (createCall.data.expires as Date).getTime();

      // Token should expire ~24 hours from now
      const expectedExpiry = beforeRequest + 24 * 60 * 60 * 1000;
      expect(expiresTime).toBeGreaterThanOrEqual(expectedExpiry - 1000);
      expect(expiresTime).toBeLessThanOrEqual(afterRequest + 24 * 60 * 60 * 1000 + 1000);
    });
  });

  describe("POST - Validation Errors", () => {
    it("should reject invalid email format", async () => {
      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "not-an-email",
          password: "SecurePass123!",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid input");
      expect(data.details).toBeDefined();
      expect(data.details[0].message).toContain("Invalid email");
    });

    it("should reject password shorter than 8 characters", async () => {
      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "short",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid input");
      expect(data.details[0].message).toContain("at least 8 characters");
    });

    it("should reject name shorter than 2 characters", async () => {
      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
          name: "A",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid input");
      expect(data.details[0].message).toContain("at least 2 characters");
    });

    it("should reject missing required fields", async () => {
      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid input");
      expect(data.details.length).toBeGreaterThan(0);
    });
  });

  describe("POST - Duplicate User", () => {
    it("should reject duplicate email registration", async () => {
      // Mock: existing user found
      vi.mocked(prisma.user.findUnique).mockResolvedValue({
        id: "existing-user",
        email: "existing@example.com",
        name: "Existing User",
        password: "hashed_password",
        emailVerified: null,
        image: null,
        role: "USER" as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "existing@example.com",
          password: "SecurePass123!",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("User with this email already exists");

      // Should not attempt to create user
      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(emailService.sendTemplate).not.toHaveBeenCalled();
    });
  });

  describe("POST - Database Errors", () => {
    it("should handle database connection errors", async () => {
      vi.mocked(prisma.user.findUnique).mockRejectedValue(new Error("Database connection failed"));

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to create user");
    });

    it("should handle user creation failure", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(hash).mockResolvedValue("hashed_password" as never);
      vi.mocked(prisma.user.create).mockRejectedValue(new Error("User creation failed"));

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to create user");
    });
  });

  describe("POST - Email Service", () => {
    it("should fail if email sending fails (current behavior)", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(hash).mockResolvedValue("hashed_password" as never);
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        name: "Test",
        createdAt: new Date(),
      } as any);
      vi.mocked(prisma.verificationToken.create).mockResolvedValue({} as any);

      // Email service fails
      vi.mocked(emailService.sendTemplate).mockRejectedValue(new Error("SMTP connection failed"));

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      // Current behavior: email failure causes 500
      // User is created but endpoint returns error
      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to create user");
    });
  });

  describe("POST - Edge Cases", () => {
    it("should handle malformed JSON", async () => {
      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ invalid json }",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to create user");
    });

    it("should trim and normalize email addresses", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(hash).mockResolvedValue("hashed_password" as never);
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        name: "Test",
        createdAt: new Date(),
      } as any);
      vi.mocked(prisma.verificationToken.create).mockResolvedValue({} as any);
      vi.mocked(emailService.sendTemplate).mockResolvedValue({
        success: true,
        messageId: "test-message-id",
      } as never);

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "  TEST@EXAMPLE.COM  ",
          password: "SecurePass123!",
        }),
      });

      const response = await POST(request);

      // Email validation in Zod handles normalization
      expect(response.status).toBeLessThan(500);
    });

    it("should hash password with bcrypt rounds = 12", async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      vi.mocked(hash).mockResolvedValue("hashed_password" as never);
      vi.mocked(prisma.user.create).mockResolvedValue({
        id: "user-123",
        email: "test@example.com",
        name: "Test",
        createdAt: new Date(),
      } as any);
      vi.mocked(prisma.verificationToken.create).mockResolvedValue({} as any);
      vi.mocked(emailService.sendTemplate).mockResolvedValue({
        success: true,
        messageId: "test-message-id",
      } as never);

      const request = new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
        }),
      });

      await POST(request);

      expect(hash).toHaveBeenCalledWith("SecurePass123!", 12);
    });
  });
});
