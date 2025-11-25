/**
 * Terms of Service Page
 * Legal agreement between Fabrk and users
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

export default function TermsPage() {
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
            <H1 className="mb-4">Terms of Service</H1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Small>Last Updated: January 1, 2025</Small>
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
            Please read these Terms of Service carefully before purchasing or using Fabrk. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </Body>
        </motion.div>

        <div className="space-y-12">
          <section>
            <H2 className="mb-4">1. Agreement to Terms</H2>
            <Body>
              By accessing, purchasing, or using Fabrk ("Service", "Product", "we", "us", or "our"), you ("Buyer", "User", "you") agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access or use the Service.
            </Body>
            <Body className="mb-4">
              These Terms constitute a legal agreement between you and Fabrk. Your purchase and use of the Service signifies your acceptance of these Terms.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">2. Description of Service</H2>
            <Body className="mb-4">
              Fabrk is an enterprise-grade Next.js 15 SaaS boilerplate providing 100 production-ready components, authentication, payment processing, database integration, multi-tenancy, webhooks, API key management, real-time features, 2FA security, background job queues, analytics, and comprehensive testing infrastructure. The Service is provided as a one-time purchase software license for development purposes.
            </Body>
            <H3 className="mt-6 mb-3">2.1 Perpetual License Grant</H3>
            <Body className="mb-4">
              Upon successful payment of $299, we grant you a <Strong>non-exclusive, non-transferable, perpetual license</Strong> to:
            </Body>
            <List className="mb-4">
              <ListItem>Access and download the complete Fabrk source code</ListItem>
              <ListItem>Use the source code to create <Strong>unlimited commercial and personal projects</Strong></ListItem>
              <ListItem>Modify, customize, and extend the code for your own use</ListItem>
              <ListItem>Deploy unlimited applications built with Fabrk to production environments</ListItem>
              <ListItem>Receive all future updates and improvements at no additional cost (Lifetime v1.x updates)</ListItem>
              <ListItem>Use Fabrk components in client projects (commercial use permitted)</ListItem>
            </List>
            <H3 className="mt-6 mb-3">2.2 License Restrictions</H3>
            <Body className="mb-4">You are expressly <Strong>prohibited</Strong> from:</Body>
            <List className="mb-4">
              <ListItem><Strong>Reselling, redistributing, sublicensing, or sharing</Strong> the Fabrk source code with any third party</ListItem>
              <ListItem>Creating derivative boilerplate products for commercial sale or distribution</ListItem>
              <ListItem>Claiming the Fabrk code as your own original creation</ListItem>
              <ListItem>Using the product to build, market, or sell competing boilerplate or starter template products</ListItem>
              <ListItem>Removing or modifying copyright notices, attributions, or license files included in the source code</ListItem>
              <ListItem>Using Fabrk to create "SaaS boilerplate generators" or similar automated template services</ListItem>
              <ListItem>Sharing your license or account credentials with other individuals or organizations</ListItem>
            </List>
            <Body className="mb-4">
              <Strong>Violation of these restrictions will result in immediate license termination and may subject you to legal action.</Strong>
            </Body>
          </section>

          <section>
            <H2 className="mb-4">3. User Accounts</H2>
            <H3 className="mt-6 mb-3">3.1 Account Creation and Security</H3>
            <Body className="mb-4">
              To purchase and access Fabrk, you must create a user account. When creating an account, you agree to:
            </Body>
            <List className="mb-4">
              <ListItem>Provide accurate, current, and complete information during registration</ListItem>
              <ListItem>Maintain and promptly update your account information to keep it accurate and current</ListItem>
              <ListItem>Maintain the security and confidentiality of your account credentials</ListItem>
              <ListItem>Immediately notify us of any unauthorized access or security breach</ListItem>
              <ListItem>Accept responsibility for all activities that occur under your account</ListItem>
              <ListItem>Not share your account credentials with any third party</ListItem>
            </List>
            <Body className="mb-4">
              You are solely responsible for maintaining the confidentiality of your login credentials. We are not liable for any loss or damage arising from your failure to protect your account information.
            </Body>
            <H3 className="mt-6 mb-3">3.2 Account Termination</H3>
            <Body className="mb-4">
              We reserve the right to suspend, disable, or terminate your account at our sole discretion, without prior notice or liability, for any reason, including but not limited to:
            </Body>
            <List className="mb-4">
              <ListItem>Violation of these Terms of Service</ListItem>
              <ListItem>Fraudulent or illegal activity</ListItem>
              <ListItem>Sharing, reselling, or redistributing the Fabrk source code</ListItem>
              <ListItem>Chargebacks or payment disputes initiated in bad faith</ListItem>
              <ListItem>Abusive behavior toward our team or other users</ListItem>
              <ListItem>Security threats or attempted unauthorized access to our systems</ListItem>
            </List>
            <Body className="mb-4">
              Upon termination, your license to use Fabrk is immediately revoked, and you must cease all use of the software. <Strong>Termination does not entitle you to a refund under any circumstances.</Strong>
            </Body>
          </section>

          <section>
            <H2 className="mb-4">4. Payment Terms</H2>
            <H3 className="mt-6 mb-3">4.1 Pricing and License Validity</H3>
            <Body className="mb-4">
              The current price for a Fabrk license is <Strong>$299 USD</Strong> (one-time payment). This is a <Strong>lifetime license</Strong> with no recurring fees, no subscriptions, and no hidden costs.
            </Body>
            <Body className="mb-4">
              We reserve the right to modify pricing for future purchases at any time without prior notice. However, pricing changes do not affect licenses already purchased—your perpetual license is honored at the price you paid.
            </Body>
            <H3 className="mt-6 mb-3">4.2 Payment Processing and Authorization</H3>
            <Body className="mb-4">
              All payments are processed securely through <Strong>Stripe</Strong>, a PCI-compliant payment processor. We do not store your complete credit card information on our servers.
            </Body>
            <Body className="mb-4">
              By providing payment information and completing the purchase, you:
            </Body>
            <List className="mb-4">
              <ListItem>Authorize us to charge the full amount to your provided payment method</ListItem>
              <ListItem>Represent that you are authorized to use the payment method provided</ListItem>
              <ListItem>Agree to pay all applicable taxes, fees, and charges at the time of purchase</ListItem>
              <ListItem>Acknowledge that this is a <Strong>final sale of a digital product with no refunds</Strong></ListItem>
            </List>
            <H3 className="mt-6 mb-3">4.3 No Refunds Policy</H3>
            <Body className="mb-4">
              <Strong>Due to the nature of digital products, all sales are final.</Strong> Once you gain access to the Fabrk source code and download the files, no refunds, exchanges, or credits are available under any circumstances.
            </Body>
            <Body className="mb-4">
              By completing your purchase, you acknowledge and accept that:
            </Body>
            <List className="mb-4">
              <ListItem>Digital products cannot be "returned" once downloaded</ListItem>
              <ListItem>You have reviewed the product description, features, and documentation before purchasing</ListItem>
              <ListItem>All sales are final and non-refundable</ListItem>
              <ListItem>Chargebacks or payment disputes initiated in bad faith will result in immediate license termination and may be reported as fraud</ListItem>
            </List>
            <Body className="mb-4">
              We encourage you to review our documentation, component library, and feature list thoroughly before making your purchase decision. If you have questions before purchasing, please contact us at support@fabrk.dev.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">5. Intellectual Property Rights</H2>
            <Body className="mb-4">
              The Fabrk Service, including but not limited to its source code, architecture, design, documentation, components, templates, integrations, and all related intellectual property, are owned exclusively by Fabrk and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </Body>
            <H3 className="mt-6 mb-3">5.1 Fabrk's Intellectual Property</H3>
            <Body className="mb-4">
              All source code, components, templates, documentation, designs, and materials provided as part of Fabrk remain the exclusive intellectual property of Fabrk. Your purchase grants you a <Strong>license to use</Strong> (as specified in Section 2), not ownership of the underlying intellectual property.
            </Body>
            <Body className="mb-4">
              The Fabrk name, logo, branding, and all related trademarks are the property of Fabrk. You may not use our trademarks, service marks, or logos in any way that suggests endorsement, sponsorship, or affiliation without our prior written consent.
            </Body>
            <H3 className="mt-6 mb-3">5.2 Your Content and Applications</H3>
            <Body className="mb-4">
              You retain <Strong>full ownership and intellectual property rights</Strong> to any applications, products, content, code, or derivative works you create using Fabrk as a foundation. We claim no ownership, rights, or interest in your custom applications or business logic built on top of Fabrk.
            </Body>
            <Body className="mb-4">
              However, any improvements, modifications, or contributions you make to the core Fabrk boilerplate code itself (if shared with us) may be incorporated into future versions of Fabrk at our discretion, and you grant us a perpetual, worldwide, royalty-free license to use such contributions.
            </Body>
            <H3 className="mt-6 mb-3">5.3 Third-Party Dependencies</H3>
            <Body className="mb-4">
              Fabrk incorporates open-source libraries and dependencies (Next.js, React, Prisma, etc.) that are subject to their own licenses (MIT, Apache 2.0, etc.). You are responsible for complying with the licenses of all third-party dependencies used in Fabrk.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">6. Prohibited Uses</H2>
            <Body className="mb-4">
              You agree that you will NOT use Fabrk or any applications built with Fabrk to:
            </Body>
            <List className="mb-4">
              <ListItem>Violate any local, state, national, or international law or regulation</ListItem>
              <ListItem>Infringe upon or violate the intellectual property rights of others</ListItem>
              <ListItem>Transmit or distribute viruses, malware, ransomware, or other harmful code</ListItem>
              <ListItem>Engage in fraudulent, deceptive, or misleading practices</ListItem>
              <ListItem>Harass, abuse, threaten, defame, or harm any person or entity</ListItem>
              <ListItem>Impersonate any person or entity, or falsely represent your affiliation with any person or entity</ListItem>
              <ListItem>Collect, harvest, or store personal data without proper consent and legal compliance (GDPR, CCPA, etc.)</ListItem>
              <ListItem>Interfere with, disrupt, or overload our systems, servers, or networks</ListItem>
              <ListItem>Attempt to gain unauthorized access to our systems, accounts, or data</ListItem>
              <ListItem>Reverse engineer, decompile, or disassemble Fabrk for the purpose of creating competing products</ListItem>
              <ListItem>Use Fabrk to build or operate services that facilitate illegal activities (gambling in restricted jurisdictions, piracy, etc.)</ListItem>
              <ListItem>Resell, redistribute, sublicense, or share the Fabrk source code in violation of Section 2.2</ListItem>
            </List>
            <Body className="mb-4">
              <Strong>We reserve the right to investigate and take appropriate legal action</Strong> against anyone who violates these prohibitions, including but not limited to removing access, reporting to law enforcement, and pursuing civil remedies.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">7. Disclaimers and Limitation of Liability</H2>
            <H3 className="mt-6 mb-3">7.1 "As Is" and "As Available" Basis</H3>
            <Body className="mb-4">
              FABRK IS PROVIDED ON AN <Strong>"AS IS"</Strong> AND <Strong>"AS AVAILABLE"</Strong> BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </Body>
            <List className="mb-4">
              <ListItem>Warranties of MERCHANTABILITY</ListItem>
              <ListItem>Warranties of FITNESS FOR A PARTICULAR PURPOSE</ListItem>
              <ListItem>Warranties of NON-INFRINGEMENT</ListItem>
              <ListItem>Warranties of ACCURACY, RELIABILITY, OR COMPLETENESS</ListItem>
              <ListItem>Warranties that the SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</ListItem>
            </List>
            <Body className="mb-4">
              We make no guarantees that Fabrk will meet your specific requirements, that it will be compatible with all environments, or that it will be free of bugs, vulnerabilities, or errors. You assume full responsibility for selecting Fabrk to achieve your intended results and for the installation, use, and results obtained from the Service.
            </Body>
            <H3 className="mt-6 mb-3">7.2 Limitation of Liability</H3>
            <Body className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FABRK, ITS OWNERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY:
            </Body>
            <List className="mb-4">
              <ListItem>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</ListItem>
              <ListItem>LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES</ListItem>
              <ListItem>DAMAGES RESULTING FROM USE OR INABILITY TO USE THE SERVICE</ListItem>
              <ListItem>DAMAGES RESULTING FROM ERRORS, BUGS, SECURITY VULNERABILITIES, OR DATA LOSS</ListItem>
              <ListItem>DAMAGES RESULTING FROM THIRD-PARTY SERVICES (Stripe, Pusher, PostHog, etc.)</ListItem>
              <ListItem>DAMAGES ARISING FROM UNAUTHORIZED ACCESS TO YOUR APPLICATIONS OR DATA</ListItem>
            </List>
            <Body className="mb-4">
              WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF FABRK HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </Body>
            <Body className="mb-4">
              <Strong>IN ANY CASE, FABRK'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID FOR YOUR LICENSE ($299 USD).</Strong>
            </Body>
            <H3 className="mt-6 mb-3">7.3 Technical Support</H3>
            <Body className="mb-4">
              Fabrk includes comprehensive documentation, Storybook component library, and example implementations. However, <Strong>we do not provide guaranteed technical support, consulting, or custom development services</Strong>.
            </Body>
            <Body className="mb-4">
              While we may offer community support, respond to bug reports, or provide guidance at our discretion, you acknowledge that Fabrk is a self-service product designed for professional developers. We are not responsible for troubleshooting your custom implementations, deployment issues, or third-party service integrations.
            </Body>
            <H3 className="mt-6 mb-3">7.4 Third-Party Services</H3>
            <Body className="mb-4">
              Fabrk integrates with third-party services (Stripe, Pusher, PostHog, Supabase, Resend, Algolia, Sanity, etc.). We are not responsible for the availability, functionality, security, or terms of service of these third-party providers. You are responsible for complying with their terms and maintaining your own accounts.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">8. Updates, Maintenance, and Versioning</H2>
            <Body className="mb-4">
              Your perpetual license includes <Strong>lifetime access to all v1.x updates</Strong> at no additional cost. This includes bug fixes, security patches, new components, feature additions, and documentation improvements within the v1.x version family.
            </Body>
            <H3 className="mt-6 mb-3">8.1 Update Delivery</H3>
            <Body className="mb-4">
              Updates are delivered via GitHub repository access or download portal. You will receive notifications when significant updates are released, but you are responsible for monitoring for and applying updates.
            </Body>
            <H3 className="mt-6 mb-3">8.2 Major Version Upgrades</H3>
            <Body className="mb-4">
              If we release a major version upgrade (e.g., v2.0), it may be offered as a separate product with separate pricing. Your v1.x license does not automatically entitle you to major version upgrades, though we may offer discounted upgrade pricing to existing customers.
            </Body>
            <H3 className="mt-6 mb-3">8.3 No Maintenance Guarantee</H3>
            <Body className="mb-4">
              While we intend to actively maintain and improve Fabrk, we do not guarantee indefinite maintenance, support, or updates. We reserve the right to discontinue development, change direction, or sunset the product at any time without liability.
            </Body>
            <Body className="mb-4">
              In the event of discontinuation, you retain your perpetual license to continue using the version you have access to, but no new updates will be provided.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">9. Indemnification</H2>
            <Body className="mb-4">
              You agree to indemnify, defend, and hold harmless Fabrk, its owners, employees, contractors, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
            </Body>
            <List className="mb-4">
              <ListItem>Your use or misuse of Fabrk</ListItem>
              <ListItem>Your violation of these Terms of Service</ListItem>
              <ListItem>Your violation of any rights of another party, including intellectual property rights</ListItem>
              <ListItem>Your applications built with Fabrk, including any legal claims from your end users</ListItem>
              <ListItem>Your violation of any laws or regulations</ListItem>
            </List>
            <Body className="mb-4">
              This indemnification obligation survives the termination of these Terms and your use of the Service.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">10. Governing Law and Dispute Resolution</H2>
            <H3 className="mt-6 mb-3">10.1 Governing Law</H3>
            <Body className="mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions. The United Nations Convention on Contracts for the International Sale of Goods does not apply.
            </Body>
            <Body className="mb-4">
              Fabrk is operated by a business entity registered in Apeldoorn, Netherlands. All legal matters relating to these Terms shall be subject to Dutch law.
            </Body>
            <H3 className="mt-6 mb-3">10.2 Dispute Resolution</H3>
            <Body className="mb-4">
              Any disputes arising from or relating to these Terms or your use of Fabrk shall be resolved in accordance with Dutch law. We encourage parties to first attempt to resolve disputes amicably through good faith negotiations.
            </Body>
            <Body className="mb-4">
              If a dispute cannot be resolved amicably, the parties agree to submit to mediation before pursuing legal action. If mediation fails, disputes shall be resolved by the competent courts of the Netherlands.
            </Body>
            <H3 className="mt-6 mb-3">10.3 Jurisdiction</H3>
            <Body className="mb-4">
              You agree that any legal action or proceeding shall be brought exclusively in the competent courts of Apeldoorn, Netherlands, or such other Dutch court as may have jurisdiction, and you consent to personal jurisdiction in such courts.
            </Body>
            <H3 className="mt-6 mb-3">10.4 European Union Consumer Rights</H3>
            <Body className="mb-4">
              If you are a consumer residing in the European Union, nothing in these Terms affects your statutory rights under EU consumer protection law, including but not limited to the Consumer Rights Directive (2011/83/EU). You retain all mandatory consumer rights provided by your local jurisdiction.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">11. Changes to Terms</H2>
            <Body className="mb-4">
              We reserve the right to modify, update, or replace these Terms of Service at any time at our sole discretion. When we make changes, we will update the "Last Updated" date at the top of this page and may notify you via email or through the Service.
            </Body>
            <Body className="mb-4">
              <Strong>Material changes</Strong> (such as changes to pricing, refund policy, or license scope) will be communicated with at least 30 days' notice. Non-material changes (clarifications, formatting, contact information) take effect immediately upon posting.
            </Body>
            <Body className="mb-4">
              Your continued use of Fabrk after changes to these Terms constitutes your acceptance of the revised Terms. If you do not agree to the modified Terms, you must cease using the Service.
            </Body>
            <Body className="mb-4">
              <Strong>For customers who purchased before a Terms change:</Strong> The Terms in effect at the time of your purchase govern your license, unless the change is required by law or you explicitly agree to the new Terms.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">12. Severability and Entire Agreement</H2>
            <H3 className="mt-6 mb-3">12.1 Severability</H3>
            <Body className="mb-4">
              If any provision of these Terms is found to be unenforceable or invalid under applicable law, such provision shall be modified to the minimum extent necessary to make it enforceable, or if that is not possible, severed from these Terms. The unenforceability or invalidity of any provision shall not affect the enforceability or validity of the remaining provisions.
            </Body>
            <H3 className="mt-6 mb-3">12.2 Entire Agreement</H3>
            <Body className="mb-4">
              These Terms of Service, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Fabrk regarding the use of the Service, and supersede all prior or contemporaneous communications and proposals, whether oral or written.
            </Body>
            <H3 className="mt-6 mb-3">12.3 Waiver</H3>
            <Body className="mb-4">
              Our failure to enforce any right or provision of these Terms shall not be considered a waiver of that right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by Fabrk.
            </Body>
          </section>

          <section>
            <H2 className="mb-4">13. Contact Information</H2>
            <Body className="mb-4">
              If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:
            </Body>
            <List className="mb-4">
              <ListItem><Strong>Email:</Strong> legal@fabrk.dev</ListItem>
              <ListItem><Strong>Support:</Strong> support@fabrk.dev</ListItem>
              <ListItem><Strong>Website:</Strong> <Link href="/contact" className="text-primary hover:underline">https://fabrk.dev/contact</Link></ListItem>
            </List>
            <Small className="block mt-4">
              For general inquiries, use support@fabrk.dev. For legal matters, licensing questions, or Terms-related issues, use legal@fabrk.dev.
            </Small>
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
            <Link href="/privacy" className="text-sm font-medium">
              Privacy Policy
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
