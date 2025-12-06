/**
 * Contact Sidebar Component
 * Information cards for email and response time
 */

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export function ContactSidebar() {
  return (
    <div className="space-y-4">
      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn("border-border bg-card border", mode.radius)}
      >
        {/* Terminal Header */}
        <div className="border-border flex items-center justify-between border-b px-4 py-2">
          <span className={cn("text-muted-foreground text-xs", mode.font)}>[ [0x02] CONTACT ]</span>
          <Mail className="text-muted-foreground size-4" />
        </div>
        {/* Content */}
        <div className="p-4">
          <h3 className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>EMAIL_US</h3>
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
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn("border-border bg-card border", mode.radius)}
      >
        {/* Terminal Header */}
        <div className="border-border flex items-center justify-between border-b px-4 py-2">
          <span className={cn("text-muted-foreground text-xs", mode.font)}>
            [ [0x03] RESPONSE ]
          </span>
          <MessageCircle className="text-muted-foreground size-4" />
        </div>
        {/* Content */}
        <div className="p-4">
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
        </div>
      </motion.div>
    </div>
  );
}
