/**
 * Middleware for authentication and CSP nonce injection.
 *
 * Note: Despite Next.js 16 deprecation warnings, middleware.ts is required for Auth.js v5.
 * Auth.js middleware wrapper cannot be migrated to next.config.ts proxy feature.
 * See: https://next-auth.js.org/deployment/nextjs
 *
 * This file handles:
 * - Authentication protection for dashboard routes
 * - CSP nonce generation for security headers
 */

import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Check authentication for protected routes
  const isLoggedIn = !!req.auth;

  const isOnDashboard = pathname.startsWith('/dashboard');
  const isOnAdmin = pathname.startsWith('/admin');
  const isOnBilling = pathname.startsWith('/billing');
  const isOnSettings = pathname.startsWith('/settings');
  const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Check admin routes
  if (isOnAdmin && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

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
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all items inside /public (images, favicon, etc.)
  matcher: [
    '/((?!api|_next|_static|.*\\..*|favicon.ico).*)',
    '/dashboard/:path*',
    '/admin/:path*',
    '/billing/:path*',
    '/settings/:path*',
  ],
};
