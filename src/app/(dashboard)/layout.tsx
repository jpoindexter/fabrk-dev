/**
 * Dashboard Layout
 * Shared layout for all authenticated dashboard pages
 * Includes header with org switcher and navigation
 *
 * Protected route: Automatically redirects to login if not authenticated
 */

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

// Force dynamic rendering for auth-protected pages
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication - redirect to login if not authenticated
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
