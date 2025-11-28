/**
 * Refund Policy Page
 * No refunds policy for digital product - Terminal Console Style
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function RefundPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16 font-mono">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            [ [0x00] LEGAL ] REFUND_POLICY
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="mb-2 text-sm text-muted-foreground">FABRK_LEGAL:</h1>
          <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
            REFUND_POLICY
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-xs text-muted-foreground">LAST_UPDATED: November 26, 2025</span>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12 border border-destructive/30 bg-destructive/5 p-6"
      >
        <div className="mb-2 text-xs text-muted-foreground">
          [ [0x01] NOTICE ]────────────────────────
        </div>
        <p className="text-sm text-foreground">
          <span className="text-destructive font-semibold">ALL SALES ARE FINAL.</span> Due to the nature of digital products, no refunds, exchanges, or credits are available. Please review this policy carefully before purchasing.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Section 1 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x10]</span>
            <h2 className="text-lg font-bold">NO_REFUNDS_POLICY</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Once you gain access to the Fabrk source code and download the files, no refunds are available under any circumstances.
          </p>
          <p className="text-xs text-muted-foreground">
            By completing your purchase, you acknowledge that digital products cannot be "returned" once downloaded. This is standard for digital products and software licenses.
          </p>
        </section>

        {/* Section 2 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x20]</span>
            <h2 className="text-lg font-bold">WHY_NO_REFUNDS</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Unlike physical products, digital products provide immediate value upon download:
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground pl-4">
            <li>├─ Instant access to complete source code</li>
            <li>├─ Immediate ability to copy, modify, and use</li>
            <li>├─ Digital products cannot be "returned"</li>
            <li>└─ No way to verify code wasn't copied before refund request</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            This policy protects business integrity and ensures fair pricing for all customers.
          </p>
        </section>

        {/* Section 3 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x30]</span>
            <h2 className="text-lg font-bold">BEFORE_YOU_PURCHASE</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            We encourage you to thoroughly review Fabrk before purchasing:
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground pl-4">
            <li>├─ Review the <Link href="/features" className="text-primary hover:underline">COMPLETE_FEATURE_LIST</Link></li>
            <li>├─ Browse the <Link href="/docs" className="text-primary hover:underline">DOCUMENTATION</Link></li>
            <li>├─ Check tech stack and integrations</li>
            <li>└─ Contact <Link href="/contact" className="text-primary hover:underline">support@fabrk.dev</Link> with questions</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            We want you to be fully informed before you buy.
          </p>
        </section>

        {/* Section 4 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x40]</span>
            <h2 className="text-lg font-bold">WHAT_YOU_GET</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">[4.1] IMMEDIATE_ACCESS</h3>
              <ul className="space-y-1 text-xs text-muted-foreground pl-4">
                <li>├─ Instant download of complete source code</li>
                <li>├─ Lifetime license (v1.x updates included)</li>
                <li>├─ Access to 100+ production-ready components</li>
                <li>└─ Complete documentation and setup guides</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">[4.2] ONGOING_BENEFITS</h3>
              <ul className="space-y-1 text-xs text-muted-foreground pl-4">
                <li>├─ All future v1.x updates at no cost</li>
                <li>├─ Email support for technical questions</li>
                <li>└─ New components and features as released</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x50]</span>
            <h2 className="text-lg font-bold">TECHNICAL_SUPPORT</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            While we don't offer refunds, we provide comprehensive support:
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground pl-4">
            <li>├─ <span className="text-foreground">EMAIL:</span> support@fabrk.dev for technical questions</li>
            <li>├─ <span className="text-foreground">DOCS:</span> 400KB+ of guides and examples</li>
            <li>├─ <span className="text-foreground">MAINTENANCE:</span> Active bug fixes and improvements</li>
            <li>└─ <span className="text-foreground">COMMUNITY:</span> Connect with other Fabrk users</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Our goal is to ensure you can successfully use Fabrk for your projects.
          </p>
        </section>

        {/* Section 6 */}
        <section className="border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x60]</span>
            <h2 className="text-lg font-bold text-destructive">CHARGEBACKS</h2>
          </div>
          <p className="text-xs text-foreground mb-3">
            <span className="text-destructive font-semibold">WARNING:</span> Initiating a chargeback for a valid purchase is considered fraudulent activity.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Filing a chargeback instead of contacting us about legitimate issues:
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground pl-4">
            <li>├─ <span className="text-destructive">✗</span> Costs significant processing fees</li>
            <li>├─ <span className="text-destructive">✗</span> Immediate license termination</li>
            <li>├─ <span className="text-destructive">✗</span> Banned from future purchases</li>
            <li>└─ <span className="text-destructive">✗</span> Dispute will be contested with documentation</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Have concerns? Contact support@fabrk.dev first. We're here to help resolve legitimate issues.
          </p>
        </section>

        {/* Section 7 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x70]</span>
            <h2 className="text-lg font-bold">EU_CONSUMER_RIGHTS</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            EU consumers have a 14-day withdrawal right under the Consumer Rights Directive (2011/83/EU).
          </p>
          <p className="text-xs text-foreground mb-3">
            <span className="text-warning font-semibold">HOWEVER:</span> By downloading immediately after purchase, you expressly waive this right, as you requested immediate delivery of digital content.
          </p>
          <p className="text-xs text-muted-foreground">
            This waiver is required under Article 16(m) of the Consumer Rights Directive.
          </p>
        </section>

        {/* Section 8 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x80]</span>
            <h2 className="text-lg font-bold">EXCEPTIONS</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            We may issue refunds at our sole discretion in rare cases:
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground pl-4">
            <li>├─ <span className="text-foreground">TECHNICAL_IMPOSSIBILITY:</span> Product fundamentally cannot work as described (our error)</li>
            <li>├─ <span className="text-foreground">DUPLICATE_CHARGES:</span> Accidentally charged multiple times</li>
            <li>└─ <span className="text-foreground">SERVICE_FAILURE:</span> Failed to deliver access within 7 days</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Exceptions require documented proof and case-by-case evaluation. Contact support@fabrk.dev with details.
          </p>
        </section>

        {/* Section 9-10 */}
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0x90]</span>
            <h2 className="text-lg font-bold">POLICY_UPDATES</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            We may modify this policy at any time. Your purchase is governed by the policy in effect at time of purchase.
          </p>
        </section>

        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">[0xA0]</span>
            <h2 className="text-lg font-bold">QUESTIONS</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Have questions about this policy or Fabrk?</p>
          <ul className="space-y-1 text-xs text-muted-foreground pl-4">
            <li>├─ <span className="text-foreground">PRE_PURCHASE:</span> <Link href="/contact" className="text-primary hover:underline">/contact</Link> or support@fabrk.dev</li>
            <li>├─ <span className="text-foreground">TECHNICAL:</span> support@fabrk.dev</li>
            <li>└─ <span className="text-foreground">LEGAL:</span> legal@fabrk.dev</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Please reach out before buying if you have any concerns.
          </p>
        </section>
      </div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 border border-border bg-card p-6"
      >
        <span className="block mb-3 text-xs text-muted-foreground">
          [ RELATED_DOCUMENTS ]
        </span>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/terms" className="text-primary hover:underline">
            &gt; TERMS_OF_SERVICE
          </Link>
          <Link href="/privacy" className="text-primary hover:underline">
            &gt; PRIVACY_POLICY
          </Link>
          <Link href="/cookies" className="text-primary hover:underline">
            &gt; COOKIE_POLICY
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
