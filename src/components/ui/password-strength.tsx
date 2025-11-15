"use client";

/**
 * ✅ FABRK COMPONENT
 * Password strength indicator component.
 *
 * @example
 * ```tsx
 * <password-strength />
 * ```
 */

// design-system-ignore: password strength indicator requires dynamic width styles

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check, Eye, EyeOff, X } from "lucide-react";
import * as React from "react";

export interface PasswordStrengthProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  showStrength?: boolean;
  showRequirements?: boolean;
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSymbols?: boolean;
  strengthLabels?: {
    weak: string;
    fair: string;
    good: string;
    strong: string;
    veryStrong: string;
  };
  /**
   * Accessible label for the password input
   * @default "Password"
   */
  "aria-label"?: string;
}

const defaultLabels = {
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
  veryStrong: "Very Strong",
};

function calculateStrength(
  password: string,
  {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSymbols = true,
  }: Pick<
    PasswordStrengthProps,
    "minLength" | "requireUppercase" | "requireLowercase" | "requireNumbers" | "requireSymbols"
  >
): number {
  let strength = 0;

  if (password.length >= minLength) strength++;
  if (password.length >= minLength + 4) strength++;
  if (requireUppercase && /[A-Z]/.test(password)) strength++;
  if (requireLowercase && /[a-z]/.test(password)) strength++;
  if (requireNumbers && /\d/.test(password)) strength++;
  if (requireSymbols && /[^A-Za-z0-9]/.test(password)) strength++;

  // Bonus points for complexity
  if (password.length >= 12) strength++;
  if (password.length >= 16) strength++;
  if (
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) &&
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password)
  ) {
    strength++; // All character types
  }

  return Math.min(Math.round((strength / 9) * 5), 5);
}

const PasswordStrength = React.forwardRef<HTMLInputElement, PasswordStrengthProps>(
  (
    {
      value,
      onChange,
      showStrength = true,
      showRequirements = true,
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSymbols = true,
      strengthLabels = defaultLabels,
      className,
      disabled,
      "aria-label": ariaLabel = "Password",
      ...props
    },
    ref
  ) => {
    const [password, setPassword] = React.useState(value || "");
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const requirementsId = React.useId();
    const strengthId = React.useId();

    const strength = calculateStrength(password, {
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumbers,
      requireSymbols,
    });

    const requirements = [
      {
        label: `At least ${minLength} characters`,
        met: password.length >= minLength,
        required: true,
      },
      {
        label: "Contains uppercase letter",
        met: /[A-Z]/.test(password),
        required: requireUppercase,
      },
      {
        label: "Contains lowercase letter",
        met: /[a-z]/.test(password),
        required: requireLowercase,
      },
      { label: "Contains number", met: /\d/.test(password), required: requireNumbers },
      {
        label: "Contains special character",
        met: /[^A-Za-z0-9]/.test(password),
        required: requireSymbols,
      },
    ].filter((req) => req.required);

    const getStrengthColor = () => {
      switch (strength) {
        case 0:
        case 1:
          return "bg-red-500";
        case 2:
          return "bg-orange-500";
        case 3:
          return "bg-orange-500";
        case 4:
          return "bg-yellow-500";
        case 5:
          return "bg-green-500";
        default:
          return "bg-card";
      }
    };

    const getStrengthLabel = () => {
      switch (strength) {
        case 0:
        case 1:
          return strengthLabels.weak;
        case 2:
          return strengthLabels.fair;
        case 3:
          return strengthLabels.good;
        case 4:
          return strengthLabels.strong;
        case 5:
          return strengthLabels.veryStrong;
        default:
          return "";
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setPassword(newValue);
      onChange?.(newValue);
    };

    return (
      <div data-slot="password-strength" className={cn(`space-y-2`, className)}>
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className="pr-10"
            aria-label={ariaLabel}
            aria-describedby={
              showRequirements && password
                ? requirementsId
                : showStrength && password
                  ? strengthId
                  : undefined
            }
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`absolute right-0 top-0 h-full px-3 hover:bg-background/0`}
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className={`"h-4 w-4" text-muted-foreground`} aria-hidden="true" />
            ) : (
              <Eye className={`"h-4 w-4" text-muted-foreground`} aria-hidden="true" />
            )}
          </Button>
        </div>

        {showStrength && password && (
          <div id={strengthId} className="space-y-1" aria-live="polite" aria-atomic="true">
            <div className="flex items-center justify-between">
              <span className={`"text-sm" text-muted-foreground`}>Strength:</span>
              <span
                className={cn("text-sm font-medium", getStrengthColor().replace("bg-", "text-"))}
              >
                {getStrengthLabel()}
              </span>
            </div>
            <Progress value={(strength / 5) * 100} className="h-1.5" aria-label="Password strength">
              <div
                className={cn("h-full transition-all", getStrengthColor())}
                style={
                  {
                    "--strength-width": `${(strength / 5) * 100}%`,
                    width: "var(--strength-width)",
                  } as React.CSSProperties
                }
              />
            </Progress>
          </div>
        )}

        {showRequirements && password && isFocused && (
          <ul
            id={requirementsId}
            className={`"text-sm" space-y-1`}
            aria-label="Password requirements"
          >
            {requirements.map((req, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-2",
                  req.met ? "text-green-600" : "text-muted-foreground"
                )}
              >
                {req.met ? (
                  <Check className="size-3" aria-hidden="true" />
                ) : (
                  <X className="size-3" aria-hidden="true" />
                )}
                <span>{req.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
PasswordStrength.displayName = "PasswordStrength";

export { PasswordStrength };
