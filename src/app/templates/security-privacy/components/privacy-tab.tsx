/**
 * Privacy Tab Component - Profile privacy and cookie preferences
 */

import { Switch } from "@/components/ui/switch";
import { TerminalCardHeader } from "@/components/ui/card";

interface PrivacySettings {
  profileVisibility: boolean;
  activityTracking: boolean;
  searchIndexing: boolean;
  cookiesEssential: boolean;
  cookiesAnalytics: boolean;
  cookiesMarketing: boolean;
}

interface PrivacyTabProps {
  privacy: PrivacySettings;
  onToggle: (key: keyof PrivacySettings) => void;
}

export function PrivacyTab({ privacy, onToggle }: PrivacyTabProps) {
  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <div className="border-border bg-card border">
        <TerminalCardHeader code="0x00" title="PROFILE_PRIVACY" />
        <div className="p-4">
          <div className="text-muted-foreground mb-4 font-mono text-xs">[PROFILE_ACTIVITY]:</div>
          <div className="space-y-4 font-mono text-xs">
            {[
              {
                key: "profileVisibility" as const,
                label: "PROFILE_VISIBILITY",
                desc: "Allow your profile to be visible to other users",
              },
              {
                key: "activityTracking" as const,
                label: "ACTIVITY_TRACKING",
                desc: "Track my activity to improve experience",
              },
              {
                key: "searchIndexing" as const,
                label: "SEARCH_INDEXING",
                desc: "Allow search engines to index your profile",
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className="border-border flex items-center justify-between border p-4"
              >
                <div>
                  <div>[{setting.label}]:</div>
                  <div className="text-muted-foreground">{setting.desc}</div>
                </div>
                <Switch
                  checked={privacy[setting.key]}
                  onCheckedChange={() => onToggle(setting.key)}
                  className="h-5 w-9 rounded-none [&>span]:h-3 [&>span]:w-3 [&>span]:rounded-none [&>span]:data-[state=checked]:translate-x-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cookie Preferences */}
      <div className="border-border bg-card border">
        <TerminalCardHeader code="0x00" title="COOKIES" />
        <div className="p-4">
          <div className="text-muted-foreground mb-4 font-mono text-xs">[COOKIE_PREFERENCES]:</div>
          <div className="space-y-4 font-mono text-xs">
            {[
              {
                key: "cookiesEssential" as const,
                label: "ESSENTIAL",
                desc: "Required for the site to function (cannot be disabled)",
                disabled: true,
              },
              {
                key: "cookiesAnalytics" as const,
                label: "ANALYTICS",
                desc: "Help us understand how you use the site",
                disabled: false,
              },
              {
                key: "cookiesMarketing" as const,
                label: "MARKETING",
                desc: "Used to show relevant ads",
                disabled: false,
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className="border-border flex items-center justify-between border p-4"
              >
                <div>
                  <div>[{setting.label}]:</div>
                  <div className="text-muted-foreground">{setting.desc}</div>
                </div>
                <Switch
                  checked={privacy[setting.key]}
                  onCheckedChange={() => onToggle(setting.key)}
                  disabled={setting.disabled}
                  className="h-5 w-9 rounded-none [&>span]:h-3 [&>span]:w-3 [&>span]:rounded-none [&>span]:data-[state=checked]:translate-x-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
