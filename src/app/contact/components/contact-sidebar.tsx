/**
 * Contact Sidebar Component
 * Information cards for email and response time
 */

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

export function ContactSidebar() {
  return (
    <div className="space-y-4">
      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border border-border bg-card p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 border border-border">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">[0x02]</span>
            <h3 className="text-sm font-semibold mb-1">EMAIL_US</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Prefer email? Send us a message directly:
            </p>
            <a
              href="mailto:support@fabrk.dev"
              className="text-xs text-primary hover:underline"
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
        className="border border-border bg-card p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 border border-border">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">[0x03]</span>
            <h3 className="text-sm font-semibold mb-1">RESPONSE_TIME</h3>
            <p className="text-xs text-muted-foreground">
              We typically respond within 24 hours during business days.
              For urgent issues, please mention "URGENT" in your subject.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
