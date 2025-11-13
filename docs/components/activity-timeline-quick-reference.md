# Activity Timeline - Quick Reference

## Import

```tsx
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";
```

## Basic Example

```tsx
const events: TimelineEvent[] = [
  {
    id: "1",
    type: "created",
    user: { name: "John Doe", avatar: "..." },
    title: "Created new project",
    description: "Initialized the project",
    timestamp: new Date(),
    metadata: { budget: "$50k" },
  },
];

<ActivityTimeline events={events} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `TimelineEvent[]` | required | Array of events to display |
| `groupByDate` | `boolean` | `false` | Group events by date |
| `showFilters` | `boolean` | `false` | Show event type filters |
| `compact` | `boolean` | `false` | Compact view |
| `className` | `string` | - | Additional CSS classes |

## Event Types

```tsx
type EventType =
  | "created"        // Primary color, FileText icon
  | "updated"        // Accent color, Edit icon
  | "commented"      // Secondary color, MessageSquare icon
  | "status_changed" // Primary color, GitCommit icon
  | "assigned"       // Accent color, UserPlus icon
  | "deleted";       // Destructive color, Trash2 icon
```

## Common Patterns

### Grouped Timeline
```tsx
<ActivityTimeline events={events} groupByDate={true} />
```

### Filterable Timeline
```tsx
<ActivityTimeline events={events} showFilters={true} />
```

### Compact Timeline
```tsx
<ActivityTimeline events={events} compact={true} />
```

### Full Featured
```tsx
<ActivityTimeline
  events={events}
  groupByDate={true}
  showFilters={true}
/>
```

## Timestamp Formats

- **< 1 min**: "just now"
- **< 60 min**: "Xm ago"
- **< 24 hours**: "Xh ago"
- **< 7 days**: "Xd ago"
- **7+ days**: "Nov 13, 2025"

## Metadata Example

```tsx
metadata: {
  from: "Open",
  to: "In Progress",
  priority: "high",
  verified: true, // Shows checkmark
  failed: false,  // Shows X icon
}
```

## Demo

View at: `/components#activity-timeline`

## Storybook

Run: `npm run storybook` → **UI/ActivityTimeline**
