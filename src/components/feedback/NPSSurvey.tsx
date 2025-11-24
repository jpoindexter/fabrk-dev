/**
 * NPS Survey Component
 * Beautiful, accessible NPS survey widget
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface NPSSurveyProps {
  onSubmit: (score: number, comment?: string) => void;
  onDismiss?: () => void;
}

export function NPSSurvey({ onSubmit, onDismiss }: NPSSurveyProps) {
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState<"score" | "comment" | "thanks">("score");

  const handleScoreSelect = (selectedScore: number) => {
    setScore(selectedScore);
    setStep("comment");
    trackEvent("nps_score_submitted", { score: selectedScore });
  };

  const handleSubmit = () => {
    if (score !== null) {
      onSubmit(score, comment || undefined);
      setStep("thanks");

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        onDismiss?.();
      }, 3000);
    }
  };

  if (step === "thanks") {
    return (
      <div className="rounded-lg border-2 border-green-200 bg-success/10 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-success-foreground">Thank you!</h3>
        <p className="text-sm text-success">
          Your feedback helps us improve our product.
        </p>
      </div>
    );
  }

  if (step === "comment") {
    return (
      <div className="rounded-lg border-2 border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Thanks for your rating! Want to tell us more?
          </h3>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss survey"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What's the main reason for your score? (optional)"
          className="mb-4"
          rows={4}
        />

        <div className="flex gap-3">
          <Button onClick={handleSubmit} className="flex-1">
            Submit Feedback
          </Button>
          <Button onClick={() => onDismiss?.()} variant="outline">
            Skip
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border-2 border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          How likely are you to recommend us to a friend?
        </h3>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Dismiss survey"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-4 flex justify-between gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => handleScoreSelect(num)}
            className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-semibold transition-all hover:scale-105 ${
              num <= 6
                ? "border-destructive/30 bg-destructive/10 hover:border-red-400 hover:bg-destructive/20"
                : num <= 8
                  ? "border-warning/30 bg-warning/10 hover:border-yellow-400 hover:bg-warning/20"
                  : "border-green-200 bg-success/10 hover:border-green-400 hover:bg-success/20"
            }`}
            aria-label={`Score ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-600">
        <span>Not likely</span>
        <span>Very likely</span>
      </div>
    </div>
  );
}
