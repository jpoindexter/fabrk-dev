import { Wrench, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance Mode",
  description: "We're currently performing scheduled maintenance.",
  robots: "noindex, nofollow",
};

/**
 * Maintenance Mode Page
 * Display this page during scheduled maintenance windows
 *
 * To enable maintenance mode:
 * 1. Set MAINTENANCE_MODE=true in environment variables
 * 2. Or use middleware to redirect all traffic to /maintenance
 */
export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Maintenance Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-warning/20 p-6">
            <Wrench className="h-16 w-16 text-warning" />
          </div>
        </div>

        {/* Message */}
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          Scheduled Maintenance
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          We're currently performing scheduled maintenance to improve your experience.
          We'll be back shortly!
        </p>

        {/* Estimated Time */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-lg bg-warning/10 px-6 py-3">
          <Clock className="h-5 w-5 text-warning" />
          <span className="text-sm font-medium text-warning-foreground">
            Estimated downtime: 30 minutes
          </span>
        </div>

        {/* Status Updates */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-muted-foreground">
            For real-time updates, follow us on:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://status.yourapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Status Page
            </a>
          </div>
        </div>

        {/* What We're Doing */}
        <div className="rounded-lg border-2 border-border/60 bg-card p-6 text-left">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            What we're working on:
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Database optimization for faster performance
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Security updates and patches
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              New features deployment
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-2 text-sm text-muted-foreground">
            Need urgent assistance?
          </p>
          <a
            href="mailto:support@fabrk.dev"
            className="text-sm font-semibold text-primary hover:underline"
          >
            support@fabrk.dev
          </a>
        </div>
      </div>
    </div>
  );
}
