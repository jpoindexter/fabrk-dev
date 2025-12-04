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
    terminal: [
      "$ user.onboarding --status",
      "PROJECTS: 0",
      "SETUP_COMPLETE: false",
      "HINT: create_first_project",
    ],
  },
  {
    id: "search-empty",
    title: "No Results Found",
    description: "We couldn't find anything matching your search. Try different keywords.",
    icon: Search,
    actions: [{ label: "CLEAR_SEARCH", primary: false, icon: RefreshCw }],
    terminal: ['$ search --query="foobar123"', "MATCHES: 0", "SUGGESTIONS: try_different_keywords"],
  },
  {
    id: "error-state",
    title: "Something Went Wrong",
    description: "We encountered an error loading your data. Please try again.",
    icon: AlertCircle,
    actions: [{ label: "TRY_AGAIN", primary: true, icon: RefreshCw }],
    terminal: [
      "$ fetch --resource=data",
      "ERROR: connection_timeout",
      "CODE: ERR_NETWORK_500",
      "RETRY: recommended",
    ],
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
    terminal: [
      "$ notifications.unread --count",
      "UNREAD: 0",
      "LAST_CHECK: just now",
      "STATUS: all_read",
    ],
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
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="border-border inline-block border px-4 py-1">
            <span className="text-muted-foreground font-mono text-xs">
              [TEMPLATE]: EMPTY_STATES
            </span>
          </div>
          <h1 className="font-mono text-4xl font-semibold tracking-tight">Empty States</h1>
          <p className="text-muted-foreground font-mono text-sm">
            Helpful empty state patterns for various scenarios
          </p>
        </div>

        {/* Empty State Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {emptyStates.map((state) => {
            const Icon = state.icon;
            return (
              <div key={state.id} className="border-border bg-card flex flex-col border">
                <div className="border-border border-b px-4 py-2">
                  <span className="text-muted-foreground font-mono text-xs">
                    [ [0x0{emptyStates.indexOf(state)}] {state.id.toUpperCase().replace(/-/g, "_")}{" "}
                    ]
                  </span>
                </div>

                <div className="flex h-full flex-col p-6">
                  {/* Empty State Content */}
                  <div className="flex flex-1 flex-col text-center">
                    {/* Icon */}
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center border ${
                        state.id === "error-state"
                          ? "border-destructive bg-destructive/10"
                          : "border-border bg-muted/30"
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 ${
                          state.id === "error-state" ? "text-destructive" : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    {/* Title & Description */}
                    <div className="mt-4">
                      <h3 className="mb-1 font-mono text-lg font-semibold">{state.title}</h3>
                      <p className="text-muted-foreground font-mono text-xs">{state.description}</p>
                    </div>

                    {/* Terminal Output */}
                    <div className="border-border bg-card mt-4 border text-left">
                      <div className="border-border/50 flex items-center gap-2 border-b px-4 py-1.5">
                        <div className="flex gap-2">
                          <div className="bg-destructive/50 size-2 rounded-none" />
                          <div className="bg-warning/50 size-2 rounded-none" />
                          <div className="bg-success/50 size-2 rounded-none" />
                        </div>
                        <span className="text-muted-foreground font-mono text-xs">terminal</span>
                      </div>
                      <div className="text-foreground space-y-0.5 p-4 font-mono text-xs">
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
                    <div className="mt-auto flex items-center justify-center gap-2 pt-4">
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
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ [0x08] USE_CASES ]</span>
          </div>
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[WHEN_TO_USE]:</div>
            <div className="grid gap-4 font-mono text-xs md:grid-cols-2">
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
                <div className="text-muted-foreground">API failures, network errors, timeouts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">
              [ [0x09] TEMPLATE_FEATURES ]
            </span>
          </div>
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
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
            <div className="text-muted-foreground mt-4 font-mono text-xs">
              [NOTE]: Customize icons, copy, and actions based on your specific use case.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
