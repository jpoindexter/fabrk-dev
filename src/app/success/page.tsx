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
    } catch (error) {
      toast.error("Error", {
        description: "Failed to resend email. Please try again later.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-6 rounded-brutal border-2 border-black bg-background p-8 shadow-brutal-lg">
        {/* Success Icon & Header */}
        <div className="space-y-4 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-brutal border-2 border-black bg-primary shadow-brutal">
            <CheckCircle className="size-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold">Purchase Successful!</h1>
          <p className="text-lg font-bold text-foreground">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
        </div>

        {/* Check your email banner */}
        <div className="space-y-3 rounded-brutal border-2 border-black bg-primary/10 p-6 shadow-brutal">
          <div className="flex items-center justify-center gap-3">
            <Mail className="size-6 text-foreground" />
            <h3 className="text-lg font-bold">Check Your Email</h3>
          </div>
          <p className="text-center font-bold text-foreground">
            We've sent you a confirmation email with a magic link to instantly access your dashboard - no password needed!
          </p>
        </div>

        {/* What's in the email */}
        <div className="space-y-4 rounded-brutal border-2 border-black bg-muted p-6 shadow-brutal">
          <h3 className="text-lg font-bold">What's in Your Email:</h3>
          <ul className="space-y-3 font-bold text-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-brutal border-2 border-black bg-primary text-sm font-bold text-primary-foreground shadow-brutal">
                1
              </span>
              <span>
                <strong>Magic Link</strong> - Click to instantly access your dashboard (valid for 7 days)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-brutal border-2 border-black bg-primary text-sm font-bold text-primary-foreground shadow-brutal">
                2
              </span>
              <span>
                <strong>License Key</strong> - Your unique product license for activation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-brutal border-2 border-black bg-primary text-sm font-bold text-primary-foreground shadow-brutal">
                3
              </span>
              <span>
                <strong>Getting Started Guide</strong> - Next steps to download and use your boilerplate
              </span>
            </li>
          </ul>
        </div>

        {/* Immediate Download Access */}
        <div className="space-y-4 rounded-brutal border-2 border-black bg-secondary/20 p-6 shadow-brutal">
          <div className="flex items-center justify-center gap-2">
            <Package className="size-5 text-foreground" />
            <h3 className="font-bold">Start Downloading Now</h3>
          </div>
          <p className="mb-4 text-center text-sm font-bold text-foreground">
            Your purchase is ready! Access your boilerplate immediately while you wait for the email.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button asChild size="lg" className="w-full">
              <a href="https://github.com/yourusername/fabrk/archive/refs/heads/main.zip" download>
                <Download className="mr-2 size-4" />
                Download Boilerplate
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <a href="/docs/getting-started" target="_blank" rel="noopener noreferrer">
                <FileDown className="mr-2 size-4" />
                View Documentation
              </a>
            </Button>
          </div>
        </div>

        {/* Email not received */}
        <div className="py-4 text-center">
          <p className="mb-3 text-sm font-bold text-foreground">
            Didn't receive the email? Check your spam folder.
          </p>
          {!isResending ? (
            <button
              onClick={handleResendEmail}
              className="font-bold text-primary underline-offset-4 transition-colors hover:underline"
            >
              Click to resend
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Sending email...</span>
            </div>
          )}
        </div>

        {/* Alternative action */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>

        {/* Support section */}
        <div className="border-t-4 border-black pt-4 text-center">
          <p className="text-sm font-bold text-foreground">
            Need help?{" "}
            <Link href="/support" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
