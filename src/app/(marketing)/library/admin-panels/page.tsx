/**
 * FABRK COMPONENT
 * Admin Panels Category - Terminal console style
 * Production-ready
 */
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { getCategoryInfo, getTemplatesByCategory } from '../library-data';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Webhook } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function AdminPanel() {
  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={cn(mode.font, "text-2xl font-semibold")}>
          Admin Panel
        </h1>
        <Button className={cn(mode.radius, mode.font, "text-xs")}>
          <Settings className="mr-2 h-4 w-4" />
          &gt; SETTINGS
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader code="0x00" title="TOTAL_USERS" />
          <CardContent padding="lg">
            <div className={cn(mode.font, "text-3xl font-semibold")}>1,234</div>
            <p className={cn(mode.font, "text-muted-foreground text-xs")}>
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x01" title="ACTIVE_SESSIONS" />
          <CardContent padding="lg">
            <div className={cn(mode.font, "text-3xl font-semibold")}>856</div>
            <p className={cn(mode.font, "text-muted-foreground text-xs")}>
              Currently online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x02" title="API_REQUESTS" />
          <CardContent padding="lg">
            <div className={cn(mode.font, "text-3xl font-semibold")}>45.2K</div>
            <p className={cn(mode.font, "text-muted-foreground text-xs")}>
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader code="0x03" title="USER_MANAGEMENT" />
          <CardContent padding="lg">
            <p className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
              Manage users, roles, and permissions
            </p>
            <Button className={cn(mode.radius, mode.font, "text-xs")}>
              <Users className="mr-2 h-4 w-4" />
              &gt; MANAGE_USERS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader code="0x04" title="WEBHOOKS" />
          <CardContent padding="lg">
            <p className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
              Configure and monitor webhooks
            </p>
            <Button className={cn(mode.radius, mode.font, "text-xs")}>
              <Webhook className="mr-2 h-4 w-4" />
              &gt; MANAGE_WEBHOOKS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`;

const categoryTemplates = getTemplatesByCategory('admin');
const categoryInfo = getCategoryInfo('admin');

function AdminPanelsPreview() {
  return (
    <div className="bg-background/50 min-h-[600px] p-4 sm:p-8">
      <div className="space-y-6">
        {/* Category Header */}
        <div className="space-y-4">
          <div className="border-border inline-block border px-4 py-1">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [CATEGORY]: ADMIN_PANELS
            </span>
          </div>
          <div className="flex items-center gap-4">
            {categoryInfo && <categoryInfo.icon className="text-primary h-6 w-6" />}
            <h1 className={cn(mode.font, 'text-4xl font-semibold')}>Admin Panels</h1>
            <span className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}>
              COUNT: {categoryTemplates.length}
            </span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {categoryTemplates.map((template) => (
            <Link key={template.id} href={template.href}>
              <div className="group border-border bg-card hover:border-primary/50 border transition-colors">
                {/* Card Header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    [TEMPLATE]: {template.id.toUpperCase().replace(/-/g, '_')}
                  </span>
                  <template.icon className="text-muted-foreground size-4" />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Status & Badge */}
                  <div className={cn(mode.font, 'mb-4 flex items-center justify-between text-xs')}>
                    <div>
                      <span className="text-muted-foreground">STATUS: </span>
                      <span className="text-success">READY</span>
                    </div>
                    {template.badge && (
                      <div className="border-primary/50 text-primary border px-2 py-0.5">
                        {template.badge.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={cn(mode.font, 'mb-2 text-lg font-semibold')}>{template.name}</h3>

                  {/* Description */}
                  <div className={cn(mode.font, 'mb-4 text-xs')}>
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{template.description}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>
                      [FEATURES]:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        mode.font,
                        'text-primary group-hover:text-primary/80 text-xs transition-colors'
                      )}
                    >
                      &gt; VIEW_TEMPLATE
                    </span>
                    <span
                      className={cn(
                        mode.font,
                        'text-muted-foreground text-xs transition-transform group-hover:translate-x-1'
                      )}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminPanelsPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="ADMIN_PANELS"
          title="Admin Panels"
          description="Backend admin interfaces for user management, webhooks, and system monitoring"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <AdminPanelsPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">admin/</span>
                  <span className="text-foreground">page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> User management with role-based access
                control
              </div>
              <div>
                <span className="text-success">&gt;</span> Invitation system with 7-day token expiry
              </div>
              <div>
                <span className="text-success">&gt;</span> Organization switcher with multi-tenancy
                support
              </div>
              <div>
                <span className="text-success">&gt;</span> Audit logs and activity tracking
              </div>
              <div>
                <span className="text-success">&gt;</span> Data tables with sorting, filtering, and
                pagination
              </div>
              <div>
                <span className="text-success">&gt;</span> Webhook management and delivery history
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
