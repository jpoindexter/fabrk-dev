/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { toast } from "@/lib/utils/toast";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface VerifyEmailPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // UX Heuristic #1: Visibility of system status
    const verifyEmail = async () => {
      setIsVerifying(true);
      try {
        const resolvedParams = await params;
        const token = resolvedParams.token;

        // Call API to verify email
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Verification failed");
        }

        setVerificationStatus("success");
        toast.success("Email verified successfully!");

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (err: unknown) {
        setVerificationStatus("error");
        if (err instanceof Error) {
          if (err.message.includes("expired")) {
            setError("This verification link has expired. Please request a new one.");
          } else {
            setError(
              err.message ||
                "Invalid verification link. Please check your email for the correct link."
            );
          }
        } else {
          setError("Invalid verification link. Please check your email for the correct link.");
        }
        toast.error("Email verification failed");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [params, router]);

  // UX Heuristic #1: Visibility of system status
  if (isVerifying) {
    return (
      <PageWrapper>
        <Card className="w-full">
          <CardContent>
            <div className="flex items-center justify-center p-6" role="status" aria-live="polite">
              <Loader2 className="mx-auto h-14 w-16 animate-spin text-primary" aria-hidden="true" />
              <h2 className="m-4 text-base font-medium">Verifying your email...</h2>
              <p className="m-4">Please wait while we verify your email address.</p>
              <span className="sr-only">Loading, please wait</span>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  if (verificationStatus === "success") {
    return (
      <PageWrapper>
        <Card className="w-full">
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <CheckCircle className="mx-auto h-14 w-16 text-primary" />
              <h2 className="m-4 text-base font-medium">Email Verified!</h2>
              <p className="m-4">Your email has been successfully verified.</p>
              <p className="m-4 text-base">Redirecting to dashboard...</p>
              <Link href="/dashboard">
                <Button className="m-4">Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  // UX Heuristic #9: Error Recovery
  return (
    <PageWrapper>
      <Card className="w-full">
        <CardContent>
          <div className="p-6 text-center">
            <AlertCircle className="mx-auto h-14 w-16 text-destructive" />
            <h2 className="m-4 text-base font-medium">Verification Failed</h2>
            {error && (
              <Alert variant="destructive" className="m-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Link href="/signup">
              <Button className="m-4">Request New Verification Email</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
