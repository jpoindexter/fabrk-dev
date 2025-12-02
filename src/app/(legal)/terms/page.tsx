/**
 * Terms of Service Page
 * Legal agreement between Fabrk and users - Terminal Console Style
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
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
          <span className="border-border bg-card text-muted-foreground inline-block border px-3 py-1 text-xs">
            [ [0x00] LEGAL ] TERMS_OF_SERVICE
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-muted-foreground mb-2 text-sm">FABRK_LEGAL:</h1>
          <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">TERMS_OF_SERVICE</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-muted-foreground text-xs">LAST_UPDATED: November 26, 2025</span>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-border bg-card mb-12 border p-6"
      >
        <div className="text-muted-foreground mb-2 text-xs">
          [ [0x01] NOTICE ]────────────────────────
        </div>
        <p className="text-muted-foreground text-sm">
          Please read these Terms of Service carefully before purchasing or using Fabrk. By
          accessing or using our Service, you acknowledge that you have read, understood, and agree
          to be bound by these terms.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Section 1 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x10]</span>
            <h2 className="text-lg font-bold">AGREEMENT_TO_TERMS</h2>
          </div>
          <p className="text-muted-foreground mb-3 text-sm">
            By accessing, purchasing, or using Fabrk ("Service", "Product", "we", "us", or "our"),
            you ("Buyer", "User", "you") agree to be bound by these Terms of Service ("Terms").
          </p>
          <p className="text-muted-foreground text-sm">
            Fabrk is a product offered by THEFT BV, a company registered in the Netherlands (KVK:
            81705344, VAT: NL862188726B01). These Terms constitute a legal agreement between you and
            THEFT BV.
          </p>
        </section>

        {/* Section 2 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x20]</span>
            <h2 className="text-lg font-bold">DESCRIPTION_OF_SERVICE</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Fabrk is an enterprise-grade Next.js 15 SaaS boilerplate providing 100 production-ready
            components, authentication, payment processing, database integration, multi-tenancy, and
            more.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[2.1] PERPETUAL_LICENSE_GRANT</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Upon successful payment of €299 per developer seat, we grant you a non-exclusive,
                non-transferable, perpetual license to:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Access and download the complete Fabrk source code</li>
                <li>├─ Use the source code for unlimited commercial and personal projects</li>
                <li>├─ Modify, customize, and extend the code for your own use</li>
                <li>├─ Deploy unlimited applications built with Fabrk</li>
                <li>├─ Receive all v1.x updates at no additional cost</li>
                <li>└─ Use Fabrk components in client projects</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[2.1.1] PER_SEAT_LICENSE</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                One license permits one natural person (developer) to access and use the Fabrk
                source code. For teams:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Purchase one license per developer with code access</li>
                <li>├─ Licenses may be reassigned permanently</li>
                <li>└─ May not be used concurrently by multiple individuals</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[2.2] LICENSE_RESTRICTIONS</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                You are expressly PROHIBITED from:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>
                  ├─ <span className="text-destructive">✗</span> Reselling, redistributing, or
                  sharing the source code
                </li>
                <li>
                  ├─ <span className="text-destructive">✗</span> Creating derivative boilerplate
                  products for sale
                </li>
                <li>
                  ├─ <span className="text-destructive">✗</span> Claiming the code as your own
                  original creation
                </li>
                <li>
                  ├─ <span className="text-destructive">✗</span> Building competing boilerplate
                  products
                </li>
                <li>
                  ├─ <span className="text-destructive">✗</span> Removing copyright notices or
                  license files
                </li>
                <li>
                  └─ <span className="text-destructive">✗</span> Sharing account credentials
                </li>
              </ul>
              <p className="text-destructive mt-2 text-xs">
                Violation results in immediate license termination and may subject you to legal
                action.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x30]</span>
            <h2 className="text-lg font-bold">USER_ACCOUNTS</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[3.1] ACCOUNT_SECURITY</h3>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Provide accurate, current information during registration</li>
                <li>├─ Maintain security of your account credentials</li>
                <li>├─ Notify us immediately of unauthorized access</li>
                <li>├─ Accept responsibility for all account activities</li>
                <li>└─ Never share credentials with third parties</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[3.2] ACCOUNT_TERMINATION</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                We may terminate your account for:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Violation of these Terms</li>
                <li>├─ Fraudulent or illegal activity</li>
                <li>├─ Sharing or redistributing source code</li>
                <li>├─ Bad faith chargebacks</li>
                <li>└─ Security threats or unauthorized access attempts</li>
              </ul>
              <p className="text-muted-foreground mt-2 text-sm">
                Termination does not entitle you to a refund under any circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x40]</span>
            <h2 className="text-lg font-bold">PAYMENT_TERMS</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[4.1] PRICING</h3>
              <p className="text-muted-foreground text-sm">
                Current price:{" "}
                <span className="text-foreground font-semibold">€299 per developer seat</span>{" "}
                (one-time payment, lifetime license, no recurring fees).
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[4.2] PAYMENT_PROCESSING</h3>
              <p className="text-muted-foreground text-sm">
                Payments processed via Polar and/or Stripe. By completing purchase, you authorize
                the charge and acknowledge this is a final sale of a digital product with no
                refunds.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[4.3] NO_REFUNDS_POLICY</h3>
              <div className="border-destructive/30 bg-destructive/5 mt-2 border p-4">
                <p className="text-foreground text-xs">
                  <span className="text-destructive font-semibold">ALL SALES ARE FINAL.</span> Once
                  you gain access to the source code, no refunds, exchanges, or credits are
                  available. Digital products cannot be "returned" once downloaded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x50]</span>
            <h2 className="text-lg font-bold">INTELLECTUAL_PROPERTY</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[5.1] FABRK_IP</h3>
              <p className="text-muted-foreground text-sm">
                All source code, components, templates, documentation remain exclusive property of
                Fabrk. Your purchase grants a license to use, not ownership.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[5.2] YOUR_CONTENT</h3>
              <p className="text-muted-foreground text-sm">
                You retain full ownership of applications and products you create using Fabrk as a
                foundation. We claim no rights to your custom applications.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[5.3] THIRD_PARTY_DEPS</h3>
              <p className="text-muted-foreground text-sm">
                Fabrk uses open-source libraries (Next.js, React, Prisma, etc.) subject to their own
                licenses. You are responsible for compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x60]</span>
            <h2 className="text-lg font-bold">PROHIBITED_USES</h2>
          </div>
          <p className="text-muted-foreground mb-2 text-sm">You agree NOT to use Fabrk to:</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-destructive">✗</span> Violate any laws or regulations
            </li>
            <li>
              ├─ <span className="text-destructive">✗</span> Infringe intellectual property rights
            </li>
            <li>
              ├─ <span className="text-destructive">✗</span> Transmit malware or harmful code
            </li>
            <li>
              ├─ <span className="text-destructive">✗</span> Engage in fraud or deceptive practices
            </li>
            <li>
              ├─ <span className="text-destructive">✗</span> Harass, abuse, or harm others
            </li>
            <li>
              ├─ <span className="text-destructive">✗</span> Collect data without proper consent
            </li>
            <li>
              ├─ <span className="text-destructive">✗</span> Interfere with our systems
            </li>
            <li>
              └─ <span className="text-destructive">✗</span> Facilitate illegal activities
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x70]</span>
            <h2 className="text-lg font-bold">DISCLAIMERS_LIABILITY</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[7.1] AS_IS_BASIS</h3>
              <p className="text-muted-foreground text-sm">
                FABRK IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                INCLUDING MERCHANTABILITY, FITNESS FOR PURPOSE, NON-INFRINGEMENT, OR ERROR-FREE
                OPERATION.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[7.2] LIMITATION_OF_LIABILITY</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                FABRK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, INCLUDING:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Loss of profits, revenue, data, or business</li>
                <li>├─ Damages from errors, bugs, or security vulnerabilities</li>
                <li>├─ Damages from third-party services</li>
                <li>└─ Damages from unauthorized access</li>
              </ul>
              <p className="text-foreground mt-2 text-xs">
                TOTAL LIABILITY: Maximum of €299 (amount paid for license).
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x80]</span>
            <h2 className="text-lg font-bold">UPDATES_VERSIONING</h2>
          </div>
          <p className="text-muted-foreground mb-3 text-sm">
            Your perpetual license includes lifetime access to all v1.x updates (bug fixes, security
            patches, new components, documentation).
          </p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>├─ Updates delivered via GitHub repository access</li>
            <li>├─ Major versions (v2.0+) may be separate products</li>
            <li>└─ No guarantee of indefinite maintenance</li>
          </ul>
        </section>

        {/* Section 9-10 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x90]</span>
            <h2 className="text-lg font-bold">INDEMNIFICATION</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            You agree to indemnify and hold harmless Fabrk from claims arising from your use,
            violations of these Terms, violations of rights, and applications you build.
          </p>
        </section>

        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0xA0]</span>
            <h2 className="text-lg font-bold">GOVERNING_LAW</h2>
          </div>
          <p className="text-muted-foreground mb-2 text-sm">
            These Terms are governed by the laws of the Netherlands. Disputes shall be resolved in
            the courts of Apeldoorn, Netherlands.
          </p>
          <p className="text-muted-foreground text-sm">
            EU consumers retain all mandatory rights under EU consumer protection law.
          </p>
        </section>

        {/* Section 11-13 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0xB0]</span>
            <h2 className="text-lg font-bold">TERMS_CHANGES</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            We may modify these Terms at any time. Material changes will be communicated with 30
            days' notice. Continued use constitutes acceptance.
          </p>
        </section>

        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0xC0]</span>
            <h2 className="text-lg font-bold">CONTACT_INFO</h2>
          </div>
          <p className="text-muted-foreground mb-3 text-sm">Questions about these Terms?</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">LEGAL:</span> legal@fabrk.dev
            </li>
            <li>
              ├─ <span className="text-foreground">SUPPORT:</span> support@fabrk.dev
            </li>
            <li>
              └─ <span className="text-foreground">FORM:</span>{" "}
              <Link href="/contact" className="text-primary hover:underline">
                /contact
              </Link>
            </li>
          </ul>
        </section>
      </div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-border bg-card mt-12 border p-6"
      >
        <span className="text-muted-foreground mb-3 block text-xs">[ RELATED_DOCUMENTS ]</span>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/privacy" className="text-primary hover:underline">
            &gt; PRIVACY_POLICY
          </Link>
          <Link href="/cookies" className="text-primary hover:underline">
            &gt; COOKIE_POLICY
          </Link>
          <Link href="/refund" className="text-primary hover:underline">
            &gt; REFUND_POLICY
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
