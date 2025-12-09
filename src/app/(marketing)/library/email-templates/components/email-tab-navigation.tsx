/**
 * Email template tab navigation component
 */

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { EmailTemplate } from './email-template-data';
import { Card, CardHeader } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface EmailTabNavigationProps {
  templates: EmailTemplate[];
}

export function EmailTabNavigation({ templates }: EmailTabNavigationProps) {
  return (
    <Card>
      <CardHeader code="0x00" title="EMAIL_TABS" />
      <TabsList
        className={cn(
          'h-auto w-full justify-start overflow-x-auto border-0 bg-transparent p-0',
          mode.radius
        )}
      >
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <TabsTrigger
              key={template.id}
              value={template.id}
              className={cn(
                'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs whitespace-nowrap',
                mode.radius,
                mode.font
              )}
            >
              <Icon className="h-3 w-3" />[
              {template.name.toUpperCase().replace(/ /g, '_')}]
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Card>
  );
}
