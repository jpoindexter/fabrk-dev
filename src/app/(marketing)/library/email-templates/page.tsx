/**
 * FABRK COMPONENT
 * Email Templates Showcase - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { TemplatePageHeader, Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { emailTemplates } from './components/email-template-data';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import DOMPurify from 'isomorphic-dompurify';

const templateCode = `"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function WelcomeEmail() {
  return (
    <div className="mx-auto max-w-[600px] border border-border bg-background p-8">
      {/* Header */}
      <div className="mb-6 border-b border-border pb-6">
        <h1 className={cn(mode.font, "text-2xl font-semibold")}>
          Welcome to Fabrk
        </h1>
      </div>

      {/* Content */}
      <div className={cn(mode.font, "mb-6 space-y-4 text-sm")}>
        <p>Hi {"{name}"},</p>
        <p>
          Welcome to Fabrk! We're excited to have you on board.
        </p>
        <p>
          Your account has been successfully created and you're ready to start
          building amazing products.
        </p>
      </div>

      {/* CTA */}
      <div className="mb-6">
        <Button className={cn(mode.radius, mode.font, "w-full text-xs")}>
          &gt; GET STARTED
        </Button>
      </div>

      {/* Footer */}
      <div className={cn(mode.font, "border-t border-border pt-4 text-xs text-muted-foreground")}>
        <p>© 2024 Fabrk. All rights reserved.</p>
      </div>
    </div>
  );
}`;

const tabs = emailTemplates.map((template) => ({
  id: template.id,
  label: template.name.toUpperCase(),
  icon: template.icon,
}));

function EmailTemplatesPreview() {
  const [activeTab, setActiveTab] = useState(emailTemplates[0].id);

  return (
    <div className="bg-background/50 min-h-[600px] p-4 sm:p-8">
      <div className="space-y-6">
        {/* Email Tabs */}
        <StyledTabs
          code="0x00"
          title="EMAIL TABS"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {emailTemplates.map((template) => (
            <StyledTabsContent key={template.id} value={template.id}>
              <Card>
                <CardContent padding="lg">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h2 className={cn(mode.font, 'text-lg font-semibold')}>{template.name}</h2>
                        <span
                          className={cn(
                            mode.font,
                            'border-border text-muted-foreground border px-2 py-0.5 text-xs'
                          )}
                        >
                          {template.category}
                        </span>
                      </div>
                      <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Email Preview */}
                  <div className={cn(mode.radius, 'border-border bg-muted mb-6 border p-8')}>
                    <div
                      className="border-border bg-background mx-auto block min-h-[400px] max-w-[600px] border p-6"
                      // SECURITY: Sanitized with DOMPurify to prevent XSS
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(template.preview),
                      }}
                    />
                  </div>

                  {/* Template Details */}
                  <div
                    className={cn(
                      mode.font,
                      'border-border grid gap-6 border-t pt-6 text-xs md:grid-cols-2'
                    )}
                  >
                    <div>
                      <div className="text-muted-foreground mb-2">[TRIGGER EVENTS]:</div>
                      <div className="flex flex-wrap gap-2">
                        {template.triggers.map((trigger, idx) => (
                          <span key={idx} className="border-border bg-muted/30 border px-2 py-1">
                            &gt; {trigger}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted-foreground mb-2">[VARIABLES]:</div>
                      <div className="flex flex-wrap gap-2">
                        {template.variables.map((variable, idx) => (
                          <span
                            key={idx}
                            className="border-primary/30 bg-primary/5 text-primary border px-2 py-1"
                          >
                            {`{${variable}}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StyledTabsContent>
          ))}
        </StyledTabs>
      </div>
    </div>
  );
}

export default function EmailTemplatesShowcase() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="EMAIL TEMPLATES"
          title="Email Templates"
          description="5 production-ready transactional email templates with HTML and text versions"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
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
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <EmailTemplatesPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">lib/</span>
                  <span className="text-muted-foreground">emails/</span>
                  <span className="text-foreground">welcome.tsx</span>
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
                <span className="text-success">&gt;</span> 5 transactional email templates
              </div>
              <div>
                <span className="text-success">&gt;</span> Welcome, password reset, invoice, alert,
                verification
              </div>
              <div>
                <span className="text-success">&gt;</span> Dynamic variable support
              </div>
              <div>
                <span className="text-success">&gt;</span> Trigger event mapping
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive email layouts
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-themed design
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
