/**
 * ✅ FABRK COMPONENT
 * Settings Page Header
 * Production-ready ✓
 */

export function SettingsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="border-border inline-block border px-4 py-1">
          <span className="text-muted-foreground font-mono text-xs">[TEMPLATE]: SETTINGS_PAGE</span>
        </div>
        <h1 className="font-mono text-4xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground font-mono text-sm">
          Manage your account settings, preferences, and billing
        </p>
      </div>
    </div>
  );
}
