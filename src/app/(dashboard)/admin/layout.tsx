/**
 * Admin Layout
 * Restricted to admin users only
 */

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/feature-flags", label: "Feature Flags" },
  { href: "/admin/security", label: "Security Logs" },
  { href: "/admin/monitoring", label: "Monitoring" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect if not admin
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b bg-muted/40">
        <div className="container flex h-14 items-center">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>
      </div>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <nav className="space-y-1 p-4">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-none px-4 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex w-full flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
