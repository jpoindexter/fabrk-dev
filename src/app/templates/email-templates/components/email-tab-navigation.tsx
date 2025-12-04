/**
 * Email template tab navigation component
 */

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EmailTemplate } from "./email-template-data";
import { TerminalCardHeader } from "@/components/ui/card";

interface EmailTabNavigationProps {
  templates: EmailTemplate[];
}

export function EmailTabNavigation({ templates }: EmailTabNavigationProps) {
  return (
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="EMAIL_TABS" />
      <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-none border-0 bg-transparent p-0">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <TabsTrigger
              key={template.id}
              value={template.id}
              className="border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 rounded-none border-r px-4 py-2 font-mono text-xs whitespace-nowrap"
            >
              <Icon className="h-3 w-3" />[{template.name.toUpperCase().replace(/ /g, "_")}]
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
