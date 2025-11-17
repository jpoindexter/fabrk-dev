import { auth } from '@/lib/auth';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ensureCsrfToken } from '@/lib/security/csrf';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';

// Create the i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't add locale prefix for default locale
});

/**
 * Inject CSP nonce into response headers
 * Updates Content-Security-Policy header to replace 'unsafe-inline' with nonce
 */
function injectCSPNonce(response: NextResponse, nonce: string): void {
  const csp = response.headers.get("Content-Security-Policy");
  if (csp) {
    // Replace 'unsafe-inline' in script-src with nonce
    const updatedCsp = csp.replace(
      /script-src ([^;]*)'unsafe-inline'([^;]*);/,
      `script-src $1'nonce-${nonce}'$2;`
    );
    response.headers.set("Content-Security-Policy", updatedCsp);
  }
}

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Generate nonce for this request
  const nonce = generateNonce();

  // Skip i18n for showcase pages (they exist outside [locale] structure)
  const isShowcasePage =
    pathname.startsWith('/demo') ||
    pathname.startsWith('/components') ||
    pathname.startsWith('/whats-included') ||
    pathname.startsWith('/variations') ||
    pathname.startsWith('/templates');

  if (isShowcasePage) {
    const response = NextResponse.next();
    // Inject nonce into response
    response.headers.set(getNonceHeaderName(), nonce);
    injectCSPNonce(response, nonce);
    ensureCsrfToken(req, response);
    return response;
  }

  // Check authentication for protected routes
  const isLoggedIn = !!req.auth;

  // Remove locale prefix for route checking
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');

  const isOnDashboard = pathnameWithoutLocale.startsWith('/dashboard');
  const isOnAdmin = pathnameWithoutLocale.startsWith('/admin');
  const isOnBilling = pathnameWithoutLocale.startsWith('/billing');
  const isOnSettings = pathnameWithoutLocale.startsWith('/settings');
  const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Check admin routes
  // @ts-ignore - role exists in database but not in NextAuth user type
  if (isOnAdmin && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Apply i18n routing, inject nonce, and ensure CSRF token
  const response = intlMiddleware(req as NextRequest);
  response.headers.set(getNonceHeaderName(), nonce);
  injectCSPNonce(response, nonce);
  ensureCsrfToken(req, response);
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
