/**
 * ✅ FABRK COMPONENT
 * Forgot Password Template - Terminal console style
 * Production-ready ✓
 */
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShieldQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Forgot Password Template - Fabrk",
  description: "Password recovery flow template.",
};

export default function ForgotPasswordTemplate() {
  return (
    <div>
      {/* Page Content */}
      <main className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-4 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: FORGOT_PASSWORD</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Forgot Password</h1>
            <p className="font-mono text-sm text-muted-foreground">
              Password recovery flow with email verification
            </p>
          </div>
        </div>

        {/* Template Preview */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-none bg-destructive/50" />
              <div className="size-2 rounded-none bg-warning/50" />
              <div className="size-2 rounded-none bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">preview.tsx</span>
          </div>
          
          <div className="flex min-h-[500px] flex-col items-center justify-center p-4 sm:p-8 bg-background/50">
            <div className="w-full max-w-[380px] space-y-6 border border-border bg-background p-6 shadow-sm">
              {/* Header */}
              <div className="flex flex-col space-y-2 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center border border-border bg-card">
                  <ShieldQuestion className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Reset password</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              {/* Reset Form */}
              <div className="grid gap-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-xs">[EMAIL]:</Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      required
                      className="rounded-none font-mono text-xs"
                    />
                  </div>

                  <Button className="w-full rounded-none font-mono text-xs" type="submit">
                    &gt; SEND_RESET_LINK
                  </Button>
                </form>

                <div className="text-center text-sm">
                  <Link
                    href="/templates/authentication/sign-in"
                    className="inline-flex items-center text-muted-foreground hover:text-primary"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Template Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-none bg-destructive/50" />
              <div className="size-2 rounded-none bg-warning/50" />
              <div className="size-2 rounded-none bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">features.md</span>
          </div>
          <div className="p-4">
            <div className="mb-4 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div><span className="text-success">&gt;</span> Clean, focused recovery form</div>
              <div><span className="text-success">&gt;</span> Clear user instructions and feedback</div>
              <div><span className="text-success">&gt;</span> Easy navigation back to login</div>
              <div><span className="text-success">&gt;</span> Email validation pre-configured</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}