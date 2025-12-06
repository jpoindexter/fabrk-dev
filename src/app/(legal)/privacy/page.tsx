/**
 * Privacy Policy Page
 * How we collect, use, and protect user data - Terminal Console Style
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
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
          <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 text-xs">
            [ [0x00] LEGAL ] PRIVACY_POLICY
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-muted-foreground mb-2 text-sm">FABRK_LEGAL:</h1>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight">PRIVACY_POLICY</h2>
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
          [ [0x01] OVERVIEW ]────────────────────────
        </div>
        <p className="text-muted-foreground text-sm">
          We value your privacy and are committed to protecting your personal data. This Privacy
          Policy explains how we collect, use, and safeguard your information.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Section 1 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x10]</span>
            <h2 className="text-lg font-semibold">INFORMATION_WE_COLLECT</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[1.1] INFORMATION_YOU_PROVIDE</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                When you use Fabrk, we collect information you provide directly:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>
                  ├─ <span className="text-foreground">ACCOUNT_INFO:</span> Name, email address,
                  password (hashed)
                </li>
                <li>
                  ├─ <span className="text-foreground">PAYMENT_INFO:</span> Processed by Stripe (we
                  don't store full card details)
                </li>
                <li>
                  ├─ <span className="text-foreground">PROFILE_DATA:</span> Optional profile
                  picture, bio, preferences
                </li>
                <li>
                  ├─ <span className="text-foreground">COMMUNICATIONS:</span> Support inquiries,
                  feedback, email correspondence
                </li>
                <li>
                  └─ <span className="text-foreground">GITHUB_USERNAME:</span> Required for granting
                  repository access
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[1.2] AUTO_COLLECTED_INFO</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                We automatically collect certain information when you use our Service:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>
                  ├─ <span className="text-foreground">USAGE_DATA:</span> Pages visited, features
                  used, time spent
                </li>
                <li>
                  ├─ <span className="text-foreground">DEVICE_INFO:</span> Browser type, OS, device
                  model
                </li>
                <li>
                  ├─ <span className="text-foreground">LOG_DATA:</span> IP address, access times,
                  error logs
                </li>
                <li>
                  └─ <span className="text-foreground">COOKIES:</span> Session cookies, preference
                  cookies
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[1.3] THIRD_PARTY_DATA</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                If you authenticate via OAuth (Google, GitHub), we receive:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Your name and email address</li>
                <li>├─ Profile picture (if provided)</li>
                <li>└─ Account ID (for linking purposes)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x20]</span>
            <h2 className="text-lg font-semibold">HOW_WE_USE_YOUR_INFO</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">We use collected information for:</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">SERVICE_PROVISION:</span> Account creation,
              authentication, service delivery
            </li>
            <li>
              ├─ <span className="text-foreground">PAYMENT_PROCESSING:</span> Billing, invoices,
              subscription management
            </li>
            <li>
              ├─ <span className="text-foreground">COMMUNICATION:</span> Service updates, security
              alerts, support responses
            </li>
            <li>
              ├─ <span className="text-foreground">IMPROVEMENT:</span> Analyzing usage to improve
              features and performance
            </li>
            <li>
              ├─ <span className="text-foreground">SECURITY:</span> Fraud detection, abuse
              prevention, system security
            </li>
            <li>
              └─ <span className="text-foreground">LEGAL_COMPLIANCE:</span> Meeting legal
              obligations, enforcing terms
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x30]</span>
            <h2 className="text-lg font-semibold">LEGAL_BASIS_GDPR</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Under GDPR, we process your data based on:
          </p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">CONTRACT:</span> Processing necessary to provide
              the Service you purchased
            </li>
            <li>
              ├─ <span className="text-foreground">CONSENT:</span> You've given explicit consent
              (e.g., marketing emails)
            </li>
            <li>
              ├─ <span className="text-foreground">LEGITIMATE_INTEREST:</span> Necessary for our
              business operations
            </li>
            <li>
              └─ <span className="text-foreground">LEGAL_OBLIGATION:</span> Required by law (e.g.,
              tax records)
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x40]</span>
            <h2 className="text-lg font-semibold">DATA_SHARING_DISCLOSURE</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[4.1] SERVICE_PROVIDERS</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                We share data with trusted third parties:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>
                  ├─ <span className="text-foreground">STRIPE:</span> Payment processing (PCI-DSS
                  compliant)
                </li>
                <li>
                  ├─ <span className="text-foreground">RESEND:</span> Transactional email delivery
                </li>
                <li>
                  ├─ <span className="text-foreground">VERCEL:</span> Infrastructure and hosting
                </li>
                <li>
                  ├─ <span className="text-foreground">ANALYTICS:</span> Usage analytics
                  (anonymized)
                </li>
                <li>
                  └─ <span className="text-foreground">GITHUB:</span> Repository access via
                  Collaborator API
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[4.2] LEGAL_REQUIREMENTS</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                We may disclose data if required by law:
              </p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Valid legal process (subpoenas, court orders)</li>
                <li>├─ Enforcement of our Terms of Service</li>
                <li>└─ Protection of rights, property, or safety</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[4.3] BUSINESS_TRANSFERS</h3>
              <p className="text-muted-foreground text-sm">
                If Fabrk is acquired or merged, your information may be transferred. We'll notify
                you before any transfer.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x50]</span>
            <h2 className="text-lg font-semibold">DATA_SECURITY</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            We implement industry-standard security measures:
          </p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">ENCRYPTION:</span> TLS 1.3 in transit, AES-256 at
              rest
            </li>
            <li>
              ├─ <span className="text-foreground">AUTH:</span> Bcrypt password hashing (12 rounds)
            </li>
            <li>
              ├─ <span className="text-foreground">SESSIONS:</span> JWT tokens with expiration,
              versioning
            </li>
            <li>
              ├─ <span className="text-foreground">INFRA:</span> Secure cloud hosting with security
              patches
            </li>
            <li>
              ├─ <span className="text-foreground">ACCESS_CONTROL:</span> Limited employee access to
              user data
            </li>
            <li>
              └─ <span className="text-foreground">MONITORING:</span> Automated security monitoring
              and alerts
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x60]</span>
            <h2 className="text-lg font-semibold">DATA_RETENTION</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">We retain your data for:</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">ACTIVE_ACCOUNTS:</span> Duration + 30 days after
              deletion
            </li>
            <li>
              ├─ <span className="text-foreground">PAYMENT_RECORDS:</span> 7 years (required by tax
              law)
            </li>
            <li>
              ├─ <span className="text-foreground">LOGS:</span> 90 days for security and debugging
            </li>
            <li>
              └─ <span className="text-foreground">BACKUPS:</span> 30 days (then auto-deleted)
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x70]</span>
            <h2 className="text-lg font-semibold">YOUR_PRIVACY_RIGHTS</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold">[7.1] GDPR_RIGHTS (EU_USERS)</h3>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>
                  ├─ <span className="text-foreground">ACCESS:</span> Request a copy of your
                  personal data
                </li>
                <li>
                  ├─ <span className="text-foreground">RECTIFICATION:</span> Correct inaccurate data
                </li>
                <li>
                  ├─ <span className="text-foreground">ERASURE:</span> Request deletion ("right to
                  be forgotten")
                </li>
                <li>
                  ├─ <span className="text-foreground">PORTABILITY:</span> Receive data in portable
                  format
                </li>
                <li>
                  ├─ <span className="text-foreground">RESTRICTION:</span> Limit how we process your
                  data
                </li>
                <li>
                  ├─ <span className="text-foreground">OBJECTION:</span> Object to data processing
                </li>
                <li>
                  └─ <span className="text-foreground">WITHDRAW_CONSENT:</span> Revoke consent at
                  any time
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[7.2] CCPA_RIGHTS (CA_USERS)</h3>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ Know what personal information we collect</li>
                <li>├─ Know if we sell/disclose info (we don't sell)</li>
                <li>├─ Access your personal information</li>
                <li>├─ Request deletion of your info</li>
                <li>└─ Non-discrimination for exercising rights</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[7.3] EXERCISING_RIGHTS</h3>
              <p className="text-muted-foreground mb-2 text-sm">Contact us at:</p>
              <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
                <li>├─ EMAIL: privacy@fabrk.dev</li>
                <li>
                  └─ PROFILE:{" "}
                  <Link href="/profile" className="text-primary hover:underline">
                    /profile
                  </Link>
                </li>
              </ul>
              <p className="text-muted-foreground mt-2 text-sm">Response time: 30 days</p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">[7.4] GITHUB_ACCESS_REVOCATION</h3>
              <p className="text-muted-foreground text-sm">
                If you request data deletion, we will revoke your access to the fabrk-boilerplate
                repository on GitHub.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x80]</span>
            <h2 className="text-lg font-semibold">COOKIES_AND_TRACKING</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">We use cookies for:</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">ESSENTIAL:</span> Authentication, session
              management (required)
            </li>
            <li>
              ├─ <span className="text-foreground">PREFERENCE:</span> Remember your settings (theme,
              language)
            </li>
            <li>
              └─ <span className="text-foreground">ANALYTICS:</span> Understand usage patterns
              (optional)
            </li>
          </ul>
          <p className="text-muted-foreground mt-4 text-sm">
            See our{" "}
            <Link href="/cookies" className="text-primary hover:underline">
              COOKIE_POLICY
            </Link>{" "}
            for details.
          </p>
        </section>

        {/* Section 9 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0x90]</span>
            <h2 className="text-lg font-semibold">CHILDRENS_PRIVACY</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Fabrk is not intended for users under 18. We do not knowingly collect data from
            children. If you believe we've collected data from a child, contact us immediately.
          </p>
        </section>

        {/* Section 10 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0xA0]</span>
            <h2 className="text-lg font-semibold">INTERNATIONAL_DATA_TRANSFERS</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Your data may be processed in countries outside your own. We ensure adequate protection
            through:
          </p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>├─ Standard Contractual Clauses (EU-approved)</li>
            <li>├─ Data Processing Agreements with all vendors</li>
            <li>└─ Compliance with applicable data protection laws</li>
          </ul>
        </section>

        {/* Section 11 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0xB0]</span>
            <h2 className="text-lg font-semibold">POLICY_CHANGES</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            We may update this policy periodically. We'll notify you of significant changes via
            email or prominent notice. Continued use after changes constitutes acceptance.
          </p>
        </section>

        {/* Section 12 */}
        <section className="border-border bg-card border p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-muted-foreground text-xs">[0xC0]</span>
            <h2 className="text-lg font-semibold">CONTACT_US</h2>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">Privacy questions or concerns?</p>
          <ul className="text-muted-foreground space-y-1 pl-4 text-sm">
            <li>
              ├─ <span className="text-foreground">EMAIL:</span> privacy@fabrk.dev
            </li>
            <li>
              ├─ <span className="text-foreground">DPO:</span> dpo@fabrk.dev
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
        <span className="text-muted-foreground mb-4 block text-xs">[ RELATED_DOCUMENTS ]</span>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/terms" className="text-primary hover:underline">
            &gt; TERMS_OF_SERVICE
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
