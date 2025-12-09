'use client';

/**
 * Password Card
 * Part of SecuritySettings split
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Key } from 'lucide-react';

import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
export function SecurityPasswordCard() {
  return (
    <Card tone="neutral">
      <CardHeader
        code="0x04"
        title="PASSWORD"
        icon={<Key className="h-4 w-4" />}
      />
      <CardContent>
        <p className="text-muted-foreground mb-4 font-mono text-xs">
          Change your password regularly to keep your account secure
        </p>
        <Button variant="outline">&gt; CHANGE_PASSWORD</Button>
      </CardContent>
    </Card>
  );
}
