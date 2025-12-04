/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <MultiStepForm>Content</MultiStepForm>
 * ```
 */

"use client";

import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";
import * as React from "react";
import { Button } from "./button";

export interface MultiStepFormProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  steps?: string[];
  currentStep?: number;
  children?: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
}

export const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  (
    {
      className,
      loading = false,
      error = false,
      steps = ["Step 1", "Step 2", "Step 3"],
      currentStep = 0,
      children,
      onNext,
      onPrev,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            "bg-card border-border h-96 animate-pulse border",
            mode.radius,
            className,
            ""
          )}
        />
      );
    }

    if (error) {
      return <div className={cn("text-destructive", className, "")}>Error loading form</div>;
    }

    return (
      <div
        ref={ref}
        data-slot="multi-step-form"
        className={cn("space-y-8", className, "")}
        {...props}
      >
        <nav aria-label="Progress" className="flex justify-between">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center text-xs font-medium",
                  mode.radius,
                  mode.font,
                  i <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-border border",
                  ""
                )}
                aria-current={i === currentStep ? "step" : undefined}
                aria-label={`${step}, Step ${i + 1} of ${steps.length}${i === currentStep ? " (current)" : i < currentStep ? " (completed)" : ""}`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 w-full",
                    i < currentStep ? "bg-primary" : "bg-border",
                    ""
                  )}
                />
              )}
            </div>
          ))}
        </nav>
        <div className="min-h-48">{children}</div>
        <div className="flex justify-between">
          <Button onClick={onPrev} disabled={currentStep === 0} variant="outline">
            &gt; PREVIOUS
          </Button>
          <Button onClick={onNext}>{currentStep === steps.length - 1 ? "&gt; FINISH" : "&gt; NEXT"}</Button>
        </div>
      </div>
    );
  }
);
MultiStepForm.displayName = "MultiStepForm";
