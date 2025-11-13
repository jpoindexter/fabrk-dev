import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Combine i18n and auth middleware
export default auth((req) => {
  // First handle i18n routing
  const intlResponse = intlMiddleware(req as NextRequest);

  // Then check authentication for protected routes
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Remove locale prefix to check base path
  const pathWithoutLocale = pathname.replace(/^\/(en|es|fr|de|pt)/, '');

  const isOnDashboard = pathWithoutLocale.startsWith('/dashboard');
  const isOnAdmin = pathWithoutLocale.startsWith('/admin');
  const isOnBilling = pathWithoutLocale.startsWith('/billing');
  const isOnSettings = pathWithoutLocale.startsWith('/settings');
  const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Check admin routes
  // @ts-ignore - role exists in database but not in NextAuth user type
  if (isOnAdmin && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return intlResponse || NextResponse.next();
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
