/**
 * FABRK COMPONENT
 * Empty States Template - Terminal console style
 * Production-ready
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  FileQuestion,
  Search,
  Inbox,
  AlertCircle,
  Plus,
  RefreshCw,
  Upload,
  FolderOpen,
  Users,
  ShoppingCart,
  Bell,
  BarChart,
} from "lucide-react";

const emptyStates = [
  {
    id: "no-data",
    title: "No Data Yet",
    description: "Start by adding your first item to see it appear here.",
    icon: Inbox,
    actions: [{ label: "ADD_FIRST_ITEM", primary: true, icon: Plus }],
    terminal: ["$ query --table=items", "RESULT: 0 rows returned", "STATUS: empty_dataset"],
  },
  {
    id: "first-time",
    title: "Welcome to Your Dashboard",
    description: "This is your workspace. Let's get you set up with your first project.",
    icon: FolderOpen,
    actions: [
      { label: "CREATE_PROJECT", primary: true, icon: Plus },
      { label: "IMPORT_DATA", primary: false, icon: Upload },
    ],
    terminal: ["$ user.onboarding --status", "PROJECTS: 0", "SETUP_COMPLETE: false", "HINT: create_first_project"],
  },
  {
    id: "search-empty",
    title: "No Results Found",
    description: "We couldn't find anything matching your search. Try different keywords.",
    icon: Search,
    actions: [{ label: "CLEAR_SEARCH", primary: false, icon: RefreshCw }],
    terminal: ["$ search --query=\"foobar123\"", "MATCHES: 0", "SUGGESTIONS: try_different_keywords"],
  },
  {
    id: "error-state",
    title: "Something Went Wrong",
    description: "We encountered an error loading your data. Please try again.",
    icon: AlertCircle,
    actions: [{ label: "TRY_AGAIN", primary: true, icon: RefreshCw }],
    terminal: ["$ fetch --resource=data", "ERROR: connection_timeout", "CODE: ERR_NETWORK_500", "RETRY: recommended"],
  },
  {
    id: "no-team",
    title: "No Team Members",
    description: "You're flying solo! Invite team members to collaborate.",
    icon: Users,
    actions: [{ label: "INVITE_MEMBER", primary: true, icon: Plus }],
    terminal: ["$ team.list --project=current", "MEMBERS: 1 (you)", "HINT: invite_collaborators"],
  },
  {
    id: "empty-cart",
    title: "Your Cart is Empty",
    description: "Looks like you haven't added anything yet. Browse our products.",
    icon: ShoppingCart,
    actions: [{ label: "BROWSE_PRODUCTS", primary: true, icon: Search }],
    terminal: ["$ cart.items --user=current", "ITEMS: 0", "SUBTOTAL: $0.00", "STATUS: empty"],
  },
  {
    id: "no-notifications",
    title: "All Caught Up!",
    description: "You have no new notifications. Check back later.",
    icon: Bell,
    actions: [{ label: "NOTIFICATION_SETTINGS", primary: false, icon: null }],
    terminal: ["$ notifications.unread --count", "UNREAD: 0", "LAST_CHECK: just now", "STATUS: all_read"],
  },
  {
    id: "no-analytics",
    title: "No Analytics Data",
    description: "Start tracking events to see your analytics dashboard.",
    icon: BarChart,
    actions: [
      { label: "SETUP_TRACKING", primary: true, icon: Plus },
      { label: "VIEW_DOCS", primary: false, icon: FileQuestion },
    ],
    terminal: ["$ analytics.summary --period=30d", "EVENTS: 0", "HINT: install_tracking_script"],
  },
];

export default function EmptyStatesTemplate() {
  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-4 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: EMPTY_STATES
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Empty States</h1>
          <p className="font-mono text-sm text-muted-foreground">
            Helpful empty state patterns for various scenarios
          </p>
        </div>

        {/* Empty State Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {emptyStates.map((state) => {
            const Icon = state.icon;
            return (
              <div key={state.id} className="border border-border bg-card flex flex-col">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                  <div className="flex gap-2">
                    <div className="size-2 rounded-full bg-destructive/50" />
                    <div className="size-2 rounded-full bg-warning/50" />
                    <div className="size-2 rounded-full bg-success/50" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {state.id}.tsx
                  </span>
                </div>

                <div className="p-6 h-full flex flex-col">
                  {/* Empty State Content */}
                  <div className="text-center flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 mx-auto border flex items-center justify-center ${
                        state.id === "error-state"
                          ? "border-destructive bg-destructive/10"
                          : "border-border bg-muted/30"
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 ${
                          state.id === "error-state"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    {/* Title & Description */}
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-1">{state.title}</h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {state.description}
                      </p>
                    </div>

                    {/* Terminal Output */}
                    <div className="border border-border bg-card text-left mt-4">
                      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-1.5">
                        <div className="flex gap-2">
                          <div className="size-2 rounded-full bg-destructive/50" />
                          <div className="size-2 rounded-full bg-warning/50" />
                          <div className="size-2 rounded-full bg-success/50" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          terminal
                        </span>
                      </div>
                      <div className="p-4 font-mono text-xs text-foreground space-y-0.5">
                        {state.terminal.map((line, idx) => (
                          <div
                            key={idx}
                            className={
                              line.startsWith("ERROR")
                                ? "text-destructive"
                                : line.startsWith("$")
                                  ? "text-success"
                                  : line.startsWith("HINT")
                                    ? "text-warning"
                                    : ""
                            }
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions - pushed to bottom */}
                    <div className="flex items-center justify-center gap-2 mt-auto pt-4">
                      {state.actions.map((action, idx) => {
                        const ActionIcon = action.icon;
                        return (
                          <Button
                            key={idx}
                            variant={action.primary ? "default" : "outline"}
                            className="rounded-none font-mono text-xs"
                          >
                            {ActionIcon && <ActionIcon className="mr-1 h-3 w-3" />}
                            &gt; {action.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Use Cases Reference */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              use_cases.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-4 font-mono text-xs text-muted-foreground">
              [WHEN_TO_USE]:
            </div>
            <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-2">
                <div className="font-semibold">[NO_DATA]</div>
                <div className="text-muted-foreground">
                  Tables, lists, dashboards with zero items
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[FIRST_TIME_USER]</div>
                <div className="text-muted-foreground">
                  New accounts, fresh workspaces, onboarding
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[SEARCH_NO_RESULTS]</div>
                <div className="text-muted-foreground">
                  Search, filters, queries with no matches
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[ERROR_STATE]</div>
                <div className="text-muted-foreground">
                  API failures, network errors, timeouts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-4 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> 8 common empty state patterns
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-style status output
              </div>
              <div>
                <span className="text-success">&gt;</span> Contextual action buttons
              </div>
              <div>
                <span className="text-success">&gt;</span> Error state differentiation
              </div>
              <div>
                <span className="text-success">&gt;</span> First-time user guidance
              </div>
              <div>
                <span className="text-success">&gt;</span> Search result fallback
              </div>
            </div>
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              [NOTE]: Customize icons, copy, and actions based on your specific use case.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
