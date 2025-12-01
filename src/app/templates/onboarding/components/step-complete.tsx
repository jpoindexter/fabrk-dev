/**
 * FABRK COMPONENT
 * Step Complete - Completion summary
 */

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface FormData {
  fullName: string;
  role: string;
  workspaceName: string;
  teamSize: string;
}

interface StepCompleteProps {
  formData: FormData;
}

export function StepComplete({ formData }: StepCompleteProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 mx-auto border border-success bg-success/10 flex items-center justify-center">
        <CheckCircle2 className="h-8 w-8 text-success" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">You're All Set!</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Your account is ready. Let's start building something amazing.
        </p>
      </div>

      <div className="border border-border p-4 text-left">
        <div className="font-mono text-xs text-muted-foreground mb-2">
          [ACCOUNT_SUMMARY]:
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-muted-foreground">NAME:</span>{" "}
            {formData.fullName || "Not set"}
          </div>
          <div>
            <span className="text-muted-foreground">ROLE:</span>{" "}
            {formData.role || "Not set"}
          </div>
          <div>
            <span className="text-muted-foreground">WORKSPACE:</span>{" "}
            {formData.workspaceName || "Not set"}
          </div>
          <div>
            <span className="text-muted-foreground">TEAM_SIZE:</span>{" "}
            {formData.teamSize || "Not set"}
          </div>
        </div>
      </div>

      <Button className="rounded-none font-mono text-xs">
        &gt; GO_TO_DASHBOARD
      </Button>
    </div>
  );
}
