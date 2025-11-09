import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fabrk",
  description: "Privacy policy for Fabrk boilerplate",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="mb-2 text-4xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: January 2025</p>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
          <p>
            Fabrk ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you purchase and use our
            boilerplate product.
          </p>
          <p className="mt-4">
            We are committed to protecting your personal data and complying with applicable data
            protection laws, including the EU General Data Protection Regulation (GDPR).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>

          <h3 className="mt-6 text-xl font-semibold text-foreground">2.1 Information You Provide</h3>
          <p>When you purchase Fabrk, we collect:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li><strong>Name:</strong> For personalization and communication</li>
            <li><strong>Email address:</strong> For license delivery, updates, and support</li>
            <li>
              <strong>Payment information:</strong> Processed securely by Stripe (we do NOT store
              your card details)
            </li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-foreground">2.2 Automatically Collected Information</h3>
          <p>We automatically collect:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li><strong>Purchase date:</strong> To track your license</li>
            <li><strong>License key:</strong> Generated unique identifier for your purchase</li>
            <li>
              <strong>IP address:</strong> For fraud prevention (processed by Stripe, not stored by
              us)
            </li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-foreground">2.3 Information We Do NOT Collect</h3>
          <ul className="ml-6 list-disc space-y-2">
            <li>We do NOT track your usage of the Fabrk code</li>
            <li>We do NOT collect analytics from the boilerplate itself</li>
            <li>We do NOT use cookies on our website (except essential ones for checkout)</li>
            <li>We do NOT collect social media data or third-party tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li><strong>Deliver your product:</strong> Send you the Fabrk download link and license key</li>
            <li><strong>Provide updates:</strong> Notify you of new versions and important changes</li>
            <li><strong>Provide support:</strong> Respond to your questions via email or Discord</li>
            <li><strong>Process refunds:</strong> If you request a refund within 30 days</li>
            <li><strong>Prevent fraud:</strong> Verify purchases and prevent unauthorized access</li>
            <li>
              <strong>Legal compliance:</strong> Comply with tax, accounting, and legal obligations
            </li>
          </ul>
          <p className="mt-4 font-semibold">
            We do NOT use your information for marketing, advertising, or selling to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">4. How We Share Your Information</h2>
          <p>We only share your information with:</p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">4.1 Payment Processor (Stripe)</h3>
          <p>
            We use Stripe to process payments securely. Stripe may collect and process your payment
            information, IP address, and device information for fraud prevention. See{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Stripe's Privacy Policy
            </a>
            .
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">4.2 Email Service (Resend)</h3>
          <p>
            We use Resend to send transactional emails (license delivery, updates). Your email
            address is shared with Resend for this purpose only.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-foreground">4.3 We Do NOT:</h3>
          <ul className="ml-6 list-disc space-y-2">
            <li>Sell your data to third parties</li>
            <li>Share your data with advertisers</li>
            <li>Use your data for tracking or profiling</li>
            <li>Share your data with marketing platforms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">5. Data Retention</h2>
          <p>We retain your information:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Customer data:</strong> Indefinitely or until you request deletion (to provide
              lifetime updates)
            </li>
            <li><strong>Transaction data:</strong> 7 years (for tax and legal compliance)</li>
            <li><strong>Support emails:</strong> 2 years (for reference and quality improvement)</li>
          </ul>
          <p className="mt-4">
            You can request deletion of your data at any time (see section 7).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">6. Data Security</h2>
          <p>We protect your information using:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li><strong>Encryption:</strong> HTTPS/TLS for all data transmission</li>
            <li><strong>Secure storage:</strong> Data stored in secure, encrypted databases</li>
            <li><strong>Access controls:</strong> Strict access limits to customer data</li>
            <li><strong>No card storage:</strong> Credit card info is processed by Stripe, not stored by us</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the internet is 100% secure. We cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">7. Your Rights (GDPR)</h2>
          <p>If you are in the EU/EEA, you have the right to:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Access:</strong> Request a copy of your personal data
            </li>
            <li>
              <strong>Rectification:</strong> Correct inaccurate or incomplete data
            </li>
            <li>
              <strong>Erasure ("Right to be forgotten"):</strong> Request deletion of your data
            </li>
            <li>
              <strong>Data portability:</strong> Receive your data in a machine-readable format
            </li>
            <li>
              <strong>Restrict processing:</strong> Limit how we use your data
            </li>
            <li>
              <strong>Object:</strong> Object to processing based on legitimate interests
            </li>
            <li>
              <strong>Withdraw consent:</strong> Withdraw consent for data processing (does not
              affect lawfulness of past processing)
            </li>
          </ul>
          <p className="mt-4">
            To exercise your rights, email{" "}
            <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
              support@fabrk.dev
            </a>{" "}
            with "GDPR Request" in the subject line.
          </p>
          <p className="mt-4">
            <strong>Note:</strong> We may retain transaction data for legal compliance (tax laws)
            even after deletion requests. This data is anonymized where possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">8. International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries outside the EU/EEA. We ensure
            adequate protection through:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Using service providers with GDPR-compliant data processing agreements</li>
            <li>Standard Contractual Clauses (SCCs) for data transfers</li>
            <li>
              Stripe and Resend are certified under EU-US Data Privacy Framework or equivalent
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">9. Children's Privacy</h2>
          <p>
            Fabrk is not intended for individuals under 18 years of age. We do not knowingly collect
            data from children. If you are a parent and believe your child provided us with data,
            contact us to request deletion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">10. Cookies</h2>
          <p>We use minimal cookies:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Essential cookies:</strong> Session cookies for checkout (required for
              purchase)
            </li>
            <li>
              <strong>No tracking cookies:</strong> We do NOT use analytics, advertising, or
              third-party tracking cookies
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy. Changes will be posted on this page with an updated
            "Last updated" date. We will notify you of material changes via email.
          </p>
          <p className="mt-4">
            Continued use of Fabrk after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">12. Contact Us</h2>
          <p>
            Questions or concerns about your privacy? Contact us at:
          </p>
          <ul className="ml-6 list-none space-y-2">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@fabrk.dev" className="text-primary hover:underline">
                support@fabrk.dev
              </a>
            </li>
            <li>
              <strong>For GDPR requests:</strong> Include "GDPR Request" in the subject line
            </li>
          </ul>
          <p className="mt-4">
            EU residents also have the right to lodge a complaint with your local data protection
            authority.
          </p>
        </section>
      </div>
    </article>
  );
}
