/**
 * Type definitions for API middleware
 */

import { NextRequest, NextResponse } from "next/server";
import { ApiVersion } from "./versioning";

export interface ApiMiddlewareOptions {
  requireAuth?: boolean;
  csrf?: boolean; // CSRF protection (enabled by default)
  rateLimit?: {
    requests: number;
    windowMs: number;
  };
  cors?: {
    origin: string | string[] | boolean;
    methods: string[];
    headers: string[];
  };
}

export interface ApiContext {
  version: ApiVersion;
  user?: unknown;
  rateLimit?: {
    remaining: number;
    reset: Date;
  };
}

export interface AuthResult {
  authenticated: boolean;
  user?: unknown;
  error?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: Date;
}

export type ApiHandler = (
  request: NextRequest,
  context: ApiContext
) => Promise<NextResponse> | NextResponse;

export type VersionedHandlers = {
  [K in ApiVersion]?: ApiHandler;
};
