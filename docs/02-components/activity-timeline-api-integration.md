# Activity Timeline - API Integration Guide

This guide shows how to integrate the Activity Timeline component with your backend API, database, and real-time updates.

## Table of Contents

1. [Database Schema](#database-schema)
2. [API Endpoints](#api-endpoints)
3. [React Integration](#react-integration)
4. [Real-time Updates](#real-time-updates)
5. [Pagination](#pagination)
6. [Filtering & Search](#filtering--search)

## Database Schema

### Prisma Schema

Add to `prisma/schema.prisma`:

```prisma
model TimelineEvent {
  id          String   @id @default(cuid())
  type        EventType
  userId      String
  userName    String
  userAvatar  String?
  title       String
  description String?
  timestamp   DateTime @default(now())
  metadata    Json?
  entityType  String   // 'project', 'issue', 'user', 'system'
  entityId    String
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([entityType, entityId, timestamp])
  @@index([type])
  @@index([timestamp])
  @@map("timeline_events")
}

enum EventType {
  created
  updated
  commented
  status_changed
  assigned
  deleted
}
```

### Migration

```bash
npx prisma migrate dev --name add-timeline-events
```

### SQL Schema (PostgreSQL)

If not using Prisma:

```sql
CREATE TYPE event_type AS ENUM (
  'created',
  'updated',
  'commented',
  'status_changed',
  'assigned',
  'deleted'
);

CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type event_type NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_avatar VARCHAR(500),
  title TEXT NOT NULL,
  description TEXT,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB,
  entity_type VARCHAR(50) NOT NULL, -- 'project', 'issue', 'user', 'system'
  entity_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_timeline_entity ON timeline_events(entity_type, entity_id, timestamp DESC);
CREATE INDEX idx_timeline_type ON timeline_events(type);
CREATE INDEX idx_timeline_timestamp ON timeline_events(timestamp DESC);
CREATE INDEX idx_timeline_user ON timeline_events(user_id);
```

## API Endpoints

### 1. Get Events for Entity

**GET `/api/[entity]/[id]/events`**

```typescript
// app/api/projects/[id]/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const type = searchParams.get("type"); // Optional filter by type

    const events = await prisma.timelineEvent.findMany({
      where: {
        entityType: "project",
        entityId: params.id,
        ...(type && { type: type as any }),
      },
      orderBy: { timestamp: "desc" },
      take: limit,
      skip: offset,
    });

    // Transform to component format
    const formattedEvents = events.map((event) => ({
      id: event.id,
      type: event.type,
      user: {
        name: event.userName,
        avatar: event.userAvatar,
      },
      title: event.title,
      description: event.description,
      timestamp: event.timestamp.toISOString(),
      metadata: event.metadata,
    }));

    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
```

### 2. Create Event

**POST `/api/events`**

```typescript
// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, title, description, metadata, entityType, entityId } = body;

    const event = await prisma.timelineEvent.create({
      data: {
        type,
        userId: session.user.id,
        userName: session.user.name || "Unknown User",
        userAvatar: session.user.image,
        title,
        description,
        metadata,
        entityType,
        entityId,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
```

### 3. Helper Function - Create Event

```typescript
// lib/timeline/create-event.ts
import { prisma } from "@/lib/prisma";

export async function createTimelineEvent({
  type,
  userId,
  userName,
  userAvatar,
  title,
  description,
  metadata,
  entityType,
  entityId,
}: {
  type: "created" | "updated" | "commented" | "status_changed" | "assigned" | "deleted";
  userId: string;
  userName: string;
  userAvatar?: string | null;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  entityType: string;
  entityId: string;
}) {
  return prisma.timelineEvent.create({
    data: {
      type,
      userId,
      userName,
      userAvatar: userAvatar || undefined,
      title,
      description,
      metadata: metadata || undefined,
      entityType,
      entityId,
    },
  });
}
```

## React Integration

### 1. Fetch Events on Mount

```typescript
// app/projects/[id]/activity/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectActivityPage({
  params,
}: {
  params: { id: string };
}) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${params.id}/events`);

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [params.id]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Loading activity...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Activity</CardTitle>
        <CardDescription>
          Complete history of changes and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ActivityTimeline
          events={events}
          groupByDate={true}
          showFilters={true}
        />
      </CardContent>
    </Card>
  );
}
```

### 2. Create Events on Actions

```typescript
// Example: Creating event when updating project
async function updateProject(projectId: string, updates: any) {
  // Update the project
  await fetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  // Create timeline event
  await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "updated",
      title: "Project settings updated",
      description: `Changed ${Object.keys(updates).join(", ")}`,
      metadata: {
        fields_changed: Object.keys(updates).length,
        ...updates,
      },
      entityType: "project",
      entityId: projectId,
    }),
  });
}
```

## Real-time Updates

### Using Server-Sent Events (SSE)

```typescript
// app/api/projects/[id]/events/stream/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial events
      const events = await prisma.timelineEvent.findMany({
        where: { entityType: "project", entityId: params.id },
        orderBy: { timestamp: "desc" },
        take: 50,
      });

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(events)}\n\n`)
      );

      // Poll for new events every 5 seconds
      const interval = setInterval(async () => {
        const latestEvent = await prisma.timelineEvent.findFirst({
          where: {
            entityType: "project",
            entityId: params.id,
            timestamp: { gt: new Date(Date.now() - 5000) },
          },
        });

        if (latestEvent) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify([latestEvent])}\n\n`)
          );
        }
      }, 5000);

      // Cleanup on close
      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### Client-side SSE Consumer

```typescript
"use client";

import { useEffect, useState } from "react";
import { TimelineEvent } from "@/components/ui/activity-timeline";

export function useRealtimeEvents(projectId: string) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/projects/${projectId}/events/stream`);

    eventSource.onmessage = (event) => {
      const newEvents = JSON.parse(event.data);
      setEvents((prev) => {
        // Merge and dedupe by id
        const merged = [...newEvents, ...prev];
        const unique = Array.from(new Map(merged.map((e) => [e.id, e])).values());
        return unique.sort((a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [projectId]);

  return events;
}

// Usage
function ProjectActivity({ projectId }: { projectId: string }) {
  const events = useRealtimeEvents(projectId);

  return (
    <ActivityTimeline
      events={events}
      groupByDate={true}
      showFilters={true}
    />
  );
}
```

## Pagination

### Infinite Scroll Pattern

```typescript
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";

export default function InfiniteTimelinePage({ projectId }: { projectId: string }) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastEventRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/projects/${projectId}/events?limit=20&offset=${offset}`
      );
      const newEvents = await res.json();

      if (newEvents.length < 20) {
        setHasMore(false);
      }

      setEvents((prev) => [...prev, ...newEvents]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      console.error("Failed to load more events:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId, offset, loading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (lastEventRef.current) {
      observerRef.current.observe(lastEventRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore]);

  // Initial load
  useEffect(() => {
    loadMore();
  }, []); // Only on mount

  return (
    <div>
      <ActivityTimeline
        events={events}
        groupByDate={true}
        showFilters={true}
      />

      <div ref={lastEventRef} className="h-10 flex items-center justify-center">
        {loading && <p className="text-sm text-muted-foreground">Loading more...</p>}
        {!hasMore && events.length > 0 && (
          <p className="text-sm text-muted-foreground">End of timeline</p>
        )}
      </div>
    </div>
  );
}
```

## Filtering & Search

### Server-side Filtering

```typescript
// API with multiple filters
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const userId = searchParams.get("userId");
  const search = searchParams.get("search");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const events = await prisma.timelineEvent.findMany({
    where: {
      entityType: "project",
      entityId: params.id,
      ...(type && { type: type as any }),
      ...(userId && { userId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(startDate && {
        timestamp: { gte: new Date(startDate) },
      }),
      ...(endDate && {
        timestamp: { lte: new Date(endDate) },
      }),
    },
    orderBy: { timestamp: "desc" },
  });

  return NextResponse.json(events);
}
```

### Client-side Search

```typescript
"use client";

import { useState, useMemo } from "react";
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";
import { Input } from "@/components/ui/input";

export default function SearchableTimeline({ events }: { events: TimelineEvent[] }) {
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    if (!search) return events;

    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description?.toLowerCase().includes(search.toLowerCase()) ||
      event.user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ActivityTimeline
        events={filteredEvents}
        groupByDate={true}
        showFilters={true}
      />
    </div>
  );
}
```

## Event Hooks (Auto-create Events)

### Prisma Middleware

```typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { createTimelineEvent } from "./timeline/create-event";

const prisma = new PrismaClient();

// Auto-create timeline events on model changes
prisma.$use(async (params, next) => {
  const result = await next(params);

  // Project created
  if (params.model === "Project" && params.action === "create") {
    await createTimelineEvent({
      type: "created",
      userId: result.userId,
      userName: result.userName || "System",
      userAvatar: null,
      title: `Project "${result.name}" created`,
      description: result.description,
      metadata: { projectId: result.id },
      entityType: "project",
      entityId: result.id,
    });
  }

  // Project updated
  if (params.model === "Project" && params.action === "update") {
    await createTimelineEvent({
      type: "updated",
      userId: result.userId,
      userName: result.userName || "System",
      userAvatar: null,
      title: "Project updated",
      description: "Project settings changed",
      metadata: { changes: params.args.data },
      entityType: "project",
      entityId: result.id,
    });
  }

  return result;
});

export { prisma };
```

## Best Practices

1. **Batch Inserts**: Create multiple events in a transaction
2. **Async Processing**: Use background jobs for event creation
3. **Rate Limiting**: Prevent event spam (max 10/minute per user)
4. **Archiving**: Move old events (90+ days) to archive table
5. **Caching**: Cache recent events (5 minutes TTL)
6. **Indexing**: Ensure proper database indexes
7. **Denormalization**: Store `userName` and `userAvatar` to avoid joins
8. **Soft Deletes**: Keep deleted events for audit trail

## Security

1. **Authorization**: Verify user has access to entity
2. **Sanitization**: Sanitize event titles/descriptions
3. **Rate Limiting**: Prevent abuse
4. **Validation**: Validate event types and metadata
5. **Audit Logging**: Log who created which events

## Example: Complete Integration

```typescript
// app/projects/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ActivityTimeline, TimelineEvent } from "@/components/ui/activity-timeline";
import { Button } from "@/components/ui/button";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  // Fetch events
  useEffect(() => {
    fetch(`/api/projects/${params.id}/events`)
      .then((res) => res.json())
      .then(setEvents);
  }, [params.id]);

  // Create event
  async function handleUpdate() {
    // Update project
    await fetch(`/api/projects/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "active" }),
    });

    // Create timeline event
    await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({
        type: "status_changed",
        title: "Project activated",
        description: "Project status changed to active",
        metadata: { from: "pending", to: "active" },
        entityType: "project",
        entityId: params.id,
      }),
    });

    // Refresh events
    const res = await fetch(`/api/projects/${params.id}/events`);
    setEvents(await res.json());
  }

  return (
    <div>
      <Button onClick={handleUpdate}>Activate Project</Button>

      <ActivityTimeline
        events={events}
        groupByDate={true}
        showFilters={true}
      />
    </div>
  );
}
```

---

This guide covers the complete integration of the Activity Timeline component with a production backend. Adapt the patterns to your specific needs and tech stack.
