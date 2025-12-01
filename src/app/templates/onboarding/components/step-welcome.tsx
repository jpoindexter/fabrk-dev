/**
 * FABRK COMPONENT
 * Step Welcome - First step of onboarding flow
 */

import { Sparkles } from "lucide-react";

export function StepWelcome() {
  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 mx-auto border border-primary bg-primary/10 flex items-center justify-center">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Welcome to Fabrk</h2>
        <p className="font-mono text-sm text-muted-foreground">
          Let's get you set up in just a few steps. This will only take about 2
          minutes.
        </p>
      </div>
      <div className="border border-border p-4 text-left">
        <div className="font-mono text-xs text-muted-foreground mb-2">
          [WHAT_YOULL_SET_UP]:
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-success">&gt;</span> Your profile information
          </div>
          <div>
            <span className="text-success">&gt;</span> Workspace configuration
          </div>
          <div>
            <span className="text-success">&gt;</span> Notification preferences
          </div>
        </div>
      </div>
    </div>
  );
}
