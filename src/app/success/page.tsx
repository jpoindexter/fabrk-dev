/**
 * Purchase Success Page
 * Shows after successful Stripe checkout
 * Works for both authenticated and guest purchases
 */

"use client";

import { CheckCircle, Download, Mail, FileDown, Package } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    if (!sessionId) {
      toast.error("Session ID not found. Please contact support.");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch("/api/resend-purchase-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Email Sent!", {
          description: "Check your inbox - the confirmation email has been resent.",
        });
      } else {
        toast.error("Failed to Send", {
          description: data.error || "Please try again or contact support.",
        });
      }
    } catch {
      toast.error("Error", {
        description: "Failed to resend email. Please try again later.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <TerminalCard className="w-full max-w-2xl">
        <TerminalCardContent className="space-y-6 p-8" padding="lg">
          {/* Success Icon & Header */}
          <div className="space-y-4 text-center">
            <div className="bg-primary mx-auto flex h-20 w-20 items-center justify-center rounded-none">
              <CheckCircle className="text-primary-foreground size-12" />
            </div>
            <h1 className="text-4xl font-semibold">Purchase Successful!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>
          </div>

          {/* Check your email banner */}
          <TerminalCard>
            <TerminalCardHeader
              code="0x01"
              title="CHECK_YOUR_EMAIL"
              icon={<Mail className="size-4" />}
            />
            <TerminalCardContent padding="md">
              <p className="text-muted-foreground font-mono text-xs">
                We've sent you a confirmation email with a magic link to instantly access your
                dashboard - no password needed!
              </p>
            </TerminalCardContent>
          </TerminalCard>

          {/* What's in the email */}
          <TerminalCard>
            <TerminalCardHeader
              code="0x02"
              title="EMAIL_CONTENTS"
              icon={<Package className="size-4" />}
            />
            <TerminalCardContent padding="md">
              <ul className="text-muted-foreground space-y-4 font-mono text-xs">
                <li className="flex items-start gap-4">
                  <span className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <span>
                    <strong className="text-foreground">GITHUB_REPOSITORY_ACCESS</strong> - You've
                    been invited to the private Fabrk repository
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <span>
                    <strong className="text-foreground">MAGIC_LINK</strong> - Click to instantly
                    access your dashboard (valid for 7 days)
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <span>
                    <strong className="text-foreground">GETTING_STARTED_GUIDE</strong> - Next steps
                    to clone and use your boilerplate
                  </span>
                </li>
              </ul>
            </TerminalCardContent>
          </TerminalCard>

          {/* GitHub Access */}
          <TerminalCard>
            <TerminalCardHeader
              code="0x03"
              title="ACCESS_YOUR_REPOSITORY"
              icon={<Download className="size-4" />}
            />
            <TerminalCardContent padding="md">
              <div className="space-y-4">
                <p className="text-muted-foreground font-mono text-xs">
                  Check your email for the GitHub invitation. Once accepted, you'll have full access
                  to clone and download the boilerplate.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Button asChild size="lg" className="w-full font-mono text-xs">
                    <a
                      href="https://github.com/notifications"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 size-4" />
                      &gt; CHECK_GITHUB
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full font-mono text-xs">
                    <a href="/docs/getting-started" target="_blank" rel="noopener noreferrer">
                      <FileDown className="mr-2 size-4" />
                      &gt; VIEW_DOCS
                    </a>
                  </Button>
                </div>
              </div>
            </TerminalCardContent>
          </TerminalCard>

          {/* Email not received */}
          <div className="py-4 text-center">
            <p className="text-muted-foreground mb-4 text-sm">
              Didn't receive the email? Check your spam folder.
            </p>
            {!isResending ? (
              <Button onClick={handleResendEmail} variant="link" className="text-primary">
                &gt; CLICK_TO_RESEND
              </Button>
            ) : (
              <div className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                <div className="border-primary size-4 animate-spin rounded-none border-2 border-t-transparent" />
                <span>Sending email...</span>
              </div>
            )}
          </div>

          {/* Alternative action */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">&gt; RETURN_HOME</Link>
            </Button>
          </div>

          {/* Support section */}
          <div className="border-border border-t pt-4 text-center">
            <p className="text-muted-foreground text-sm">
              Need help?{" "}
              <Link href="/support" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </TerminalCardContent>
      </TerminalCard>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}
    >
      <SuccessContent />
    </Suspense>
  );
}
