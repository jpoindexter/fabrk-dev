/**
 * ✅ FABRK COMPONENT
 * Implementation Note
 * Production-ready ✓
 */

import { TerminalWindow } from "./terminal-window";

export function ImplementationNote() {
  return (
    <TerminalWindow filename="features.md">
      <div className="p-4">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div><span className="text-success">&gt;</span> 4-tab navigation (General, Account, Privacy, Billing)</div>
          <div><span className="text-success">&gt;</span> Appearance settings (theme, font size, layout)</div>
          <div><span className="text-success">&gt;</span> Notification preferences (email, push, in-app)</div>
          <div><span className="text-success">&gt;</span> Privacy controls (data sharing, cookies, analytics)</div>
          <div><span className="text-success">&gt;</span> Data export functionality</div>
          <div><span className="text-success">&gt;</span> Account profile form (name, email, company, bio)</div>
          <div><span className="text-success">&gt;</span> Security settings (password, 2FA, sessions)</div>
          <div><span className="text-success">&gt;</span> Subscription management (plan, billing cycle)</div>
          <div><span className="text-success">&gt;</span> Payment methods management</div>
          <div><span className="text-success">&gt;</span> Danger zone (account deletion)</div>
          <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: Form components in src/components/settings/. Connect to your API for save functionality.
        </div>
      </div>
    </TerminalWindow>
  );
}
