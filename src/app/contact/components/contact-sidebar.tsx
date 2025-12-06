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
        className={cn("border-border bg-card border p-6", mode.radius)}
      >
        <div className="flex items-start gap-4">
          <div className={cn("bg-primary/10 border-border border p-4", mode.radius)}>
            <Mail className="text-primary h-5 w-5" />
          </div>
          <div>
            <span className={cn("text-muted-foreground text-xs", mode.font)}>[0x02]</span>
            <h3 className={cn("mb-1 text-xs font-semibold", mode.font)}>EMAIL_US</h3>
            <p className={cn("text-muted-foreground mb-2 text-xs", mode.font)}>
              Prefer email? Send us a message directly:
            </p>
            <a
              href="mailto:support@fabrk.dev"
              className={cn("text-primary text-xs hover:underline", mode.font)}
            >
              &gt; support@fabrk.dev
            </a>
          </div>
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn("border-border bg-card border p-6", mode.radius)}
      >
        <div className="flex items-start gap-4">
          <div className={cn("bg-primary/10 border-border border p-4", mode.radius)}>
            <MessageCircle className="text-primary h-5 w-5" />
          </div>
          <div>
            <span className={cn("text-muted-foreground text-xs", mode.font)}>[0x03]</span>
            <h3 className={cn("mb-1 text-xs font-semibold", mode.font)}>RESPONSE_TIME</h3>
            <p className={cn("text-muted-foreground text-xs", mode.font)}>
              We typically respond within 24 hours during business days. For urgent issues, please
              mention "URGENT" in your subject.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
