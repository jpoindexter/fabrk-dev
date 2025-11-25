/**
 * Terms of Service Page
 * Legal agreement between Fabrk and users
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

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
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-foreground"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            Last Updated: January 1, 2025
          </motion.p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <p className="text-lg text-muted-foreground">
            Please read these Terms of Service carefully before purchasing or using Fabrk. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </motion.div>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing, purchasing, or using Fabrk ("Service", "Product", "we", "us", or "our"), you ("Buyer", "User", "you") agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access or use the Service.
            </p>
            <p>
              These Terms constitute a legal agreement between you and Fabrk. Your purchase and use of the Service signifies your acceptance of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. Description of Service</h2>
            <p>
              Fabrk is an enterprise-grade Next.js 15 SaaS boilerplate providing 100 production-ready components, authentication, payment processing, database integration, multi-tenancy, webhooks, API key management, real-time features, 2FA security, background job queues, analytics, and comprehensive testing infrastructure. The Service is provided as a one-time purchase software license for development purposes.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">2.1 Perpetual License Grant</h3>
            <p>
              Upon successful payment of $299, we grant you a <strong>non-exclusive, non-transferable, perpetual license</strong> to:
            </p>
            <ul>
              <li>Access and download the complete Fabrk source code</li>
              <li>Use the source code to create <strong>unlimited commercial and personal projects</strong></li>
              <li>Modify, customize, and extend the code for your own use</li>
              <li>Deploy unlimited applications built with Fabrk to production environments</li>
              <li>Receive all future updates and improvements at no additional cost (Lifetime v1.x updates)</li>
              <li>Use Fabrk components in client projects (commercial use permitted)</li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">2.2 License Restrictions</h3>
            <p>You are expressly <strong>prohibited</strong> from:</p>
            <ul>
              <li><strong>Reselling, redistributing, sublicensing, or sharing</strong> the Fabrk source code with any third party</li>
              <li>Creating derivative boilerplate products for commercial sale or distribution</li>
              <li>Claiming the Fabrk code as your own original creation</li>
              <li>Using the product to build, market, or sell competing boilerplate or starter template products</li>
              <li>Removing or modifying copyright notices, attributions, or license files included in the source code</li>
              <li>Using Fabrk to create "SaaS boilerplate generators" or similar automated template services</li>
              <li>Sharing your license or account credentials with other individuals or organizations</li>
            </ul>
            <p>
              <strong>Violation of these restrictions will result in immediate license termination and may subject you to legal action.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">3.1 Account Creation and Security</h3>
            <p>
              To purchase and access Fabrk, you must create a user account. When creating an account, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information to keep it accurate and current</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Immediately notify us of any unauthorized access or security breach</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Not share your account credentials with any third party</li>
            </ul>
            <p>
              You are solely responsible for maintaining the confidentiality of your login credentials. We are not liable for any loss or damage arising from your failure to protect your account information.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">3.2 Account Termination</h3>
            <p>
              We reserve the right to suspend, disable, or terminate your account at our sole discretion, without prior notice or liability, for any reason, including but not limited to:
            </p>
            <ul>
              <li>Violation of these Terms of Service</li>
              <li>Fraudulent or illegal activity</li>
              <li>Sharing, reselling, or redistributing the Fabrk source code</li>
              <li>Chargebacks or payment disputes initiated in bad faith</li>
              <li>Abusive behavior toward our team or other users</li>
              <li>Security threats or attempted unauthorized access to our systems</li>
            </ul>
            <p>
              Upon termination, your license to use Fabrk is immediately revoked, and you must cease all use of the software. <strong>Termination does not entitle you to a refund under any circumstances.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Payment Terms</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">4.1 Pricing and License Validity</h3>
            <p>
              The current price for a Fabrk license is <strong>$299 USD</strong> (one-time payment). This is a <strong>lifetime license</strong> with no recurring fees, no subscriptions, and no hidden costs.
            </p>
            <p>
              We reserve the right to modify pricing for future purchases at any time without prior notice. However, pricing changes do not affect licenses already purchased—your perpetual license is honored at the price you paid.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">4.2 Payment Processing and Authorization</h3>
            <p>
              All payments are processed securely through <strong>Stripe</strong>, a PCI-compliant payment processor. We do not store your complete credit card information on our servers.
            </p>
            <p>
              By providing payment information and completing the purchase, you:
            </p>
            <ul>
              <li>Authorize us to charge the full amount to your provided payment method</li>
              <li>Represent that you are authorized to use the payment method provided</li>
              <li>Agree to pay all applicable taxes, fees, and charges at the time of purchase</li>
              <li>Acknowledge that this is a <strong>final sale of a digital product with no refunds</strong></li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">4.3 No Refunds Policy</h3>
            <p>
              <strong>Due to the nature of digital products, all sales are final.</strong> Once you gain access to the Fabrk source code and download the files, no refunds, exchanges, or credits are available under any circumstances.
            </p>
            <p>
              By completing your purchase, you acknowledge and accept that:
            </p>
            <ul>
              <li>Digital products cannot be "returned" once downloaded</li>
              <li>You have reviewed the product description, features, and documentation before purchasing</li>
              <li>All sales are final and non-refundable</li>
              <li>Chargebacks or payment disputes initiated in bad faith will result in immediate license termination and may be reported as fraud</li>
            </ul>
            <p>
              We encourage you to review our documentation, component library, and feature list thoroughly before making your purchase decision. If you have questions before purchasing, please contact us at support@fabrk.dev.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">5. Intellectual Property Rights</h2>
            <p>
              The Fabrk Service, including but not limited to its source code, architecture, design, documentation, components, templates, integrations, and all related intellectual property, are owned exclusively by Fabrk and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">5.1 Fabrk's Intellectual Property</h3>
            <p>
              All source code, components, templates, documentation, designs, and materials provided as part of Fabrk remain the exclusive intellectual property of Fabrk. Your purchase grants you a <strong>license to use</strong> (as specified in Section 2), not ownership of the underlying intellectual property.
            </p>
            <p>
              The Fabrk name, logo, branding, and all related trademarks are the property of Fabrk. You may not use our trademarks, service marks, or logos in any way that suggests endorsement, sponsorship, or affiliation without our prior written consent.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">5.2 Your Content and Applications</h3>
            <p>
              You retain <strong>full ownership and intellectual property rights</strong> to any applications, products, content, code, or derivative works you create using Fabrk as a foundation. We claim no ownership, rights, or interest in your custom applications or business logic built on top of Fabrk.
            </p>
            <p>
              However, any improvements, modifications, or contributions you make to the core Fabrk boilerplate code itself (if shared with us) may be incorporated into future versions of Fabrk at our discretion, and you grant us a perpetual, worldwide, royalty-free license to use such contributions.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">5.3 Third-Party Dependencies</h3>
            <p>
              Fabrk incorporates open-source libraries and dependencies (Next.js, React, Prisma, etc.) that are subject to their own licenses (MIT, Apache 2.0, etc.). You are responsible for complying with the licenses of all third-party dependencies used in Fabrk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">6. Prohibited Uses</h2>
            <p>
              You agree that you will NOT use Fabrk or any applications built with Fabrk to:
            </p>
            <ul>
              <li>Violate any local, state, national, or international law or regulation</li>
              <li>Infringe upon or violate the intellectual property rights of others</li>
              <li>Transmit or distribute viruses, malware, ransomware, or other harmful code</li>
              <li>Engage in fraudulent, deceptive, or misleading practices</li>
              <li>Harass, abuse, threaten, defame, or harm any person or entity</li>
              <li>Impersonate any person or entity, or falsely represent your affiliation with any person or entity</li>
              <li>Collect, harvest, or store personal data without proper consent and legal compliance (GDPR, CCPA, etc.)</li>
              <li>Interfere with, disrupt, or overload our systems, servers, or networks</li>
              <li>Attempt to gain unauthorized access to our systems, accounts, or data</li>
              <li>Reverse engineer, decompile, or disassemble Fabrk for the purpose of creating competing products</li>
              <li>Use Fabrk to build or operate services that facilitate illegal activities (gambling in restricted jurisdictions, piracy, etc.)</li>
              <li>Resell, redistribute, sublicense, or share the Fabrk source code in violation of Section 2.2</li>
            </ul>
            <p>
              <strong>We reserve the right to investigate and take appropriate legal action</strong> against anyone who violates these prohibitions, including but not limited to removing access, reporting to law enforcement, and pursuing civil remedies.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">7. Disclaimers and Limitation of Liability</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">7.1 "As Is" and "As Available" Basis</h3>
            <p>
              FABRK IS PROVIDED ON AN <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong> BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>Warranties of MERCHANTABILITY</li>
              <li>Warranties of FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>Warranties of NON-INFRINGEMENT</li>
              <li>Warranties of ACCURACY, RELIABILITY, OR COMPLETENESS</li>
              <li>Warranties that the SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
            </ul>
            <p>
              We make no guarantees that Fabrk will meet your specific requirements, that it will be compatible with all environments, or that it will be free of bugs, vulnerabilities, or errors. You assume full responsibility for selecting Fabrk to achieve your intended results and for the installation, use, and results obtained from the Service.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">7.2 Limitation of Liability</h3>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FABRK, ITS OWNERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY:
            </p>
            <ul>
              <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
              <li>LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES</li>
              <li>DAMAGES RESULTING FROM USE OR INABILITY TO USE THE SERVICE</li>
              <li>DAMAGES RESULTING FROM ERRORS, BUGS, SECURITY VULNERABILITIES, OR DATA LOSS</li>
              <li>DAMAGES RESULTING FROM THIRD-PARTY SERVICES (Stripe, Pusher, PostHog, etc.)</li>
              <li>DAMAGES ARISING FROM UNAUTHORIZED ACCESS TO YOUR APPLICATIONS OR DATA</li>
            </ul>
            <p>
              WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF FABRK HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              <strong>IN ANY CASE, FABRK'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID FOR YOUR LICENSE ($299 USD).</strong>
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">7.3 Technical Support</h3>
            <p>
              Fabrk includes comprehensive documentation, Storybook component library, and example implementations. However, <strong>we do not provide guaranteed technical support, consulting, or custom development services</strong>.
            </p>
            <p>
              While we may offer community support, respond to bug reports, or provide guidance at our discretion, you acknowledge that Fabrk is a self-service product designed for professional developers. We are not responsible for troubleshooting your custom implementations, deployment issues, or third-party service integrations.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">7.4 Third-Party Services</h3>
            <p>
              Fabrk integrates with third-party services (Stripe, Pusher, PostHog, Supabase, Resend, Algolia, Sanity, etc.). We are not responsible for the availability, functionality, security, or terms of service of these third-party providers. You are responsible for complying with their terms and maintaining your own accounts.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Updates, Maintenance, and Versioning</h2>
            <p>
              Your perpetual license includes <strong>lifetime access to all v1.x updates</strong> at no additional cost. This includes bug fixes, security patches, new components, feature additions, and documentation improvements within the v1.x version family.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">8.1 Update Delivery</h3>
            <p>
              Updates are delivered via GitHub repository access or download portal. You will receive notifications when significant updates are released, but you are responsible for monitoring for and applying updates.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">8.2 Major Version Upgrades</h3>
            <p>
              If we release a major version upgrade (e.g., v2.0), it may be offered as a separate product with separate pricing. Your v1.x license does not automatically entitle you to major version upgrades, though we may offer discounted upgrade pricing to existing customers.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">8.3 No Maintenance Guarantee</h3>
            <p>
              While we intend to actively maintain and improve Fabrk, we do not guarantee indefinite maintenance, support, or updates. We reserve the right to discontinue development, change direction, or sunset the product at any time without liability.
            </p>
            <p>
              In the event of discontinuation, you retain your perpetual license to continue using the version you have access to, but no new updates will be provided.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Fabrk, its owners, employees, contractors, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
            </p>
            <ul>
              <li>Your use or misuse of Fabrk</li>
              <li>Your violation of these Terms of Service</li>
              <li>Your violation of any rights of another party, including intellectual property rights</li>
              <li>Your applications built with Fabrk, including any legal claims from your end users</li>
              <li>Your violation of any laws or regulations</li>
            </ul>
            <p>
              This indemnification obligation survives the termination of these Terms and your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">10. Governing Law and Dispute Resolution</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">10.1 Governing Law</h3>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions. The United Nations Convention on Contracts for the International Sale of Goods does not apply.
            </p>
            <p>
              Fabrk is operated by a business entity registered in Apeldoorn, Netherlands. All legal matters relating to these Terms shall be subject to Dutch law.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">10.2 Dispute Resolution</h3>
            <p>
              Any disputes arising from or relating to these Terms or your use of Fabrk shall be resolved in accordance with Dutch law. We encourage parties to first attempt to resolve disputes amicably through good faith negotiations.
            </p>
            <p>
              If a dispute cannot be resolved amicably, the parties agree to submit to mediation before pursuing legal action. If mediation fails, disputes shall be resolved by the competent courts of the Netherlands.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">10.3 Jurisdiction</h3>
            <p>
              You agree that any legal action or proceeding shall be brought exclusively in the competent courts of Apeldoorn, Netherlands, or such other Dutch court as may have jurisdiction, and you consent to personal jurisdiction in such courts.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">10.4 European Union Consumer Rights</h3>
            <p>
              If you are a consumer residing in the European Union, nothing in these Terms affects your statutory rights under EU consumer protection law, including but not limited to the Consumer Rights Directive (2011/83/EU). You retain all mandatory consumer rights provided by your local jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify, update, or replace these Terms of Service at any time at our sole discretion. When we make changes, we will update the "Last Updated" date at the top of this page and may notify you via email or through the Service.
            </p>
            <p>
              <strong>Material changes</strong> (such as changes to pricing, refund policy, or license scope) will be communicated with at least 30 days' notice. Non-material changes (clarifications, formatting, contact information) take effect immediately upon posting.
            </p>
            <p>
              Your continued use of Fabrk after changes to these Terms constitutes your acceptance of the revised Terms. If you do not agree to the modified Terms, you must cease using the Service.
            </p>
            <p>
              <strong>For customers who purchased before a Terms change:</strong> The Terms in effect at the time of your purchase govern your license, unless the change is required by law or you explicitly agree to the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">12. Severability and Entire Agreement</h2>
            <h3 className="text-xl font-bold mt-4 mb-2">12.1 Severability</h3>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid under applicable law, such provision shall be modified to the minimum extent necessary to make it enforceable, or if that is not possible, severed from these Terms. The unenforceability or invalidity of any provision shall not affect the enforceability or validity of the remaining provisions.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">12.2 Entire Agreement</h3>
            <p>
              These Terms of Service, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Fabrk regarding the use of the Service, and supersede all prior or contemporaneous communications and proposals, whether oral or written.
            </p>
            <h3 className="text-xl font-bold mt-4 mb-2">12.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision of these Terms shall not be considered a waiver of that right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by Fabrk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">13. Contact Information</h2>
            <p>
              If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> legal@fabrk.dev</li>
              <li><strong>Support:</strong> support@fabrk.dev</li>
              <li><strong>Website:</strong> <Link href="/contact" className="text-primary hover:underline">https://fabrk.dev/contact</Link></li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              For general inquiries, use support@fabrk.dev. For legal matters, licensing questions, or Terms-related issues, use legal@fabrk.dev.
            </p>
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
          <p className="text-sm text-muted-foreground mb-4">
            Related Legal Documents:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/privacy" className="text-sm text-primary hover:underline font-medium">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/cookies" className="text-sm text-primary hover:underline font-medium">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
