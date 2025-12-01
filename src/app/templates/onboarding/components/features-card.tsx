/**
 * FABRK COMPONENT
 * Features Card - Display template features
 */

import { TerminalHeader } from "./terminal-header";

export function FeaturesCard() {
  return (
    <div className="border border-border bg-card">
      <TerminalHeader filename="features.md" />
      <div className="p-4">
        <div className="mb-3 font-mono text-xs text-muted-foreground">
          [TEMPLATE_FEATURES]:
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-success">&gt;</span> 5-step onboarding wizard
          </div>
          <div>
            <span className="text-success">&gt;</span> Progress bar with step
            indicators
          </div>
          <div>
            <span className="text-success">&gt;</span> Form state management
          </div>
          <div>
            <span className="text-success">&gt;</span> Multiple input types
            (text, select, checkbox)
          </div>
          <div>
            <span className="text-success">&gt;</span> Back/Next navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Completion summary
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal console aesthetic
          </div>
        </div>
        <div className="mt-3 font-mono text-xs text-muted-foreground">
          [NOTE]: Connect to your API to persist onboarding data.
        </div>
      </div>
    </div>
  );
}
