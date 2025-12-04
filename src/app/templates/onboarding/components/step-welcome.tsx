/**
 * FABRK COMPONENT
 * Step Welcome - First step of onboarding flow
 */

import { Sparkles } from "lucide-react";

export function StepWelcome() {
  return (
    <div className="space-y-6 text-center">
      <div className="border-primary bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center border">
        <Sparkles className="text-primary h-8 w-8" />
      </div>
      <div>
        <h2 className="mb-2 font-mono text-2xl font-semibold">Welcome to Fabrk</h2>
        <p className="text-muted-foreground font-mono text-sm">
          Let's get you set up in just a few steps. This will only take about 2 minutes.
        </p>
      </div>
      <div className="border-border border p-4 text-left">
        <div className="text-muted-foreground mb-2 font-mono text-xs">[WHAT_YOULL_SET_UP]:</div>
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
