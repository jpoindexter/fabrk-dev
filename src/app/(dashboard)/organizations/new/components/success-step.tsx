/**
 * Success Step Component
 * Step 3: Confirmation screen after organization creation
 */

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface SuccessStepProps {
  onComplete: () => void;
}

export function SuccessStep({ onComplete }: SuccessStepProps) {
  return (
    <Card className={cn("border-border border shadow", mode.radius)}>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className={cn("border-border bg-success border p-4 shadow", mode.radius)}>
          <Check className="text-success-foreground h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-bold">All Set!</h3>
        <p className="text-muted-foreground mt-2 text-center">
          Your organization has been created and invitations sent.
        </p>
        <Button onClick={onComplete} className="mt-6">
          Go to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
