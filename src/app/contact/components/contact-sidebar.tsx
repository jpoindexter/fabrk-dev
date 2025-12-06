/**
 * Contact Sidebar Component
 * Information cards for email and response time
 */

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";

export function ContactSidebar() {
  return (
    <div className="space-y-4">
      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TerminalCard size="auto">
          <TerminalCardHeader
            code="0x02"
            title="CONTACT"
            icon={<Mail className="text-muted-foreground size-4" />}
          />
          <TerminalCardContent padding="md">
            <h3 className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
              EMAIL_US
            </h3>
            <div className={cn("text-xs", mode.font)}>
              <span className="text-muted-foreground">DESC: </span>
              <span className="text-foreground">Prefer email? Send us a message directly:</span>
            </div>
            <a
              href="mailto:support@fabrk.dev"
              className={cn("text-primary mt-2 block text-xs hover:underline", mode.font)}
            >
              &gt; support@fabrk.dev
            </a>
          </TerminalCardContent>
        </TerminalCard>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <TerminalCard size="auto">
          <TerminalCardHeader
            code="0x03"
            title="RESPONSE"
            icon={<MessageCircle className="text-muted-foreground size-4" />}
          />
          <TerminalCardContent padding="md">
            <h3 className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
              RESPONSE_TIME
            </h3>
            <div className={cn("text-xs", mode.font)}>
              <span className="text-muted-foreground">DESC: </span>
              <span className="text-foreground">
                We typically respond within 24 hours during business days. For urgent issues, please
                mention "URGENT" in your subject.
              </span>
            </div>
          </TerminalCardContent>
        </TerminalCard>
      </motion.div>
    </div>
  );
}
