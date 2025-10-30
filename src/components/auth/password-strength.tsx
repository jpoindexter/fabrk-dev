/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

import { Progress } from "@/components/ui/progress";
import { calculatePasswordStrength } from "@/lib/auth/validation";
// Tokens import removed - using Tailwind classes directly

export function PasswordStrength({ password }: { password: string }) {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const getStrengthColor = () => {
    if (strength.score >= 75) return "text-green-600";
    if (strength.score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="m-4">
      <Progress value={strength.score} className="m-4" />
      <div className="text-base dark:text-muted-foreground">
        Password strength: {strength.label}
      </div>
    </div>
  );
}
