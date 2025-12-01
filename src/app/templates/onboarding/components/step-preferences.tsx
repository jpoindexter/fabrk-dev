/**
 * FABRK COMPONENT
 * Step Preferences - Notification preferences
 */

import { Checkbox } from "@/components/ui/checkbox";

interface StepPreferencesProps {
  emailUpdates: boolean;
  productTips: boolean;
  onEmailUpdatesChange: (checked: boolean) => void;
  onProductTipsChange: (checked: boolean) => void;
}

export function StepPreferences({
  emailUpdates,
  productTips,
  onEmailUpdatesChange,
  onProductTipsChange,
}: StepPreferencesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Preferences</h2>
        <p className="font-mono text-xs text-muted-foreground">
          Customize your experience
        </p>
      </div>

      <div className="space-y-4">
        <div className="font-mono text-xs text-muted-foreground">
          [NOTIFICATION_SETTINGS]:
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between border border-border p-3">
            <div>
              <div className="font-mono text-sm">Email Updates</div>
              <div className="font-mono text-xs text-muted-foreground">
                Product news and announcements
              </div>
            </div>
            <Checkbox
              checked={emailUpdates}
              onCheckedChange={(checked) =>
                onEmailUpdatesChange(checked as boolean)
              }
            />
          </div>

          <div className="flex items-center justify-between border border-border p-3">
            <div>
              <div className="font-mono text-sm">Product Tips</div>
              <div className="font-mono text-xs text-muted-foreground">
                Helpful tips to get the most out of Fabrk
              </div>
            </div>
            <Checkbox
              checked={productTips}
              onCheckedChange={(checked) =>
                onProductTipsChange(checked as boolean)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
