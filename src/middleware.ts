/**
 * @ai-context NextAuth middleware for protected routes
 * @ai-purpose Protect dashboard and admin routes
 * @ai-can-modify Add more protected routes as needed
 */

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // req.auth contains the session if authenticated
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnBilling = req.nextUrl.pathname.startsWith("/billing");
  const isOnSettings = req.nextUrl.pathname.startsWith("/settings");
  const isProtectedRoute = isOnDashboard || isOnAdmin || isOnBilling || isOnSettings;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check admin routes
  if (isOnAdmin && req.auth?.user?.role !== "ADMIN" && req.auth?.user?.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/billing/:path*",
    "/settings/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
