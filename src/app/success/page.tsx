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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="space-y-6 p-8">
          {/* Success Icon & Header */}
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-none bg-primary">
              <CheckCircle className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-semibold">Purchase Successful!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>
          </div>

          {/* Check your email banner */}
          <div className="space-y-4 rounded-none border border-border bg-primary/10 p-6">
            <div className="flex items-center justify-center gap-4">
              <Mail className="h-6 w-6 text-foreground" />
              <h3 className="text-lg font-semibold">Check Your Email</h3>
            </div>
            <p className="text-center text-muted-foreground">
              We've sent you a confirmation email with a magic link to instantly access your dashboard - no password needed!
            </p>
          </div>

          {/* What's in the email */}
          <div className="space-y-4 rounded-none border border-border bg-muted p-6">
            <h3 className="text-lg font-semibold">What's in Your Email:</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary text-sm font-medium text-primary-foreground">
                  1
                </span>
                <span>
                  <strong className="text-foreground">GitHub Repository Access</strong> - You've been invited to the private Fabrk repository
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary text-sm font-medium text-primary-foreground">
                  2
                </span>
                <span>
                  <strong className="text-foreground">Magic Link</strong> - Click to instantly access your dashboard (valid for 7 days)
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-primary text-sm font-medium text-primary-foreground">
                  3
                </span>
                <span>
                  <strong className="text-foreground">Getting Started Guide</strong> - Next steps to clone and use your boilerplate
                </span>
              </li>
            </ul>
          </div>

          {/* GitHub Access */}
          <div className="space-y-4 rounded-none border border-border bg-secondary/20 p-6">
            <div className="flex items-center justify-center gap-2">
              <Package className="h-5 w-5 text-foreground" />
              <h3 className="font-semibold">Access Your Repository</h3>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Check your email for the GitHub invitation. Once accepted, you'll have full access to clone and download the boilerplate.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button asChild size="lg" className="w-full">
                <a href="https://github.com/notifications" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Check GitHub Invitations
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <a href="/docs/getting-started" target="_blank" rel="noopener noreferrer">
                  <FileDown className="mr-2 h-4 w-4" />
                  View Documentation
                </a>
              </Button>
            </div>
          </div>

          {/* Email not received */}
          <div className="py-4 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder.
            </p>
            {!isResending ? (
              <Button
                onClick={handleResendEmail}
                variant="link"
                className="text-primary"
              >
                Click to resend
              </Button>
            ) : (
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-4 w-4 animate-spin rounded-none border-2 border-primary border-t-transparent" />
                <span>Sending email...</span>
              </div>
            )}
          </div>

          {/* Alternative action */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>

          {/* Support section */}
          <div className="border-t border-border pt-4 text-center">
            <p className="text-sm text-muted-foreground">
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
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
