/**
 * FABRK COMPONENT
 * Profile Tabs - Activity feed and projects display
 */

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Star,
  GitBranch,
  LucideIcon,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  icon: LucideIcon;
}

interface Project {
  id: string;
  name: string;
  description: string;
  stars: number;
  language: string;
  updated: string;
}

interface ProfileTabsProps {
  activity: ActivityItem[];
  projects: Project[];
}

export function ProfileTabs({ activity, projects }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          content.tsx
        </span>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="rounded-none border border-border bg-transparent p-0 h-auto">
            <TabsTrigger
              value="activity"
              className="rounded-none font-mono text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Activity className="mr-1 h-3 w-3" />
              [ACTIVITY]
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="rounded-none font-mono text-xs px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <GitBranch className="mr-1 h-3 w-3" />
              [PROJECTS]
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="mt-4">
            <div className="space-y-2">
              {activity.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border border-border p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="p-2 border border-border bg-muted/30">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm">{item.title}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {item.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-border p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-medium text-primary">
                          {project.name}
                        </span>
                        <Badge className="rounded-none font-mono text-[10px] bg-muted text-muted-foreground">
                          {project.language}
                        </Badge>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Star className="h-3 w-3" />
                      {project.stars}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-2">
                    Updated {project.updated}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
