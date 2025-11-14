# Activity Timeline Component

A vertical timeline component for tracking events, actions, and changes in your application. Features Neobrutalism styling with bold borders, hard shadows, and color-coded event types.

## Overview

The Activity Timeline component displays a chronological sequence of events with user attribution, timestamps, expandable details, and metadata support. Perfect for project histories, issue tracking, user activity logs, and system events.

## Features

- **6 Event Types**: Created, Updated, Commented, Status Changed, Assigned, Deleted
- **Smart Timestamps**: Relative time (e.g., "2h ago") with absolute time on hover
- **User Attribution**: Shows who performed each action with avatar
- **Expandable Details**: Click to reveal full description and metadata
- **Date Grouping**: Organize events by "Today", "Yesterday", etc.
- **Type Filters**: Filter by event type with counters
- **Color-Coded**: Each event type has unique color and icon
- **Neobrutalism Design**: Bold borders, hard shadows, brutal aesthetic
- **Compact Mode**: Condensed view for space-constrained layouts
- **Metadata Support**: Attach arbitrary data to events (key-value pairs)

## Installation

The component is already installed in the Fabrk boilerplate. Files:

```
src/components/ui/activity-timeline.tsx
src/components/ui/activity-timeline.stories.tsx
src/app/components/activity-timeline-demo.tsx
```

## Basic Usage

```tsx
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";

const events: TimelineEvent[] = [
  {
    id: "1",
    type: "created",
    user: {
      name: "John Doe",
      avatar: "https://avatar.vercel.sh/john",
    },
    title: "Created new project",
    description: "Initialized the project with default settings",
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "updated",
    user: {
      name: "Jane Smith",
      avatar: "https://avatar.vercel.sh/jane",
    },
    title: "Updated project settings",
    description: "Changed project visibility to public",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
    metadata: {
      visibility: "public",
      previous_visibility: "private",
    },
  },
];

export default function MyComponent() {
  return <ActivityTimeline events={events} />;
}
```

## Props Interface

```typescript
interface TimelineEvent {
  id: string;                    // Unique identifier
  type:                          // Event type
    | "created"
    | "updated"
    | "commented"
    | "status_changed"
    | "assigned"
    | "deleted";
  user: {                        // User who performed action
    name: string;
    avatar?: string;             // Optional avatar URL
  };
  title: string;                 // Event title
  description?: string;          // Optional detailed description
  timestamp: Date | string;      // Event timestamp
  metadata?: Record<string, any>; // Optional key-value metadata
}

interface ActivityTimelineProps {
  events: TimelineEvent[];       // Array of timeline events
  groupByDate?: boolean;         // Group events by date sections
  showFilters?: boolean;         // Show event type filters
  compact?: boolean;             // Compact view without expandable details
  className?: string;            // Additional CSS classes
}
```

## Event Types

Each event type has a unique icon and color:

| Type | Icon | Color | Use Case |
|------|------|-------|----------|
| `created` | FileText | Primary | New items, initialization |
| `updated` | Edit | Accent | Changes, modifications |
| `commented` | MessageSquare | Secondary | Comments, feedback |
| `status_changed` | GitCommit | Primary | Status transitions |
| `assigned` | UserPlus | Accent | Task assignments |
| `deleted` | Trash2 | Destructive | Deletions, removals |

## Advanced Examples

### With Date Grouping

```tsx
<ActivityTimeline
  events={events}
  groupByDate={true}
/>
```

Events are automatically grouped by:
- "Today"
- "Yesterday"
- "X days ago" (< 7 days)
- Full date (7+ days)

### With Filters

```tsx
<ActivityTimeline
  events={events}
  showFilters={true}
/>
```

Displays a dropdown filter showing:
- Event type icons
- Event counts per type
- Toggle visibility per type

### Compact Mode

```tsx
<ActivityTimeline
  events={events}
  compact={true}
/>
```

Disables expandable details, shows only title and metadata inline.

### With Metadata

```tsx
const event: TimelineEvent = {
  id: "1",
  type: "status_changed",
  user: { name: "System" },
  title: "Status changed",
  timestamp: new Date(),
  metadata: {
    from: "Open",
    to: "In Progress",
    priority: "high",
    estimated_time: "4 hours",
  },
};
```

Metadata renders as key-value pairs in expandable section. Booleans show checkmarks/X icons.

## Use Cases

### Project Timeline

```tsx
const projectEvents = [
  {
    id: "1",
    type: "created",
    user: { name: "Project Manager" },
    title: "Project kickoff",
    description: "Initialized new SaaS project with team of 5 developers",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    metadata: {
      budget: "$50,000",
      duration: "12 weeks",
      team_size: 5,
    },
  },
  // ... more events
];

<ActivityTimeline
  events={projectEvents}
  groupByDate={true}
  showFilters={true}
/>
```

### Issue Tracking

```tsx
const issueEvents = [
  {
    id: "1",
    type: "created",
    user: { name: "Bug Reporter" },
    title: "Issue #456 created",
    description: "Payment form validation not working",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    metadata: {
      priority: "critical",
      severity: "high",
      affected_users: 127,
    },
  },
  {
    id: "2",
    type: "assigned",
    user: { name: "Team Lead" },
    title: "Assigned to developer",
    timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000),
    metadata: {
      assignee: "Payment Team",
      estimated_time: "4 hours",
    },
  },
  // ... more events
];

<ActivityTimeline events={issueEvents} />
```

### User Activity Log

```tsx
const userEvents = [
  {
    id: "1",
    type: "created",
    user: { name: "Emma Watson" },
    title: "Account created",
    description: "Signed up via Google OAuth",
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    metadata: {
      provider: "google",
      plan: "free",
    },
  },
  {
    id: "3",
    type: "status_changed",
    user: { name: "Emma Watson" },
    title: "Upgraded to Pro",
    description: "Subscribed to Pro plan ($29/month)",
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    metadata: {
      from_plan: "free",
      to_plan: "pro",
      amount: "$29",
    },
  },
];

<ActivityTimeline
  events={userEvents}
  groupByDate={true}
  showFilters={true}
/>
```

### System Events

```tsx
const systemEvents = [
  {
    id: "1",
    type: "created",
    user: { name: "System" },
    title: "Database backup created",
    timestamp: new Date(),
    metadata: { size: "2.3 GB" },
  },
  {
    id: "2",
    type: "deleted",
    user: { name: "Admin" },
    title: "Old logs deleted",
    description: "Removed logs older than 90 days",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    metadata: {
      files_deleted: 1240,
      space_freed: "5.7 GB",
    },
  },
];

<ActivityTimeline events={systemEvents} showFilters={true} />
```

## Timestamp Formatting

The component automatically formats timestamps:

### Relative Time
- "just now" (< 1 minute)
- "Xm ago" (< 60 minutes)
- "Xh ago" (< 24 hours)
- "Xd ago" (< 7 days)
- Full date (7+ days)

### Absolute Time (on hover)
- "Nov 13, 2025, 2:30 PM"

## Styling

### Theme Integration

The component uses design tokens from the Fabrk theme system:

- **Primary color**: Event icons (created, status_changed)
- **Accent color**: Update and assignment events
- **Destructive color**: Deletion events
- **Borders**: `border-brutal` (2px solid)
- **Shadows**: `shadow-brutal` (hard 2px offset)

### Custom Styling

```tsx
<ActivityTimeline
  events={events}
  className="max-w-2xl mx-auto"
/>
```

## Storybook

View all variations in Storybook:

```bash
npm run storybook
```

Navigate to **UI/ActivityTimeline** to see:
- Default
- WithIcons
- GroupedByDate
- CompactView
- ProjectTimeline
- IssueHistory
- UserActivity
- WithFilters
- EmptyState

## Accessibility

- **Semantic HTML**: Uses proper `<time>` elements
- **ARIA labels**: Icons have descriptive labels
- **Keyboard navigation**: All interactive elements are keyboard accessible
- **Screen readers**: Timeline structure announced correctly
- **Color contrast**: Meets WCAG AA standards

## Performance

- **Efficient filtering**: Uses `useMemo` for filtered/grouped events
- **Lazy expansion**: Details load on demand
- **Optimized renders**: React memo on timeline items
- **Virtual scrolling**: Not implemented (add if > 100 events)

## API Integration Example

```tsx
"use client";

import { useEffect, useState } from "react";
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";

export default function ProjectActivityPage({ projectId }: { projectId: string }) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch(`/api/projects/${projectId}/events`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, [projectId]);

  if (loading) return <div>Loading...</div>;

  return (
    <ActivityTimeline
      events={events}
      groupByDate={true}
      showFilters={true}
    />
  );
}
```

## Database Schema Example

If storing events in a database:

```sql
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  user_id UUID REFERENCES users(id),
  user_name VARCHAR(255) NOT NULL,
  user_avatar VARCHAR(500),
  title TEXT NOT NULL,
  description TEXT,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB,
  entity_type VARCHAR(50), -- 'project', 'issue', 'user'
  entity_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_timeline_entity ON timeline_events(entity_type, entity_id, timestamp DESC);
CREATE INDEX idx_timeline_type ON timeline_events(type);
CREATE INDEX idx_timeline_timestamp ON timeline_events(timestamp DESC);
```

## Tips & Best Practices

1. **Limit Events**: Show recent 50-100 events, paginate older ones
2. **Real-time Updates**: Use WebSockets or polling for live activity
3. **Avatars**: Use fallback initials when avatar URL unavailable
4. **Metadata**: Keep metadata concise (5-10 fields max)
5. **Event Types**: Extend with custom types if needed (add to `EVENT_CONFIG`)
6. **Performance**: For 100+ events, implement virtual scrolling
7. **Mobile**: Timeline is mobile-responsive, but test compact mode on small screens
8. **Empty State**: Component shows helpful message when no events exist

## Extending Event Types

To add custom event types, update `EVENT_CONFIG`:

```tsx
// In activity-timeline.tsx
const EVENT_CONFIG = {
  // ... existing types
  merged: {
    icon: GitMerge,
    color: "bg-purple-500",
    textColor: "text-purple-500",
    label: "Merged",
  },
  deployed: {
    icon: Rocket,
    color: "bg-green-500",
    textColor: "text-green-500",
    label: "Deployed",
  },
} as const;

// Update type definition
type: "created" | "updated" | ... | "merged" | "deployed";
```

## Component Architecture

```
ActivityTimeline (parent)
├── Filter Dropdown (optional)
├── Date Groups (optional)
│   ├── Date Header
│   └── Timeline Items
└── Timeline Items
    ├── Icon (color-coded)
    ├── Content
    │   ├── Title + Badge
    │   ├── User + Timestamp
    │   └── Expandable Details (optional)
    │       ├── Description
    │       └── Metadata
    └── Connecting Line
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Related Components

- **Avatar**: User attribution
- **Badge**: Event type labels
- **Button**: Filter controls
- **Card**: Container for timeline
- **DropdownMenu**: Filter menu
- **Tabs**: Multiple timelines

## License

MIT License - Part of Fabrk Boilerplate

## Support

- Storybook: `npm run storybook`
- Demo: `/components#activity-timeline`
- Issues: Check project README
