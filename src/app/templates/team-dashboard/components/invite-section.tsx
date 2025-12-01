/**
 * ✅ FABRK COMPONENT
 * Invite Section - Invite new team members
 */

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";

export function InviteSection() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
    setInviteEmail("");
  };

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">invite_member.sh</span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-3">[INVITE_TEAM_MEMBER]:</div>
        <div className="flex gap-3">
          <Input
            type="email"
            placeholder="email@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="rounded-none flex-1 font-mono text-xs"
          />
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger className="rounded-none w-32 font-mono text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="admin" className="font-mono text-xs rounded-none focus:bg-primary focus:text-primary-foreground">ADMIN</SelectItem>
              <SelectItem value="member" className="font-mono text-xs rounded-none focus:bg-primary focus:text-primary-foreground">MEMBER</SelectItem>
              <SelectItem value="guest" className="font-mono text-xs rounded-none focus:bg-primary focus:text-primary-foreground">GUEST</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleInvite} className="rounded-none font-mono text-xs">
            <Send className="mr-2 h-4 w-4" />
            &gt; SEND_INVITE
          </Button>
        </div>
      </div>
    </div>
  );
}
