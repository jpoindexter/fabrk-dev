/**
 * FABRK COMPONENT
 * Profile Tabs - Activity feed and projects display
 */

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TerminalTabs, TerminalTabsContent } from "@/components/ui/terminal-tabs";
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

const tabs = [
  { id: "activity", label: "ACTIVITY", icon: Activity },
  { id: "projects", label: "PROJECTS", icon: GitBranch },
];

export function ProfileTabs({ activity, projects }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <TerminalTabs
      code="0x00"
      title="CONTENT"
      tabs={tabs}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TerminalTabsContent value="activity">
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
                  <div className="text-muted-foreground font-mono text-xs">{item.timestamp}</div>
                </div>
              </div>
            );
          })}
        </div>
      </TerminalTabsContent>

      <TerminalTabsContent value="projects">
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
                  <p className="text-muted-foreground font-mono text-xs">{project.description}</p>
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
      </TerminalTabsContent>
    </TerminalTabs>
  );
}
