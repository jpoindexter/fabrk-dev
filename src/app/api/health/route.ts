/**
 * Health Check API
 * Endpoint for monitoring and health checks
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "fabrk",
        version: process.env.npm_package_version || "1.0.0",
        environment: process.env.NODE_ENV,
        checks: {
          database: "connected",
          server: "running",
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[Health Check] Error:", error);

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        service: "fabrk",
        checks: {
          database: "disconnected",
          server: "running",
        },
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
