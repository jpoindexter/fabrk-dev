/**
 * Email template tab navigation component
 */

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { EmailTemplate } from './email-template-data';
import { Card, CardHeader } from '@/components/ui/card';

interface EmailTabNavigationProps {
  templates: EmailTemplate[];
}

export function EmailTabNavigation({ templates }: EmailTabNavigationProps) {
  return (
    <Card>
      <CardHeader code="0x00" title="EMAIL TABS" />
      <TabsList>
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <TabsTrigger key={template.id} value={template.id}>
              <Icon className="h-3 w-3" />
              {template.name}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Card>
  );
}
