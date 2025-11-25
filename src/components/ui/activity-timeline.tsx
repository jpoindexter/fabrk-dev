"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Edit,
  MessageSquare,
  GitCommit,
  UserPlus,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface TimelineEvent {
  id: string;
  type:
    | "created"
    | "updated"
    | "commented"
    | "status_changed"
    | "assigned"
    | "deleted";
  user: {
    name: string;
    avatar?: string;
  };
  title: string;
  description?: string;
  timestamp: Date | string;
  metadata?: Record<string, any>;
}

export interface ActivityTimelineProps {
  events: TimelineEvent[];
  groupByDate?: boolean;
  showFilters?: boolean;
  compact?: boolean;
  className?: string;
}

const EVENT_CONFIG = {
  created: {
    icon: FileText,
    color: "bg-primary",
    textColor: "text-primary",
    label: "Created",
  },
  updated: {
    icon: Edit,
    color: "bg-accent",
    textColor: "text-accent-foreground",
    label: "Updated",
  },
  commented: {
    icon: MessageSquare,
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
    label: "Commented",
  },
  status_changed: {
    icon: GitCommit,
    color: "bg-primary",
    textColor: "text-primary",
    label: "Status Changed",
  },
  assigned: {
    icon: UserPlus,
    color: "bg-accent",
    textColor: "text-accent-foreground",
    label: "Assigned",
  },
  deleted: {
    icon: Trash2,
    color: "bg-destructive",
    textColor: "text-destructive",
    label: "Deleted",
  },
} as const;

function formatRelativeTime(timestamp: Date | string): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function formatAbsoluteTime(timestamp: Date | string): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateGroup(timestamp: Date | string): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
  compact?: boolean;
}

function TimelineItem({ event, isLast, compact }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = EVENT_CONFIG[event.type];
  const Icon = config.icon;
  const hasExpandableContent = Boolean(event.description || event.metadata);

  return (
    <div className="relative flex gap-4 pb-8">
      {/* Timeline Line */}
      {!isLast && (
        <div
          className="absolute left-[19px] top-10 h-full w-0.5 bg-border"
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <div
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border shadow-sm",
          config.color
        )}
      >
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2 pt-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-foreground">{event.title}</p>
              <Badge
                variant="outline"
                className="text-xs"
              >
                {config.label}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-5 w-5 border">
                <AvatarImage src={event.user.avatar} alt={event.user.name} />
                <AvatarFallback className="text-xs">
                  {getInitials(event.user.name)}
                </AvatarFallback>
              </Avatar>
              <span>{event.user.name}</span>
              <span>•</span>
              <time
                dateTime={
                  typeof event.timestamp === "string"
                    ? event.timestamp
                    : event.timestamp.toISOString()
                }
                title={formatAbsoluteTime(event.timestamp)}
              >
                {formatRelativeTime(event.timestamp)}
              </time>
            </div>
          </div>

          {hasExpandableContent && !compact && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="shrink-0"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Expanded Content */}
        {!compact && (isExpanded || (!hasExpandableContent && event.description)) && (
          <div className="rounded-md border bg-card p-4 shadow-sm">
            {event.description && (
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
            )}

            {event.metadata && Object.keys(event.metadata).length > 0 && (
              <div className="mt-3 space-y-1">
                {Object.entries(event.metadata).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="font-medium text-foreground capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="text-muted-foreground">
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="h-3 w-3 text-primary" />
                        ) : (
                          <X className="h-3 w-3 text-destructive" />
                        )
                      ) : (
                        String(value)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ActivityTimeline({
  events,
  groupByDate = false,
  showFilters = false,
  compact = false,
  className,
}: ActivityTimelineProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<TimelineEvent["type"]>>(
    new Set(Object.keys(EVENT_CONFIG) as TimelineEvent["type"][])
  );

  // Filter events by selected types
  const filteredEvents = useMemo(() => {
    return events.filter((event) => selectedTypes.has(event.type));
  }, [events, selectedTypes]);

  // Group events by date if needed
  const groupedEvents = useMemo(() => {
    if (!groupByDate) {
      return { ungrouped: filteredEvents };
    }

    const groups: Record<string, TimelineEvent[]> = {};

    filteredEvents.forEach((event) => {
      const dateKey = formatDateGroup(event.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });

    return groups;
  }, [filteredEvents, groupByDate]);

  const toggleEventType = (type: TimelineEvent["type"]) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(type)) {
      newSelected.delete(type);
    } else {
      newSelected.add(type);
    }
    setSelectedTypes(newSelected);
  };

  const eventTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach((event) => {
      counts[event.type] = (counts[event.type] || 0) + 1;
    });
    return counts;
  }, [events]);

  if (events.length === 0) {
    return (
      <div
        className={cn(
          "rounded-md border bg-muted p-8 text-center shadow-sm",
          className
        )}
      >
        <p className="text-sm text-muted-foreground">No activity yet</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filters */}
      {showFilters && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Activity Timeline
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <Badge variant="secondary" size="sm" className="ml-1">
                  {selectedTypes.size}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {Object.entries(EVENT_CONFIG).map(([type, config]) => {
                const Icon = config.icon;
                const count = eventTypeCounts[type] || 0;
                return (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedTypes.has(type as TimelineEvent["type"])}
                    onCheckedChange={() =>
                      toggleEventType(type as TimelineEvent["type"])
                    }
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <Icon className={cn("h-4 w-4", config.textColor)} />
                      <span>{config.label}</span>
                      <Badge variant="outline" className="ml-auto">
                        {count}
                      </Badge>
                    </div>
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Timeline */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-md border bg-muted p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            No events match the selected filters
          </p>
        </div>
      ) : groupByDate ? (
        Object.entries(groupedEvents).map(([dateGroup, groupEvents]) => (
          <div key={dateGroup} className="space-y-4">
            <h4 className="rounded-md bg-muted px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {dateGroup}
            </h4>
            <div className="pl-2">
              {groupEvents.map((event, index) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  isLast={index === groupEvents.length - 1}
                  compact={compact}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="pl-2">
          {filteredEvents.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              isLast={index === filteredEvents.length - 1}
              compact={compact}
            />
          ))}
        </div>
      )}
    </div>
  );
}
