/**
 * ✅ FABRK COMPONENT
 * Forgot Password Template - Terminal console style
 * Production-ready ✓
 */
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  StyledCard,
  StyledCardHeader,
  TemplatePageHeader,
  FeaturesCard,
} from "@/components/ui/card";
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
      <main className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="FORGOT_PASSWORD"
          title="Forgot Password"
          description="Password recovery flow with email verification"
        />

        {/* Template Preview */}
        <StyledCard>
          <StyledCardHeader code="0x00" title="PREVIEW" />

          <div className="bg-background/50 flex min-h-[500px] flex-col items-center justify-center p-4 sm:p-8">
            <div className="border-border bg-background w-full max-w-[380px] space-y-6 border p-6">
              {/* Header */}
              <div className="flex flex-col space-y-2 text-center">
                <div className="border-border bg-card mx-auto mb-2 flex h-10 w-10 items-center justify-center border">
                  <ShieldQuestion className="text-primary h-5 w-5" />
                </div>
                <h1 className="font-mono text-2xl font-bold tracking-tight">Reset password</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              {/* Reset Form */}
              <div className="grid gap-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-xs">
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
                    className="text-muted-foreground hover:text-primary inline-flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </StyledCard>

        {/* Template Features Card */}
        <FeaturesCard
          code="0x01"
          features={[
            "Clean, focused recovery form",
            "Clear user instructions and feedback",
            "Easy navigation back to login",
            "Email validation pre-configured",
          ]}
        />
      </main>
    </div>
  );
}
