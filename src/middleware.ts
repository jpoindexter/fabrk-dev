/**
 * Middleware for CSP nonce injection.
 *
 * This file handles:
 * - CSP nonce generation for security headers
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';

export function middleware(req: NextRequest) {
  // Generate nonce for CSP
  const nonce = generateNonce();
  const response = NextResponse.next();

  // Inject nonce into request headers for server components
  response.headers.set(getNonceHeaderName(), nonce);

  // Update CSP header with actual nonce (only in production)
  if (process.env.NODE_ENV === 'production') {
    const cspHeader = response.headers.get('Content-Security-Policy');
    if (cspHeader) {
      response.headers.set(
        'Content-Security-Policy',
        cspHeader.replace(/nonce-NONCE_PLACEHOLDER/g, `nonce-${nonce}`)
      );
    }
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
