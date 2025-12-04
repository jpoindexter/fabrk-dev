/**
 * FABRK COMPONENT
 * Profile Tabs - Activity feed and projects display
 */

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TerminalCardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Star, GitBranch, LucideIcon } from "lucide-react";

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
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="CONTENT" />

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="border-border h-auto rounded-none border bg-transparent p-0">
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none px-4 py-2 font-mono text-xs"
            >
              <Activity className="mr-1 h-3 w-3" />
              [ACTIVITY]
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none px-4 py-2 font-mono text-xs"
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
                    className="border-border hover:bg-muted/30 flex items-center gap-4 border p-4 transition-colors"
                  >
                    <div className="border-border bg-muted/30 border p-2">
                      <Icon className="text-muted-foreground h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm">{item.title}</div>
                      <div className="text-muted-foreground font-mono text-xs">
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
                  className="border-border hover:bg-muted/30 border p-4 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-primary font-mono text-sm font-medium">
                          {project.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-border rounded-none font-mono text-xs"
                        >
                          {project.language}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-mono text-xs">
                        {project.description}
                      </p>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
                      <Star className="h-3 w-3" />
                      {project.stars}
                    </div>
                  </div>
                  <div className="text-muted-foreground mt-2 font-mono text-xs">
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
