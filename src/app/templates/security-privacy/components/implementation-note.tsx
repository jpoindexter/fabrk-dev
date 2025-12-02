/**
 * Implementation Note Component - Features list
 */

export function ImplementationNote() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">features.md</span>
      </div>
      <div className="p-4">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div><span className="text-success">&gt;</span> Security score dashboard with recommendations</div>
          <div><span className="text-success">&gt;</span> Two-factor authentication setup (TOTP placeholder)</div>
          <div><span className="text-success">&gt;</span> Active sessions viewer with device details and IP addresses</div>
          <div><span className="text-success">&gt;</span> Session revocation and bulk sign-out</div>
          <div><span className="text-success">&gt;</span> Privacy controls (profile, cookies, emails)</div>
          <div><span className="text-success">&gt;</span> Security audit log with timestamps and status badges</div>
          <div><span className="text-success">&gt;</span> GDPR compliance (data export, access request, policies)</div>
          <div><span className="text-success">&gt;</span> Account deletion with confirmation modal</div>
          <div><span className="text-success">&gt;</span> 4-tab navigation (Security, Privacy, Audit Log, Compliance)</div>
          <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: Integrate with src/components/security/. Add API routes for session management and 2FA.
        </div>
      </div>
    </div>
  );
}
