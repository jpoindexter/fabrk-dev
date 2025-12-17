/**
 * Proxy for CSP nonce injection and CSRF token management.
 *
 * This file handles:
 * - CSP nonce generation for security headers
 * - CSRF token cookie for form submissions
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Generate CSRF token using Web Crypto API (Edge Runtime compatible)
 */
function generateCsrfTokenEdge(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  // Convert to base64url
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Simple validation - just check if token exists and has reasonable length
 * Full HMAC validation happens in the API route handlers
 */
function hasValidCsrfCookie(token: string | undefined): boolean {
  return !!token && token.length >= 32;
}

export function proxy(req: NextRequest) {
  // Generate nonce for CSP
  const nonce = generateNonce();
  const response = NextResponse.next();

  // Inject nonce into request headers for server components
  response.headers.set(getNonceHeaderName(), nonce);

  // Update CSP header with actual nonce
  const cspHeader = response.headers.get('Content-Security-Policy');
  if (cspHeader) {
    response.headers.set(
      'Content-Security-Policy',
      cspHeader.replace(/nonce-NONCE_PLACEHOLDER/g, `nonce-${nonce}`)
    );
  }

  // Ensure CSRF token cookie exists
  const existingCsrfToken = req.cookies.get(CSRF_COOKIE_NAME)?.value;
  if (!hasValidCsrfCookie(existingCsrfToken)) {
    const newToken = generateCsrfTokenEdge();
    response.cookies.set(CSRF_COOKIE_NAME, newToken, {
      httpOnly: false, // Must be readable by JavaScript for fetch headers
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all items inside /public (images, favicon, etc.)
  matcher: ['/((?!api|_next|_static|.*\\..*|favicon.ico).*)'],
};
