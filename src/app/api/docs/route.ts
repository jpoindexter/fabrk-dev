/**
 * OpenAPI Specification Endpoint
 *
 * Serves the OpenAPI spec at /api/docs
 * Can be used with Swagger UI or other OpenAPI tools
 */

import { NextResponse } from "next/server";
import { openAPISpec } from "@/lib/openapi/spec";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(openAPISpec, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
