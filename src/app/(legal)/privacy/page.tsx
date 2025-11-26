/**
 * Privacy Policy Page
 * How we collect, use, and protect user data
 */

"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  H1,
  H2,
  H3,
  Body,
  Small,
  List,
  ListItem,
  Link,
  Strong,
} from "@/components/ui/typography";

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="default" size="lg" className="mb-6 uppercase tracking-wide">
            Legal
          </Badge>
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <H1 className="mb-4">Privacy Policy</H1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Small>Last Updated: November 7, 2024</Small>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12 rounded-lg border border-border bg-card p-6"
      >
        <Body className="text-lg">
          We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
        </Body>
      </motion.div>

      <div className="space-y-12">
        <section>
          <H2 className="mb-4">1. Information We Collect</H2>

          <H3 className="mt-6 mb-3">1.1 Information You Provide</H3>
          <Body className="mb-4">
            When you use Fabrk, we collect information you provide directly:
          </Body>
          <List className="mb-4">
            <ListItem><Strong>Account Information:</Strong> Name, email address, password (hashed)</ListItem>
            <ListItem><Strong>Payment Information:</Strong> Processed by Stripe (we don't store full card details)</ListItem>
            <ListItem><Strong>Profile Data:</Strong> Optional profile picture, bio, preferences</ListItem>
            <ListItem><Strong>Communications:</Strong> Support inquiries, feedback, email correspondence</ListItem>
            <ListItem><Strong>GitHub Username:</Strong> Required for granting repository access to purchased code. This information is used to invite you as a collaborator to our private GitHub repository with read-only access.</ListItem>
          </List>

          <H3 className="mt-6 mb-3">1.2 Automatically Collected Information</H3>
          <Body className="mb-4">
            We automatically collect certain information when you use our Service:
          </Body>
          <List className="mb-4">
            <ListItem><Strong>Usage Data:</Strong> Pages visited, features used, time spent</ListItem>
            <ListItem><Strong>Device Information:</Strong> Browser type, OS, device model</ListItem>
            <ListItem><Strong>Log Data:</Strong> IP address, access times, error logs</ListItem>
            <ListItem><Strong>Cookies:</Strong> Session cookies, preference cookies (see Cookie Policy)</ListItem>
          </List>

          <H3 className="mt-6 mb-3">1.3 Third-Party Data</H3>
          <Body className="mb-4">
            If you authenticate via OAuth (Google, GitHub), we receive:
          </Body>
          <List className="mb-4">
            <ListItem>Your name and email address</ListItem>
            <ListItem>Profile picture (if provided)</ListItem>
            <ListItem>Account ID (for linking purposes)</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">2. How We Use Your Information</H2>
          <Body className="mb-4">We use collected information for:</Body>
          <List className="mb-4">
            <ListItem><Strong>Service Provision:</Strong> Account creation, authentication, service delivery</ListItem>
            <ListItem><Strong>Payment Processing:</Strong> Billing, invoices, subscription management</ListItem>
            <ListItem><Strong>Communication:</Strong> Service updates, security alerts, support responses</ListItem>
            <ListItem><Strong>Improvement:</Strong> Analyzing usage to improve features and performance</ListItem>
            <ListItem><Strong>Security:</Strong> Fraud detection, abuse prevention, system security</ListItem>
            <ListItem><Strong>Legal Compliance:</Strong> Meeting legal obligations, enforcing terms</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">3. Legal Basis for Processing (GDPR)</H2>
          <Body className="mb-4">Under GDPR, we process your data based on:</Body>
          <List className="mb-4">
            <ListItem><Strong>Contract:</Strong> Processing necessary to provide the Service you purchased</ListItem>
            <ListItem><Strong>Consent:</Strong> You've given explicit consent (e.g., marketing emails)</ListItem>
            <ListItem><Strong>Legitimate Interest:</Strong> Necessary for our business operations (e.g., fraud prevention)</ListItem>
            <ListItem><Strong>Legal Obligation:</Strong> Required by law (e.g., tax records, payment history)</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">4. Data Sharing and Disclosure</H2>

          <H3 className="mt-6 mb-3">4.1 Service Providers</H3>
          <Body className="mb-4">We share data with trusted third parties who help us operate:</Body>
          <List className="mb-4">
            <ListItem><Strong>Stripe:</Strong> Payment processing (PCI-DSS compliant)</ListItem>
            <ListItem><Strong>Resend:</Strong> Transactional email delivery</ListItem>
            <ListItem><Strong>Vercel/Hosting Provider:</Strong> Infrastructure and hosting</ListItem>
            <ListItem><Strong>Analytics Services:</Strong> Usage analytics (anonymized when possible)</ListItem>
            <ListItem><Strong>GitHub:</Strong> We use GitHub's Collaborator API to grant you access to the fabrk-boilerplate repository after purchase. GitHub is a data processor for your GitHub username and will receive a collaboration invitation request. <Link href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's privacy policy</Link></ListItem>
          </List>

          <H3 className="mt-6 mb-3">4.2 Legal Requirements</H3>
          <Body className="mb-4">We may disclose data if required by law or in response to:</Body>
          <List className="mb-4">
            <ListItem>Valid legal process (subpoenas, court orders)</ListItem>
            <ListItem>Enforcement of our Terms of Service</ListItem>
            <ListItem>Protection of rights, property, or safety</ListItem>
          </List>

          <H3 className="mt-6 mb-3">4.3 Business Transfers</H3>
          <Body className="mb-4">
            If Fabrk is acquired or merged, your information may be transferred to the new owner. We'll notify you before any transfer.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">5. Data Security</H2>
          <Body className="mb-4">We implement industry-standard security measures:</Body>
          <List className="mb-4">
            <ListItem><Strong>Encryption:</Strong> TLS 1.3 for data in transit, AES-256 for data at rest</ListItem>
            <ListItem><Strong>Authentication:</Strong> Bcrypt password hashing (12 rounds)</ListItem>
            <ListItem><Strong>Session Security:</Strong> JWT tokens with expiration, session versioning</ListItem>
            <ListItem><Strong>Infrastructure:</Strong> Secure cloud hosting with regular security patches</ListItem>
            <ListItem><Strong>Access Control:</Strong> Limited employee access to user data</ListItem>
            <ListItem><Strong>Monitoring:</Strong> Automated security monitoring and alerts</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">6. Data Retention</H2>
          <Body className="mb-4">We retain your data for:</Body>
          <List className="mb-4">
            <ListItem><Strong>Active Accounts:</Strong> Duration of your account + 30 days after deletion</ListItem>
            <ListItem><Strong>Payment Records:</Strong> 7 years (required by tax law)</ListItem>
            <ListItem><Strong>Logs:</Strong> 90 days for security and debugging</ListItem>
            <ListItem><Strong>Backups:</Strong> 30 days (then automatically deleted)</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">7. Your Privacy Rights</H2>

          <H3 className="mt-6 mb-3">7.1 GDPR Rights (EU Users)</H3>
          <Body className="mb-4">You have the right to:</Body>
          <List className="mb-4">
            <ListItem><Strong>Access:</Strong> Request a copy of your personal data</ListItem>
            <ListItem><Strong>Rectification:</Strong> Correct inaccurate data</ListItem>
            <ListItem><Strong>Erasure:</Strong> Request deletion ("right to be forgotten")</ListItem>
            <ListItem><Strong>Portability:</Strong> Receive your data in a portable format</ListItem>
            <ListItem><Strong>Restriction:</Strong> Limit how we process your data</ListItem>
            <ListItem><Strong>Objection:</Strong> Object to data processing</ListItem>
            <ListItem><Strong>Withdraw Consent:</Strong> Revoke consent at any time</ListItem>
          </List>

          <H3 className="mt-6 mb-3">7.2 CCPA Rights (California Users)</H3>
          <Body className="mb-4">California residents have the right to:</Body>
          <List className="mb-4">
            <ListItem>Know what personal information we collect</ListItem>
            <ListItem>Know whether we sell or disclose personal information (we don't sell)</ListItem>
            <ListItem>Access your personal information</ListItem>
            <ListItem>Request deletion of your personal information</ListItem>
            <ListItem>Opt-out of sale (not applicable - we don't sell data)</ListItem>
            <ListItem>Non-discrimination for exercising your rights</ListItem>
          </List>

          <H3 className="mt-6 mb-3">7.3 Exercising Your Rights</H3>
          <Body className="mb-4">To exercise any of these rights, contact us at:</Body>
          <List className="mb-4">
            <ListItem>Email: privacy@fabrk.dev</ListItem>
            <ListItem>Account Settings: <Link href="/settings">Edit your data directly</Link></ListItem>
          </List>
          <Body className="mb-4">We'll respond within 30 days.</Body>

          <H3 className="mt-6 mb-3">7.4 GitHub Access Revocation</H3>
          <Body className="mb-4">
            If you request your data be deleted, we will revoke your access to the fabrk-boilerplate repository on GitHub.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">8. Cookies and Tracking</H2>
          <Body className="mb-4">We use cookies for:</Body>
          <List className="mb-4">
            <ListItem><Strong>Essential Cookies:</Strong> Authentication, session management (required)</ListItem>
            <ListItem><Strong>Preference Cookies:</Strong> Remember your settings (theme, language)</ListItem>
            <ListItem><Strong>Analytics Cookies:</Strong> Understand usage patterns (optional)</ListItem>
          </List>
          <Body className="mb-4">
            See our <Link href="/cookies">Cookie Policy</Link> for detailed information.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">9. Children's Privacy</H2>
          <Body className="mb-4">
            Fabrk is not intended for users under 18. We do not knowingly collect data from children. If you believe we've collected data from a child, contact us immediately and we'll delete it.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">10. International Data Transfers</H2>
          <Body className="mb-4">
            Your data may be processed in countries outside your own. We ensure adequate protection through:
          </Body>
          <List className="mb-4">
            <ListItem>Standard Contractual Clauses (EU-approved)</ListItem>
            <ListItem>Data Processing Agreements with all vendors</ListItem>
            <ListItem>Compliance with applicable data protection laws</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">11. Changes to This Policy</H2>
          <Body className="mb-4">
            We may update this policy periodically. We'll notify you of significant changes via email or prominent notice on our website. Continued use after changes constitutes acceptance.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">12. Contact Us</H2>
          <Body className="mb-4">Privacy questions or concerns? Contact us:</Body>
          <List className="mb-4">
            <ListItem><Strong>Email:</Strong> privacy@fabrk.dev</ListItem>
            <ListItem><Strong>Data Protection Officer:</Strong> dpo@fabrk.dev</ListItem>
            <ListItem><Strong>Contact Form:</Strong> <Link href="/contact">Contact Page</Link></ListItem>
          </List>
        </section>
      </div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 rounded-lg border border-border bg-card p-6"
      >
        <Small className="block mb-4">
          Related Legal Documents:
        </Small>
        <div className="flex flex-wrap gap-3">
          <Link href="/terms" className="text-sm font-medium">
            Terms of Service
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/cookies" className="text-sm font-medium">
            Cookie Policy
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
