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
      <div className="border-success bg-success/10 mx-auto flex h-16 w-16 items-center justify-center border">
        <CheckCircle2 className="text-success h-8 w-8" />
      </div>
      <div>
        <h2 className="mb-2 font-mono text-2xl font-semibold">You're All Set!</h2>
        <p className="text-muted-foreground font-mono text-sm">
          Your account is ready. Let's start building something amazing.
        </p>
      </div>

      <div className="border-border border p-4 text-left">
        <div className="text-muted-foreground mb-2 font-mono text-xs">[ACCOUNT_SUMMARY]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-muted-foreground">NAME:</span> {formData.fullName || "Not set"}
          </div>
          <div>
            <span className="text-muted-foreground">ROLE:</span> {formData.role || "Not set"}
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

      <Button className="rounded-none font-mono text-xs">&gt; GO_TO_DASHBOARD</Button>
    </div>
  );
}
