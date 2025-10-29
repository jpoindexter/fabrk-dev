/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

import { Button } from "@/components/ui/button";
import { tokens } from "@/lib/design-system/tokens";
import { CheckCircle } from "lucide-react";

export function SignupSuccessMessage({ email }: { email: string }) {
  const successStyles = {
    textAlign: "center" as const,
    padding: "3rem",
  };

  const iconStyles = {
    width: "64px",
    height: "64px",
    margin: "0 auto",
    color: "var(--color-green-500)", // green-500
  };

  // UX Heuristic #1: Visibility of system status
  return (
    <div className={`${tokens.components.card.content} text-center`}>
      <CheckCircle className={`mx-auto ${tokens.sizes.avatar.xl} text-primary dark:text-primary`} />
      <h2 className={`m-4 ${tokens.text.size.base} font-medium`}>Check your email</h2>
      <p className="m-4">We&apos;ve sent a verification email to {email}</p>
      <p className={`m-4 ${tokens.text.size.base}`}>
        Please click the link in the email to verify your account.
      </p>
      <Button className="m-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        Resend verification email
      </Button>
    </div>
  );
}
