"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { ActivityTimeline } from "@/components/ui/activity-timeline";

export default function ActivityTimelinePage() {
  const sampleEvents = [
    {
      id: "1",
      type: "created" as const,
      user: { name: "Alice Johnson", avatar: "" },
      title: "Created new project",
      description: "Initialized repository and project structure",
      timestamp: new Date(Date.now() - 3600000),
      metadata: { project_name: "Web App", status: "active" },
    },
    {
      id: "2",
      type: "commented" as const,
      user: { name: "Bob Smith", avatar: "" },
      title: "Added comment on issue #42",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: "3",
      type: "updated" as const,
      user: { name: "Carol White", avatar: "" },
      title: "Updated documentation",
      description: "Rewrote API reference section with new examples",
      timestamp: new Date(Date.now() - 86400000),
    },
  ];

  const compactEvents = [
    {
      id: "1",
      type: "created" as const,
      user: { name: "User A", avatar: "" },
      title: "Created task",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      type: "updated" as const,
      user: { name: "User B", avatar: "" },
      title: "Updated status",
      timestamp: new Date(Date.now() - 7200000),
    },
  ];

  const groupedEvents = [
    {
      id: "1",
      type: "created" as const,
      user: { name: "Alice Johnson", avatar: "" },
      title: "Created project",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      type: "commented" as const,
      user: { name: "Bob Smith", avatar: "" },
      title: "Added comment",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      type: "status_changed" as const,
      user: { name: "Carol White", avatar: "" },
      title: "Changed status to In Progress",
      timestamp: new Date(Date.now() - 172800000),
    },
  ];

  const allEventTypes = [
    {
      id: "1",
      type: "created" as const,
      user: { name: "Alice Johnson", avatar: "" },
      title: "Created document",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      type: "updated" as const,
      user: { name: "Bob Smith", avatar: "" },
      title: "Updated settings",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: "3",
      type: "commented" as const,
      user: { name: "Carol White", avatar: "" },
      title: "Left a comment",
      timestamp: new Date(Date.now() - 10800000),
    },
    {
      id: "4",
      type: "status_changed" as const,
      user: { name: "David Lee", avatar: "" },
      title: "Changed status",
      timestamp: new Date(Date.now() - 14400000),
    },
    {
      id: "5",
      type: "assigned" as const,
      user: { name: "Eve Martinez", avatar: "" },
      title: "Assigned to team",
      timestamp: new Date(Date.now() - 18000000),
    },
    {
      id: "6",
      type: "deleted" as const,
      user: { name: "Frank Wilson", avatar: "" },
      title: "Deleted old files",
      timestamp: new Date(Date.now() - 21600000),
    },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.80]"
      category="Components"
      title="Activity Timeline"
      description="Display a chronological timeline of events and activities with filtering, grouping, and expandable details."
      importCode={`import { ActivityTimeline } from "@/components/ui/activity-timeline"`}
      mainPreview={{
        preview: <ActivityTimeline events={sampleEvents} />,
        code: `const events = [
  {
    id: "1",
    type: "created",
    user: { name: "Alice Johnson" },
    title: "Created new project",
    description: "Initialized repository and project structure",
    timestamp: new Date(Date.now() - 3600000),
    metadata: { project_name: "Web App", status: "active" },
  },
  {
    id: "2",
    type: "commented",
    user: { name: "Bob Smith" },
    title: "Added comment on issue #42",
    timestamp: new Date(Date.now() - 7200000),
  },
];

<ActivityTimeline events={events} />`,
      }}
      variants={[
        {
          title: "Compact Mode",
          description: "Minimal view without expandable details",
          preview: <ActivityTimeline events={compactEvents} compact />,
          code: `<ActivityTimeline
  events={events}
  compact
/>`,
        },
        {
          title: "Grouped by Date",
          description: "Automatically group events by date ranges",
          preview: <ActivityTimeline events={groupedEvents} groupByDate />,
          code: `<ActivityTimeline
  events={events}
  groupByDate
/>`,
        },
        {
          title: "With Filters",
          description: "Enable event type filtering with counts",
          preview: <ActivityTimeline events={allEventTypes} showFilters />,
          code: `<ActivityTimeline
  events={events}
  showFilters
/>`,
        },
        {
          title: "All Event Types",
          description: "Display all supported event types with icons",
          preview: <ActivityTimeline events={allEventTypes} />,
          code: `// Supported event types:
// created, updated, commented, status_changed, assigned, deleted

<ActivityTimeline events={allEventTypes} />`,
        },
        {
          title: "Empty State",
          description: "Gracefully handle no events",
          preview: <ActivityTimeline events={[]} />,
          code: `<ActivityTimeline events={[]} />`,
        },
      ]}
      props={[
        {
          name: "events",
          type: "TimelineEvent[]",
          default: "-",
          description: "Array of timeline events to display",
        },
        {
          name: "groupByDate",
          type: "boolean",
          default: "false",
          description: "Group events by date ranges (Today, Yesterday, etc.)",
        },
        {
          name: "showFilters",
          type: "boolean",
          default: "false",
          description: "Show event type filter dropdown with counts",
        },
        {
          name: "compact",
          type: "boolean",
          default: "false",
          description: "Compact mode without expandable details",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes for the timeline container",
        },
      ]}
      accessibility={[
        "Uses semantic time elements with datetime attributes",
        "Event icons have proper ARIA labels via config",
        "Relative timestamps show absolute time in title attribute",
        "Keyboard navigation support for expand/collapse",
        "Empty state provides clear feedback",
        "Filter dropdown uses DropdownMenuCheckboxItem for proper ARIA",
      ]}
      previous={{ title: "Accordion", href: "/docs/components/accordion" }}
      next={{ title: "Alert", href: "/docs/components/alert" }}
    />
  );
}
