/**
 * Email template tab navigation component
 */

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EmailTemplate } from "./email-template-data";

interface EmailTabNavigationProps {
  templates: EmailTemplate[];
}

export function EmailTabNavigation({ templates }: EmailTabNavigationProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">email_nav.tsx</span>
      </div>
      <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto overflow-x-auto">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <TabsTrigger
              key={template.id}
              value={template.id}
              className="flex items-center gap-2 px-4 py-2 border-r border-border rounded-none font-mono text-xs whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground"
            >
              <Icon className="h-3 w-3" />
              [{template.name.toUpperCase().replace(/ /g, "_")}]
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
