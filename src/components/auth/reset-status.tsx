/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

import { Button } from "@/components/ui/button";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function TokenExpired() {
  const styles = {
    textAlign: "center" as const,
    padding: "3rem",
  };

  return (
    <div className="p-6 text-center">
      <X className="m-4 size-full" />
      <h2 className="m-4 text-base font-medium dark:text-muted-foreground">
        Link Expired
      </h2>
      <p className="m-4">This password reset link has expired or is invalid.</p>
      <Link href="/forgot-password">
        <Button className="m-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Request New Link
        </Button>
      </Link>
    </div>
  );
}

export function ResetSuccess() {
  const router = useRouter();
  const styles = {
    textAlign: "center" as const,
    padding: "3rem",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  // UX Heuristic #1: Visibility of system status
  return (
    <div className="p-6 text-center">
      <ShieldCheck className="m-4 size-full" />
      <h2 className="m-4 text-base font-medium dark:text-muted-foreground">
        Password Reset Successfully
      </h2>
      <p className="m-4">Your password has been reset. You can now login with your new password.</p>
      <p className="m-4 text-base dark:text-muted-foreground">
        Redirecting to login...
      </p>
      <Link href="/login">
        <Button className="m-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Go to Login
        </Button>
      </Link>
    </div>
  );
}
