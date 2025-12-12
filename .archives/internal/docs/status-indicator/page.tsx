"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { StatusIndicator, Status } from "@/components/ui/status-indicator";

export default function StatusIndicatorPage() {
  const statuses: Status[] = ["online", "offline", "busy", "away", "idle"];

  return (
    <ComponentShowcaseTemplate
      code="[UI.43]"
      category="Components"
      title="Status Indicator"
      description="Simple status dot component with color-coded states and optional label for displaying user presence."
      importCode={`import { StatusIndicator, Status } from "@/components/ui/status-indicator";`}
      mainPreview={{
        preview: <StatusIndicator status="online" label="Alex Chen" />,
        code: `<StatusIndicator status="online" label="Alex Chen" />`,
      }}
      variants={[
        {
          title: "All States",
          description: "Display all available status states",
          preview: (
            <div className="space-y-4">
              {statuses.map((status) => (
                <StatusIndicator key={status} status={status} label="" />
              ))}
            </div>
          ),
          code: `<StatusIndicator status="online" label="" />
<StatusIndicator status="offline" label="" />
<StatusIndicator status="busy" label="" />
<StatusIndicator status="away" label="" />
<StatusIndicator status="idle" label="" />`,
        },
        {
          title: "With Pulse Animation",
          description: "Add pulsing animation for online status",
          preview: (
            <div className="space-y-4">
              <StatusIndicator status="online" label="Active Now" showPulse={true} />
              <StatusIndicator status="busy" label="In a Meeting" />
              <StatusIndicator status="away" label="Away from Keyboard" />
            </div>
          ),
          code: `<StatusIndicator status="online" label="Active Now" showPulse={true} />
<StatusIndicator status="busy" label="In a Meeting" />
<StatusIndicator status="away" label="Away from Keyboard" />`,
        },
        {
          title: "Different Sizes",
          description: "Small, medium, and large indicator sizes",
          preview: (
            <div className="space-y-4">
              <StatusIndicator status="online" label="Small" size="sm" />
              <StatusIndicator status="online" label="Medium (default)" size="md" />
              <StatusIndicator status="online" label="Large" size="lg" />
            </div>
          ),
          code: `<StatusIndicator status="online" label="Small" size="sm" />
<StatusIndicator status="online" label="Medium" size="md" />
<StatusIndicator status="online" label="Large" size="lg" />`,
        },
        {
          title: "Without Labels",
          description: "Compact dot-only indicators",
          preview: (
            <div className="flex items-center gap-4">
              {statuses.map((status) => (
                <StatusIndicator key={status} status={status} />
              ))}
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <StatusIndicator status="online" />
  <StatusIndicator status="offline" />
  <StatusIndicator status="busy" />
  <StatusIndicator status="away" />
  <StatusIndicator status="idle" />
</div>`,
        },
        {
          title: "In User Lists",
          description: "Status indicators with user information",
          preview: (
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b border-border pb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-none bg-primary text-primary-foreground font-mono text-xs">
                  AC
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm font-semibold">Alex Chen</div>
                  <div className="font-mono text-xs text-muted-foreground">Senior Developer</div>
                </div>
                <StatusIndicator status="online" showPulse={true} />
              </div>
              <div className="flex items-center gap-4 border-b border-border pb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-none bg-secondary text-secondary-foreground font-mono text-xs">
                  SM
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm font-semibold">Sarah Miller</div>
                  <div className="font-mono text-xs text-muted-foreground">Product Manager</div>
                </div>
                <StatusIndicator status="busy" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-none bg-accent text-accent-foreground font-mono text-xs">
                  MJ
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm font-semibold">Marcus Johnson</div>
                  <div className="font-mono text-xs text-muted-foreground">UX Designer</div>
                </div>
                <StatusIndicator status="away" />
              </div>
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <Avatar />
  <div className="flex-1">
    <div className="text-sm font-semibold">Alex Chen</div>
    <div className="text-xs text-muted-foreground">Senior Developer</div>
  </div>
  <StatusIndicator status="online" showPulse={true} />
</div>`,
        },
      ]}
      props={[
        {
          name: "status",
          type: '"online" | "offline" | "busy" | "away" | "idle"',
          required: true,
          description: "The status state to display",
        },
        {
          name: "label",
          type: "string",
          description: "Optional text label next to the indicator",
        },
        {
          name: "showPulse",
          type: "boolean",
          default: "false",
          description: "Enable pulse animation (only for online status)",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Size of the status dot (sm=2px, md=3px, lg=4px)",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the container",
        },
      ]}
      accessibility={[
        "Color-coded status states: green (online), gray (offline), red (busy), yellow (away/idle)",
        "Uses design tokens for all colors (bg-success, bg-muted-foreground, bg-destructive, bg-warning)",
        "Pulse animation respects prefers-reduced-motion",
        "Label text uses text-muted-foreground for proper contrast",
        "Dot sizes follow consistent scale (sm=h-2 w-2, md=h-3 w-3, lg=h-4 w-4)",
        "Flexbox layout ensures proper alignment with adjacent content",
      ]}
      previous={{ title: "Pie Chart", href: "/docs/components/pie-chart" }}
      next={{ title: "Typography", href: "/docs/components/typography" }}
    />
  );
}
