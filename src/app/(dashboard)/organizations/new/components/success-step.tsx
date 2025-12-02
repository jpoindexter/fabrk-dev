/**
 * Success Step Component
 * Step 3: Confirmation screen after organization creation
 */

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessStepProps {
  onComplete: () => void;
}

export function SuccessStep({ onComplete }: SuccessStepProps) {
  return (
    <Card className="rounded-none border border-border shadow">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-none border border-border bg-success p-4 shadow">
          <Check className="h-8 w-8 text-success-foreground" />
        </div>
        <h3 className="mt-4 text-2xl font-bold">All Set!</h3>
        <p className="mt-2 text-center text-muted-foreground">
          Your organization has been created and invitations sent.
        </p>
        <Button onClick={onComplete} className="mt-6">
          Go to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
