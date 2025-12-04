/**
 * ✅ FABRK COMPONENT
 * Two-Factor Auth Template - Terminal console style
 * Production-ready ✓
 */
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const metadata: Metadata = {
  title: "Two-Factor Auth Template - Fabrk",
  description: "Two-factor authentication verification template.",
};

export default function TwoFactorTemplate() {
  return (
    <div>
      {/* Page Content */}
      <main className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="border-border inline-block border px-4 py-1">
              <span className="text-muted-foreground font-mono text-xs">
                [TEMPLATE]: TWO_FACTOR
              </span>
            </div>
            <h1 className="font-mono text-4xl font-semibold tracking-tight">Two-Factor Auth</h1>
            <p className="text-muted-foreground font-mono text-sm">
              2FA verification screen with code input
            </p>
          </div>
        </div>

        {/* Template Preview */}
        <TerminalCard>
          <TerminalCardHeader code="0x00" title="PREVIEW" />

          <div className="bg-background/50 flex min-h-[500px] flex-col items-center justify-center p-4 sm:p-8">
            <div className="border-border bg-background w-full max-w-[380px] space-y-6 border p-6 shadow-sm">
              {/* Header */}
              <div className="flex flex-col space-y-2 text-center">
                <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
                  <ShieldCheck className="text-primary h-5 w-5" />
                </div>
                <h1 className="font-mono text-2xl font-bold tracking-tight">
                  Two-factor authentication
                </h1>
                <p className="text-muted-foreground text-sm">
                  We sent a verification code to your email. Enter the code from the email in the
                  field below.
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

                  <Button className="w-full rounded-none font-mono text-xs" type="submit">
                    &gt; VERIFY
                  </Button>
                </form>

                <div className="text-center text-sm">
                  <p className="text-muted-foreground">
                    Didn&apos;t receive the code?{" "}
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
        </TerminalCard>

        {/* Template Features Card */}
        <TerminalCard>
          <TerminalCardHeader code="0x01" title="TEMPLATE_FEATURES" />
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> OTP input field with 6-digit slots
              </div>
              <div>
                <span className="text-success">&gt;</span> Auto-focus and keyboard navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Resend code functionality
              </div>
              <div>
                <span className="text-success">&gt;</span> Fallback option to return to login
              </div>
            </div>
          </div>
        </TerminalCard>
      </main>
    </div>
  );
}
