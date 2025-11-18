/**
 * Health Check API
 * Endpoint for monitoring and health checks
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { env } from "@/lib/env";

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
        version: env.client.NEXT_PUBLIC_APP_VERSION,
        environment: env.server.NODE_ENV,
        checks: {
          database: "connected",
          server: "running",
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error("[Health Check] Error:", error);

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        service: "fabrk",
        checks: {
          database: "disconnected",
          server: "running",
        },
        // Only expose error details in development
        ...(env.server.NODE_ENV === "development" && {
          error: error instanceof Error ? error.message : "Unknown error",
        }),
      },
      { status: 503 }
    );
  }
}
