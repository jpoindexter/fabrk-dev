/**
 * ✅ FABRK COMPONENT
 * Account Tab Content
 * Production-ready ✓
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Shield } from "lucide-react";
import { TerminalWindow } from "./terminal-window";
import { SectionHeader } from "./section-header";

export function AccountTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Profile Information */}
      <TerminalWindow filename="profile.json">
        <div className="p-4">
          <SectionHeader
            icon={User}
            title="PROFILE_INFORMATION"
            description="Update your personal details and profile settings"
          />
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="rounded-none font-mono text-xs">[FULL_NAME]:</Label>
                <Input id="fullname" type="text" placeholder="Enter your full name" className="rounded-none font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="rounded-none font-mono text-xs">[EMAIL]:</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="rounded-none font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="rounded-none font-mono text-xs">[COMPANY]:</Label>
                <Input id="company" type="text" placeholder="Your company name" className="rounded-none font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobtitle" className="rounded-none font-mono text-xs">[JOB_TITLE]:</Label>
                <Input id="jobtitle" type="text" placeholder="Software Engineer" className="rounded-none font-mono text-xs" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="rounded-none font-mono text-xs">[BIO]:</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} className="rounded-none font-mono text-xs" />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="rounded-none font-mono text-xs">&gt; CANCEL</Button>
              <Button className="rounded-none font-mono text-xs">&gt; SAVE_CHANGES</Button>
            </div>
          </div>
        </div>
      </TerminalWindow>

      {/* Account Security */}
      <TerminalWindow filename="security.config">
        <div className="p-4">
          <SectionHeader
            icon={Shield}
            title="ACCOUNT_SECURITY"
            description="Manage password and authentication methods"
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between border border-border p-4 font-mono text-xs">
              <div>
                <div>[PASSWORD]:</div>
                <div className="text-muted-foreground">Last changed 3 months ago</div>
              </div>
              <Button variant="outline" className="rounded-none font-mono text-xs w-24">&gt; CHANGE</Button>
            </div>
            <div className="flex items-center justify-between border border-border p-4 font-mono text-xs">
              <div>
                <div>[TWO_FACTOR_AUTH]:</div>
                <div className="text-muted-foreground">Add an extra layer of security</div>
              </div>
              <Button variant="outline" className="rounded-none font-mono text-xs w-24">&gt; ENABLE</Button>
            </div>
            <div className="flex items-center justify-between border border-border p-4 font-mono text-xs">
              <div>
                <div>[ACTIVE_SESSIONS]:</div>
                <div className="text-muted-foreground">Manage devices and sessions</div>
              </div>
              <Button variant="outline" className="rounded-none font-mono text-xs w-24">&gt; VIEW</Button>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
