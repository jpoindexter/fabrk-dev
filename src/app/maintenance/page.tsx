import { Wrench, Clock } from "lucide-react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";

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
          <div className={cn("bg-warning/20 p-6", mode.radius)}>
            <Wrench className="size-16 text-warning" />
          </div>
        </div>

        {/* Message */}
        <h1 className={cn("mb-4 text-4xl font-semibold text-foreground", mode.font)}>
          SCHEDULED_MAINTENANCE
        </h1>
        <p className={cn("mb-6 text-sm text-muted-foreground", mode.font)}>
          We're currently performing scheduled maintenance to improve your experience.
          We'll be back shortly!
        </p>

        {/* Estimated Time */}
        <div className={cn("mb-8 inline-flex items-center gap-2 bg-warning/10 px-6 py-4", mode.radius)}>
          <Clock className="size-5 text-warning" />
          <span className={cn("text-xs font-medium text-warning", mode.font)}>
            [ESTIMATED_DOWNTIME]: 30 minutes
          </span>
        </div>

        {/* Status Updates */}
        <div className="mb-8">
          <p className={cn("mb-2 text-xs text-muted-foreground", mode.font)}>
            [STATUS_UPDATES]: For real-time updates, follow us on:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("text-xs font-semibold text-primary hover:underline", mode.font)}
            >
              TWITTER
            </a>
            <a
              href="https://status.yourapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("text-xs font-semibold text-primary hover:underline", mode.font)}
            >
              STATUS_PAGE
            </a>
          </div>
        </div>

        {/* What We're Doing */}
        <TerminalCard size="auto" className="text-left">
          <TerminalCardHeader code="0x00" title="CURRENT_TASKS" icon={<Wrench className="size-4" />} />
          <TerminalCardContent padding="md">
            <ul className={cn("space-y-2 text-xs text-muted-foreground", mode.font)}>
              <li className="flex items-start gap-3">
                <span className="text-primary flex-shrink-0">├─</span>
                <span className="text-foreground">Database optimization for faster performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary flex-shrink-0">├─</span>
                <span className="text-foreground">Security updates and patches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary flex-shrink-0">└─</span>
                <span className="text-foreground">New features deployment</span>
              </li>
            </ul>
          </TerminalCardContent>
        </TerminalCard>

        {/* Support */}
        <div className="mt-12 border-t border-border pt-8">
          <p className={cn("mb-2 text-xs text-muted-foreground", mode.font)}>
            [HELP]: Need urgent assistance?
          </p>
          <a
            href="mailto:support@fabrk.dev"
            className={cn("text-xs font-semibold text-primary hover:underline", mode.font)}
          >
            support@fabrk.dev
          </a>
        </div>
      </div>
    </div>
  );
}
