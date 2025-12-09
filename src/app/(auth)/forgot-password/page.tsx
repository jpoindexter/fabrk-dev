'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export default function ForgotPasswordPage() {
  return (
    <div className="border-border bg-background w-full space-y-6 border p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
          <ShieldQuestion className="text-primary h-5 w-5" />
        </div>
        <h1 className={cn(mode.font, 'text-2xl font-semibold tracking-tight')}>
          Reset password
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      {/* Reset Form */}
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={cn(mode.font, 'text-xs')}>
            [EMAIL]:
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
            className={cn(mode.radius, mode.font, 'text-xs')}
          />
        </div>

        <Button
          className={cn(mode.radius, mode.font, 'w-full text-xs')}
          type="submit"
        >
          &gt; SEND_RESET_LINK
        </Button>
      </form>

      {/* Back to sign in */}
      <div className="text-center text-sm">
        <Link
          href="/login"
          className="text-muted-foreground hover:text-primary inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
