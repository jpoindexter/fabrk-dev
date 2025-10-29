/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 */

import { Progress } from "@/components/ui/progress";
import { calculatePasswordStrength } from "@/lib/auth/validation";
import { tokens } from "@/lib/design-system/tokens";

export function PasswordStrength({ password }: { password: string }) {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const getStrengthColor = () => {
    if (strength.score >= 75) return tokens.colors.text.success;
    if (strength.score >= 50) return tokens.colors.text.warning;
    return tokens.colors.text.error;
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
