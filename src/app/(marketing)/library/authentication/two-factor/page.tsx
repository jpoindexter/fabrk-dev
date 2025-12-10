/**
 * Two-Factor Auth Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function TwoFactorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="border-border bg-background w-full max-w-[380px] space-y-6 border p-6">
        {/* Header */}
        <div className="flex flex-col space-y-2 text-center">
          <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
            <ShieldCheck className="text-primary h-5 w-5" />
          </div>
          <h1 className={cn(mode.font, "text-2xl font-semibold tracking-tight")}>
            Two-factor authentication
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>

        {/* Verification Form */}
        <form className="space-y-4">
          <div className="flex justify-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button className={cn(mode.radius, mode.font, "w-full text-xs")} type="submit">
            &gt; VERIFY
          </Button>
        </form>

        {/* Resend code */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Didn't receive the code?{" "}
            <Button variant="link" className="text-primary h-auto p-0">
              Resend
            </Button>
          </p>
        </div>

        {/* Back to sign in */}
        <div className="text-center text-sm">
          <Link
            href="/sign-in"
            className="text-muted-foreground hover:text-primary inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}`;

function TwoFactorPreview() {
  return (
    <div className="bg-background/50 flex min-h-[500px] flex-col items-center justify-center p-4 sm:p-8">
      <div className="border-border bg-background w-full max-w-[380px] space-y-6 border p-6">
        {/* Header */}
        <div className="flex flex-col space-y-2 text-center">
          <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
            <ShieldCheck className="text-primary h-5 w-5" />
          </div>
          <h1 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>
            Two-factor authentication
          </h1>
          <p className="text-muted-foreground text-sm">
            We sent a verification code to your email. Enter the code from the email in the field
            below.
          </p>
        </div>

        {/* Verification Form */}
        <div className="grid gap-6">
          <form className="space-y-4">
            <div className="flex justify-center">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button className={cn(mode.radius, mode.font, 'w-full text-xs')} type="submit">
              &gt; VERIFY
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Didn&apos;t receive the code?{' '}
              <Button variant="link" className="text-primary h-auto p-0">
                Resend
              </Button>
            </p>
          </div>

          <div className="text-center text-sm">
            <Link
              href="/templates/authentication/sign-in"
              className="text-muted-foreground hover:text-primary inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TwoFactorTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="TWO FACTOR"
          title="Two-Factor Auth"
          description="2FA verification screen with code input"
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
              <TwoFactorPreview />
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
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(auth)/</span>
                  <span className="text-foreground">two-factor/page.tsx</span>
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
                <span className="text-success">&gt;</span> OTP input with 6-digit slots
              </div>
              <div>
                <span className="text-success">&gt;</span> Auto-focus and keyboard navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Resend code functionality
              </div>
              <div>
                <span className="text-success">&gt;</span> Back to login navigation
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
