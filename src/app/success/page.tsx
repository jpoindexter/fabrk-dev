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
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="w-full max-w-2xl">
        <CardContent className="space-y-6 p-8">
          {/* Success Icon & Header */}
          <div className="space-y-4 text-center">
            <div className="bg-primary mx-auto flex h-20 w-20 items-center justify-center rounded-none">
              <CheckCircle className="text-primary-foreground h-12 w-12" />
            </div>
            <h1 className="text-4xl font-semibold">Purchase Successful!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>
          </div>

          {/* Check your email banner */}
          <div className="border-border bg-primary/10 space-y-4 rounded-none border p-6">
            <div className="flex items-center justify-center gap-4">
              <Mail className="text-foreground h-6 w-6" />
              <h3 className="text-lg font-semibold">Check Your Email</h3>
            </div>
            <p className="text-muted-foreground text-center">
              We've sent you a confirmation email with a magic link to instantly access your
              dashboard - no password needed!
            </p>
          </div>

          {/* What's in the email */}
          <div className="border-border bg-muted space-y-4 rounded-none border p-6">
            <h3 className="text-lg font-semibold">What's in Your Email:</h3>
            <ul className="text-muted-foreground space-y-4">
              <li className="flex items-start gap-4">
                <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-none text-sm font-medium">
                  1
                </span>
                <span>
                  <strong className="text-foreground">GitHub Repository Access</strong> - You've
                  been invited to the private Fabrk repository
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-none text-sm font-medium">
                  2
                </span>
                <span>
                  <strong className="text-foreground">Magic Link</strong> - Click to instantly
                  access your dashboard (valid for 7 days)
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-none text-sm font-medium">
                  3
                </span>
                <span>
                  <strong className="text-foreground">Getting Started Guide</strong> - Next steps to
                  clone and use your boilerplate
                </span>
              </li>
            </ul>
          </div>

          {/* GitHub Access */}
          <div className="border-border bg-secondary/20 space-y-4 rounded-none border p-6">
            <div className="flex items-center justify-center gap-2">
              <Package className="text-foreground h-5 w-5" />
              <h3 className="font-semibold">Access Your Repository</h3>
            </div>
            <p className="text-muted-foreground text-center text-sm">
              Check your email for the GitHub invitation. Once accepted, you'll have full access to
              clone and download the boilerplate.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button asChild size="lg" className="w-full">
                <a
                  href="https://github.com/notifications"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  &gt; CHECK_GITHUB_INVITATIONS
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <a href="/docs/getting-started" target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-2 h-4 w-4" />
                  &gt; VIEW_DOCUMENTATION
                </a>
              </Button>
            </div>
          </div>

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
                <div className="border-primary h-4 w-4 animate-spin rounded-none border-2 border-t-transparent" />
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
        </CardContent>
      </Card>
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
