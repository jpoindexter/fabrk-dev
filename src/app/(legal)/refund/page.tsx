/**
 * Refund Policy Page
 * No refunds policy for digital product
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

export default function RefundPage() {
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
          <H1 className="mb-4">Refund Policy</H1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Small>Last Updated: January 2025</Small>
        </motion.div>
      </div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12 rounded-lg border border-border bg-card p-6 shadow-sm"
      >
        <Body className="text-lg">
          Due to the nature of digital products, all sales are final. Please review this policy carefully before making your purchase.
        </Body>
      </motion.div>

      <div className="space-y-12">
        <section>
          <H2 className="mb-4">1. No Refunds Policy</H2>
          <Body className="mb-4">
            <Strong>All sales are final.</Strong> Once you gain access to the Fabrk source code and download the files, no refunds, exchanges, or credits are available under any circumstances.
          </Body>
          <Body className="mb-4">
            By completing your purchase, you acknowledge and accept that digital products cannot be "returned" once downloaded. This policy is standard for digital products and software licenses.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">2. Why No Refunds?</H2>
          <Body className="mb-4">
            Unlike physical products, digital products like Fabrk provide immediate value upon download:
          </Body>
          <List className="mb-4">
            <ListItem>You receive instant access to the complete source code</ListItem>
            <ListItem>You can immediately copy, modify, and use the code</ListItem>
            <ListItem>Digital products cannot be "returned" once downloaded</ListItem>
            <ListItem>There's no way to verify the code hasn't been copied before requesting a refund</ListItem>
          </List>
          <Body className="mb-4">
            This policy protects the integrity of our business and prevents abuse while ensuring fair pricing for all customers.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">3. Before You Purchase</H2>
          <Body className="mb-4">
            We encourage you to thoroughly review Fabrk before purchasing:
          </Body>
          <List className="mb-4">
            <ListItem>Review the <Link href="/features">complete feature list</Link> and component showcase</ListItem>
            <ListItem>Browse the <Link href="/docs">comprehensive documentation</Link></ListItem>
            <ListItem>Check the tech stack and integrations to ensure compatibility</ListItem>
            <ListItem>Contact <Link href="/contact">support@fabrk.dev</Link> with any pre-purchase questions</ListItem>
          </List>
          <Body className="mb-4">
            We want you to be fully informed about what Fabrk includes before you buy.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">4. What You Get After Purchase</H2>

          <H3 className="mt-6 mb-3">4.1 Immediate Access</H3>
          <List className="mb-4">
            <ListItem>Instant download of the complete Fabrk source code</ListItem>
            <ListItem>Lifetime license to use the code (v1.x updates included)</ListItem>
            <ListItem>Access to all 87 production-ready components</ListItem>
            <ListItem>Complete documentation and setup guides</ListItem>
          </List>

          <H3 className="mt-6 mb-3">4.2 Ongoing Benefits</H3>
          <List className="mb-4">
            <ListItem>All future v1.x updates at no additional cost</ListItem>
            <ListItem>Email support for technical questions</ListItem>
            <ListItem>Access to community Discord (when available)</ListItem>
            <ListItem>New components and features as they're released</ListItem>
          </List>
        </section>

        <section>
          <H2 className="mb-4">5. Technical Support</H2>
          <Body className="mb-4">
            While we don't offer refunds, we do provide comprehensive support to ensure Fabrk works for you:
          </Body>
          <List className="mb-4">
            <ListItem><Strong>Email support:</Strong> support@fabrk.dev for technical questions</ListItem>
            <ListItem><Strong>Documentation:</Strong> 400KB+ of guides, tutorials, and examples</ListItem>
            <ListItem><Strong>Bug fixes:</Strong> We actively maintain and improve Fabrk</ListItem>
            <ListItem><Strong>Community:</Strong> Connect with other Fabrk users</ListItem>
          </List>
          <Body className="mb-4">
            Our goal is to ensure you can successfully use Fabrk for your projects.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">6. Chargebacks</H2>
          <Body className="mb-4">
            <Strong>Important:</Strong> Initiating a chargeback for a valid purchase is considered fraudulent activity.
          </Body>
          <Body className="mb-4">
            If you file a chargeback instead of contacting us about legitimate technical issues:
          </Body>
          <List className="mb-4">
            <ListItem>It costs us significant processing fees</ListItem>
            <ListItem>Your license will be immediately terminated</ListItem>
            <ListItem>You'll be banned from future purchases</ListItem>
            <ListItem>The dispute will be contested with full documentation</ListItem>
          </List>
          <Body className="mb-4">
            If you have concerns about your purchase, please contact support@fabrk.dev first. We're here to help resolve any legitimate issues.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">7. EU Consumer Rights</H2>
          <Body className="mb-4">
            If you are a consumer in the European Union, you have a legal right to a 14-day withdrawal period under the EU Consumer Rights Directive (2011/83/EU).
          </Body>
          <Body className="mb-4">
            <Strong>However:</Strong> By downloading Fabrk immediately after purchase, you expressly acknowledge and agree that you waive this 14-day right of withdrawal, as you have requested immediate delivery and performance of digital content.
          </Body>
          <Body className="mb-4">
            This waiver is required under Article 16(m) of the Consumer Rights Directive, which states that the right of withdrawal does not apply to "the supply of digital content which is not supplied on a tangible medium if the performance has begun with the consumer's prior express consent and his acknowledgment that he thereby loses his right of withdrawal."
          </Body>
        </section>

        <section>
          <H2 className="mb-4">8. Exceptions</H2>
          <Body className="mb-4">
            We may issue refunds at our sole discretion in the following rare cases:
          </Body>
          <List className="mb-4">
            <ListItem><Strong>Technical impossibility:</Strong> If Fabrk fundamentally cannot work as described due to our error</ListItem>
            <ListItem><Strong>Duplicate charges:</Strong> If you were accidentally charged multiple times for the same purchase</ListItem>
            <ListItem><Strong>Service failure:</Strong> If we fail to deliver access to the product within 7 days</ListItem>
          </List>
          <Body className="mb-4">
            These exceptions require documented proof and are evaluated on a case-by-case basis. Contact support@fabrk.dev with details.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">9. Policy Updates</H2>
          <Body className="mb-4">
            We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated "Last Updated" date.
          </Body>
          <Body className="mb-4">
            Your purchase is governed by the Refund Policy in effect at the time of purchase. Policy changes do not affect purchases made before the change.
          </Body>
        </section>

        <section>
          <H2 className="mb-4">10. Questions?</H2>
          <Body className="mb-4">
            Have questions about this policy or Fabrk in general? We're here to help:
          </Body>
          <List className="mb-4">
            <ListItem><Strong>Pre-purchase questions:</Strong> <Link href="/contact">Contact form</Link> or support@fabrk.dev</ListItem>
            <ListItem><Strong>Technical support:</Strong> support@fabrk.dev</ListItem>
            <ListItem><Strong>Legal inquiries:</Strong> legal@fabrk.dev</ListItem>
          </List>
          <Body className="mb-4">
            We want you to feel confident in your purchase. Please reach out before buying if you have any concerns.
          </Body>
        </section>
      </div>

      {/* Related Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 rounded-lg border border-border bg-card p-6 shadow-sm"
      >
        <Small className="block mb-4">
          Related Legal Documents:
        </Small>
        <div className="flex flex-wrap gap-3">
          <Link href="/terms" className="text-sm font-medium">
            Terms of Service
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/privacy" className="text-sm font-medium">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
