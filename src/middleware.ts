import { auth } from '@/lib/auth';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create the i18n middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't add locale prefix for default locale
});

export default auth((req) => {
  // Check authentication for protected routes
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

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

  // Apply i18n routing
  return intlMiddleware(req as NextRequest);
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
