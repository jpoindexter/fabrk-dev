import { auth } from '@/lib/auth';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';

// Create the i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't add locale prefix for default locale
});

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Remove locale prefix for consistent route checking
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/';

  // Skip i18n for showcase pages (they exist outside [locale] structure)
  // Check both original pathname and pathname without locale prefix to handle /en/demo, /demo, etc.
  const isShowcasePage =
    pathname.startsWith('/demo') ||
    pathname.startsWith('/components') ||
    pathname.startsWith('/variations') ||
    pathname.startsWith('/templates') ||
    pathnameWithoutLocale.startsWith('/demo') ||
    pathnameWithoutLocale.startsWith('/components') ||
    pathnameWithoutLocale.startsWith('/variations') ||
    pathnameWithoutLocale.startsWith('/templates');

  if (isShowcasePage) {
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

  // Check authentication for protected routes
  const isLoggedIn = !!req.auth;

  const isOnDashboard = pathnameWithoutLocale.startsWith('/dashboard');
  const isOnAdmin = pathnameWithoutLocale.startsWith('/admin');
  const isOnBilling = pathnameWithoutLocale.startsWith('/billing');
  const isOnSettings = pathnameWithoutLocale.startsWith('/settings');
  const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Check admin routes
  if (isOnAdmin && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Apply i18n routing and inject nonce
  const response = intlMiddleware(req as NextRequest);

  // Generate nonce for CSP
  const nonce = generateNonce();

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
