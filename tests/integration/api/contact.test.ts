import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";
import * as emailLib from "@/lib/email";

// Mock the dependencies
vi.mock("@/lib/email", () => ({
  sendEmail: vi.fn(),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Contact API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send an email on valid request", async () => {
    // Setup mock success
    (emailLib.sendEmail as any).mockResolvedValue({ success: true });

    const body = {
      name: "Test User",
      email: "test@example.com",
      subject: "support",
      message: "This is a test message with more than 10 characters.",
    };

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(emailLib.sendEmail).toHaveBeenCalled();
  });

  it("should return 400 for invalid input", async () => {
    const body = {
      name: "", // Invalid
      email: "not-an-email", // Invalid
      // Missing subject
      message: "Short", // Invalid
    };

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Validation failed");
  });
});
