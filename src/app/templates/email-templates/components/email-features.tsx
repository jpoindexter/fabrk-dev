/**
 * Email template features section
 */

export function EmailFeatures() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">features.md</span>
      </div>
      <div className="p-4">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div><span className="text-success">&gt;</span> 5 email templates (Welcome, Verification, Password Reset, Purchase, Subscription)</div>
          <div><span className="text-success">&gt;</span> Both HTML and plain text versions for all templates</div>
          <div><span className="text-success">&gt;</span> Mobile-responsive table-based layouts (works in all email clients)</div>
          <div><span className="text-success">&gt;</span> Consistent branding with Fabrk color scheme</div>
          <div><span className="text-success">&gt;</span> Dynamic variables for personalization</div>
          <div><span className="text-success">&gt;</span> CTA buttons with proper link tracking</div>
          <div><span className="text-success">&gt;</span> Security notices and expiry warnings</div>
          <div><span className="text-success">&gt;</span> Resend integration ready (src/lib/email.ts)</div>
          <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: All templates in src/emails/. Add your Resend API key to start sending emails.
        </div>
      </div>
    </div>
  );
}
